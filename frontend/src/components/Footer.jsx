import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:px-0">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold text-white mb-3">Job Portal</h2>
          <p className="text-gray-400 mb-4">
            Your one-stop destination to find the best jobs that match your
            skills and ambitions. Start your career journey with us!
          </p>
          <div className="flex space-x-4">
            <a
              href="/"
              aria-label="Facebook"
              className="text-gray-400 hover:text-gray-200"
            >
              <Facebook size={24} />
            </a>
            <a
              href="/"
              aria-label="Twitter"
              className="text-gray-400 hover:text-gray-200"
            >
              <Twitter size={24} />
            </a>
            <a
              href="/"
              aria-label="Instagram"
              className="text-gray-400 hover:text-gray-200"
            >
              <Instagram size={24} />
            </a>
            <a
              href="/"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-gray-200"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:items-center">
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-gray-400 hover:text-gray-200">
                Home
              </a>
            </li>
            <li>
              <a href="/jobs" className="text-gray-400 hover:text-gray-200">
                Jobs
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-400 hover:text-gray-200">
                About Us
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-400 hover:text-gray-200">
                Contact
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-400 hover:text-gray-200">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-3">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-400 mb-4">
            Get the latest job updates and career tips directly in your inbox.
          </p>
          <form className="flex flex-col md:flex-row items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md text-gray-800 mb-3 md:mb-0 md:mr-3"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full md:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm px-4 lg:px-0">
          <p>&copy; 2024 Job Portal. All rights reserved.</p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-gray-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-200">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
