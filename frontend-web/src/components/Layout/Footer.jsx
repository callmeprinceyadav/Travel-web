import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-yellow-50 text-gray-900 py-12 mt-16 shadow-inner">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start max-w-xs">
          <h2 className="text-4xl font-extrabold tracking-tight mb-2 text-yellow-600 select-none">
            TravelExplorer
          </h2>
          <p className="text-sm font-light text-gray-700">Explore the world with us.</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-8 text-gray-700 font-semibold text-lg">
          <Link
            to="/"
            className="hover:text-yellow-500 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-500 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-500 transition-colors duration-300"
          >
            Contact
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-6 text-yellow-600">
          {[{
            href: "https://facebook.com",
            icon: <FaFacebook size={26} />,
            label: "Facebook"
          },{
            href: "https://twitter.com",
            icon: <FaTwitter size={26} />,
            label: "Twitter"
          },{
            href: "https://instagram.com",
            icon: <FaInstagram size={26} />,
            label: "Instagram"
          },{
            href: "https://linkedin.com",
            icon: <FaLinkedin size={26} />,
            label: "LinkedIn"
          }].map(({href, icon, label}) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-yellow-400 transition-shadow duration-300 shadow-sm hover:shadow-lg rounded"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-center md:justify-start gap-8 text-gray-700 text-sm font-medium">
        <div className="flex items-center space-x-3">
          <FaPhoneAlt className="text-yellow-600" />
          <a href="tel:9507750615" className="hover:text-yellow-500 transition-colors">
            9507750615
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-yellow-600" />
          <a
            href="mailto:pkryadav9304@gmail.com"
            className="hover:text-yellow-500 transition-colors break-words"
          >
            pkryadav9304@gmail.com
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-yellow-200 pt-6 text-center text-gray-600 text-xs select-none">
        &copy; 2024 TravelExplorer. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
