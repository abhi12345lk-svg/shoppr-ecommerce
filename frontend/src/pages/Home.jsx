import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiInstagram } from "react-icons/fi";
import Hero from "../components/Hero";
import BrandPromise from "../components/BrandPromise";
import Categories from "../components/Category";
import PopularProducts from "../components/PopularProduct";
import StyleSpotlight from "../components/StyleSpotlight";
import Item from "../components/Item";
import { ShopContext } from "../Context/ShopContext";

const Home = () => {
  const { products, navigate } = useContext(ShopContext);

  const newArrivals = products.slice(0, 8);

  const instagramShots = [
    {
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      handle: "@ananya.fits",
      tag: "Tailored Linen Suit"
    },
    {
      img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
      handle: "@kabir.style",
      tag: "Oversized Acid Wash Tee"
    },
    {
      img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
      handle: "@zoya.aesthetic",
      tag: "Sculpted Square Neck"
    },
    {
      img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
      handle: "@rohan_kicks",
      tag: "Retro Chunky Kicks"
    },
    {
      img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
      handle: "@tara_noir",
      tag: "450 GSM Fleece Hoodie"
    },
    {
      img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
      handle: "@dev_m",
      tag: "Camp Collar Linen"
    }
  ];

  return (
    <div className="w-full overflow-hidden bg-[#fafafa]">
      {/* 1. HERO BANNER */}
      <Hero />

      {/* 2. VALUE PROPOSITIONS */}
      <BrandPromise />

      {/* 3. SHOP BY DEPARTMENT / CATEGORY */}
      <Categories />

      {/* 4. TRENDING NOW PIECES */}
      <PopularProducts />

      {/* 5. SHOP BY STYLE CURATED LOOKBOOK */}
      <StyleSpotlight />

      {/* 6. NEW SEASON ARRIVALS GRID */}
      <section className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
          <div>
            <p className="text-[11px] uppercase tracking-[3px] font-bold text-gray-400 mb-1.5">
              Fresh Off The Rack
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-black tracking-tight">
              New <span className="text-gray-400 font-light">Arrivals</span>
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 max-w-lg">
              Explore our latest drop of tailored cuts, streetwear essentials, and contemporary silhouettes.
            </p>
          </div>

          <Link
            to="/collection"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider hover:text-neutral-600 transition-colors"
          >
            <span>View All New Drops</span>
            <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <Item key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. PROMOTIONAL STATEMENT BANNER */}
      <section className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-8">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white p-8 sm:p-14 lg:p-16 border border-neutral-800">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[3px] text-amber-400 mb-3 block">
              Limited Festive Offer
            </span>
            <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
              Flat ₹500 OFF On Your First Order
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base mt-4 leading-relaxed">
              Use code <strong className="text-white border-b border-amber-400 pb-0.5 font-black tracking-wider">WELCOME500</strong> at checkout on orders above ₹1,999. Includes free express delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/collection")}
                className="btn-dark !bg-white !text-black hover:!bg-neutral-200 uppercase text-xs tracking-wider"
              >
                Claim Offer &amp; Shop
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-30 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-l from-amber-500/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 8. INSTAGRAM LOOKBOOK FEED */}
      <section className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-12 sm:py-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-[2px] mb-2">
            <FiInstagram size={14} />
            <span>#WornByShoppr</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-black tracking-tight">
            As Seen On You
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Tag @shoppr.in on Instagram to be featured in our official fashion lookbook feed.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramShots.map((shot, idx) => (
            <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 cursor-pointer shadow-xs">
              <img
                src={shot.img}
                alt={shot.tag}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                <span className="text-[11px] font-bold truncate">{shot.handle}</span>
                <span className="text-[10px] text-gray-300 truncate">{shot.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;