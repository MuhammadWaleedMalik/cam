import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // Update the import path

const website = {
  name: "CemedBidAi",
  slogan: "Gen AI Tender& Proposal writing & bid management",
  colors: {
    primary: "#F19154",
    secondary: "#FFFFFF",
    text: "black"
  }
};

const AITenderGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedTender, setGeneratedTender] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');

  // Initialize the Groq hook
  const { fetchGroqResponse, response, loading, error: groqError } = useGroq();

  const sampleTenderSections = [
    "Company Overview",
    "Relevant Experience",
    "Methodology",
    "Risk Management",
    "Pricing Structure",
    "Team Qualifications"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError('');
    
    try {
      // Call the Groq API with a detailed prompt
      await fetchGroqResponse(
        "Generate a comprehensive tender document that includes all standard sections. The tender is for:",
        `${prompt}\n\nInclude these sections:\n${sampleTenderSections.join('\n')}\n\n` +
        `Format the response with clear headings for each section and professional business language.` +
        `Do not include any introductory text or disclaimers - just the tender content.`
      );
    } catch (err) {
      setError('Failed to generate tender content. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Update generatedTender when the Groq response changes
  useEffect(() => {
    if (response) {
      setGeneratedTender(response);
    }
  }, [response]);

  // Handle Groq errors
  useEffect(() => {
    if (groqError) {
      setError(groqError);
    }
  }, [groqError]);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // ... rest of your existing code (variants, etc.) ...

  return (
    <motion.div 
      className="min-h-screen mt-24 py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: website.colors.secondary }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        {/* ... existing header and instructions ... */}

        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <label htmlFor="prompt" className="block text-lg font-medium text-gray-700 mb-2">
            Describe your tender requirements:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Construction tender for school renovation project"
              className="flex-1 px-4 py-3 border text-orange-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              style={{ outline: 'none' }}
            />
            <motion.button
              onClick={handleGenerate}
              disabled={isGenerating || loading}
              className="px-6 py-3 rounded-lg font-medium text-black flex items-center"
              style={{ backgroundColor: website.colors.primary }}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {(isGenerating || loading) ? (
                <>
                  <motion.svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    variants={loadingVariants}
                    initial="start"
                    animate="end"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </motion.svg>
                  Generating...
                </>
              ) : (
                'Generate Tender Content'
              )}
            </motion.button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </motion.div>

        {/* ... rest of your existing JSX ... */}
      </div>
    </motion.div>
  );
};

export default AITenderGenerator;