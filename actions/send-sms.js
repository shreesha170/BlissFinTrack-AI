import axios from "axios";

const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY;
const DEFAULT_COUNTRY_CODE = process.env.DEFAULT_COUNTRY_CODE || "+91"; // Default country code

export async function sendSMS({ to, message }) {
  if (!FAST2SMS_API_KEY) {
    console.error("❌ Missing Fast2SMS API key.");
    return { success: false, error: "Missing Fast2SMS API key." };
  }

  // Ensure phone number follows E.164 format
  let formattedNumber = to.startsWith("+") ? to : `${DEFAULT_COUNTRY_CODE}${to}`;

  if (!/^\+\d{10,15}$/.test(formattedNumber)) {
    console.error("❌ Invalid phone number format:", formattedNumber);
    return { success: false, error: "Invalid phone number format. Use E.164 format (+CountryCodePhoneNumber)." };
  }

  try {
    console.log(`📤 Sending SMS to: ${formattedNumber}`);

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        message,
        language: "english",
        route: "q", // Transactional SMS route
        numbers: formattedNumber.replace("+", ""), // Fast2SMS does not accept "+"
      },
      {
        headers: {
          authorization: FAST2SMS_API_KEY,
        },
      }
    );

    console.log("🔍 Fast2SMS Response:", response.data);

    if (!response.data.return) {
      console.error(`❌ Fast2SMS Error: ${response.data.message}`);
      return { success: false, error: response.data.message };
    }

    console.log(`✅ SMS sent successfully (Message ID: ${response.data.message})`);
    return { success: true, data: response.data };
  } catch (err) {
    console.error(`❌ Error sending SMS: ${err.response?.data || err.message}`);
    return { success: false, error: err.response?.data || err.message };
  }
}

  
  
  // import twilio from "twilio";

  // // Initialize Twilio client
  // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  // const DEFAULT_COUNTRY_CODE = process.env.DEFAULT_COUNTRY_CODE || "+91"; // Default country code

  // export async function sendSMS({ to, message }) {
  //   if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
  //     console.error("❌ Missing Twilio environment variables.");
  //     return { success: false, error: "Missing Twilio environment variables." };
  //   }

  //   // Ensure number is in E.164 format
  //   if (!to.startsWith("+")) {
  //     console.warn(`⚠️ Phone number missing country code. Assuming default (${DEFAULT_COUNTRY_CODE})`);
  //     to = `${DEFAULT_COUNTRY_CODE}${to}`;
  //   }

  //   if (!/^\+\d{10,15}$/.test(to)) {
  //     console.error("❌ Invalid phone number format:", to);
  //     return { success: false, error: "Invalid phone number format. Use E.164 format (+CountryCodePhoneNumber)." };
  //   }
    

  //   try {
  //     console.log(`📤 Sending SMS to: ${to}`);
    
  //     const response = await client.messages.create({
  //       from: process.env.TWILIO_PHONE_NUMBER,
  //       to,
  //       body: message,
  //     });
    
  //     console.log("🔍 Twilio Response:", response);
    
  //     if (response.errorCode) {
  //       console.error(`❌ Twilio Error Code: ${response.errorCode} - ${response.errorMessage}`);
  //       return { success: false, error: response.errorMessage };
  //     }
    
  //     console.log(`✅ SMS sent successfully (SID: ${response.sid})`);
  //     return { success: true, data: response.sid };
  //   } catch (err) {
  //     console.error(`❌ Error sending SMS: ${err.message}`);
  //     return { success: false, error: err.message };
  //   }
  // }  


