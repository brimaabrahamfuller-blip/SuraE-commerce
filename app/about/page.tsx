import Link from 'next/link'

export default function AboutPage() {
  const whatsappNumber = '231555109860'

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Luxury Background */}
      <section 
        className="relative py-40 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/about-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55"></div>

        {/* Gold Shimmer Animation Layer */}
        <style>{`
          @keyframes goldShimmer {
            0% {
              background-position: -1000px 0;
              opacity: 0;
            }
            50% {
              opacity: 0.3;
            }
            100% {
              background-position: 1000px 0;
              opacity: 0;
            }
          }
          
          .shimmer-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(212, 160, 23, 0.4) 20%,
              rgba(229, 192, 91, 0.6) 50%,
              rgba(212, 160, 23, 0.4) 80%,
              transparent 100%
            );
            background-size: 1000px 100%;
            animation: goldShimmer 8s infinite;
            pointer-events: none;
          }
        `}</style>
        <div className="shimmer-overlay"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            About Sura
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gold italic drop-shadow-lg">
            Style that speaks for you.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Logo/Image */}
            <div className="flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <p className="text-6xl font-serif font-bold text-white mb-2">
                    Sura
                  </p>
                  <p className="text-white text-sm tracking-widest font-semibold">
                    LUXURY COLLECTION
                  </p>
                </div>
              </div>
            </div>

            {/* Story */}
            <div>
              <h2 className="text-4xl font-serif font-bold text-luxuryBlack mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Sura Luxury Collection was born from a passion for timeless elegance and authentic craftsmanship. Founded with the belief that fashion is more than just clothing—it's a form of self-expression—we curate every piece in our collection with meticulous attention to detail.
                </p>
                <p>
                  Our name, Sura, reflects our commitment to bringing sophistication and grace to every customer. We believe that true luxury lies not in excess, but in the perfect balance of quality, design, and purpose.
                </p>
                <p>
                  Each item in our collection tells a story of craftsmanship, elegance, and timeless beauty. From carefully selected fabrics to thoughtful design, we ensure that every piece meets our exacting standards of luxury.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center text-luxuryBlack mb-4">
            Our Values
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-serif font-bold text-gold mb-4">
                Quality
              </h3>
              <p className="text-gray-700">
                We are committed to sourcing the finest materials and ensuring every piece meets the highest standards of craftsmanship and durability.
              </p>
            </div>

            {/* Authenticity */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-serif font-bold text-gold mb-4">
                Authenticity
              </h3>
              <p className="text-gray-700">
                Every item is genuine and carefully selected. We believe in transparency and building lasting relationships with our customers based on trust.
              </p>
            </div>

            {/* Elegance */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">👑</div>
              <h3 className="text-2xl font-serif font-bold text-gold mb-4">
                Elegance
              </h3>
              <p className="text-gray-700">
                Luxury is about understated sophistication. Our collections embody timeless elegance that transcends trends and seasons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold text-luxuryBlack mb-6">
            Connect With Us
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Follow our social media channels to stay updated on new collections, exclusive offers, and style inspiration.
          </p>

          <div className="flex justify-center gap-8 mb-12">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61589046006141"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gold rounded-full flex items-center justify-center hover:bg-gold-dark transition-colors transform hover:scale-110"
            >
              <svg
                className="w-8 h-8 text-luxuryBlack"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@suraakareem"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gold rounded-full flex items-center justify-center hover:bg-gold-dark transition-colors transform hover:scale-110"
            >
              <svg
                className="w-8 h-8 text-luxuryBlack"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.498 3.094c1.356 0 2.463-1.107 2.463-2.463S20.854 0 19.498 0s-2.463 1.107-2.463 2.463 1.107 2.463 2.463 2.463zM15.316 12.823c.937-.937 1.523-2.23 1.523-3.649 0-2.847-2.31-5.157-5.157-5.157-2.847 0-5.157 2.31-5.157 5.157 0 1.419.586 2.712 1.523 3.649-.937.937-1.523 2.23-1.523 3.649 0 2.847 2.31 5.157 5.157 5.157 2.847 0 5.157-2.31 5.157-5.157 0-1.419-.586-2.712-1.523-3.649z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/beyeatukareem"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gold rounded-full flex items-center justify-center hover:bg-gold-dark transition-colors transform hover:scale-110"
            >
              <svg
                className="w-8 h-8 text-luxuryBlack"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm3.5 11.5c0 1.933-1.567 3.5-3.5 3.5s-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5zm2.5-7h-2v2h2v-2z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gold rounded-full flex items-center justify-center hover:bg-gold-dark transition-colors transform hover:scale-110"
            >
              <svg
                className="w-8 h-8 text-luxuryBlack"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.488c-1.547.934-2.505 2.362-2.505 3.915 0 2.424 2.064 4.529 4.882 4.529.846 0 1.666-.165 2.433-.48l.158-.06 1.996.524-.524-1.996.06-.158c.315-.767.48-1.587.48-2.433 0-2.818-2.105-4.882-4.882-4.882m5.421 7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
            </a>
          </div>

          <Link
            href="/contact"
            className="inline-block bg-gold text-luxuryBlack font-bold py-3 px-10 rounded-lg hover:bg-gold-dark transition-all duration-300 transform hover:scale-105 tracking-widest"
          >
            GET IN TOUCH
          </Link>
        </div>
      </section>
    </main>
  )
}
