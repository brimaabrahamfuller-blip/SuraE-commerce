'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Toaster, toast } from 'sonner'
import { supabase } from '@/lib/supabase'

interface Category {
  id: string
  name: string
  _count?: { products: number }
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  images: string[]
  stock: number
  category: {
    id: string
    name: string
  }
}

type AdminSection = 'overview' | 'add-product' | 'manage-products' | 'categories' | 'orders'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [activeSection, setActiveSection] = useState<AdminSection>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    stock: '1',
    image: null as File | null,
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const [newCategory, setNewCategory] = useState('')
  const [addingCategory, setAddingCategory] = useState(false)

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

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
        toast.success('Login successful!')
        fetchProducts()
        fetchCategories()
      } else {
        toast.error('Incorrect password')
      }
    } catch (error) {
      toast.error('Login failed. Please try again.')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    }
  }

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Failed to load categories')
    }
  }

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Upload image to Supabase
  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `product-images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return null
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  // Add or update product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.price || !formData.categoryId) {
      toast.error('Please fill in all required fields')
      return
    }

    setUploading(true)

    try {
      let imageUrl: string | null = null

      if (formData.image) {
        imageUrl = await uploadImageToSupabase(formData.image)
        if (!imageUrl) {
          toast.error('Failed to upload image')
          setUploading(false)
          return
        }
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        categoryId: formData.categoryId,
        images: imageUrl && typeof imageUrl === 'string' ? [imageUrl] : [],
        stock: parseInt(formData.stock) || 1,
      }

      let response
      if (editingId) {
        response = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        })
      } else {
        response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      if (response.ok) {
        toast.success(editingId ? 'Product updated!' : 'Product added!')
        setFormData({
          name: '',
          description: '',
          price: '',
          categoryId: '',
          stock: '1',
          image: null,
        })
        setImagePreview(null)
        setEditingId(null)
        fetchProducts()
      } else {
        toast.error('Failed to save product')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Error saving product')
    } finally {
      setUploading(false)
    }
  }

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Product deleted!')
        fetchProducts()
      } else {
        toast.error('Failed to delete product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Error deleting product')
    }
  }

  // Toggle stock
  const handleToggleStock = async (product: Product) => {
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          stock: product.stock > 0 ? 0 : 1,
        }),
      })

      if (response.ok) {
        toast.success('Stock updated!')
        fetchProducts()
      }
    } catch (error) {
      console.error('Error updating stock:', error)
      toast.error('Error updating stock')
    }
  }

  // Edit product
  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      categoryId: product.categoryId,
      stock: product.stock.toString(),
      image: null,
    })
    setImagePreview(product.images[0] || null)
    setEditingId(product.id)
    setActiveSection('add-product')
  }

  // Add category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newCategory.trim()) {
      toast.error('Please enter a category name')
      return
    }

    setAddingCategory(true)

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory }),
      })

      if (response.ok) {
        toast.success('Category added!')
        setNewCategory('')
        fetchCategories()
      } else {
        toast.error('Failed to add category')
      }
    } catch (error) {
      console.error('Error adding category:', error)
      toast.error('Error adding category')
    } finally {
      setAddingCategory(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-luxuryBlack flex items-center justify-center px-4">
        <Toaster position="top-center" />
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-serif font-bold text-luxuryBlack mb-2 text-center">
            Sura Admin
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter your password to access the dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold focus:ring-opacity-20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-luxuryBlack font-bold py-3 rounded-lg hover:bg-gold-dark transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <Link
            href="/"
            className="block text-center text-gray-600 hover:text-gold mt-6 text-sm"
          >
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 flex">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-luxuryBlack text-white transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gold">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h2 className="text-2xl font-serif font-bold text-gold">Sura</h2>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gold hover:text-gold-light transition-colors"
            >
              {sidebarOpen ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'add-product', label: 'Add Product', icon: '➕' },
            { id: 'manage-products', label: 'Products', icon: '📦' },
            { id: 'categories', label: 'Categories', icon: '🏷️' },
            { id: 'orders', label: 'Orders', icon: '📱' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as AdminSection)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-gold text-luxuryBlack font-semibold'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gold">
          <button
            onClick={() => {
              setIsAuthenticated(false)
              setPassword('')
              toast.success('Logged out')
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {sidebarOpen ? 'Logout' : '🚪'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div>
              <h1 className="text-4xl font-serif font-bold text-luxuryBlack mb-8">
                Dashboard Overview
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Products */}
                <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-gold">
                  <h3 className="text-gray-600 text-sm font-semibold mb-2">
                    Total Products
                  </h3>
                  <p className="text-4xl font-bold text-gold">{products.length}</p>
                </div>

                {/* Total Categories */}
                <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-gold">
                  <h3 className="text-gray-600 text-sm font-semibold mb-2">
                    Categories
                  </h3>
                  <p className="text-4xl font-bold text-gold">{categories.length}</p>
                </div>

                {/* In Stock */}
                <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-gold">
                  <h3 className="text-gray-600 text-sm font-semibold mb-2">
                    In Stock
                  </h3>
                  <p className="text-4xl font-bold text-gold">
                    {products.filter((p) => p.stock > 0).length}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-serif font-bold text-luxuryBlack mb-4">
                  Quick Actions
                </h2>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveSection('add-product')}
                    className="bg-gold text-luxuryBlack font-bold py-2 px-6 rounded-lg hover:bg-gold-dark transition-colors"
                  >
                    Add New Product
                  </button>
                  <button
                    onClick={() => setActiveSection('categories')}
                    className="bg-gold text-luxuryBlack font-bold py-2 px-6 rounded-lg hover:bg-gold-dark transition-colors"
                  >
                    Manage Categories
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Product Section */}
          {activeSection === 'add-product' && (
            <div>
              <h1 className="text-4xl font-serif font-bold text-luxuryBlack mb-8">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h1>

              <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
                <form onSubmit={handleSaveProduct} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                      Product Image
                    </label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                        />
                      </div>
                      {imagePreview && (
                        <div className="w-24 h-24 rounded-lg overflow-hidden">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Luxury Handbag"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Product details"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Price */}
                    <div>
                      <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="0.00"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                      />
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                        Stock
                      </label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({ ...formData, stock: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({ ...formData, categoryId: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-gold text-luxuryBlack font-bold py-3 rounded-lg hover:bg-gold-dark transition-colors disabled:opacity-50"
                    >
                      {uploading ? 'Uploading...' : editingId ? 'Update Product' : 'Add Product'}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null)
                          setFormData({
                            name: '',
                            description: '',
                            price: '',
                            categoryId: '',
                            stock: '1',
                            image: null,
                          })
                          setImagePreview(null)
                        }}
                        className="flex-1 bg-gray-300 text-luxuryBlack font-bold py-3 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Manage Products Section */}
          {activeSection === 'manage-products' && (
            <div>
              <h1 className="text-4xl font-serif font-bold text-luxuryBlack mb-8">
                Manage Products
              </h1>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {products.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-600 mb-4">No products yet</p>
                    <button
                      onClick={() => setActiveSection('add-product')}
                      className="bg-gold text-luxuryBlack font-bold py-2 px-6 rounded-lg hover:bg-gold-dark transition-colors"
                    >
                      Add First Product
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-luxuryBlack text-white">
                          <th className="px-6 py-4 text-left font-semibold">Name</th>
                          <th className="px-6 py-4 text-left font-semibold">Category</th>
                          <th className="px-6 py-4 text-left font-semibold">Price</th>
                          <th className="px-6 py-4 text-left font-semibold">Stock</th>
                          <th className="px-6 py-4 text-center font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr
                            key={product.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 text-sm text-luxuryBlack font-medium">
                              {product.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {product.category.name}
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-gold">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <button
                                onClick={() => handleToggleStock(product)}
                                className={`px-3 py-1 rounded-lg text-white font-semibold transition-colors ${
                                  product.stock > 0
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-red-600 hover:bg-red-700'
                                }`}
                              >
                                {product.stock > 0 ? `${product.stock} In` : 'Out'}
                              </button>
                            </td>
                            <td className="px-6 py-4 text-center space-x-2">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="text-blue-600 hover:text-blue-800 font-semibold"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-800 font-semibold"
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
          )}

          {/* Categories Section */}
          {activeSection === 'categories' && (
            <div>
              <h1 className="text-4xl font-serif font-bold text-luxuryBlack mb-8">
                Manage Categories
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Category Form */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-serif font-bold text-luxuryBlack mb-6">
                    Add Category
                  </h2>

                  <form onSubmit={handleAddCategory} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="e.g., Handbags"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={addingCategory}
                      className="w-full bg-gold text-luxuryBlack font-bold py-2 rounded-lg hover:bg-gold-dark transition-colors disabled:opacity-50"
                    >
                      {addingCategory ? 'Adding...' : 'Add Category'}
                    </button>
                  </form>
                </div>

                {/* Categories List */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-serif font-bold text-luxuryBlack mb-6">
                    Existing Categories
                  </h2>

                  {categories.length === 0 ? (
                    <p className="text-gray-600">No categories yet</p>
                  ) : (
                    <div className="space-y-3">
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-semibold text-luxuryBlack">{cat.name}</p>
                            <p className="text-sm text-gray-600">
                              {cat._count?.products || 0} product
                              {cat._count?.products !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <span className="text-2xl font-bold text-gold">
                            {cat._count?.products || 0}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Orders Section */}
          {activeSection === 'orders' && (
            <div>
              <h1 className="text-4xl font-serif font-bold text-luxuryBlack mb-8">
                Orders
              </h1>

              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-600 mb-6">
                  Orders are managed through WhatsApp. Click the button below to view orders.
                </p>
                <a
                  href="https://wa.me/231555109860"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Open WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
