import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import Image from "next/image";



const Header = async () => {
  const user = await checkUser(); // ✅ Fetch user info on the server

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="BlissFinTrack Logo"
            width={500}
            height={200}
            className="h-12 w-auto object-contain"
          />
        </Link>

        

        {/* Navigation Links - Different for signed in/out users */}
        <div className="hidden md:flex items-center space-x-8">
          {!user && (
            <>
              <a href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600">
                Testimonials
              </a>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline">
                  <LayoutDashboard size={18} />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>
              <a href="/transaction/create">
                <Button className="flex items-center gap-2">
                  <PenBox size={18} />
                  <span className="hidden md:inline">Add Transaction</span>
                </Button>
              </a>
              <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
            </>
          ) : (
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
