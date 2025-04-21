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
    text: "#000000"
  }
};

const TenderEnhancer = () => {
  const [originalContent, setOriginalContent] = useState('');
  const [enhancedContent, setEnhancedContent] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');
  const [enhancementType, setEnhancementType] = useState('clarity');

  // Initialize the Groq hook
  const { fetchGroqResponse, response, loading, error: groqError } = useGroq();

  const enhancementOptions = [
    { id: 'clarity', name: 'Improve Clarity', description: 'Make your tender content clearer and more concise' },
    { id: 'persuasive', name: 'Increase Persuasiveness', description: 'Make your tender proposals more compelling' },
    { id: 'compliance', name: 'Ensure Compliance', description: 'Check against tender requirements and guidelines' },
    { id: 'structure', name: 'Improve Structure', description: 'Better organization and flow in your tenders' },
    { id: 'professional', name: 'Professional Tone', description: 'Elevate your tenders to formal business language' },
  ];

  const handleEnhance = async () => {
    if (!originalContent.trim()) {
      setError('Please enter some tender content to enhance');
      return;
    }

    setIsEnhancing(true);
    setError('');

    try {
      // Get the enhancement description from the selected option
      const enhancementDesc = enhancementOptions.find(opt => opt.id === enhancementType)?.description || '';
      
      // Call the Groq API with a detailed prompt
      await fetchGroqResponse(
        `Enhance this tender document to ${enhancementDesc}. Focus specifically on ${enhancementType}.`,
        `Original tender content:\n${originalContent}\n\n` +
        `Please return only the enhanced content without any additional commentary or labels. ` +
        `Maintain all key information while improving the ${enhancementType}. ` +
        `Use professional business language appropriate for tender documents.`
      );
    } catch (err) {
      setError('Failed to enhance tender content. Please try again.');
      console.error(err);
    } finally {
      setIsEnhancing(false);
    }
  };

  // Update enhancedContent when the Groq response changes
  useEffect(() => {
    if (response) {
      setEnhancedContent(response);
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
    <motion.div 
      className="min-h-screen mt-12 text-black py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: website.colors.secondary }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4" style={{ color: website.colors.primary }}>
            {website.name} AI Tender Enhancer
          </h1>
          <p className="text-xl text-gray-600">Transform good tenders into winning submissions</p>
        </motion.div>

        {/* ... rest of your JSX remains the same until the enhance button ... */}

        <motion.div className="mb-8" variants={itemVariants}>
          <label htmlFor="originalContent" className="block text-lg font-medium text-gray-700 mb-2">
            Paste your existing tender content:
          </label>
          <textarea
            id="originalContent"
            value={originalContent}
            onChange={(e) => setOriginalContent(e.target.value)}
            placeholder="Paste your tender content here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-32"
            style={{ outline: 'none' }}
            rows={8}
          />
          <div className="mt-4 flex justify-end">
            <motion.button
              onClick={handleEnhance}
              disabled={isEnhancing || loading}
              className="px-6 py-3 rounded-lg font-medium text-white flex items-center"
              style={{ backgroundColor: website.colors.primary }}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {(isEnhancing || loading) ? (
                <>
                  <motion.svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </motion.svg>
                  Enhancing...
                </>
              ) : (
                'Enhance Tender'
              )}
            </motion.button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </motion.div>

        {/* ... rest of your JSX remains the same ... */}
      </div>
    </motion.div>
  );
};

export default TenderEnhancer;