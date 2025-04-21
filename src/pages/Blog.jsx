import { useState } from 'react';
import { motion } from 'framer-motion';

const Blogs = () => {
  const allPosts = [
    {
      id: 1,
      title: "AI in Proposal Writing: 2023 Trends",
      content: "Discover how artificial intelligence is transforming the art of business proposals, streamlining processes, and boosting win rates in competitive markets.",
      date: "2023-08-15",
      category: "AI Tools",
    },
    {
      id: 2,
      title: "Mastering Video Generation with AI",
      content: "Learn how modern AI tools can create high-quality, cinematic videos with minimal input, changing the face of video production in 2024.",
      date: "2023-09-10",
      category: "Video AI",
    },
    {
      id: 3,
      title: "Writing Smarter, Not Harder",
      content: "Explore AI-driven writing assistants that not only correct grammar but enhance tone, clarity, and emotional impact in professional writing.",
      date: "2023-07-20",
      category: "Writing Tools",
    }
  ];

  const colors = {
    primary: "#F19154",
    secondary: "#FFFFFF",
    text: "#000000",
    paragraph: "#A1A1AA",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen mt-24  bg-white py-12 px-6 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold mb-4" style={{ color: colors.text }}>AI Proposals Hub Blog</h1>
        <p className="text-2xl italic" style={{ color: colors.primary }}>Insights, Trends, and Tools for AI-Powered Content</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {allPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            className="rounded-2xl border border-gray-200 overflow-hidden transition-all duration-500"
          >
            <div className="p-8 bg-white">
              <h2 className="text-3xl font-bold mb-3" style={{ color: colors.text }}>{post.title}</h2>
              <p className="text-lg leading-relaxed mb-4" style={{ color: colors.paragraph }}>{post.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>{post.category}</span>
                <span className="text-sm" style={{ color: colors.paragraph }}>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Blogs;
