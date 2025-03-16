import arcjet, { tokenBucket } from "@arcjet/next";
const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["userId"], // Track based on Clerk userId
    rules: [
      // Rate limiting specifically for collection creation
      tokenBucket({
        mode: "LIVE",
        refillRate: 20, // Allow 20 requests per hour
        interval: 3600, // Time window: 1 hour (3600 seconds)
        capacity: 20, // Maximum burst capacity
      }),
    ],
  });
  
  export default aj;