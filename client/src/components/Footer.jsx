import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Footer = () => {
  axios.defaults.withCredentials = true;
  const apiurl = import.meta.env.VITE_BACKEND_URL;
  const [email, setemail] = useState("");

  const handleSubscribe = async (e) => {
    console.log('====================================');
    console.log(email);
    console.log('====================================');
    e.preventDefault();
    const res = await axios.post(`${apiurl}/api/subscribe/subscriber`,{email});
    toast.success("Subscribed")
    console.log('====================================');
    console.log(res.data);
    console.log('====================================');
  };
  return (
    <footer className="bg-gray-900 text-gray-200 px-6 sm:px-12 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Info */}
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Forever
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Unleashing confidence through timeless fashion. Discover collections
            curated for every moment.
          </p>
          <p className="mt-6 text-xs text-gray-500">
            © 2025 Forever. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="/about"
                className="hover:text-yellow-400 transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/shop"
                className="hover:text-yellow-400 transition-colors"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-yellow-400 transition-colors"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/faq"
                className="hover:text-yellow-400 transition-colors"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Stay Connected
          </h2>
          <p className="text-sm text-gray-400">
            Subscribe to our newsletter for fashion tips and exclusive deals.
          </p>

          {/* Newsletter Form */}
          <form
            onSubmit={handleSubscribe}
            className="mt-4 flex flex-col sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 rounded-md sm:rounded-l-md sm:rounded-r-none bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="mt-2 sm:mt-0 sm:ml-2 bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-yellow-600 transition"
            >
              Subscribe
            </button>
          </form>

          {/* Social Icons */}
          <div className="mt-6 flex space-x-4">
            {[
              { href: "#", label: "Facebook", icon: "fab fa-facebook-f" },
              { href: "#", label: "Twitter", icon: "fab fa-twitter" },
              { href: "#", label: "Instagram", icon: "fab fa-instagram" },
              { href: "#", label: "Pinterest", icon: "fab fa-pinterest-p" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                aria-label={social.label}
                className="hover:text-yellow-400 transition-colors text-lg"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
