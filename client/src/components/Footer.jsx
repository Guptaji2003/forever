import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer class="bg-gray-900 text-gray-200 px-20 mt-20  py-10">
  <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* <!-- Brand Info --> */}
    <div>
      <h1 class="text-2xl font-bold text-white">Clothify</h1>
      <p class="mt-2 text-gray-400">
        Redefining fashion with elegance and comfort. Explore our exclusive collection for men, women, and kids.
      </p>
      <p class="mt-4 text-gray-400">© 2025 Clothify. All rights reserved.</p>
    </div>

    {/* <!-- Quick Links --> */}
    <div>
      <h2 class="text-xl font-semibold text-white">Quick Links</h2>
      <ul class="mt-4 space-y-2">
        <li><a href="/about" class="hover:text-gray-300">About Us</a></li>
        <li><a href="/shop" class="hover:text-gray-300">Shop</a></li>
        <li><a href="/contact" class="hover:text-gray-300">Contact</a></li>
        <li><a href="/faq" class="hover:text-gray-300">FAQ</a></li>
      </ul>
    </div>

    {/* <!-- Newsletter & Social Media --> */}
    <div>
      <h2 class="text-xl font-semibold text-white">Stay Connected</h2>
      <p class="mt-2 text-gray-400">
        Subscribe to our newsletter for the latest updates and offers.
      </p>
      <form class="mt-4 flex">
        <input
          type="email"
          placeholder="Enter your email"
          class="w-full p-2 rounded-l-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          type="submit"
          class="bg-yellow-500 text-white px-4 py-2 rounded-r-md hover:bg-yellow-600"
        >
          Subscribe
        </button>
      </form>
      <div class="mt-6 flex space-x-4">
        <a href="#" class="hover:text-gray-300">
          <i class="fab fa-facebook fa-lg"></i>
        </a>
        <a href="#" class="hover:text-gray-300">
          <i class="fab fa-twitter fa-lg"></i>
        </a>
        <a href="#" class="hover:text-gray-300">
          <i class="fab fa-instagram fa-lg"></i>
        </a>
        <a href="#" class="hover:text-gray-300">
          <i class="fab fa-pinterest fa-lg"></i>
        </a>
      </div>
    </div>
  </div>
</footer>

    </div>
  )
}

export default Footer
