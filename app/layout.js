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
          <footer className="bg-blue-50 text-grey py-12">
            <div className="container mx-auto px-6">
              {/* Contact Section */}
               <div className="text-center">
                 <h2 className="text-3xl font-semibold">Contact Us</h2>
                  <p className="mt-2 text-gray-400">📍 BlissFinTrack, T. Nagar, Chennai, Tamil Nadu, India - 600017</p>
                  <p className="mt-1 text-gray-400">📧 Email: <a href="mailto:support@blissfintrack.com" className="text-blue-400 hover:underline">support@blissfintrack.com</a></p>
                  <p className="mt-1 text-gray-400">📞 Phone: <a href="tel:+919876543210" className="text-blue-400 hover:underline">+91 98765 43210</a></p>
               </div>

               {/* Social Media Links */}
                <div className="mt-6 flex justify-center space-x-6">
                 <a href="https://twitter.com/blissfintrack" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition">
                  <img src="/twitter-icon.jpg" alt="Twitter" className="h-10 w-10" />
                </a>
                <a href="https://facebook.com/blissfintrack" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition">
                  <img src="/facebook.png" alt="Facebook" className="h-10 w-10" />
                </a>
                </div>
                {/* Footer Bottom */}
                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
                  <p>© {new Date().getFullYear()} BlissFinTrack. All rights reserved.</p>
                  <p>
                    <a href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</a> | 
                    <a href="/terms" className="ml-2 hover:text-gray-300">Terms & Conditions</a>
                  </p>
                </div>
             </div>
           </footer>

        </body>
      </html>
      
    </ClerkProvider>
  );
}