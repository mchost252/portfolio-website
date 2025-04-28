"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaPaintBrush, FaVideo, FaMobileAlt, FaCameraRetro, FaShoppingCart } from 'react-icons/fa';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <FaCode size={40} />,
      title: 'Web Design & Development',
      description: 'Custom, responsive websites that combine stunning design with seamless functionality across all devices.',
    },
    {
      icon: <FaPaintBrush size={40} />,
      title: 'Graphic Design',
      description: 'Creative visual solutions that communicate your brand message effectively through logos, branding, and marketing materials.',
    },
    {
      icon: <FaVideo size={40} />,
      title: 'Video Editing',
      description: 'Professional video editing services including color grading, motion graphics, and engaging storytelling.',
    },
    {
      icon: <FaMobileAlt size={40} />,
      title: 'Mobile-First Design',
      description: 'User-focused mobile interfaces that prioritize performance, usability and conversion optimization.',
    },
    {
      icon: <FaCameraRetro size={40} />,
      title: 'Photo Editing',
      description: 'Professional photo enhancement, retouching, and composite creation for commercial and personal projects.',
    },
    {
      icon: <FaShoppingCart size={40} />,
      title: 'E-commerce Solutions',
      description: 'Custom online stores with intuitive shopping experiences, secure payment gateways, and inventory management.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-xl text-indigo-400 font-medium mb-4"
          >
            MY SERVICES
          </motion.h2>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Creative Solutions for Your Digital Needs
          </motion.h3>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-gray-300">
              I offer comprehensive design and development services tailored to elevate your brand and digital presence. Each service is customized to meet your specific goals and vision.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-lg border border-gray-800 hover:border-indigo-500 transition-colors duration-300 group"
            >
              <div className="text-indigo-500 mb-6 group-hover:scale-110 transform transition-transform duration-300">
                {service.icon}
              </div>
              <h4 className="text-xl font-semibold text-white mb-4">
                {service.title}
              </h4>
              <p className="text-gray-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a 
            href="#contact" 
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors duration-300 inline-block"
          >
            Request a Service
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 