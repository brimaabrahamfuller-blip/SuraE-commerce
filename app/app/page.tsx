import Link from 'next/link';

export default function HomePage() {
  const categories = ['Bags', 'Dresses', 'Perfume'];

  return (
    <main>
      <section className="relative h-[90vh] flex items-center justify-center bg-luxuryBlack text-white">
        <div className="absolute inset-0 opacity-40 bg-black" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif mb-4 tracking-tight">Sura Luxury Collection</h1>
          <p className="text-xl md:text-2xl font-light italic mb-8 text-gold">"Style that speaks for you."</p>
          <Link 
            href="/shop" 
            className="inline-block border border-gold text-gold hover:bg-gold hover:text-black transition-all px-10 py-4 uppercase tracking-[0.2em] text-sm"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-16 uppercase tracking-[0.3em]">The Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat} className="group relative h-[500px] overflow-hidden bg-gray-100 cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/40 transition-all duration-500">
                <h3 className="text-white text-2xl font-serif uppercase tracking-widest border-b border-transparent group-hover:border-gold pb-2">{cat}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
