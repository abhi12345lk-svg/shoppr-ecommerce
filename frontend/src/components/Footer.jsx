import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white pt-12 sm:pt-16 border-t border-gray-100 overflow-hidden pb-16 md:pb-6">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[2.5fr_1fr_1fr_1fr] gap-8 sm:gap-10 lg:gap-14 pb-10 sm:pb-12">
          {/* Brand Info */}
          <div className="max-w-xl">
            <Link to="/" className="inline-flex items-center gap-1 group select-none">
              <span className="font-display text-[26px] sm:text-[32px] font-black tracking-[-1.5px] leading-none text-black">
                SHOPPR
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-black inline-block"></span>
            </Link>

            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mt-3.5 max-w-md">
              A modern Indian fashion label curating oversized street silhouettes, breathable European linen shirts, chic tailored co-ords, and handcrafted footwear.
            </p>

            {/* Newsletter */}
            <div className="mt-6 sm:mt-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
                Get ₹500 OFF Your Next Drop
              </h4>
              <p className="text-xs text-gray-400 mb-3">Subscribe for early access to limited capsule releases & secret sales.</p>
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 h-11 sm:h-12 rounded-2xl border border-gray-200 bg-gray-50 px-4 outline-none text-xs sm:text-sm focus:border-black transition-colors"
                />
                <button className="h-11 sm:h-12 px-6 rounded-2xl bg-black text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-xs whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all shadow-xs"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all shadow-xs"
              >
                <FaXTwitter size={14} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all shadow-xs"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all shadow-xs"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h3 className="font-display text-sm font-black uppercase tracking-wider mb-4 sm:mb-6 text-black">
              Departments
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-500 font-medium">
              <li><Link to="/collection" className="hover:text-black transition-colors">All Collections</Link></li>
              <li><Link to="/collection/men" className="hover:text-black transition-colors">Men's Streetwear</Link></li>
              <li><Link to="/collection/women" className="hover:text-black transition-colors">Women's Co-ords &amp; Tops</Link></li>
              <li><Link to="/collection/footwear" className="hover:text-black transition-colors">Platform Footwear</Link></li>
              <li><Link to="/collection/winterwear" className="hover:text-black transition-colors">Heavyweight Hoodies</Link></li>
              <li><Link to="/wishlist" className="hover:text-black transition-colors">My Wishlist</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-display text-sm font-black uppercase tracking-wider mb-4 sm:mb-6 text-black">
              Customer Care
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-500 font-medium">
              <li><Link to="/my-orders" className="hover:text-black transition-colors">Track Your Order</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Doorstep Returns &amp; Exchange</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Shipping &amp; Delivery Policy</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">FAQs &amp; Help Desk</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display text-sm font-black uppercase tracking-wider mb-4 sm:mb-6 text-black">
              Flagship Atelier
            </h3>
            <div className="flex flex-col gap-3 text-xs sm:text-sm text-gray-500 font-medium">
              <div>
                <p className="font-bold text-black text-xs uppercase mb-0.5">Helpline</p>
                <p className="text-gray-600">+91 98765 43210 (10 AM - 7 PM)</p>
              </div>
              <div>
                <p className="font-bold text-black text-xs uppercase mb-0.5">Concierge Email</p>
                <p className="text-gray-600">support@shoppr.in</p>
              </div>
              <div>
                <p className="font-bold text-black text-xs uppercase mb-0.5">Logistics &amp; Hub</p>
                <p className="text-gray-600">DLF Cyber City, Gurugram, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} SHOPPR APPAREL LTD. All Rights Reserved. Crafted with care in India.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="cursor-pointer hover:text-black">Privacy Policy</span>
            <span className="cursor-pointer hover:text-black">Terms of Service</span>
            <span className="cursor-pointer hover:text-black">GST Compliant Invoice</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;