import { NextResponse } from "next/server";
import axios from "axios";

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || "sandbox"; // Change for production

export async function POST(req) {
  try {
    const { public_token } = await req.json();

    // Exchange public token for access token
    const response = await axios.post(`https://${PLAID_ENV}.plaid.com/item/public_token/exchange`, {
      client_id: PLAID_CLIENT_ID,
      secret: PLAID_SECRET,
      public_token,
    });

    const access_token = response.data.access_token;

    // Fetch bank accounts
    const accountsResponse = await axios.post(`https://${PLAID_ENV}.plaid.com/accounts/get`, {
      client_id: PLAID_CLIENT_ID,
      secret: PLAID_SECRET,
      access_token,
    });

    return NextResponse.json(accountsResponse.data.accounts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
