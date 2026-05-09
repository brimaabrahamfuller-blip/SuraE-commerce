'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

interface Product {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  images: string[]
  stock?: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

const categories = [
  { name: 'Bags', icon: '👜' },
  { name: 'Dresses', icon: '👗' },
  { name: 'Blouses', icon: '👔' },
  { name: 'Shirts', icon: '👕' },
  { name: 'Jeans', icon: '👖' },
  { name: 'T-Shirts', icon: '🎽' },
  { name: 'Perfume', icon: '💐' },
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Check if splash was already shown in this session
    const splashShown = sessionStorage.getItem('splashShown')
    if (splashShown) {
      setShowSplash(false)
    }

    // Fetch products from database
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleSplashEnd = () => {
    setShowSplash(false)
    sessionStorage.setItem('splashShown', 'true')
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Welcome Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <style>{`
            @keyframes splashFadeIn {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            @keyframes logoGlow {
              0% {
                opacity: 0;
                transform: scale(0.8);
                filter: drop-shadow(0 0 0 rgba(212, 160, 23, 0));
              }
              50% {
                opacity: 1;
                transform: scale(1);
                filter: drop-shadow(0 0 30px rgba(212, 160, 23, 0.8));
              }
              100% {
                opacity: 1;
                transform: scale(1);
                filter: drop-shadow(0 0 20px rgba(212, 160, 23, 0.6));
              }
            }

            @keyframes textFadeIn {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            @keyframes splashFadeOut {
              0% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }

            .splash-bg {
              animation: splashFadeIn 0.5s ease-in;
              background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            }

            .splash-logo {
              animation: logoGlow 1s ease-out 0.5s both;
            }

            .splash-title {
              animation: textFadeIn 0.8s ease-out 1.5s both;
            }

            .splash-subtitle {
              animation: textFadeIn 0.8s ease-out 2s both;
            }

            .splash-exit {
              animation: splashFadeOut 0.8s ease-out 3s forwards;
            }
          `}</style>
          <div className="splash-bg splash-exit fixed inset-0 flex items-center justify-center flex-col gap-8">
            <div className="splash-logo text-center">
              <h1 className="text-7xl font-serif font-bold text-gold drop-shadow-lg">
                Sura
              </h1>
            </div>
            <h2 className="splash-title text-3xl font-serif text-white text-center px-4">
              Welcome to Sura Luxury Collection
            </h2>
            <p className="splash-subtitle text-xl text-gold italic text-center px-4">
              Style that speaks for you.
            </p>
          </div>
          <div
            className="fixed inset-0"
            onAnimationEnd={handleSplashEnd}
            style={{
              animation: 'splashFadeOut 0.8s ease-out 3s forwards',
            }}
          ></div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 luxury-gradient opacity-90"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
            Sura
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-white font-light italic mb-8 tracking-wide">
            Style that speaks for you.
          </p>
          <p className="text-lg text-gold mb-12 font-semibold tracking-widest">
            LUXURY COLLECTION
          </p>
          <Link
            href="/shop"
            className="inline-block bg-gold text-luxuryBlack font-bold py-4 px-12 rounded-lg hover:bg-gold-dark transition-all duration-300 transform hover:scale-105 text-lg tracking-widest shadow-2xl"
          >
            SHOP NOW
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-gold opacity-20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-gold opacity-20 rounded-full"></div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center text-luxuryBlack mb-4">
            Explore Collections
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-12"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/shop?category=${category.name}`}
                className="group"
              >
                <div className="bg-gray-100 rounded-lg p-6 text-center hover:bg-gold transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-transparent hover:border-gold">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <p className="font-semibold text-luxuryBlack group-hover:text-white transition-colors">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center text-luxuryBlack mb-4">
            Featured Collection
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-12"></div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading collection...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">
                New arrivals coming soon
              </p>
              <p className="text-gray-500">
                Check back soon for our latest luxury collection
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price.toString()}
                    image={product.images[0] || 'https://via.placeholder.com/500'}
                    category={product.categoryId}
                    stock="In Stock"
                  />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/shop"
                  className="inline-block border-2 border-gold text-gold font-bold py-3 px-12 rounded-lg hover:bg-gold hover:text-luxuryBlack transition-all duration-300 text-lg tracking-widest"
                >
                  VIEW ALL PRODUCTS
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-luxuryBlack text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-serif font-bold mb-4">
            Discover Your Style
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Every piece in our collection is carefully curated to bring elegance and sophistication to your wardrobe. Experience luxury like never before.
          </p>
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
