import React, { useState } from 'react';
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

const ProposalEnhancer = () => {
  const [originalContent, setOriginalContent] = useState('');
  const [enhancedContent, setEnhancedContent] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');
  const [enhancementType, setEnhancementType] = useState('clarity');
  
  // Initialize the Groq hook
  const { fetchGroqResponse, response, loading, error: groqError } = useGroq();

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

    setIsEnhancing(true);
    setError('');
    
    try {
      // Get the enhancement description from the selected option
      const enhancementDesc = enhancementOptions.find(opt => opt.id === enhancementType)?.description || '';
      
      // Call the Groq API
      await fetchGroqResponse(
        `Enhance this proposal content to ${enhancementDesc}. Focus specifically on ${enhancementType}. Return only the enhanced content without additional commentary or labels.`,
        originalContent
      );
      
      // The response will be set in the hook's state and available in the `response` variable
    } catch (err) {
      setError('Failed to enhance content. Please try again.');
      console.error(err);
    } finally {
      setIsEnhancing(false);
    }
  };

  // Update enhancedContent when the Groq response changes
  React.useEffect(() => {
    if (response) {
      setEnhancedContent(response);
    }
  }, [response]);

  // Handle Groq errors
  React.useEffect(() => {
    if (groqError) {
      setError(groqError);
    }
  }, [groqError]);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // ... rest of your component code remains the same ...
  // (containerVariants, itemVariants, buttonVariants, optionVariants, etc.)

  return (
    <motion.div 
      className="min-h-screen py-12 text-black mt-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: website.colors.secondary }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* ... rest of your JSX remains the same ... */}
      
      {/* Update the loading state to use the hook's loading state */}
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
          'Enhance Content'
        )}
      </motion.button>

      {/* ... rest of your JSX remains the same ... */}
    </motion.div>
  );
};

export default ProposalEnhancer;