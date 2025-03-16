import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",  // Protect the /dashboard route
    "/account(.*)",    // Protect the /account route
    "/transaction(.*)",  // Protect the /transaction route
]);

const aj = arcjet({
    key: process.env.ARCJET_KEY,
     // characteristics: ["userId"], // Track based on Clerk userId
  rules: [
    // Shield protection for content and security
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "GO_HTTP", // For Inngest
        // See the full list at https://arcjet.com/bot-list
      ],
    }),
  ],
});

// Apply Clerk middleware for authentication
const clerk = clerkMiddleware(async (auth, req) => {
    // Get user authentication data
    const { userId } = await auth();

    

    // Check if the user is not authenticated and the route is protected
    if (!userId && isProtectedRoute(req)) {
        const { redirectToSignIn } = await auth();
        return redirectToSignIn();  // Redirect to sign-in page
    }

    // Proceed if the user is authenticated or the route is not protected
    return NextResponse.next();;
});
// Chain middlewares - ArcJet runs first, then Clerk
export default createMiddleware(aj,clerk);
// Configure route matching logic
export const config = {
    matcher: [
        // Skip Next.js internals and static assets (e.g., images, fonts, etc.)
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes and trpc routes
        '/(api|trpc)(.*)',
    ],
};
