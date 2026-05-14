'use client'

import Link from 'next/link'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsSearchOpen(false)
      setIsOpen(false)
    }
  }

  return (
    <nav className="bg-white border-b-2 border-gold shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
              <span className="text-luxuryBlack font-serif font-bold text-lg">S</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl lg:text-3xl font-serif font-bold text-gold">Sura</span>
              <span className="text-xs lg:text-sm font-sans font-semibold text-luxuryBlack ml-2 tracking-widest">
                LUXURY
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-full py-2 px-6 focus:ring-2 focus:ring-gold outline-none text-sm"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-luxuryBlack font-semibold hover:text-gold transition-colors duration-300 tracking-wide">
              Home
            </Link>
            <Link href="/shop" className="text-luxuryBlack font-semibold hover:text-gold transition-colors duration-300 tracking-wide">
              Shop
            </Link>
            <Link href="/about" className="text-luxuryBlack font-semibold hover:text-gold transition-colors duration-300 tracking-wide">
              About
            </Link>
            <Link href="/contact" className="text-luxuryBlack font-semibold hover:text-gold transition-colors duration-300 tracking-wide">
              Contact
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-luxuryBlack hover:text-gold transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col space-y-1.5"
            >
              <span className={`w-6 h-0.5 bg-luxuryBlack block transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-luxuryBlack block ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-luxuryBlack block transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-full py-2 px-6 focus:ring-2 focus:ring-gold outline-none"
                autoFocus
              />
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gold space-y-2 pt-2">
            <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 text-luxuryBlack font-semibold hover:text-gold transition-colors">
              Home
            </Link>
            <Link href="/shop" onClick={() => setIsOpen(false)} className="block py-2 text-luxuryBlack font-semibold hover:text-gold transition-colors">
              Shop
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block py-2 text-luxuryBlack font-semibold hover:text-gold transition-colors">
              About
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-2 text-luxuryBlack font-semibold hover:text-gold transition-colors">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
