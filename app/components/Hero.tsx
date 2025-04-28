"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Hero = () => {
  const textRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const textElements = ['Web Design', 'Graphic Design', 'Video Editing'];
    let currentIndex = 0;
    
    if (textRef.current) {
      const textAnimation = () => {
        gsap.to(textRef.current, {
          duration: 0.5,
          opacity: 0,
          onComplete: () => {
            if (textRef.current) {
              currentIndex = (currentIndex + 1) % textElements.length;
              textRef.current.textContent = textElements[currentIndex];
              gsap.to(textRef.current, {
                duration: 0.5,
                opacity: 1
              });
            }
          }
        });
      };
      
      const interval = setInterval(textAnimation, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-indigo-950 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-indigo-500 filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-500 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-indigo-400 font-medium mb-4"
          >
            CREATIVE PORTFOLIO
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Turning Ideas into <br />
            Digital <span className="text-indigo-500">Excellence</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Professional <span ref={textRef} className="text-indigo-400">Web Design</span> Services
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="#work" 
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors duration-300"
            >
              View Portfolio
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium rounded-full transition-colors duration-300"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white/50 hover:text-white transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero; 