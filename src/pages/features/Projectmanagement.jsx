import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // adjust the import path as needed

const website = {
  name: "CemedBidAi",
  slogan: "Gen AI Tender & Proposal writing & bid management",
  colors: {
    primary: "#F19154",
    secondary: "#FFFFFF",
    text: "#000000"
  }
};

const projectStages = [
  { id: 'planning', label: 'Planning', description: 'Initial research, strategy and scope' },
  { id: 'development', label: 'Development', description: 'Implementation and feature building' },
  { id: 'review', label: 'Review', description: 'Internal QA, corrections, and edits' },
  { id: 'submission', label: 'Submission', description: 'Final upload and delivery to client' },
  { id: 'archived', label: 'Archived', description: 'Stored for record keeping or future reuse' }
];

const ProjectManagement = () => {
  const [stage, setStage] = useState('planning');
  const [projects, setProjects] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [question, setQuestion] = useState('');

  const { fetchGroqResponse, response, loading, error } = useGroq();

  const handleAddProject = async () => {
    if (!question.trim()) return;

    await fetchGroqResponse(stage, question); // Call the Groq API with stage and question

    const newProject = {
      id: Date.now(),
      name: question,
      stage,
      description: response || `Response for ${stage} phase`, // include Groq response
    };

    setProjects([newProject, ...projects]);
    setQuestion('');
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
            {website.name} Project Management
          </h1>
          <p className="text-xl" style={{ color: website.colors.text }}>
            Submit your Project Management Questions and organize them by stage
          </p>
        </motion.div>

        <motion.div className="mb-6" variants={itemVariants}>
          <h2 className="text-lg font-medium mb-3" style={{ color: website.colors.text }}>Select Project Stage:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {projectStages.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setStage(item.id)}
                className={`p-4 border rounded-lg text-left transition-all ${stage === item.id ? 'border-orange-300 bg-orange-50' : 'border-gray-200 hover:border-orange-200'}`}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-medium" style={{ color: website.colors.text }}>{item.label}</h3>
                <p className="text-sm mt-1" style={{ color: website.colors.text }}>{item.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div className="mb-8" variants={itemVariants}>
          <label htmlFor="question" className="block text-lg font-medium mb-2" style={{ color: website.colors.text }}>
            Enter Your Project Management Question:
          </label>
          <input
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., How to track deliverables in review phase?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            style={{ outline: 'none', color: website.colors.text }}
          />
          <div className="mt-4 flex justify-end">
            <motion.button
              onClick={handleAddProject}
              disabled={!question || loading}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: website.colors.primary }}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {loading ? 'Submitting...' : 'Submit Question'}
            </motion.button>
          </div>
          {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        </motion.div>

        <AnimatePresence>
          {projects.length > 0 && (
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
                {projects.map(project => (
                  <div key={project.id} className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold" style={{ color: website.colors.text }}>{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.description}</p>
                      <span className="text-xs text-gray-500 italic">Stage: {project.stage}</span>
                    </div>
                    <CopyToClipboard text={project.name} onCopy={handleCopy}>
                      <motion.button
                        className="ml-4 px-4 py-2 text-sm rounded-md"
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

export default ProjectManagement;
