
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-500 text-sm">
          <p>Powered by Coffee Kiosk</p>
          <p className="mt-1 text-xs">© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
