import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const website = {
  name: "CemedBidAi",
    slogan: "Gen AI Tender& Proposal writing & bid management",
    colors: {
    primary: "#FFFFFF",
    secondary: "#F19154",
    text: "#000000",
  }
};

// Color Scheme
const colors = {
  primary: "#FFFFFF",
  secondary: "#F19154",
  text: "#000000",
  background: "white", // Almost Black
  paragraph: "#A1A1AA", // Muted Gray
};

// Privacy Policy Data
const privacyPolicies = [
  {
    title: "📜 Data Collection & Usage",
    content:
      "RunwayML collects minimal user data necessary for text-to-video generation, video script creation, and other AI-powered services. We do not sell or share user data with third parties. Your data is used solely to enhance your experience and improve our platform's functionality.",
  },
  {
    title: "🔒 Secure Processing",
    content:
      "All user data is processed securely with end-to-end encryption. We implement strict security measures to protect personal information and ensure confidentiality. RunwayML adheres to industry-standard security protocols to safeguard your data at all times.",
  },
  {
    title: "🤖 AI Model Training",
    content:
      "To improve AI performance, we may use anonymized interaction data for training purposes. Users can opt out of their data being used for AI improvements. RunwayML is committed to transparency and user control over data usage.",
  },
  {
    title: "🖋️ Ownership & Copyright",
    content:
      "Users retain full ownership of generated videos, scripts, and other content created using RunwayML. We do not claim rights over user-created content. You are free to use, share, and monetize your creations as you see fit.",
  },
  {
    title: "🛠️ Third-Party Services",
    content:
      "We may integrate third-party AI tools to enhance user experience. These providers adhere to strict privacy policies and do not access personal user data. RunwayML ensures that all third-party services comply with our privacy standards.",
  },
  {
    title: "📅 Policy Updates",
    content:
      "Our privacy policy may be updated periodically to reflect improvements in our AI services. Users will be notified of any significant changes. We encourage you to review this policy regularly to stay informed about how we protect your data.",
  },
];

// Framer Motion Variants
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen flex flex-col mt-12  items-center px-6 md:px-12 py-20"
      style={{ backgroundColor: colors.background }}
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-5xl font-extrabold text-center mb-12"
        style={{ color: colors.secondary }}
      >
        {t("Privacy Policy")}
      </motion.h1>

      {/* Privacy Policy Sections */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-4xl space-y-10"
      >
        {privacyPolicies.map((policy, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="p-8 rounded-xl shadow-lg transition-all"
            style={{
              backgroundColor: colors.secondary,
              borderLeft: `8px solid ${colors.primary}`,
            }}
          >
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: "black" }}
            >
              {t(policy.title)}
            </h3>
            <p
              className="text-lg leading-relaxed"
              style={{ color: colors.text }}
            >
              {t(policy.content)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Privacy;