import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Terms = () => {
  const [lastUpdated, setLastUpdated] = useState("");

  const website = {
    name: "CemedBidAi",
    slogan: "Gen AI Tender& Proposal writing & bid management",
    colors: {
      primary: "#FFFFFF",
      secondary: "#F19154",
      text: "#000000",
    }
  };

  // Set current date on component mount
  useEffect(() => {
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setLastUpdated(date);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto bg-white mt-24  px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-bold mb-2 text-black">Terms of Service</h1>
        <p className="text-[#F19154] mb-8">Last Updated: {lastUpdated}</p>
      </motion.div>

      {/* Intro */}
      <motion.div variants={itemVariants} className="mb-12">
        <p className="text-black">
          Welcome to <span className="font-bold">{website.name}</span> ("we," "our," or "us"). 
          By using our AI-powered proposal and tender generation services, you agree to these Terms of Service.
        </p>
      </motion.div>

      {/* Terms Sections */}
      <motion.div variants={containerVariants} className="space-y-12">
        {/* Section 1 */}
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#F19154] pb-2">1. Acceptance of Terms</h2>
          <p className="text-black">
            By accessing <span className="font-bold">{website.name}</span> (the "Service"), you confirm that you accept these Terms 
            and comply with all applicable laws. If you disagree, do not use the Service.
          </p>
        </motion.section>

        {/* Section 2 */}
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#F19154] pb-2">2. Service Description</h2>
          <p className="text-black">
            {website.name} provides AI-generated business proposals, tender documents, and related tools 
            (e.g., <span className="font-bold">AI Proposal Analyzer</span>, <span className="font-bold">Budget Estimator</span>). 
            Outputs are suggestions only—users are responsible for final content.
          </p>
        </motion.section>

        {/* Section 3 */}
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#F19154] pb-2">3. User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>Provide accurate input data.</li>
            <li>Review AI-generated content for errors before use.</li>
            <li>Do not submit illegal, misleading, or harmful content.</li>
          </ul>
        </motion.section>

        {/* Section 4 */}
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#F19154] pb-2">4. Privacy & Data Use</h2>
          <p className="text-black">
            Your data is governed by our <a href="#" className="text-[#F19154] hover:underline">Privacy Policy</a>. 
            We use inputs to improve AI models but do not claim ownership of your documents.
          </p>
        </motion.section>

        {/* Section 5 */}
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#F19154] pb-2">5. Limitation of Liability</h2>
          <p className="text-black mb-2">
            {website.name} is not liable for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>Financial losses from reliance on AI-generated content.</li>
            <li>Errors or omissions in proposals/tenders.</li>
            <li>Third-party misuse of exported documents.</li>
          </ul>
        </motion.section>

        {/* Section 6 */}
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#F19154] pb-2">6. Changes to Terms</h2>
          <p className="text-black">
            We may update these Terms. Continued use after changes constitutes acceptance.
          </p>
        </motion.section>

        {/* Section 7 */}
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#F19154] pb-2">7. Contact</h2>
          <p className="text-black">
            Questions? Email us at <span className="text-[#F19154]">support@{website.name}.com</span>.
          </p>
        </motion.section>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        variants={itemVariants}
        className="mt-16 pt-4 border-t border-gray-200"
      >
        <small className="text-black">
          © {website.name} | <span className="text-[#F19154]">"{website.slogan}"</span>
        </small>
      </motion.footer>
    </motion.div>
  );
};

export default Terms;