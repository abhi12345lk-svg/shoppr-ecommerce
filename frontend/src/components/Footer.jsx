import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    toast.success("Welcome to SHOPPR Society! Check your inbox for ₹500 OFF.");
    setEmail("");
  };

  return (
    <footer className="bg-white pt-12 sm:pt-16 border-t border-neutral-200/70 overflow-hidden pb-16 md:pb-6">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[2.4fr_1fr_1fr_1.2fr] gap-8 sm:gap-10 lg:gap-14 pb-10 sm:pb-12 border-b border-neutral-200/70">
          {/* Brand Info */}
          <div className="max-w-xl">
            <Link to="/" className="inline-flex items-center gap-1 group select-none">
              <span className="font-display text-[26px] sm:text-[32px] font-black tracking-[-0.04em] leading-none text-neutral-950">
                SHOPPR
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-950 inline-block group-hover:bg-amber-500 transition-colors" />
              <span className="ml-2 text-[9px] font-black tracking-[0.2em] uppercase text-neutral-400 border border-neutral-200 px-1.5 py-0.5 rounded">
                STUDIO
              </span>
            </Link>

            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mt-3.5 max-w-md">
              A modern Indian fashion label curating oversized street silhouettes, breathable European linen shirts, chic tailored co-ords, and handcrafted footwear.
            </p>

            {/* Newsletter */}
            <div className="mt-6 sm:mt-8">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-950 mb-1.5">
                Join The Society &amp; Get ₹500 OFF
              </h4>
              <p className="text-xs text-neutral-400 mb-3.5">
                Get VIP early access to limited capsule releases, private sales, and fashion edits.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 h-11 sm:h-12 rounded-xl border border-neutral-200 bg-neutral-50/70 px-4 outline-none text-xs sm:text-sm focus:border-neutral-900 focus:bg-white transition-all shadow-2xs"
                />
                <button
                  type="submit"
                  className="sheen-wrapper h-11 sm:h-12 px-6 rounded-xl bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 active:scale-95 transition-all shadow-xs whitespace-nowrap"
                >
                  {subscribed ? "Subscribed ✓" : "Subscribe"}
                </button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-700 hover:bg-neutral-950 hover:text-white transition-all shadow-2xs hover:scale-105"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-700 hover:bg-neutral-950 hover:text-white transition-all shadow-2xs hover:scale-105"
              >
                <FaXTwitter size={14} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-700 hover:bg-neutral-950 hover:text-white transition-all shadow-2xs hover:scale-105"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-700 hover:bg-neutral-950 hover:text-white transition-all shadow-2xs hover:scale-105"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h3 className="font-display text-xs sm:text-sm font-black uppercase tracking-wider mb-4 sm:mb-5 text-neutral-950">
              Departments
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-neutral-500 font-medium">
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
            <h3 className="font-display text-xs sm:text-sm font-black uppercase tracking-wider mb-4 sm:mb-5 text-neutral-950">
              Customer Care
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-neutral-500 font-medium">
              <li><Link to="/my-orders" className="hover:text-black transition-colors">Track Your Order</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Doorstep Returns &amp; Exchange</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Shipping &amp; Delivery Policy</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">FAQs &amp; Help Desk</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display text-xs sm:text-sm font-black uppercase tracking-wider mb-4 sm:mb-5 text-neutral-950">
              Flagship Atelier
            </h3>
            <div className="flex flex-col gap-3 text-xs sm:text-sm text-neutral-500 font-medium">
              <div>
                <p className="font-black text-neutral-900 text-xs uppercase mb-0.5">Helpline</p>
                <p className="text-neutral-600">+91 98765 43210 (10 AM - 7 PM IST)</p>
              </div>
              <div>
                <p className="font-black text-neutral-900 text-xs uppercase mb-0.5">Concierge Email</p>
                <p className="text-neutral-600">concierge@shoppr.in</p>
              </div>
              <div>
                <p className="font-black text-neutral-900 text-xs uppercase mb-0.5">Atelier &amp; Logistics Hub</p>
                <p className="text-neutral-600">DLF Cyber City, Gurugram, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Payment Icons */}
        <div className="pt-6 pb-2 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-400 text-xs">
          <p>© {new Date().getFullYear()} SHOPPR APPAREL LTD. All Rights Reserved. Crafted with care in India.</p>
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            <span className="px-2 py-0.5 bg-neutral-100 rounded border border-neutral-200">UPI</span>
            <span className="px-2 py-0.5 bg-neutral-100 rounded border border-neutral-200">VISA</span>
            <span className="px-2 py-0.5 bg-neutral-100 rounded border border-neutral-200">MASTERCARD</span>
            <span className="px-2 py-0.5 bg-neutral-100 rounded border border-neutral-200">RUPAY</span>
            <span className="px-2 py-0.5 bg-neutral-100 rounded border border-neutral-200">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;