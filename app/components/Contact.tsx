"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';

// Initialize EmailJS with your public key
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    // Check if all form fields are filled
    const { name, email, subject, message } = formData;
    setIsFormValid(name.trim() !== '' && email.trim() !== '' && subject.trim() !== '' && message.trim() !== '');
  }, [formData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    try {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Sending message...',
      });
      
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Message sent successfully! I will get back to you soon.',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Failed to send message. Please try again later.',
      });
    }
  };

  const subjectOptions = [
    { value: '', label: 'Select a Service' },
    { value: 'Web Design', label: 'Web Design' },
    { value: 'Graphic Design', label: 'Graphic Design' },
    { value: 'Video Editing', label: 'Video Editing' },
  ];
  
  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      details: 'realitycontents101@gmail.com',
      link: 'mailto:realitycontents101@gmail.com',
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      details: '+2349167416203',
      link: 'tel:+2349167416203',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      details: 'Lagos, Nigeria',
      link: '#',
    },
  ];
  
  const socialLinks = [
    { icon: <FaLinkedin size={20} />, url: 'https://www.linkedin.com/in/obinna-njoku' },
    { icon: <FaInstagram size={20} />, url: 'https://www.instagram.com/realitycontents?igsh=ZnRsN3B1NW4xcGN2' },
    { icon: <FaWhatsapp size={20} />, url: 'https://wa.me/2349167416203' },
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
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-xl text-indigo-400 font-medium mb-4"
          >
            GET IN TOUCH
          </motion.h2>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Let&apos;s Work Together
          </motion.h3>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-gray-300">
              Have a project in mind or want to discuss potential collaborations? 
              Feel free to reach out and I&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 bg-gray-900 rounded-xl p-8 border border-gray-800"
          >
            <h4 className="text-2xl font-bold text-white mb-6">Send a Message</h4>
            
            {formStatus.submitted && (
              <div className={`p-4 mb-6 rounded-lg ${formStatus.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {formStatus.message}
              </div>
            )}
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Your Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
                      placeholder="Enter your email address"
                    />
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-300 mb-2">Service Needed</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                >
                  {subjectOptions.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.value === ''}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`px-8 py-3 font-medium rounded-lg transition-colors duration-300 flex items-center gap-2 ${
                    isFormValid 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <h4 className="text-2xl font-bold text-white mb-6">Contact Info</h4>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-indigo-400 mr-4 mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <h5 className="text-white font-medium">{info.title}</h5>
                      <a 
                        href={info.link} 
                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                      >
                        {info.details}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <h4 className="text-2xl font-bold text-white mb-6">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 