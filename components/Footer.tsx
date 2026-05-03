'use client'

import Link from 'next/link'

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '231880123456'

  return (
    <footer className="bg-luxuryBlack text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-gold mb-4">
              Sura
            </h3>
            <p className="text-gray-300 italic mb-4">
              "Style that speaks for you."
            </p>
            <p className="text-sm text-gray-400">
              Curated luxury fashion for the discerning individual.
            </p>
          </div>

          {/* Delivery Coverage */}
          <div>
            <h4 className="text-lg font-semibold text-gold mb-4 tracking-wide">
              DELIVERY COVERAGE
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="text-gold mr-2">•</span>
                Montserrado
              </li>
              <li className="flex items-center">
                <span className="text-gold mr-2">•</span>
                Margibi
              </li>
              <li className="flex items-center">
                <span className="text-gold mr-2">•</span>
                Buchanan
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-gold mb-4 tracking-wide">
              CONNECT WITH US
            </h4>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.498 3.094c1.356 0 2.463-1.107 2.463-2.463S20.854 0 19.498 0s-2.463 1.107-2.463 2.463 1.107 2.463 2.463 2.463zM15.316 12.823c.937-.937 1.523-2.23 1.523-3.649 0-2.847-2.31-5.157-5.157-5.157-2.847 0-5.157 2.31-5.157 5.157 0 1.419.586 2.712 1.523 3.649-.937.937-1.523 2.23-1.523 3.649 0 2.847 2.31 5.157 5.157 5.157 2.847 0 5.157-2.31 5.157-5.157 0-1.419-.586-2.712-1.523-3.649z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm3.5 11.5c0 1.933-1.567 3.5-3.5 3.5s-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5zm2.5-7h-2v2h2v-2z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.488c-1.547.934-2.505 2.362-2.505 3.915 0 2.424 2.064 4.529 4.882 4.529.846 0 1.666-.165 2.433-.48l.158-.06 1.996.524-.524-1.996.06-.158c.315-.767.48-1.587.48-2.433 0-2.818-2.105-4.882-4.882-4.882m5.421 7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Sura Luxury Collection. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/about" className="text-gray-400 hover:text-gold transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-gold transition-colors">
              Contact
            </Link>
            <Link href="/shop" className="text-gray-400 hover:text-gold transition-colors">
              Shop
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
