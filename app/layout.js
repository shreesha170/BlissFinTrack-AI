import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BlissFinTrack",
  description: "One stop Finance Platform",
};

// ✅ Define 'appearance' before using it
const appearance = {
  layout: {
    logoPlacement: "inside",
    logoSize: "medium",
  },
  variables: {
    colorPrimary: "#6366f1", // Change this to your theme color
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider >
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          <footer className="bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600 ">
            <p className="text-2xl font-semibold ">
                 Developed By Shreesha👋
            </p>
          </div>
          </footer>
        </body>
      </html>
      
    </ClerkProvider>
  );
}