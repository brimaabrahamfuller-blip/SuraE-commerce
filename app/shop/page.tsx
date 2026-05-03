'use client'

import { useState } from 'react'
import ProductCard from '@/components/ProductCard'

const allProducts = [
  {
    id: 1,
    name: 'Elegant Gold Clutch',
    price: '89.99',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
    category: 'Bags',
    stock: 'In Stock' as const,
    size: 'One Size',
  },
  {
    id: 2,
    name: 'Silk Evening Dress',
    price: '249.99',
    image: 'https://images.unsplash.com/photo-1595777707802-41d339d60280?w=500&h=500&fit=crop',
    category: 'Dresses',
    stock: 'In Stock' as const,
    size: 'XS-XL',
  },
  {
    id: 3,
    name: 'Premium Blouse',
    price: '129.99',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
    category: 'Blouses',
    stock: 'Low Stock' as const,
    size: 'XS-XL',
  },
  {
    id: 4,
    name: 'Luxury Perfume',
    price: '159.99',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    category: 'Perfume',
    stock: 'In Stock' as const,
    size: 'One Size',
  },
  {
    id: 5,
    name: 'Designer Jeans',
    price: '119.99',
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
    category: 'Jeans',
    stock: 'In Stock' as const,
    size: '24-36',
  },
  {
    id: 6,
    name: 'Luxury T-Shirt',
    price: '79.99',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'T-Shirts',
    stock: 'In Stock' as const,
    size: 'XS-XL',
  },
  {
    id: 7,
    name: 'Silk Shirt',
    price: '139.99',
    image: 'https://images.unsplash.com/photo-1596399579883-e5fe58d28567?w=500&h=500&fit=crop',
    category: 'Shirts',
    stock: 'In Stock' as const,
    size: 'XS-XL',
  },
  {
    id: 8,
    name: 'Luxury Handbag',
    price: '199.99',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
    category: 'Bags',
    stock: 'Out of Stock' as const,
    size: 'One Size',
  },
]

const categories = ['All', 'Bags', 'Dresses', 'Blouses', 'Shirts', 'Jeans', 'T-Shirts', 'Perfume']
const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'One Size']

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSize, setSelectedSize] = useState('All')

  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory
    const sizeMatch = selectedSize === 'All' || product.size.includes(selectedSize)
    return categoryMatch && sizeMatch
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
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
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
            ) : (
              <div className="text-center py-16">
                <p className="text-2xl font-serif text-gray-400 mb-4">
                  No products found
                </p>
                <p className="text-gray-600 mb-8">
                  Try adjusting your filters to find what you're looking for.
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
