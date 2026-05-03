import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-luxuryBlack/90 backdrop-blur-md border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="font-serif text-2xl text-gold tracking-[0.3em] hover:opacity-80 transition-opacity">
          SURA
        </Link>

        {/* Main Navigation */}
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.25em] text-white/90">
          <Link href="/shop" className="hover:text-gold transition-colors">The Shop</Link>
          <Link href="/shop?category=Dresses" className="hover:text-gold transition-colors">Dresses</Link>
          <Link href="/shop?category=Bags" className="hover:text-gold transition-colors">Bags</Link>
          <Link href="/shop?category=Perfume" className="hover:text-gold transition-colors">Fragrance</Link>
        </div>

        {/* Utility Icons */}
        <div className="flex items-center gap-6 text-white">
          <button aria-label="Search" className="hover:text-gold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
          <button aria-label="Cart" className="hover:text-gold transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="absolute -top-1 -right-2 bg-gold text-luxuryBlack text-[8px] font-bold px-1 rounded-full">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
};