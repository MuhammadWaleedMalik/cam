import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // ✅ Import the hook

const website = {
  name: "CemedBidAi",
  slogan: "Gen AI Tender & Proposal writing & bid management",
  colors: {
    primary: "#F19154",
    secondary: "#FFFFFF",
    text: "#000000"
  }
};

const documentTypes = [
  { id: 'proposal', label: 'Proposal', description: 'General proposal-related documents' },
  { id: 'tender', label: 'Tender', description: 'Tender notices and forms' },
  { id: 'compliance', label: 'Compliance', description: 'Documents for legal or regulatory compliance' },
  { id: 'financial', label: 'Financial', description: 'Budget, costing, and financial statements' },
  { id: 'legal', label: 'Legal', description: 'Contracts, agreements, and legal files' }
];

const DocsManagement = () => {
  const [docType, setDocType] = useState('proposal');
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [fileName, setFileName] = useState('');

  const { fetchGroqResponse, response, loading, error } = useGroq(); // ✅ Use custom hook

  const handleUpload = async () => {
    if (!fileName.trim()) return;

    const newDoc = {
      id: Date.now(),
      name: fileName,
      type: docType,
      description: `Mock description for ${fileName}`,
    };
    setUploadedDocs([newDoc, ...uploadedDocs]);
    setFileName('');

    await fetchGroqResponse(docType, fileName); // ✅ Call Groq
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
      className="min-h-screen py-12 text-black mt-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: website.colors.secondary }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4" style={{ color: website.colors.primary }}>
            {website.name} Docs Management
          </h1>
          <p className="text-xl" style={{ color: website.colors.text }}>Upload, categorize, and manage your bid documents</p>
        </motion.div>

        <motion.div className="mb-6" variants={itemVariants}>
          <h2 className="text-lg font-medium mb-3" style={{ color: website.colors.text }}>Select Document Type:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {documentTypes.map((doc) => (
              <motion.button
                key={doc.id}
                onClick={() => setDocType(doc.id)}
                className={`p-4 border rounded-lg text-left transition-all ${docType === doc.id ? 'border-orange-300 bg-orange-50' : 'border-gray-200 hover:border-orange-200'}`}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-medium" style={{ color: website.colors.text }}>{doc.label}</h3>
                <p className="text-sm mt-1" style={{ color: website.colors.text }}>{doc.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div className="mb-8" variants={itemVariants}>
          <label htmlFor="fileName" className="block text-lg font-medium mb-2" style={{ color: website.colors.text }}>
            Enter Document Name:
          </label>
          <input
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="e.g., Compliance_Form_April2025.pdf"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            style={{ outline: 'none', color: website.colors.text }}
          />
          <div className="mt-4 flex justify-end">
            <motion.button
              onClick={handleUpload}
              disabled={!fileName}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: website.colors.primary }}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              Upload Document
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {uploadedDocs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4" style={{ color: website.colors.text }}>Uploaded Documents</h2>
              <div className="space-y-4">
                {uploadedDocs.map(doc => (
                  <div key={doc.id} className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold" style={{ color: website.colors.text }}>{doc.name}</h3>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                      <span className="text-xs text-gray-500 italic">Type: {doc.type}</span>
                    </div>
                    <CopyToClipboard text={doc.name} onCopy={handleCopy}>
                      <motion.button
                        className="ml-4 px-4 py-2 text-sm rounded-md"
                        style={{ backgroundColor: isCopied ? '#10B981' : website.colors.primary, color: 'white' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isCopied ? 'Copied!' : 'Copy Name'}
                      </motion.button>
                    </CopyToClipboard>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {(loading || response || error) && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-2" style={{ color: website.colors.text }}>AI Assistant Response:</h2>
            {loading && <p className="text-gray-500">Generating response...</p>}
            {response && <p className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap">{response}</p>}
            {error && <p className="text-red-600">{error}</p>}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DocsManagement;
