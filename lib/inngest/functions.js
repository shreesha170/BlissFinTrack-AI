import { sendEmail } from "@/actions/send-email";
import { db } from "../prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import EmailTemplate from "@/emails/template";
import { sendSMS } from "@/actions/send-sms";
import axios from "axios";

export const sendTransactionSuccessSMS = inngest.createFunction(
  {
    name: "Transaction Added SMS Alert",
    event: "transaction.added.success",
  },
  async ({ event, step }) => {
    const { userId, amount, accountName, phoneNumber } = event.data;

    if (!phoneNumber) {
      console.log(`❌ No phone number for user ${userId}`);
      return;
    }

    await step.run("send-sms-transaction-success", async () => {
      try {
        await sendSMS({
          to: phoneNumber,
          message: `✅ Transaction Alert: Your transaction of $${amount} was successfully added to ${accountName}.`,
        });
        console.log("✅ Transaction Success SMS Sent");
      } catch (error) {
        console.error("❌ Error sending SMS:", error);
        throw new Error("Failed to send SMS"); // Ensures proper error handling
      }
    });
  }
);


export const checkBudgetAlerts = inngest.createFunction(
  { name: "Check Budget Alerts" },
  { cron: "0 */6 * * *" }, // Runs every 6 hours
  async ({ step }) => {
    console.log("🚀 Running Budget Alerts Job");

    // Fetch all budgets with user and default account details
    const budgets = await step.run("fetch-budgets", async () => {
      return db.budget.findMany({
        include: {
          user: {
            include: {
              accounts: { where: { isDefault: true } },
            },
          },
        },
      });
    });

    console.log(`📊 Found ${budgets.length} budgets to check`);

    // Iterate through each budget
    for (const budget of budgets) {
      const user = budget.user;
      const defaultAccount = budget.user.accounts[0];

      // Skip if no default account is found
      if (!defaultAccount) {
        console.log(`❌ No default account for user ${budget.user.name}`);
        continue;
      }

      // Check budget usage for the current month
      await step.run(`check-budget-${budget.id}`, async () => {
        const expenses = await db.transaction.aggregate({
          where: {
            userId: budget.userId,
            accountId: defaultAccount.id,
            type: "EXPENSE",
            date: { gte: new Date(new Date().setDate(1)) }, // Start of the month
          },
          _sum: { amount: true },
        });

        const totalExpenses = expenses._sum.amount?.toNumber() || 0;
        const percentageUsed = ((totalExpenses / budget.amount) * 100).toFixed(2);

        console.log(
          `🔍 Budget Check for ${budget.user.name} - Used: ${percentageUsed}%, Expenses: ₹${totalExpenses}, Budget: ₹${budget.amount}`
        );

        // Send alert if budget usage exceeds 80%
        if (Number(percentageUsed) >= 80)          {
          console.log(`🚨 Sending budget alert to: ${budget.user.email}`);

          try {
            // Send email alert
            await sendEmail({
              to: budget.user.email,
              subject: `Budget Alert for ${defaultAccount.name}`,
              react: EmailTemplate({
                userName: budget.user.name,
                type: "budget-alert",
                data: {
                  percentageUsed,
                  budgetAmount: Number(budget.amount) ? Number(budget.amount).toFixed(1) : "0.0",
                  totalExpenses: totalExpenses ? totalExpenses.toFixed(1) : "0.0",
                  accountName: defaultAccount.name,
                },
              }),
            });

            console.log("✅ Budget Alert Email Sent Successfully");

         // Send SMS alert
          if (budget.user.phoneNumber) {
            try {
              await sendSMS({
                to: budget.user.phoneNumber,
                message: `⚠️ BLISSFINTRACK |  Budget Alert: You've used ${percentageUsed}% of your ${defaultAccount.name} budget! Expenses: ₹${totalExpenses}. Stay on track!`,
               
              });

              console.log("✅ Budget Alert SMS Sent Successfully");
            } catch (error) {
              console.error("❌ Error sending SMS:", error);
            }
          }
         // Send SMS alert via Fast2SMS
        //  if (budget.user.phoneNumber){
        //   try {
        //     const response = await axios.post(
        //       "https://www.fast2sms.com/dev/bulkV2",
        //       {
        //         message: `🔔 Alert: Your ${defaultAccount.name} account usage has reached ${percentageUsed}% Please check your expenses and manage accordingly.`,
        //         language: "english",
        //         route: "p",  // ✅ Quick SMS Route
        //         numbers: budget.user.phoneNumber, // Ensure this is a valid phone number
        //       },
        //       {
        //         headers: {
        //           authorization: process.env.FAST2SMS_API_KEY, // Ensure this is set correctly
        //         },
        //       }
        //     );

        //     if (response.data.return) {
        //       console.log("✅ Budget Alert SMS Sent Successfully via Fast2SMS");
        //     } else {
        //       console.log("❌ Failed to send SMS:", response.data.message);
        //     }
        //   } catch (error) {
        //     console.error("❌ Error sending SMS:", error.response?.data || error.message);
        //   }
        // }

        await db.budget.update({
          where: { id: budget.id },
          data: { lastAlertSent: new Date() },
        });
      } catch (error) {
        console.error("❌ Error sending email:", error);
      }
    } else {
      console.log("✅ Budget is within limits. No alert needed.");
    }
      });
    }
  }
);


export const triggerRecurringTransactions = inngest.createFunction(
  {
    id: "trigger-recurring-transactions", // Unique ID,
    name: "Trigger Recurring Transactions",
  },
  // { cron: "*/1 * * * *" }, // Runs every 1 minute
  { cron: "0 0 * * *" }, // Daily at midnight
  async ({ step }) => {
    const recurringTransactions = await step.run(
      "fetch-recurring-transactions",
      async () => {
        return await db.transaction.findMany({
          where: {
            isRecurring: true,
            status: "COMPLETED",
            OR: [
              { lastProcessed: null },
              {
                nextRecurringDate: {
                  lte: new Date(),
                },
              },
            ],
          },
        });
      }
    );

    // Send event for each recurring transaction in batches
    if (recurringTransactions.length > 0) {
      const events = recurringTransactions.map((transaction) => ({
        name: "transaction.recurring.process",
        data: {
          transactionId: transaction.id,
          userId: transaction.userId,
        },
      }));

      // Send events directly using inngest.send()
      await inngest.send(events);
    }

    return { triggered: recurringTransactions.length };
  }
);

//Recurring Transaction Processing with Throttling
export const processRecurringTransaction = inngest.createFunction({
  id: "process-recurring-transaction",
    name: "Process Recurring Transaction",
    throttle: {
      limit: 10, // Process 10 transactions
      period: "1m", // per minute
      key: "event.data.userId", // Throttle per user
    },
},
 { event: "transaction.recurring.process" },

 async ({ event, step }) => {
  // Validate event data
  if (!event?.data?.transactionId || !event?.data?.userId) {
    console.error("Invalid event data:", event);
    return { error: "Missing required event data" };
  }
  await step.run("process-transaction", async () => {
    const transaction = await db.transaction.findUnique({
      where: {
        id: event.data.transactionId,
        userId: event.data.userId,
      },
      include: {
        account: true,
      },
    });
    if (!transaction || !isTransactionDue(transaction)) return;

    // Create new transaction and update account balance in a transaction
    await db.$transaction(async (tx) => {
      // Create new transaction
      await tx.transaction.create({
        data: {
          type: transaction.type,
          amount: transaction.amount,
          description: `${transaction.description} (Recurring)`,
          date: new Date(),
          category: transaction.category,
          userId: transaction.userId,
          accountId: transaction.accountId,
          isRecurring: false,
        },
      }); 

      // Update account balance
      const balanceChange =
      transaction.type === "EXPENSE"
        ? -transaction.amount.toNumber()
        : transaction.amount.toNumber();

    await tx.account.update({
      where: { id: transaction.accountId },
      data: { balance: { increment: balanceChange } },
    });

    // Update last processed date and next recurring date
    await tx.transaction.update({
      where: { id: transaction.id },
      data: {
        lastProcessed: new Date(),
        nextRecurringDate: calculateNextRecurringDate(
          new Date(),
          transaction.recurringInterval
        ),
      },
    });

  // ✅ Send SMS Notification
  if (transaction.user && transaction.user.phoneNumber) {
    const smsMessage = `💰 Your recurring transaction for ${transaction.category} of ₹${transaction.amount} has been processed successfully.`;
    await sendSMS(transaction.user.phoneNumber, smsMessage);
  }
  });
});
}
)

// Utility functions
function isTransactionDue(transaction) {
  // If no lastProcessed date, transaction is due
  if (!transaction.lastProcessed) return true;

  const today = new Date();
  const nextDue = new Date(transaction.nextRecurringDate);

  // Compare with nextDue date
  return nextDue <= today;
}


function calculateNextRecurringDate(date, interval) {
  const next = new Date(date);
  switch (interval) {
    case "DAILY":
      next.setDate(next.getDate() + 1);
      break;
    case "WEEKLY":
      next.setDate(next.getDate() + 7);
      break;
    case "MONTHLY":
      next.setMonth(next.getMonth() + 1);
      break;
    case "YEARLY":
      next.setFullYear(next.getFullYear() + 1);
      break;
  }
  return next;
}

export const generateMonthlyReports = inngest.createFunction(
  {
    id: "generate-monthly-reports",
    name: "Generate Monthly Reports",
  },
  { cron: "0 0 1 * *" }, // First day of each month
  async ({ step }) => {
    const users = await step.run("fetch-users", async () => {
      return await db.user.findMany({
        include: { accounts: true },
      });
    });
    for (const user of users) {
      await step.run(`generate-report-${user.id}`, async () => {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const stats = await getMonthlyStats(user.id, lastMonth);
        const monthName = lastMonth.toLocaleString("default", {
          month: "long",
        });

        // Generate AI insights
        const insights = await generateFinancialInsights(stats, monthName);
        await sendEmail({
          to: user.email,
          subject: `Your Monthly Financial Report - ${monthName}`,
          react: EmailTemplate({
            userName: user.name,
            type: "monthly-report",
            data: {
              stats,
              month: monthName,
              insights,
            },
          }),
        });
      });
    }
    return { processed: users.length };
  }
);

async function generateFinancialInsights(stats, month) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  Analyze this financial data and provide 3 concise, actionable insights.
  Focus on spending patterns and practical advice.
  Keep it friendly and conversational.

  Financial Data for ${month}:
  - Total Income: $${stats.totalIncome}
  - Total Expenses: $${stats.totalExpenses}
  - Net Income: $${stats.totalIncome - stats.totalExpenses}
  - Expense Categories: ${Object.entries(stats.byCategory)
    .map(([category, amount]) => `${category}: $${amount}`)
    .join(", ")}

  Format the response as a JSON array of strings, like this:
  ["insight 1", "insight 2", "insight 3"]`;
  
   try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    return JSON.parse(cleanedText);
   } catch (error) {
    console.error("Error generating insights:", error);
    return [
      "Your highest expense category this month might need attention.",
      "Consider setting up a budget for better financial management.",
      "Track your recurring expenses to identify potential savings.",
    ];
   }
} 


const getMonthlyStats=async (userId, month)=>{
  const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
  const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
  return transactions.reduce(
    (stats, t) => {
      const amount = t.amount.toNumber();
      if (t.type === "EXPENSE") {
        stats.totalExpenses += amount;
        stats.byCategory[t.category] =
          (stats.byCategory[t.category] || 0) + amount;
      } else {
        stats.totalIncome += amount;
      }
      return stats;
    },
    {
      totalExpenses: 0,
      totalIncome: 0,
      byCategory: {},
      transactionCount: transactions.length,
    }
  );
}