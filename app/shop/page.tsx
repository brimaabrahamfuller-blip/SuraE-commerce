'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  category: { id: string; name: string }
}



const activeCategories = ['Bags', 'Dresses', 'Blouses', 'Tops', 'T-Shirts', 'Jeans', 'Shirts', 'Perfume']
const comingSoonCategories = ['Jewelry', 'Accessories', 'Shoes', 'Sunglasses', 'Watches', 'Swimwear', 'Lingerie']
const allCategories = ['All', ...activeCategories, ...comingSoonCategories]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch('/api/products')
        const productsData = await productsRes.json()
        setProducts(Array.isArray(productsData) ? productsData : [])
      } catch (error) {
        console.error('Error fetching data:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'All') return true
    return product.category?.name === selectedCategory
  })

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-luxuryBlack mb-4">Shop Our Collection</h1>
          <div className="w-24 h-1 bg-gold mb-4"></div>
          <p className="text-gray-600 text-lg">Discover our curated selection of luxury fashion pieces.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              {/* Category Filter */}
              <div className="mb-8 border-b border-gray-200 pb-8">
                <h3 className="text-lg font-serif font-bold text-luxuryBlack mb-4">Category</h3>
                <div className="space-y-3">
                  {allCategories.map((category) => {
                    const isComingSoon = comingSoonCategories.includes(category)
                    return (
                      <label key={category} className={`flex items-center group ${isComingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => !isComingSoon && setSelectedCategory(e.target.value)}
                          disabled={isComingSoon}
                          className={`w-4 h-4 text-gold ${isComingSoon ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        />
                        <span className={`ml-3 text-gray-700 flex items-center ${!isComingSoon ? 'group-hover:text-gold transition-colors' : ''}`}>
                          {category}
                          {isComingSoon && (
                            <span className="ml-2 text-[10px] bg-gold text-luxuryBlack px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">
                              Soon
                            </span>
                          )}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => setSelectedCategory('All')}
                className="w-full bg-gold text-luxuryBlack font-semibold py-2 px-4 rounded-lg hover:bg-gold-dark transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price.toString()}
                    image={product.images[0] || 'https://via.placeholder.com/500'}
                    category={product.category?.name || 'Uncategorized'}
                    stock="In Stock"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-2xl font-serif text-gray-400 mb-4">No products found</p>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="inline-block bg-gold text-luxuryBlack font-semibold py-2 px-8 rounded-lg hover:bg-gold-dark transition-colors"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
