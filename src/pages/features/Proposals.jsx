import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // Adjust the import path accordingly

const website = {
  name: "CemedBidAi",
  slogan: "Gen AI Tender & Proposal writing & bid management",
  colors: {
    primary: "#F19154",
    secondary: "#FFFFFF",
    text: "black"
  }
};

const AIProposalGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { fetchGroqResponse, response, loading, error } = useGroq();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setErrorMessage('Please enter a prompt');
      return;
    }

    setErrorMessage('');
    await fetchGroqResponse("Generate a proposal for:", prompt);
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div 
      className="min-h-screen mt-24 py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: website.colors.secondary }}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4"
            style={{ color: website.colors.primary }}
          >
            {website.name} AI Proposal Generator
          </h1>
          <p className="text-xl text-gray-600">{website.slogan}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-black mb-4">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Describe what you need in the input below</li>
            <li>Click "Generate Proposal Content"</li>
            <li>Review and edit the AI-generated content</li>
            <li>Copy and use it in your document</li>
          </ol>
        </div>

        <div className="mb-8">
          <label htmlFor="prompt" className="block text-lg font-medium text-gray-700 mb-2">
            Describe your proposal requirements:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Proposal for website redesign"
              className="flex-1 px-4 py-3 border text-orange-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <motion.button
              onClick={handleGenerate}
              disabled={loading}
              className="px-6 py-3 rounded-lg font-medium text-black flex items-center"
              style={{ backgroundColor: website.colors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Generating..." : "Generate Proposal Content"}
            </motion.button>
          </div>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        </div>

        {response && (
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-black">AI-Generated Proposal</h3>
              <CopyToClipboard text={response} onCopy={handleCopy}>
                <button className="text-sm text-white px-4 py-2 rounded-md" style={{ backgroundColor: website.colors.primary }}>
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </CopyToClipboard>
            </div>
            <pre className="whitespace-pre-wrap text-gray-800">{response}</pre>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AIProposalGenerator;
