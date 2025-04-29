"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const skills = [
    { name: 'UI/UX Design', level: 65 },
    { name: 'Web Development', level: 80 },
    { name: 'Graphic Design', level: 90 },
    { name: 'Video Editing', level: 82 },
    { name: 'Branding', level: 86 },
    { name: 'Photo Editing', level: 76 },
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.3
      }
    })
  };

  return (
    <section id="about" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -top-4 -left-4 w-2/3 h-2/3 border-2 border-indigo-500 opacity-30 z-0"></div>
            <div className="relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 p-2 max-w-sm mx-auto">
              <Image 
                src="/images/aboutmepic.jpg" 
                alt="Njoku Obinna - Professional Designer" 
                width={350} 
                height={380}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border-2 border-indigo-500 opacity-30 z-0"></div>
          </motion.div>

          <div>
            <motion.h2 
              variants={itemVariants} 
              className="text-xl text-indigo-400 font-medium mb-4"
            >
              ABOUT ME
            </motion.h2>
            
            <motion.h3 
              variants={itemVariants} 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Creative Designer & Developer with 3 Years Experience
            </motion.h3>
            
            <motion.p 
              variants={itemVariants} 
              className="text-gray-300 mb-6"
            >
              I&apos;m a passionate designer and developer dedicated to creating exceptional digital experiences. With expertise in web design, graphic design, and video editing, I bring a multidisciplinary approach to every project.
            </motion.p>
            
            <motion.p 
              variants={itemVariants} 
              className="text-gray-300 mb-8"
            >
              My goal is to blend creativity with functionality, delivering solutions that not only look stunning but also achieve your business objectives. I believe in clean, modern aesthetics paired with intuitive user experiences.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4">Technical Skills</h4>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-indigo-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        custom={skill.level}
                        variants={skillBarVariants}
                        initial="hidden"
                        animate="visible"
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 