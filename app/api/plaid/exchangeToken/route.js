import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { public_token } = await req.json();

    // 🔍 Check if `public_token` is received
    if (!public_token) {
      throw new Error("Missing public_token");
    }

    // Step 1: Exchange `public_token` for `access_token`
    const exchangeResponse = await fetch("https://sandbox.plaid.com/item/public_token/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.PLAID_CLIENT_ID,
        secret: process.env.PLAID_SECRET,
        public_token,
      }),
    });

    const exchangeData = await exchangeResponse.json();
    console.log("Exchange Token Response:", exchangeData);

    if (!exchangeData.access_token) {
      throw new Error("Failed to exchange token");
    }

    const access_token = exchangeData.access_token;

    // Step 2: Fetch Bank Accounts
    const accountsResponse = await fetch("https://sandbox.plaid.com/accounts/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.PLAID_CLIENT_ID,
        secret: process.env.PLAID_SECRET,
        access_token,
      }),
    });

    const accountsData = await accountsResponse.json();
    console.log("Fetched Bank Accounts:", accountsData);

    // Step 3: Fetch Transactions
    const transactionsResponse = await fetch("https://sandbox.plaid.com/transactions/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.PLAID_CLIENT_ID,
        secret: process.env.PLAID_SECRET,
        access_token,
        start_date: "2024-01-01", // Set your date range
        end_date: "2024-02-27",
      }),
    });

    const transactionsData = await transactionsResponse.json();
    console.log("Fetched Transactions:", transactionsData);

    return NextResponse.json({
      accounts: accountsData.accounts,
      transactions: transactionsData.transactions,
    });
  } catch (error) {
    console.error("Error fetching bank details:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
