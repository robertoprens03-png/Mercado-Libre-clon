import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAddToCart, onViewDetails, onAddToFavorites, isFavorite }) {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

  // Formato de pesos colombianos
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-200 h-full flex flex-col relative">
      {/* Botón Favorito */}
      <button
        onClick={() => onAddToFavorites?.(product)}
        className="absolute top-2 right-2 z-10 hover:scale-125 transition"
        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {isFavorite
          ? <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
          : <svg className="w-7 h-7 text-gray-300 hover:text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
        }
      </button>

      {/* Imagen - Link a página de detalle */}
      <Link to={`/producto/${product.id}`} className="relative w-full h-48 bg-gray-100 overflow-hidden group cursor-pointer block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-ml-blue text-ml-yellow px-2 py-1 rounded font-bold text-xs">
            -{discount}%
          </div>
        )}
        {product.freeShipping && (
          <div className="absolute bottom-2 left-2 bg-ml-yellow text-ml-blue px-2 py-1 rounded font-bold text-xs">
            ✓ Envío gratis
          </div>
        )}
      </Link>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1">
        <Link 
          to={`/producto/${product.id}`}
          className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 hover:text-ml-blue cursor-pointer transition"
        >
          {product.name}
        </Link>

        <p className="text-xs text-gray-600 mb-3 line-clamp-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'text-ml-yellow text-sm' : 'text-gray-300 text-sm'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.rating})</span>
        </div>

        {/* Precio */}
        <div className="mb-4">
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-xs text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <span className="text-xl font-bold text-ml-blue">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Botones */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-ml-yellow text-ml-blue font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition text-xs"
          >
            Carrito
          </button>
          <Link
            to={`/producto/${product.id}`}
            className="flex-1 border-2 border-ml-blue text-ml-blue font-bold py-2 px-4 rounded-lg hover:bg-ml-gray transition text-xs text-center"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  )
}
