"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState('all');
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [itemInView, setItemInView] = useState<boolean[]>(Array(6).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setItemInView((prev) => {
              const newState = [...prev];
              newState[index] = entry.isIntersecting;
              return newState;
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Check if device is mobile on component mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const portfolioItems = [
    {
      id: 1,
      title: 'Modern Website Design',
      category: 'web',
      image: '/images/projects/3.jpg',
      tags: ['Web Design', 'UI/UX', 'Development'],
    },
    {
      id: 2,
      title: 'UI/UX Design Project',
      category: 'web',
      image: '/images/projects/2.jpg',
      tags: ['UI/UX', 'Wireframing', 'Prototyping'],
    },
    {
      id: 3,
      title: 'April Graphic Design',
      category: 'graphic',
      image: '/images/april-graphic.png',
      tags: ['Graphic Design', 'Branding', 'Print'],
    },
    {
      id: 4,
      title: 'Custom Web Development',
      category: 'web',
      image: '/images/projects/5.jpg',
      tags: ['Web Development', 'Frontend', 'Backend'],
    },
    {
      id: 5,
      title: 'Brand Identity Design',
      category: 'graphic',
      image: '/images/projects/1.jpg',
      tags: ['Branding', 'Logo Design', 'Identity'],
    },
    {
      id: 6,
      title: 'Portfolio Video Showreel',
      category: 'video',
      image: '/images/projects/4.jpg',
      tags: ['Video Editing', 'Motion Graphics', 'Animation'],
    },
  ];

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="work" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-xl text-indigo-400 font-medium mb-4"
          >
            MY PORTFOLIO
          </motion.h2>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Featured Works
          </motion.h3>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center space-x-4 mb-12"
          >
            {['all', 'web', 'graphic', 'video'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                  filter === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                className="group relative overflow-hidden rounded-lg bg-gray-900"
                onMouseEnter={() => {
                  setActiveItem(item.id);
                  // Reset other items' hover state
                  setItemInView(prev => prev.map((_, i) => i === index));
                }}
                onMouseLeave={() => {
                  setActiveItem(null);
                  // Reset all items' hover state
                  setItemInView(prev => prev.map(() => false));
                }}
                onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                ref={(el: HTMLDivElement | null) => {
                  itemRefs.current[index] = el;
                }}
              >
                <div className="relative overflow-hidden" style={{ height: "320px" }}>
                  <div className="absolute inset-0 bg-black/30 z-10"></div>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={500}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 relative z-0"
                  />
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent 
                      transition-opacity duration-300 flex flex-col justify-end p-6 z-20
                      ${(isMobile && itemInView[index]) || activeItem === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  >
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-indigo-600/70 text-white px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
            Start a Project
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio; 