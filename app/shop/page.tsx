'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'

interface Product {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  images: string[]
  category: {
    id: string
    name: string
  }
}

const categories = ['All', 'Bags', 'Dresses', 'Blouses', 'Tops', 'T-Shirts', 'Jeans', 'Shirts', 'Perfume']
const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'One Size']

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSize, setSelectedSize] = useState('All')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === 'All' || product.category.name === selectedCategory
    return categoryMatch
  })

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-luxuryBlack mb-4">
            Shop Our Collection
          </h1>
          <div className="w-24 h-1 bg-gold mb-4"></div>
          <p className="text-gray-600 text-lg">
            Discover our curated selection of luxury fashion pieces.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              {/* Category Filter */}
              <div className="mb-8 border-b border-gray-200 pb-8">
                <h3 className="text-lg font-serif font-bold text-luxuryBlack mb-4">
                  Category
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-gold cursor-pointer"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-gold transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-serif font-bold text-luxuryBlack mb-4">
                  Size
                </h3>
                <div className="space-y-3">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        checked={selectedSize === size}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-4 h-4 text-gold cursor-pointer"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-gold transition-colors">
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('All')
                  setSelectedSize('All')
                }}
                className="w-full bg-gold text-luxuryBlack font-semibold py-2 px-4 rounded-lg hover:bg-gold-dark transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6 text-gray-600">
              {loading ? (
                'Loading...'
              ) : (
                <>
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </>
              )}
            </div>

            {loading ? (
              <div className="text-center py-16">
                <p className="text-gray-600">Loading collection...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price.toString()}
                    image={product.images[0] || 'https://via.placeholder.com/500'}
                    category={product.category.name}
                    stock="In Stock"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-2xl font-serif text-gray-400 mb-4">
                  New arrivals coming soon
                </p>
                <p className="text-gray-600 mb-8">
                  Check back soon for our latest luxury collection.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All')
                    setSelectedSize('All')
                  }}
                  className="inline-block bg-gold text-luxuryBlack font-semibold py-2 px-8 rounded-lg hover:bg-gold-dark transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
