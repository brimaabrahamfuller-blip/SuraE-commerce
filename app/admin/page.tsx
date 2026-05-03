'use client'

import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: string
  category: string
  stock: number
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Elegant Gold Clutch',
      price: '89.99',
      category: 'Bags',
      stock: 15,
    },
    {
      id: '2',
      name: 'Silk Evening Dress',
      price: '249.99',
      category: 'Dresses',
      stock: 8,
    },
    {
      id: '3',
      name: 'Premium Blouse',
      price: '129.99',
      category: 'Blouses',
      stock: 3,
    },
  ])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Product | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: '',
    category: '',
    stock: 0,
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
    if (password === adminPassword) {
      setIsAuthenticated(true)
      setPassword('')
    } else {
      alert('Incorrect password')
      setPassword('')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setEditForm({ ...product })
  }

  const handleSaveEdit = () => {
    if (editForm) {
      setProducts(
        products.map((p) => (p.id === editingId ? editForm : p))
      )
      setEditingId(null)
      setEditForm(null)
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const handleAddProduct = () => {
    if (
      newProduct.name &&
      newProduct.price &&
      newProduct.category &&
      newProduct.stock >= 0
    ) {
      const product: Product = {
        id: Date.now().toString(),
        ...newProduct,
      }
      setProducts([...products, product])
      setNewProduct({ name: '', price: '', category: '', stock: 0 })
      setShowAddForm(false)
    } else {
      alert('Please fill in all fields')
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-gray-50 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-serif font-bold text-luxuryBlack text-center mb-2">
            Admin Panel
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Enter your password to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold focus:ring-opacity-20"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold text-luxuryBlack font-bold py-3 px-6 rounded-lg hover:bg-gold-dark transition-all duration-300 tracking-widest"
            >
              LOGIN
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            This page is password protected.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-luxuryBlack">
              Admin Panel
            </h1>
            <p className="text-gray-600 mt-2">Manage your products</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-luxuryBlack text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Add Product Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gold text-luxuryBlack font-bold py-3 px-8 rounded-lg hover:bg-gold-dark transition-all duration-300 transform hover:scale-105"
          >
            {showAddForm ? 'Cancel' : '+ Add New Product'}
          </button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-serif font-bold text-luxuryBlack mb-6">
              Add New Product
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-luxuryBlack mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      stock: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>
            </div>
            <button
              onClick={handleAddProduct}
              className="mt-6 bg-gold text-luxuryBlack font-bold py-2 px-8 rounded-lg hover:bg-gold-dark transition-colors"
            >
              Add Product
            </button>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-luxuryBlack text-white">
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Price</th>
                <th className="px-6 py-4 text-left font-semibold">Category</th>
                <th className="px-6 py-4 text-left font-semibold">Stock</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  {editingId === product.id && editForm ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.price}
                          onChange={(e) =>
                            setEditForm({ ...editForm, price: e.target.value })
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={editForm.stock}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              stock: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500 transition-colors"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 font-semibold text-luxuryBlack">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-gold font-semibold">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {product.category}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            product.stock > 5
                              ? 'bg-green-100 text-green-800'
                              : product.stock > 0
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products yet</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              Total Products
            </p>
            <p className="text-4xl font-serif font-bold text-gold">
              {products.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              Total Stock
            </p>
            <p className="text-4xl font-serif font-bold text-gold">
              {products.reduce((sum, p) => sum + p.stock, 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              Low Stock Items
            </p>
            <p className="text-4xl font-serif font-bold text-gold">
              {products.filter((p) => p.stock <= 5).length}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
