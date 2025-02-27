import { NextResponse } from "next/server";

export async function POST() {
  try {
    // 🔍 Check if ENV variables are loaded correctly
    if (!process.env.PLAID_CLIENT_ID || !process.env.PLAID_SECRET) {
      throw new Error("Missing Plaid API credentials");
    }

    const response = await fetch("https://sandbox.plaid.com/link/token/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.PLAID_CLIENT_ID,
        secret: process.env.PLAID_SECRET,
        client_name: "BlissFinTrack",
        country_codes: ["US"],
        language: "en",
        user: { client_user_id: "12345" },
        products: ["transactions"],
      }),
    });

    const data = await response.json(); // 🔍 Parse JSON response
    console.log("Plaid API Response:", data); // Debugging

    // 🔴 Handle errors in the response
    if (!response.ok || !data.link_token) {
      throw new Error(data.error_message || "Failed to generate link token");
    }

    return NextResponse.json({ link_token: data.link_token });
  } catch (error) {
    console.error("Error generating Plaid link token:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
