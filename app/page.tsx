import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: { id: string } }) {
  // Mock data - replace with Prisma fetch
  const product = {
    id: params.id,
    name: 'Signature Gold Bag',
    price: 450,
    description: 'A timeless piece crafted with premium Liberian craftsmanship. Features genuine leather and custom gold-toned hardware that speaks volumes of your style.',
    category: 'Bags',
    stock: 5,
    variants: [
      { id: 'v1', size: 'Small', type: 'Leather', stock: 2 },
      { id: 'v2', size: 'Large', type: 'Leather', stock: 3 },
    ],
  };

  if (!product) notFound();

  const whatsappLink = `https://wa.me/231555109860?text=Hello, I am interested in the ${product.name} ($${product.price})`;

  return (
    <main className="pt-32 pb-20 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="relative aspect-[4/5] bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
          <span className="text-gray-300 font-serif italic uppercase tracking-widest text-sm">Product Image Gallery</span>
          {product.stock === 0 && (
            <div className="absolute top-0 right-0 bg-black text-gold px-6 py-2 uppercase tracking-widest text-xs">
              Currently Unavailable
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <nav className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">
            Shop / {product.category} / {product.name}
          </nav>
          
          <h1 className="text-4xl font-serif mb-4 tracking-tight uppercase">{product.name}</h1>
          <p className="text-2xl text-gold mb-10 font-medium tracking-widest">${product.price.toLocaleString()}</p>
          
          <div className="prose prose-sm mb-12 text-gray-600 leading-relaxed border-b border-gray-100 pb-8">
            <p>{product.description}</p>
          </div>

          <div className="mb-10">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-5">Select Size</h4>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((v) => (
                <button 
                  key={v.id}
                  disabled={v.stock === 0}
                  className={`px-8 py-3 border text-xs uppercase tracking-widest transition-all ${
                    v.stock === 0 
                    ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                    : 'border-gray-200 hover:border-gold'
                  }`}
                >
                  {v.size} {v.stock === 0 && '(Sold Out)'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              disabled={product.stock === 0}
              className={`w-full py-5 uppercase tracking-[0.4em] text-xs transition-all duration-500 ${
                product.stock === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-luxuryBlack text-gold hover:bg-gold hover:text-black border border-luxuryBlack'
              }`}
            >
              {product.stock === 0 ? 'Restocking Soon' : 'Add to Collection'}
            </button>
            
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 text-center border border-gray-200 text-[10px] uppercase tracking-[0.3em] hover:border-gold transition-colors"
            >
              Inquire via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}