import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
  

const Home = () => {
  // Website configuration

  const website = {
    name: "CemedBidAi",
    slogan: "Gen AI Tender& Proposal writing & bid management",
     colors: {
      primary: "#F19154",
      secondary: "#FFFFFF",
      text: "#000000"
    }
  };

  // Features data
  const features = [
    {
      title: "Automated PQQ Completion",
      description: "Our system automatically completes procurement questionnaires with 95% accuracy.",
      icon: "⚡"
    },
    {
      title: "Compliance Checking",
      description: "Ensure your responses meet all regulatory requirements automatically.",
      icon: "✅"
    },
    {
      title: "Document Management",
      description: "Centralized storage for all your procurement documents with version control.",
      icon: "📁"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "EasyPQQ has saved us hundreds of hours in procurement paperwork. The automated system is incredibly accurate.",
      author: "Sarah Johnson",
      role: "Procurement Director"
    },
    {
      quote: "We've reduced our PQQ completion time from 3 days to just 2 hours with EasyPQQ.",
      author: "Michael Chen",
      role: "Operations Manager"
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Custom hook for scroll animations
  const useScrollAnimation = () => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1
    });
    return { ref, inView };
  };























  // Hero Section
  // Hero Section
// Hero Section
const HeroSection = () => {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-8 py-16 md:py-0 bg-white">
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="md:w-1/2 space-y-6 md:pr-12"
      >
        <motion.h1 
          variants={fadeIn}
          className="text-5xl md:text-6xl font-bold leading-tight"
          style={{ color: website.colors.primary }}
        >
            Simplify Your Procurement Process
        </motion.h1>
        <motion.p 
          variants={fadeIn}
          className="text-xl md:text-2xl text-gray-700"
        >
          Automated PQQ completion that saves time and reduces errors
        </motion.p>
    
        <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            to="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg text-lg font-semibold text-white"
            style={{ backgroundColor: website.colors.primary }}
          >
            Get Started
          </Link>
          <Link
            to={"/blog"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg text-lg font-semibold border-2"
            style={{ borderColor: website.colors.primary, color: website.colors.primary }}
          >
            See How It Works
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:w-1/2 mt-12 md:mt-0"
      >
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4"
             style={{ borderColor: website.colors.primary }}>
          {/* Autoplay video */}
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="none"
          >
            <source src="/images/Smart_AI_Proposal_Creator.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>
    </section>
  );
};













  // Features Section
  const FeaturesSection = () => {
    const { ref, inView } = useScrollAnimation();

    return (
      <section className="py-20 px-8 bg-gray-50">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: website.colors.primary }}
          >
            How EasyPQQ Works
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Our automated solution handles the heavy lifting of procurement questionnaires
          </motion.p>

          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: website.colors.primary }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    );
  };










  // Testimonials Section
  const TestimonialsSection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const { ref, inView } = useScrollAnimation();

    return (
      <section className="py-20 px-8" style={{ backgroundColor: website.colors.primary }}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold mb-12 text-white"
          >
            What Our Customers Say
          </motion.h2>

          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <svg 
                  className="w-12 h-12 mb-8 opacity-30 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xl md:text-2xl text-white mb-8 italic">
                  {testimonials[currentTestimonial].quote}
                </p>
                <div>
                  <p className="text-lg font-semibold text-white">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-white opacity-80">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full ${currentTestimonial === index ? 'bg-white' : 'bg-white opacity-30'}`}
              />
            ))}
          </div>
        </motion.div>
      </section>
    );
  };












  // CTA Section
  const CTASection = () => {
    const { ref, inView } = useScrollAnimation();

    return (
      <section className="py-20 px-8 bg-white">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: website.colors.primary }}
          >
            Ready to Simplify Your Procurement Process?
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Join hundreds of businesses saving time on procurement questionnaires
          </motion.p>
          <motion.div variants={fadeIn}>
            <Link
              to={"/signup"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg text-lg font-semibold text-white"
              style={{ backgroundColor: website.colors.primary }}
            >
              Start Your Free Trial
            </Link>
          </motion.div>
        </motion.div>
      </section>
    );
  };


  
  


















  

  const GodModeServicesSection = () => {
    // Premium service data with extended details
   
    

    const services = [
      {
        id: 1,
        title: "AI-Generated Bids",
        icon: "📄",
        shortDesc: "Auto-create winning bids",
        fullDesc: "Instantly generate professional, tailored bid documents using advanced AI models trained on thousands of successful submissions.",
        color: "#F19154",
        delay: 0.1
      },
      {
        id: 2,
        title: "AI-Generated Tenders",
        icon: "📝",
        shortDesc: "Smart tender generation",
        fullDesc: "Produce customized tender responses that meet client requirements and evaluation criteria with AI-driven precision and speed.",
        color: "#6C63FF",
        delay: 0.2
      },
      {
        id: 3,
        title: "AI-Generated Proposals",
        icon: "📑",
        shortDesc: "Create powerful proposals",
        fullDesc: "Craft compelling proposals in minutes, auto-filled with relevant project details, achievements, and competitive selling points.",
        color: "#00BFA6",
        delay: 0.3
      },
    ];
    
    // Animation controls
    const controls = useAnimation()
    const [ref, inView] = useInView({
      threshold: 0.2,
      triggerOnce: false
    })
  
    // Complex animation sequences
    useEffect(() => {
      if (inView) {
        controls.start("visible")
      } else {
        controls.start("hidden")
      }
    }, [controls, inView])
  
    // Advanced animation variants
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.3
        }
      }
    }
  
    const circleVariants = {
      hidden: { 
        scale: 0.8,
        rotate: -15,
        opacity: 0 
      },
      visible: {
        scale: 1,
        rotate: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 15,
          mass: 1.5
        }
      },
      hover: {
        scale: 1.05,
        rotate: [0, 5, -5, 0],
        transition: {
          duration: 1,
          ease: "easeInOut"
        }
      }
    }
  
    const iconVariants = {
      hidden: { 
        x: -50,
        opacity: 0,
        scale: 0.7 
      },
      visible: (i) => ({
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
          delay: i * 0.2,
          type: "spring",
          stiffness: 120,
          damping: 12
        }
      }),
      hover: {
        scale: 1.15,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }
    }
  
    const textVariants = {
      hidden: { 
        opacity: 0,
        y: 20 
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "backOut"
        }
      }
    }
  
    const pulseVariants = {
      initial: { scale: 1 },
      pulse: {
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  
    const itemVariants = {
      hidden: { 
        y: 20,
        opacity: 0 
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: "backOut"
        }
      }
    }
  
    // Dynamic glow effect
    const GlowEffect = ({ color }) => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 rounded-full blur-md"
        style={{ backgroundColor: color }}
      />
    )
  
    return (
      <section className="relative py-28 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, 100 * (i % 2 === 0 ? 1 : -1)],
                y: [0, 50 * (i % 3 === 0 ? 1 : -1)],
                rotate: [0, 180]
              }}
              transition={{
                duration: 20 + i * 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              className="absolute opacity-5"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                backgroundColor: services[i % services.length].color,
                borderRadius: i % 2 === 0 ? '30%' : '50%',
                top: `${10 + i * 10}%`,
                left: `${5 + i * 10}%`
              }}
            />
          ))}
        </div>
  
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-7xl mx-auto relative z-10"
        >
          {/* Section header */}
          <motion.div 
            variants={textVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-600"
              whileInView={{
                backgroundPosition: ['0% 50%', '100% 50%'],
                transition: { duration: 8, repeat: Infinity, repeatType: "reverse" }
              }}
            >
                        {website.name}
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
              variants={textVariants}
            >
              Our comprehensive suite of services delivers end-to-end procurement excellence powered by AI and industry expertise.
            </motion.p>
          </motion.div>
  
          {/* Left side icons - desktop only */}
          <div className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-10">
            {services.map((service, i) => (
              <motion.div
                key={`left-${service.id}`}
                custom={i}
                variants={iconVariants}
                whileHover="hover"
                className="relative mb-12 flex items-center group"
              >
                <motion.div 
                  className="relative w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-xl z-10 cursor-pointer"
                  style={{ backgroundColor: service.color }}
                  variants={pulseVariants}
                  initial="initial"
                  whileInView="pulse"
                  viewport={{ once: true }}
                >
                  <GlowEffect color={service.color} />
                  <span className="relative z-10">{service.icon}</span>
                </motion.div>
                <AnimatePresence>
                  <motion.div 
                    className="absolute left-24 bg-white shadow-lg rounded-lg p-4 w-64"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: 0.3 }
                    }}
                    exit={{ opacity: 0 }}
                  >
                    <h4 className="font-bold text-lg mb-1" style={{ color: service.color }}>
                      {service.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{service.shortDesc}</p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
  
          {/* Center circle */}
          <motion.div 
            variants={circleVariants}
            whileHover="hover"
            className="mx-auto w-56 h-56 rounded-full flex flex-col items-center justify-center shadow-2xl relative mb-16 cursor-pointer"
            style={{ 
              backgroundColor: website.colors.primary,
              boxShadow: `0 20px 40px rgba(241, 145, 84, 0.3)`
            }}
          >
            <GlowEffect color={website.colors.primary} />
            <motion.h3 
              className="text-3xl font-bold text-white text-center mb-2 relative z-10"
              variants={textVariants}
            >
              Our Services
            </motion.h3>
            <motion.div 
              className="w-12 h-1 bg-white rounded-full relative z-10"
              variants={textVariants}
            />
            <motion.p 
              className="text-white opacity-90 text-center mt-4 px-6 relative z-10"
              variants={textVariants}
            >
              Hover to explore
            </motion.p>
          </motion.div>
  
          {/* Right side icons - desktop only */}
          <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-10">
            {services.map((service, i) => (
              <motion.div
                key={`right-${service.id}`}
                custom={i}
                variants={iconVariants}
                whileHover="hover"
                className="relative mb-12 flex items-center justify-end group"
              >
                <motion.div 
                  className="relative w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-xl z-10 cursor-pointer"
                  style={{ backgroundColor: service.color }}
                  variants={pulseVariants}
                  initial="initial"
                  whileInView="pulse"
                  viewport={{ once: true }}
                >
                  <GlowEffect color={service.color} />
                  <span className="relative z-10">{service.icon}</span>
                </motion.div>
                <AnimatePresence>
                  <motion.div 
                    className="absolute right-24 bg-white shadow-lg rounded-lg p-4 w-64 text-right"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: 0.3 }
                    }}
                    exit={{ opacity: 0 }}
                  >
                    <h4 className="font-bold text-lg mb-1" style={{ color: service.color }}>
                      {service.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{service.shortDesc}</p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
  
          {/* Mobile/tablet grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:hidden"
            variants={containerVariants}
          >
            {services.map((service) => (
              <motion.div
                key={`mobile-${service.id}`}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                <motion.div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto relative"
                  style={{ backgroundColor: service.color }}
                  variants={pulseVariants}
                  initial="initial"
                  whileInView="pulse"
                  viewport={{ once: true }}
                >
                  <GlowEffect color={service.color} />
                  <span className="relative z-10">{service.icon}</span>
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold text-center mb-3"
                  style={{ color: service.color }}
                >
                  {service.title}
                </motion.h3>
                <motion.p className="text-gray-600 text-center mb-4">
                  {service.shortDesc}
                </motion.p>
                <motion.p className="text-gray-500 text-sm text-center">
                  {service.fullDesc}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    )
  }













  const ModeSection = () => {
    // ... (keep all your existing service data and animation variants)
  
    // Add company logos for the slider
    const companyLogos = [
      { id: 1, name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
      { id: 2, name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
      { id: 3, name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
      { id: 4, name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
      { id: 5, name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
      { id: 6, name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
      { id: 7, name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/7/77/Netflix_2015_logo.svg" },
      { id: 8, name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo.svg" },
    ];
  
    // Duplicate the logos to create seamless looping
    const duplicatedLogos = [...companyLogos, ...companyLogos];
  
    return (
      <section className="relative py-28 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* ... (keep all your existing decorative elements and service sections) */}
  
        {/* Company Logo Slider Section - Add this before the closing </section> tag */}
        <div className="mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Trusted by industry leaders
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We partner with the world's most innovative companies to transform their procurement processes
            </p>
          </motion.div>
  
          <div className="relative overflow-hidden py-8">
            {/* Gradient fade effects on sides */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
            
            {/* Infinite scrolling logo slider */}
            <motion.div
              className="flex items-center"
              animate={{
                x: ["0%", "-100%"],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {duplicatedLogos.map((company, index) => (
                <motion.div
                  key={`${company.id}-${index}`}
                  className="flex-shrink-0 px-8"
                  whileHover={{ scale: 1.1 }}
                >
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    style={{ filter: "grayscale(100%)" }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
  
      </section>
    )
  }






  return (
    <div className="font-sans overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <GodModeServicesSection />
      <ModeSection />
    </div>
  );
};

export default Home;