import React from 'react';
import { ShoppingCart, User } from 'lucide-react';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="header-container">
      {/* Left side: Logo & Company Name */}
      <div className="header-logo-group">
        <div className="flex items-center justify-center p-2 rounded-lg bg-gray-900 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 10h16" />
            <path d="M4 14h16" />
            <path d="M4 20h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
            <path d="M9 10v4" />
            <path d="M15 10v4" />
          </svg>
        </div>
        <span className="header-logo-text">Furniora</span>
      </div>

      {/* Right side: Icons */}
      <div className="header-icons">
        <button className="header-icon-button" aria-label="Cart">
          <ShoppingCart size={20} />
        </button>
        <button className="header-icon-button" aria-label="User Profile">
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
