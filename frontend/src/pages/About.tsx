import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-foreground mb-6">About Coffee Kiosk</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Coffee Kiosk is a modern web application that combines the love for coffee with the convenience of M-PESA payments. 
            Built with React, Node.js, and Safaricom's M-PESA API, it offers a seamless experience for coffee enthusiasts.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Developer</h2>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">IZ</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Isaac Zachary</h3>
              <p className="text-muted-foreground">Full Stack Developer</p>
            </div>
          </div>

          <p className="text-muted-foreground">
            A passionate developer with expertise in web development, mobile payments, and user experience design. 
            Specializing in creating modern, responsive, and user-friendly applications.
          </p>

          <div className="flex space-x-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a
                href="https://github.com/IsaacZachary"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a
                href="https://linkedin.com/in/isaaczachary"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a
                href="https://izach.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Globe className="w-4 h-4 mr-2" />
                Portfolio
              </a>
            </Button>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-semibold text-foreground">Frontend</h3>
              <ul className="text-muted-foreground text-sm mt-2">
                <li>React 18+</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Shadcn UI</li>
                <li>Framer Motion</li>
              </ul>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-semibold text-foreground">Backend</h3>
              <ul className="text-muted-foreground text-sm mt-2">
                <li>Node.js</li>
                <li>Express.js</li>
                <li>M-PESA API</li>
                <li>Supabase</li>
              </ul>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-semibold text-foreground">Features</h3>
              <ul className="text-muted-foreground text-sm mt-2">
                <li>Dark/Light Theme</li>
                <li>Responsive Design</li>
                <li>M-PESA Integration</li>
                <li>Real-time Updates</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 