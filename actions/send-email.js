"use server";

import { Resend } from "resend";
export async function sendEmail({ to, subject, react }) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");
  console.log("Resend API Key:", process.env.RESEND_API_KEY ? "Exists ✅" : "Missing ❌");

  try {
    console.log(`📤 Sending email to: ${to} with subject: "${subject}"`);

    const { data, error } = await resend.emails.send({
      // from: "BlissFinTrack <onboarding@resend.dev>", // Change to your verified domain later
      from: "BlissFinTrack <noreply@blissfintrack.xyz>", // Change to your verified domain later
      to,
      subject,
      react,
    });

    if (error) {
      console.error("❌ Email sending failed:", error);
      return { success: false, error };
    }

    console.log("✅ Email sent successfully:", data);
    return { success: true, data };
  } catch (err) {
    console.error("❌ Unexpected error while sending email:", err.message);
    return { success: false, error: err.message };
  }
}


// "use server";

// import { getUserEmail } from "@/lib/checkUser";
// import { Resend } from "resend";

// export async function sendEmail({ to, subject, react }) {
//   const userEmail = await getUserEmail(); // Get the logged-in user's email

//   if (!userEmail) {
//     console.error("❌ No authenticated user found!");
//     return { success: false, error: "No authenticated user" };
//   }

//   const resend = new Resend(process.env.RESEND_API_KEY || "");
//   console.log("Resend API Key:", process.env.RESEND_API_KEY ? "Exists ✅" : "Missing ❌");

//   try {
//     console.log(`📤 Sending email to: ${to} (User: ${userEmail}) with subject: "${subject}"`);

//     const { data, error } = await resend.emails.send({
//       from: "BlissFinTrack <noreply@yourdomain.com>", // Use a verified sender domain!
//       to,
//       subject,
//       react,
//       reply_to: userEmail, // The user’s email can be the "Reply-To" address
//     });

//     if (error) {
//       console.error("❌ Email sending failed:", error);
//       return { success: false, error };
//     }

//     console.log("✅ Email sent successfully:", data);
//     return { success: true, data };
//   } catch (err) {
//     console.error("❌ Unexpected error while sending email:", err.message);
//     return { success: false, error: err.message };
//   }
// }
