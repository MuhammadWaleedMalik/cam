// --- Full Page Code with useGroq Integrated ---

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq';

const website = {
  name: "CemedBidAi",
  slogan: "Gen AI Tender& Proposal writing & bid management",
  colors: {
    primary: "#F19154",
    secondary: "#FFFFFF",
    text: "#000000"
  }
};

const AIBidEnhancer = () => {
  const [originalContent, setOriginalContent] = useState('');
  const [enhancedContent, setEnhancedContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');
  const [enhancementType, setEnhancementType] = useState('clarity');

  const { fetchGroqResponse, response, loading } = useGroq();

  const enhancementOptions = [
    { id: 'clarity', name: 'Improve Clarity', description: 'Make your content clearer and more concise' },
    { id: 'persuasive', name: 'Increase Persuasiveness', description: 'Make your arguments more compelling' },
    { id: 'compliance', name: 'Ensure Compliance', description: 'Check against procurement requirements' },
    { id: 'structure', name: 'Improve Structure', description: 'Better organization and flow' },
    { id: 'professional', name: 'Professional Tone', description: 'Elevate to formal business language' },
  ];

  const handleEnhance = async () => {
    if (!originalContent.trim()) {
      setError('Please enter some content to enhance');
      return;
    }

    setError('');
    await fetchGroqResponse(enhancementType, originalContent);
    setEnhancedContent(response);
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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

  const optionVariants = {
    rest: { scale: 1, borderColor: '#E5E7EB' },
    hover: { scale: 1.02, borderColor: website.colors.primary },
    selected: { 
      scale: 1.02, 
      borderColor: website.colors.primary,
      backgroundColor: `${website.colors.primary}10`,
      boxShadow: `0 0 0 2px ${website.colors.primary}40`
    }
  };

  return (
    <div className="min-h-screen mt-12 py-12 px-4 sm:px-6 lg:px-8 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4" style={{ color: website.colors.primary }}>
            {website.name} AI Bid Enhancer
          </h1>
          <p className="text-xl text-gray-600">Transform good bids into winning proposals</p>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Enter your original bid content:</label>
          <textarea
            value={originalContent}
            onChange={e => setOriginalContent(e.target.value)}
            className="w-full p-4 border rounded-md h-40"
            placeholder="Paste your bid content here..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {enhancementOptions.map(option => (
            <motion.div
              key={option.id}
              onClick={() => setEnhancementType(option.id)}
              className={`p-4 border rounded cursor-pointer ${enhancementType === option.id ? 'bg-orange-100 border-orange-400' : ''}`}
              whileHover="hover"
              animate={enhancementType === option.id ? 'selected' : 'rest'}
              variants={optionVariants}
            >
              <h3 className="font-semibold text-lg mb-1">{option.name}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </motion.div>
          ))}
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <motion.button
          className="px-6 py-3 text-white font-semibold rounded-md"
          style={{ backgroundColor: website.colors.primary }}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleEnhance}
          disabled={loading}
        >
          {loading ? 'Enhancing...' : 'Enhance Now'}
        </motion.button>

        {enhancedContent && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Enhanced Content:</h2>
            <div className="bg-gray-100 p-4 rounded relative">
              <pre className="whitespace-pre-wrap break-words text-sm">{enhancedContent}</pre>
              <CopyToClipboard text={enhancedContent} onCopy={handleCopy}>
                <button className="absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded text-sm">
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              </CopyToClipboard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIBidEnhancer;