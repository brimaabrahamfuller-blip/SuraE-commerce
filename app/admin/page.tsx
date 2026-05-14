'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  images: string[]
  createdAt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [productsLoading, setProductsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    images: '',
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setPasswordError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
        setPassword('')
        fetchProducts()
        fetchCategories()
      } else {
        setPasswordError('Incorrect password')
      }
    } catch (error) {
      console.error('Login error:', error)
      setPasswordError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch products
  const fetchProducts = async () => {
    setProductsLoading(true)
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setProductsLoading(false)
    }
  }

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    }
  }

  // Save product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.price || !formData.categoryId) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        categoryId: formData.categoryId,
        images: formData.images ? [formData.images] : [],
      }

      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { id: editingId, ...payload } : payload

      const response = await fetch('/api/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setFormData({ name: '', description: '', price: '', categoryId: '', images: '' })
        setEditingId(null)
        fetchProducts()
      } else {
        alert('Failed to save product')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product')
    }
  }

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
      if (response.ok) {
        fetchProducts()
      } else {
        alert('Failed to delete product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    }
  }

  // Edit product
  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      categoryId: product.categoryId,
      images: product.images[0] || '',
    })
    setEditingId(product.id)
  }

  // Cancel edit
  const handleCancelEdit = () => {
    setFormData({ name: '', description: '', price: '', categoryId: '', images: '' })
    setEditingId(null)
  }

  // Login page
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-luxuryBlack flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-serif font-bold text-luxuryBlack mb-2 text-center">Sura Admin</h1>
          <p className="text-gray-600 text-center mb-8">Enter your password to access the dashboard</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-luxuryBlack mb-2">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordError('')
                }}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold focus:ring-opacity-20"
              />
              {passwordError && <p className="text-red-600 text-sm mt-2">{passwordError}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold text-luxuryBlack font-bold py-3 rounded-lg hover:bg-gold-dark transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <Link href="/" className="block text-center text-gray-600 hover:text-gold mt-6 text-sm">
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  // Admin dashboard
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-luxuryBlack">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage products and inventory</p>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false)
              setPassword('')
            }}
            className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add/Edit Product Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-serif font-bold text-luxuryBlack mb-6">
                {editingId ? 'Edit Product' : 'Add Product'}
              </h2>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-luxuryBlack mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Luxury Handbag"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-luxuryBlack mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Product details"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-luxuryBlack mb-2">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-luxuryBlack mb-2">Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-luxuryBlack mb-2">Image URL</label>
                  <input
                    type="text"
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-gold text-luxuryBlack font-semibold py-2 rounded-lg hover:bg-gold-dark transition-colors"
                  >
                    {editingId ? 'Update' : 'Add'} Product
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-300 text-luxuryBlack font-semibold py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Products List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-serif font-bold text-luxuryBlack mb-6">Products</h2>

              {productsLoading ? (
                <p className="text-gray-600">Loading products...</p>
              ) : products.length === 0 ? (
                <p className="text-gray-600">No products yet. Add one using the form on the left.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-luxuryBlack">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-luxuryBlack">Price</th>
                        <th className="text-left py-3 px-4 font-semibold text-luxuryBlack">Category</th>
                        <th className="text-left py-3 px-4 font-semibold text-luxuryBlack">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{product.name}</td>
                          <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                          <td className="py-3 px-4">{product.categoryId}</td>
                          <td className="py-3 px-4 space-x-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
