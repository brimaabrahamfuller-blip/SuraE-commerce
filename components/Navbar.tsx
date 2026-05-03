'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b-2 border-gold shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-serif font-bold text-gold">
              Sura
            </span>
            <span className="text-sm font-sans font-semibold text-luxuryBlack ml-2 tracking-widest">
              LUXURY COLLECTION
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-luxuryBlack font-semibold hover:text-gold transition-colors duration-300 tracking-wide"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-luxuryBlack font-semibold hover:text-gold transition-colors duration-300 tracking-wide"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-luxuryBlack font-semibold hover:text-gold transition-colors duration-300 tracking-wide"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-luxuryBlack font-semibold hover:text-gold transition-colors duration-300 tracking-wide"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col space-y-1.5"
          >
            <span className="w-6 h-0.5 bg-luxuryBlack block"></span>
            <span className="w-6 h-0.5 bg-luxuryBlack block"></span>
            <span className="w-6 h-0.5 bg-luxuryBlack block"></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gold">
            <Link
              href="/"
              className="block py-2 text-luxuryBlack font-semibold hover:text-gold transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block py-2 text-luxuryBlack font-semibold hover:text-gold transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="block py-2 text-luxuryBlack font-semibold hover:text-gold transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-luxuryBlack font-semibold hover:text-gold transition-colors"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
