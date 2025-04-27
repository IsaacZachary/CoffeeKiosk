import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Coffee className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Coffee Kiosk</h2>
            </Link>
            <p className="text-muted-foreground text-sm">
              Where code meets coffee. A perfect blend of technology and tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/transactions" className="text-muted-foreground hover:text-foreground transition-colors">
                  Transactions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Developer</h3>
            <p className="text-muted-foreground text-sm">
              Developed with ❤️ by Isaac Zachary
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/IsaacZachary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/isaaczachary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://izach.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-sm">Portfolio</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Coffee Kiosk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
