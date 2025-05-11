import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // adjust the path as needed

const website = {
  name: "CemedBidAi",
  slogan: "Gen AI Tender & Proposal writing & bid management",
  colors: {
    primary: "#F19154",
    secondary: "#FFFFFF",
    text: "#000000"
  }
};

const docSections = [
  {
    id: "introduction",
    title: "Introduction",
    content: "CemedBidAi helps streamline your bid and proposal processes with GenAI. This section gives you a brief overview of the platform's capabilities and setup steps."
  },
  {
    id: "setup",
    title: "Getting Started",
    content: "To get started, create a free account, choose your preferred template, and begin enhancing your tender documents with AI assistance."
  },
  {
    id: "features",
    title: "Core Features",
    content: "Generate proposals, enhance bids, manage tender stages, and ask domain-specific questions—all from one unified interface."
  },
  {
    id: "faq",
    title: "FAQ",
    content: "Got questions? This section answers common queries like pricing, output accuracy, and use-case examples."
  },
  {
    id: "support",
    title: "Support",
    content: "Need help? Reach out to us at support@cemedbidai.com or visit our live chat for real-time assistance."
  }
];

const DocsPage = () => {
  const [copiedId, setCopiedId] = useState(null);
  const [activeResponseId, setActiveResponseId] = useState(null);
  const { fetchGroqResponse, response, loading, error } = useGroq();

  const handleCopy = async (id, content) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);

    // Optional: fetch AI summary or enhancement
    setActiveResponseId(id);
    await fetchGroqResponse("Summarize the following documentation section:", content);
  };

  return (
    <motion.div
      className="min-h-screen py-12 mt-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: website.colors.secondary }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4" style={{ color: website.colors.primary }}>
            {website.name} Documentation
          </h1>
          <p className="text-xl" style={{ color: website.colors.text }}>
            Explore our docs to master proposal writing with AI
          </p>
        </motion.div>

        <div className="space-y-8">
          {docSections.map((section) => (
            <motion.div
              key={section.id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-2" style={{ color: website.colors.text }}>{section.title}</h2>
              <p className="text-base text-gray-700 mb-4">{section.content}</p>

              <CopyToClipboard text={section.content} onCopy={() => handleCopy(section.id, section.content)}>
                <motion.button
                  className="px-4 py-2 text-sm font-medium rounded-md text-white"
                  style={{ backgroundColor: copiedId === section.id ? "#10B981" : website.colors.primary }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copiedId === section.id ? "Copied!" : "Copy Text"}
                </motion.button>
              </CopyToClipboard>

              {/* Show Groq AI response */}
              {activeResponseId === section.id && (
                <div className="mt-4 text-sm text-gray-800">
                  {loading && <p>AI is thinking...</p>}
                  {error && <p className="text-red-500">Error: {error}</p>}
                  {response && !loading && <p><strong>AI Summary:</strong> {response}</p>}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DocsPage;
