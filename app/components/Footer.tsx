import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#work' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-gray-950 text-white py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold text-white">
              Njoku<span className="text-indigo-500">Obinna</span>
            </Link>
            <p className="mt-2 text-gray-400 text-sm">
              Turning ideas into digital excellence
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Njoku Obinna. All rights reserved.
          </p>
          
          <div className="text-gray-400 text-sm">
            <span className="inline-block">Made with 💜 by </span>
            <span className="text-indigo-400">Njoku Obinna</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 