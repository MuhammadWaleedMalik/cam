import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // Update path as per your structure

const website = {
  name: "CemedBidAi",
  slogan: "Gen AI Tender & Proposal writing & bid management",
  colors: {
    primary: "#F19154",
    secondary: "#FFFFFF",
    text: "black"
  }
};

const AIBidGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');

  const { fetchGroqResponse, response, loading, error: hookError } = useGroq();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setError('');
    await fetchGroqResponse("Generate a business bid proposal for:", prompt);
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      backgroundColor: `${website.colors.primary}E6`,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      className="min-h-screen mt-24 py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: website.colors.secondary }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1
            className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4"
            style={{ color: website.colors.primary }}
          >
            {website.name} AI Bid Generator
          </h1>
          <p className="text-xl text-gray-600">{website.slogan}</p>
        </motion.div>

        {/* How to Use */}
        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm" variants={itemVariants}>
          <h2 className="text-2xl font-semibold text-black mb-4">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Describe what you need in the input below.</li>
            <li>Click "Generate Bid Content".</li>
            <li>Review and edit the AI-generated content.</li>
            <li>Copy to clipboard and paste into your document.</li>
          </ol>
        </motion.div>

        {/* Input Section */}
        <motion.div className="mb-8" variants={itemVariants}>
          <label htmlFor="prompt" className="block text-lg font-medium text-gray-700 mb-2">
            Describe your bid requirements:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Construction bid for school renovation project"
              className="flex-1 px-4 py-3 border text-orange-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              style={{ outline: 'none' }}
            />
            <motion.button
              onClick={handleGenerate}
              disabled={loading}
              className="px-6 py-3 rounded-lg font-medium text-black flex items-center"
              style={{ backgroundColor: website.colors.primary }}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : null}
              {loading ? "Generating..." : "Generate Bid Content"}
            </motion.button>
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
          {hookError && <p className="text-red-600 mt-2">{hookError}</p>}
        </motion.div>

        {/* Output Section */}
        {response && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md text-black whitespace-pre-wrap"
            variants={itemVariants}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Generated Bid Content</h2>
              <CopyToClipboard text={response} onCopy={handleCopy}>
                <button className="text-sm text-blue-600 hover:underline">
                  {isCopied ? "Copied!" : "Copy to Clipboard"}
                </button>
              </CopyToClipboard>
            </div>
            <div>{response}</div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AIBidGenerator;
