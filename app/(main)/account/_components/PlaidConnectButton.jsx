// "use client";

// import React, { useState, useEffect } from "react";
// import { usePlaidLink } from "react-plaid-link";
// import { Button } from "@/components/ui/button";

// const PlaidConnectButton = () => {
//   const [linkToken, setLinkToken] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchLinkToken() {
//       try {
//         const response = await fetch("/api/plaid/linkToken");
//         const data = await response.json();

//         if (data.link_token) {
//           setLinkToken(data.link_token);
//         } else {
//           throw new Error("No link_token received");
//         }
//       } catch (error) {
//         console.error("Error fetching Plaid link token:", error);
//         setError("Failed to load Plaid connection.");
//       }
//     }

//     fetchLinkToken();
//   }, []);

//   const { open, ready } = usePlaidLink({
//     token: linkToken,
//     onSuccess: async (publicToken) => {
//       console.log("Plaid Connected:", publicToken);

//       // Send the publicToken to your backend for exchange
//       await fetch("/api/plaid/exchangeToken", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ publicToken }),
//       });
//     },
//   });

//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <Button onClick={() => open()} disabled={!ready}>
//       Connect Bank
//     </Button>
//   );
// };

// export default PlaidConnectButton;

"use client";
import { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";

export default function PlaidConnectButton() {
  const [linkToken, setLinkToken] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Fetch link token from backend
  useEffect(() => {
    async function getLinkToken() {
      try {
        const res = await fetch("/api/plaid/linkToken", { method: "POST" });
        const data = await res.json();
        setLinkToken(data.link_token);
      } catch (error) {
        console.error("Error fetching link token:", error);
      }
    }
    getLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (publicToken) => {
      console.log("Public Token:", publicToken);

      // Exchange public token for access token
      const res = await fetch("/api/plaid/exchangeToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token: publicToken }),
      });

      const data = await res.json();
      console.log("Fetched Data:", data);

      setAccounts(data.accounts || []);
      setTransactions(data.transactions || []);
    },
  });

  return (
    <div>
      <button
        onClick={() => {
          if (linkToken) {
            open(); // Open Plaid Link only if token is available
          } else {
            console.error("Link token not available yet.");
          }
        }}
        disabled={!ready || !linkToken}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Connect Bank Account
      </button>

      {/* Show Bank Accounts */}
      {accounts.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Bank Accounts:</h2>
          <ul>
            {accounts.map((acc) => (
              <li key={acc.account_id} className="text-sm">
                {acc.name} - {acc.balances.current} {acc.balances.iso_currency_code}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Show Transactions */}
      {transactions.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Recent Transactions:</h2>
          <ul>
            {transactions.map((txn) => (
              <li key={txn.transaction_id} className="text-sm">
                {txn.date} - {txn.name}: {txn.amount} {txn.iso_currency_code}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
