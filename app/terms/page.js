"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  UserCheck,
  Ban,
  ClipboardCheck,
  Lock,
  AlertTriangle,
  Globe,
  Mail,
} from "lucide-react";

export default function TermsConditions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-12 max-w-3xl text-gray-800"
    >
      {/* Title */}
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Terms & Conditions
      </h1>
      <p className="mt-4 text-center text-gray-600">Last Updated: March 2025</p>

      {/* Sections */}
      <section className="mt-8 space-y-6">
        {[
          {
            title: "1. Acceptance of Terms",
            description:
              "By accessing or using BlissFinTrack, you agree to comply with these Terms & Conditions. If you do not agree, please refrain from using our services. These terms establish a legal agreement between you and BlissFinTrack, outlining the rules for using our platform.",
            icon: <ClipboardCheck className="text-green-600" />, 
          },
          {
            title: "2. User Responsibilities",
            description:
              "You are responsible for using our services ethically and in accordance with applicable laws. Any fraudulent activities, data breaches, or attempts to exploit the platform will lead to immediate termination of access. Users must maintain accurate information on their profiles and avoid sharing login credentials.",
            icon: <UserCheck className="text-blue-600" />,
          },
          {
            title: "3. Privacy & Data Protection",
            description: (
              <>
                We prioritize your privacy and data security. Our Privacy Policy explains how we handle your personal data, collect cookies, and ensure compliance with GDPR or other regulations. Read it {" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  here
                </Link>.
              </>
            ),
            icon: <ShieldCheck className="text-yellow-600" />,
          },
          {
            title: "4. Intellectual Property",
            description:
              "All content, trademarks, and materials on BlissFinTrack, including text, images, and software, are protected by intellectual property laws. Unauthorized reproduction, distribution, or modification of content without prior written consent is strictly prohibited.",
            icon: <FileText className="text-purple-600" />,
          },
          {
            title: "5. Termination of Access",
            description:
              "BlissFinTrack reserves the right to suspend or terminate any account that violates our policies. Termination may occur due to fraudulent activities, misuse of services, or security threats. Users may appeal such actions by contacting our support team.",
            icon: <Ban className="text-red-600" />,
          },
          {
            title: "6. Limitation of Liability",
            description:
              "BlissFinTrack is not liable for any direct or indirect damages arising from your use of our platform. Users are responsible for evaluating risks associated with financial decisions made using our tools. The platform is provided 'as-is' without guarantees.",
            icon: <AlertTriangle className="text-orange-600" />,
          },
          {
            title: "7. Security & Account Protection",
            description:
              "We take security seriously and implement strict measures to protect your account. Authentication is handled through Clerk, ensuring secure logins, including Google Sign-In. You are responsible for keeping your login credentials safe—never share your password or authentication tokens. Clerk manages session security to prevent unauthorized access, and we recommend enabling Two-Factor Authentication (2FA) for added protection. If you suspect any unauthorized login attempts, reset your password immediately or contact us.",
            icon: <Lock className="text-indigo-600" />,
          },
          {
            title: "8. Governing Law",
            description:
              "These Terms & Conditions are governed by the laws of [Your Country/State]. Any disputes arising from the use of BlissFinTrack shall be resolved in the appropriate courts under applicable jurisdiction.",
            icon: <Globe className="text-blue-700" />,
          },
          {
            title: "9. Changes to Terms",
            description:
              "BlissFinTrack reserves the right to modify these Terms & Conditions at any time. Continued use of our services after an update constitutes acceptance of the revised terms. We recommend reviewing these terms periodically.",
            icon: <FileText className="text-gray-600" />,
          },
          {
            title: "10. Contact Us",
            description: (
              <>
                For any questions or concerns, contact our support team at {" "}
                <a href="mailto:support@blissfintrack.com" className="text-blue-600 hover:underline">
                  support@blissfintrack.com
                </a>.
              </>
            ),
            icon: <Mail className="text-green-600" />,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              {item.icon} {item.title}
            </h2>
            <p>{item.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Privacy Policy Link */}
      <div className="text-center mt-8">
        <Link
          href="/privacy"
          className="text-blue-600 hover:underline transition-all duration-300 hover:text-purple-600"
        >
          View Privacy Policy
        </Link>
      </div>
    </motion.div>
  );
}
