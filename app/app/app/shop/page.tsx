import Link from 'next/link';

export default function ShopPage() {
  // Mock data for scaffolding
  const products = [
    { id: '1', name: 'Signature Gold Bag', price: 450, stock: 5, category: 'Bags' },
    { id: '2', name: 'Evening Silk Dress', price: 800, stock: 0, category: 'Dresses' },
    { id: '3', name: 'Midnight Oud Perfume', price: 120, stock: 12, category: 'Perfume' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-12">
      <aside className="w-full md:w-64">
        <h3 className="font-serif text-xl mb-8 border-b border-gold/30 pb-4 uppercase tracking-widest">Filter By</h3>
        <div className="space-y-8">
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Categories</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {['Bags', 'Dresses', 'Blouses', 'Shirts', 'Perfume'].map(c => (
                <li key={c} className="hover:text-gold cursor-pointer transition-colors">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className={`relative aspect-[3/4] bg-gray-50 mb-6 overflow-hidden ${product.stock === 0 ? 'grayscale' : ''}`}>
                {product.stock === 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-black text-gold px-3 py-1 text-[10px] uppercase tracking-widest">
                    Sold Out
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                
                {product.stock > 0 ? (
                  <Link href={`/shop/${product.id}`} className="absolute inset-0" />
                ) : (
                  <div className="absolute inset-0 cursor-not-allowed" />
                )}
              </div>
              
              <h3 className="font-serif text-lg mb-1">{product.name}</h3>
              <p className="text-gold tracking-widest text-sm font-medium">${product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
