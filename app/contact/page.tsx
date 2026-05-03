import Link from 'next/link'

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '231880123456'

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-luxuryBlack text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-serif font-bold mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gold">
            We're here to help and answer any questions you might have.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-luxuryBlack mb-8">
                Contact Information
              </h2>

              {/* WhatsApp */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-xl font-serif font-bold text-gold mb-3">
                  WhatsApp
                </h3>
                <p className="text-gray-700 mb-4">
                  Chat with us directly on WhatsApp for quick responses and personalized assistance.
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gold text-luxuryBlack font-bold py-3 px-8 rounded-lg hover:bg-gold-dark transition-all duration-300 transform hover:scale-105"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.488c-1.547.934-2.505 2.362-2.505 3.915 0 2.424 2.064 4.529 4.882 4.529.846 0 1.666-.165 2.433-.48l.158-.06 1.996.524-.524-1.996.06-.158c.315-.767.48-1.587.48-2.433 0-2.818-2.105-4.882-4.882-4.882m5.421 7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                  Message on WhatsApp
                </a>
              </div>

              {/* Social Media */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="text-xl font-serif font-bold text-gold mb-3">
                  Follow Us
                </h3>
                <p className="text-gray-700 mb-4">
                  Stay connected with us on social media for the latest collections and updates.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gold rounded-full flex items-center justify-center hover:bg-gold-dark transition-colors transform hover:scale-110"
                  >
                    <svg
                      className="w-6 h-6 text-luxuryBlack"
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
                    className="w-12 h-12 bg-gold rounded-full flex items-center justify-center hover:bg-gold-dark transition-colors transform hover:scale-110"
                  >
                    <svg
                      className="w-6 h-6 text-luxuryBlack"
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
                    className="w-12 h-12 bg-gold rounded-full flex items-center justify-center hover:bg-gold-dark transition-colors transform hover:scale-110"
                  >
                    <svg
                      className="w-6 h-6 text-luxuryBlack"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm3.5 11.5c0 1.933-1.567 3.5-3.5 3.5s-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5zm2.5-7h-2v2h2v-2z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Delivery Coverage */}
              <div>
                <h3 className="text-xl font-serif font-bold text-gold mb-3">
                  Delivery Coverage
                </h3>
                <p className="text-gray-700 mb-4">
                  We deliver to the following areas:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-gold mr-3 font-bold">✓</span>
                    Montserrado
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold mr-3 font-bold">✓</span>
                    Margibi
                  </li>
                  <li className="flex items-center">
                    <span className="text-gold mr-3 font-bold">✓</span>
                    Buchanan
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-3xl font-serif font-bold text-luxuryBlack mb-8">
                  Send us a Message
                </h2>

                <form className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold focus:ring-opacity-20"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold focus:ring-opacity-20"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold focus:ring-opacity-20"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                      Message
                    </label>
                    <textarea
                      placeholder="Your message..."
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold focus:ring-opacity-20 resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gold text-luxuryBlack font-bold py-3 px-6 rounded-lg hover:bg-gold-dark transition-all duration-300 transform hover:scale-105 tracking-widest"
                  >
                    SEND MESSAGE
                  </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-6">
                  For faster responses, please use WhatsApp to contact us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-luxuryBlack text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-serif font-bold mb-4">
            Ready to Shop?
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Explore our latest collections and find your perfect piece.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-gold text-luxuryBlack font-bold py-3 px-10 rounded-lg hover:bg-gold-dark transition-all duration-300 transform hover:scale-105 tracking-widest"
          >
            BROWSE COLLECTION
          </Link>
        </div>
      </section>
    </main>
  )
}
