import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    console.log("No user found");
    return null;
  }

  console.log("User Data from Clerk:", user); // 🔍 Check if phoneNumber exists

  try {
    // Check if the user already exists in the database
    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (loggedInUser) {
      console.log("Existing User Found:", loggedInUser);
      return loggedInUser;
    }

    // Extract user details from Clerk
    const name = `${user.firstName} ${user.lastName}`;
    const phoneNumber = user.phoneNumbers?.[0]?.phoneNumber || null; // ✅ Get phone number

    console.log("Phone Number from Clerk:", phoneNumber); // 🔍 Log phone number

    // Create a new user in the database
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        phoneNumber, // ✅ Store phone number
      },
    });

    console.log("New User Created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error storing user:", error.message);
    throw error; // Re-throw the error to handle it in the calling function
  }
};