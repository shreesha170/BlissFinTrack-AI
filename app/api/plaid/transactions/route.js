// import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

// const config = new Configuration({
//   basePath: PlaidEnvironments[process.env.PLAID_ENV],
//   baseOptions: {
//     headers: {
//       "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
//       "PLAID-SECRET": process.env.PLAID_SECRET,
//     },
//   },
// });

// const plaidClient = new PlaidApi(config);

// export async function POST(req) {
//   try {
//     const { access_token } = await req.json();

//     const response = await plaidClient.transactionsGet({
//       access_token,
//       start_date: "2024-01-01",
//       end_date: "2024-12-31",
//     });

//     return Response.json({ transactions: response.data.transactions });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Failed to fetch transactions" });
//   }
// }

const express =require("express");
const axios = require("axios");
const router = express.Router();

const PLAID_CLIENT_ID = "process.env.PLAID_CLIENT_ID";
const PLAID_SECRET = "process.env.PLAID_SECRET";
const PLAID_ENV = "sandbox"; // Change to "development" or "production"

// Fetch transactions for a bank account
router.post("/", async (req, res) => {
  try {
    const { access_token } = req.body;

    const response = await axios.post(`https://${PLAID_ENV}.plaid.com/transactions/get`, {
      client_id: PLAID_CLIENT_ID,
      secret: PLAID_SECRET,
      access_token,
      start_date: "2024-01-01",
      end_date: "2024-12-31",
    });

    res.json(response.data.transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
