export const Footer = () => {
  return (
    <footer className="bg-luxuryBlack text-white pt-20 pb-10 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <h2 className="font-serif text-2xl text-gold mb-4 uppercase tracking-widest">SURA LUXURY</h2>
          <p className="text-gray-400 max-w-sm">
            Elegance redefined. Based in Liberia, bringing you the finest fashion and luxury items.
          </p>
        </div>
        <div>
          <h4 className="text-gold uppercase tracking-widest text-sm mb-4">Delivery</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Standard delivery across Monrovia.<br />
            Regional shipping to Margibi, Grand Bassa, and Nimba available.
          </p>
        </div>
        <div>
          <h4 className="text-gold uppercase tracking-widest text-sm mb-4">Follow Us</h4>
          <div className="flex flex-col gap-3">
            <a 
              href="https://wa.me/231555109860" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-gold transition-colors"
            >
              WhatsApp: +231 55 510 9860
            </a>
            < href="https://instagram.com/suraluxury" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-gold transition-colors"
            >
              Instagram
            </a>
            <span className="text-sm text-gray-400 hover:text-gold cursor-pointer transition-colors">Facebook</span>
          </div>
        </div>
      </div>
      <div className="mt-16 text-center text-xs text-gray-500 border-t border-gray-800 pt-8">
        &copy; {new Date().getFullYear()} Sura Luxury Collection. All Rights Reserved.
      </div>
    </footer>
  );
};