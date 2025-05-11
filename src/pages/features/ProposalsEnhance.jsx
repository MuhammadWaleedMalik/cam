import React, { useState, useEffect } from 'react';
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

const ProposalEnhancer = () => {
  const [originalContent, setOriginalContent] = useState('');
  const [enhancedContent, setEnhancedContent] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');
  const [enhancementType, setEnhancementType] = useState('clarity');

  const { fetchGroqResponse, response, loading, error: groqError } = useGroq();

  const enhancementOptions = [
    { id: 'clarity', name: 'Improve Clarity' },
    { id: 'persuasive', name: 'Increase Persuasiveness' },
    { id: 'compliance', name: 'Ensure Compliance' },
    { id: 'structure', name: 'Improve Structure' },
    { id: 'professional', name: 'Professional Tone' },
  ];

  const handleEnhance = async () => {
    if (!originalContent.trim()) {
      setError('Please enter some content to enhance.');
      return;
    }

    setIsEnhancing(true);
    setError('');

    const description = enhancementOptions.find(opt => opt.id === enhancementType)?.name || enhancementType;

    try {
      await fetchGroqResponse(
        `Enhance this proposal content to ${description}. Focus on ${enhancementType}. Return only the enhanced content.`,
        originalContent
      );
    } catch (err) {
      setError('Failed to enhance content. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  useEffect(() => {
    if (response) setEnhancedContent(response);
  }, [response]);

  useEffect(() => {
    if (groqError) setError(groqError);
  }, [groqError]);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div className="mt-52 min-h-screen bg-white py-10 px-4 sm:px-8 lg:px-16">
      <h1 className="text-3xl font-bold mb-2 text-black">{website.name}</h1>
      <p className="text-lg mb-6 text-gray-700">{website.slogan}</p>

      <div className="mb-6">
        <label htmlFor="originalContent" className="block text-black font-semibold mb-2">
          Enter Your Proposal Content
        </label>
        <textarea
          id="originalContent"
          value={originalContent}
          onChange={(e) => setOriginalContent(e.target.value)}
          rows={6}
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Paste your content here..."
        />
      </div>

      <div className="mb-6">
        <label className="block text-black font-semibold mb-2">Choose Enhancement Type</label>
        <div className="grid text-black  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {enhancementOptions.map(option => (
            <label key={option.id} className="flex items-center space-x-2">
              <input
                type="radio"
                name="enhancementType"
                value={option.id}
                checked={enhancementType === option.id}
                onChange={(e) => setEnhancementType(e.target.value)}
              />
              <span>{option.name}</span>
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <motion.button
        onClick={handleEnhance}
        disabled={isEnhancing || loading}
        className="mb-8 px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition disabled:opacity-60"
      >
        {(isEnhancing || loading) ? 'Enhancing...' : 'Enhance Content'}
      </motion.button>

      {enhancedContent && (
        <div className="mb-6">
          <label className="block text-black font-semibold mb-2">Enhanced Content</label>
          <div className="relative">
            <textarea
              readOnly
              value={enhancedContent}
              rows={8}
              className="w-full p-3 border rounded-md shadow-sm bg-gray-100 text-gray-800"
            />
            <CopyToClipboard text={enhancedContent} onCopy={handleCopy}>
              <button className="absolute top-2 right-2 text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded">
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </CopyToClipboard>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProposalEnhancer;
