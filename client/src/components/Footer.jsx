import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 px-6 sm:px-12 lg:px-20 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h1 className="text-2xl font-bold text-white">Clothify</h1>
          <p className="mt-2 text-gray-400">
            Redefining fashion with elegance and comfort. Explore our exclusive collection for men, women, and kids.
          </p>
          <p className="mt-4 text-gray-400">© 2025 Clothify. All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-white">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
            <li><a href="/shop" className="hover:text-gray-300">Shop</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
            <li><a href="/faq" className="hover:text-gray-300">FAQ</a></li>
          </ul>
        </div>

        {/* Newsletter & Social Media */}
        <div>
          <h2 className="text-xl font-semibold text-white">Stay Connected</h2>
          <p className="mt-2 text-gray-400">
            Subscribe to our newsletter for the latest updates and offers.
          </p>
          <form className="mt-4 flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-md sm:rounded-l-md sm:rounded-r-none bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="mt-2 sm:mt-0 sm:ml-2 bg-yellow-500 text-white px-4 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-yellow-600"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-6 flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-pinterest fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
