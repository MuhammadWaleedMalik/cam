import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // ✅ Adjust the path if needed

const website = {
  name: "CemedBidAi",
  slogan: "Gen AI Tender & Proposal writing & bid management",
  colors: {
    primary: "#F19154",
    secondary: "#FFFFFF",
    text: "#000000"
  }
};

const kbCategories = [
  { id: 'general', label: 'General', description: 'Common questions and answers' },
  { id: 'technical', label: 'Technical', description: 'Deep-dive into implementation' },
  { id: 'guidelines', label: 'Guidelines', description: 'Best practices and tips' },
  { id: 'compliance', label: 'Compliance', description: 'Policy, rules and regulations' },
  { id: 'documentation', label: 'Documentation', description: 'User guides and resources' }
];

const KnowledgeBase = () => {
  const [category, setCategory] = useState('general');
  const [questions, setQuestions] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [inputQuestion, setInputQuestion] = useState('');

  const { fetchGroqResponse, response, loading, error } = useGroq();

  const handleAddQuestion = async () => {
    if (!inputQuestion.trim()) return;

    const questionText = inputQuestion.trim();
    setInputQuestion('');

    // Immediately add a placeholder while loading
    const tempId = Date.now();
    const newQuestion = {
      id: tempId,
      text: questionText,
      category,
      description: `Fetching AI response...`,
      aiResponse: ''
    };
    setQuestions(prev => [newQuestion, ...prev]);

    // Fetch AI response using your hook
    await fetchGroqResponse('Answer this question in a short helpful way:', questionText);

    // Once response is ready, update the specific question
    setQuestions(prev =>
      prev.map(q =>
        q.id === tempId
          ? {
              ...q,
              description: `This question falls under ${category} category.`,
              aiResponse: response
            }
          : q
      )
    );
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
            {website.name} Knowledge Base
          </h1>
          <p className="text-xl" style={{ color: website.colors.text }}>
            Ask questions and get insights from our Knowledge Base
          </p>
        </motion.div>

        <motion.div className="mb-6" variants={itemVariants}>
          <h2 className="text-lg font-medium mb-3" style={{ color: website.colors.text }}>Choose Knowledge Category:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {kbCategories.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setCategory(item.id)}
                className={`p-4 border rounded-lg text-left transition-all ${category === item.id ? 'border-orange-300 bg-orange-50' : 'border-gray-200 hover:border-orange-200'}`}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-medium" style={{ color: website.colors.text }}>{item.label}</h3>
                <p className="text-sm mt-1" style={{ color: website.colors.text }}>{item.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div className="mb-8" variants={itemVariants}>
          <label htmlFor="kb-question" className="block text-lg font-medium mb-2" style={{ color: website.colors.text }}>
            Ask a Knowledge Base Question:
          </label>
          <input
            id="kb-question"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="e.g., What are the compliance requirements for bidding?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            style={{ outline: 'none', color: website.colors.text }}
          />
          <div className="mt-4 flex justify-end">
            <motion.button
              onClick={handleAddQuestion}
              disabled={!inputQuestion || loading}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: website.colors.primary, opacity: loading ? 0.7 : 1 }}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {loading ? 'Submitting...' : 'Submit Question'}
            </motion.button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </motion.div>

        <AnimatePresence>
          {questions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4" style={{ color: website.colors.text }}>
                Submitted Questions
              </h2>
              <div className="space-y-4">
                {questions.map(q => (
                  <div key={q.id} className="p-4 border rounded-lg bg-white shadow-sm">
                    <div>
                      <h3 className="font-semibold" style={{ color: website.colors.text }}>{q.text}</h3>
                      <p className="text-sm text-gray-600">{q.description}</p>
                      <span className="text-xs text-gray-500 italic">Category: {q.category}</span>
                      {q.aiResponse && (
                        <div className="mt-2 text-sm text-gray-800">
                          <strong>AI Response:</strong> {q.aiResponse}
                        </div>
                      )}
                    </div>
                    <CopyToClipboard text={q.text} onCopy={handleCopy}>
                      <motion.button
                        className="mt-2 px-4 py-2 text-sm rounded-md"
                        style={{ backgroundColor: isCopied ? '#10B981' : website.colors.primary, color: 'white' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isCopied ? 'Copied!' : 'Copy Question'}
                      </motion.button>
                    </CopyToClipboard>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default KnowledgeBase;
