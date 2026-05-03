'use client'

import Image from 'next/image'

interface ProductCardProps {
  name: string
  price: string
  image: string
  category: string
  stock: 'In Stock' | 'Low Stock' | 'Out of Stock'
}

export default function ProductCard({
  name,
  price,
  image,
  category,
  stock,
}: ProductCardProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '231880123456'
  const message = encodeURIComponent(
    `Hi Sura, I want to order ${name} at ${price}`
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

  const stockColor =
    stock === 'In Stock'
      ? 'text-green-600'
      : stock === 'Low Stock'
        ? 'text-yellow-600'
        : 'text-red-600'

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-gold text-luxuryBlack px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
          {category}
        </div>
        {/* Stock Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${stockColor}`}>
          {stock}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-luxuryBlack mb-2 line-clamp-2">
          {name}
        </h3>

        <p className="text-2xl font-serif text-gold font-bold mb-4">
          ${price}
        </p>

        {/* WhatsApp Order Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center bg-gold text-luxuryBlack font-semibold py-3 px-4 rounded-lg hover:bg-gold-dark transition-all duration-300 transform hover:scale-105 tracking-wide"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.488c-1.547.934-2.505 2.362-2.505 3.915 0 2.424 2.064 4.529 4.882 4.529.846 0 1.666-.165 2.433-.48l.158-.06 1.996.524-.524-1.996.06-.158c.315-.767.48-1.587.48-2.433 0-2.818-2.105-4.882-4.882-4.882m5.421 7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
          </svg>
          Order on WhatsApp
        </a>
      </div>
    </div>
  )
}
