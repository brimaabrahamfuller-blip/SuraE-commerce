import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

const featuredProducts = [
  {
    id: 1,
    name: 'Elegant Gold Clutch',
    price: '89.99',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
    category: 'Bags',
    stock: 'In Stock' as const,
  },
  {
    id: 2,
    name: 'Silk Evening Dress',
    price: '249.99',
    image: 'https://images.unsplash.com/photo-1595777707802-41d339d60280?w=500&h=500&fit=crop',
    category: 'Dresses',
    stock: 'In Stock' as const,
  },
  {
    id: 3,
    name: 'Premium Blouse',
    price: '129.99',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
    category: 'Blouses',
    stock: 'Low Stock' as const,
  },
  {
    id: 4,
    name: 'Luxury Perfume',
    price: '159.99',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    category: 'Perfume',
    stock: 'In Stock' as const,
  },
]

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
  return (
    <main className="min-h-screen bg-white">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                stock={product.stock}
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
