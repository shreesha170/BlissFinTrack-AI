"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Mail,
  Users,
  Database,
  Cookie,
  FileText,
  Globe,
  Timer,
  UserCheck,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-12 max-w-3xl text-gray-800"
    >
      {/* Privacy Policy Title */}
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Privacy Policy
      </h1>
      <p className="mt-4 text-center text-gray-600">Last Updated: March 2025</p>

      {/* Policy Sections */}
      <section className="mt-8 space-y-6">
        {[
          {
            title: "1. Information We Collect",
            description:
              "BlissFinTrack collects personal information such as name, email, phone number, financial data, and browsing activity for service improvement and security purposes.",
            icon: <ShieldCheck className="text-blue-600" />,
          },
          {
            title: "2. How We Use Your Information",
            description:
              "Your data is used for financial tracking, personalized alerts, customer support, and to improve security authentication and user experience.",
            icon: <Mail className="text-green-600" />,
          },
          {
            title: "3. Data Protection & Security",
            description:
              "We use encryption, secure servers, and industry-standard security measures to safeguard your data from unauthorized access and breaches.",
            icon: <Lock className="text-red-600" />,
          },
          {
            title: "4. Cookies & Tracking Technologies",
            description:
              "We use cookies and tracking technologies to personalize your experience, analyze traffic, and improve our services. You can manage cookie preferences in your browser settings.",
            icon: <Cookie className="text-orange-500" />,
          },
          {
            title: "5. Third-Party Services & Sharing",
            description:
              "We may share your data with third-party providers for essential services such as payment processing, authentication, and analytics. Your data is shared only as necessary.",
            icon: <Users className="text-yellow-600" />,
          },
          {
            title: "6. Compliance with Laws (GDPR & CCPA)",
            description:
              "We comply with international privacy laws, including GDPR and CCPA, ensuring users have full control over their personal data.",
            icon: <Globe className="text-blue-700" />,
          },
          {
            title: "7. Data Retention Policy",
            description:
              "We retain user data only as long as necessary for business and legal compliance. You can request deletion of your data at any time.",
            icon: <Timer className="text-indigo-600" />,
          },
          {
            title: "8. User Rights & Data Access",
            description:
              "You have the right to access, modify, or delete your data. Contact us to exercise your rights under GDPR or CCPA.",
            icon: <UserCheck className="text-green-600" />,
          },
          {
            title: "9. Policy Updates & Changes",
            description:
              "We may update this Privacy Policy periodically. Any changes will be notified via email or a prominent notice on our website.",
            icon: <FileText className="text-purple-600" />,
          },
          {
            title: "10. Contact Us",
            description: (
              <>
                For any privacy concerns, reach out to{" "}
                <a
                  href="mailto:support@blissfintrack.com"
                  className="text-blue-600 hover:underline"
                >
                  support@blissfintrack.com
                </a>
                .
              </>
            ),
            icon: <Database className="text-indigo-600" />,
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

      {/* Terms & Conditions Link */}
      <div className="text-center mt-8">
        <Link
          href="/terms"
          className="text-blue-600 hover:underline transition-all duration-300 hover:text-purple-600"
        >
          View Terms & Conditions
        </Link>
      </div>
    </motion.div>
  );
}
