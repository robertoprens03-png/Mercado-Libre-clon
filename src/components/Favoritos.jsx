import { Link } from 'react-router-dom'

export default function Favorites({ favorites = [], onRemoveFavorite, onAddToCart, onViewDetails }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleRemove = (productId) => {
    onRemoveFavorite?.(productId)
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-ml-blue mb-2">Favoritos vacío</h2>
        <p className="text-gray-600">Aún no has agregado productos a favoritos</p>
        <p className="text-gray-500 text-sm mt-4">Haz clic en el corazon en los productos para agregarlos aqui</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-ml-blue mb-2 flex items-center gap-2">
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
          Mis Favoritos ({favorites.length})
        </h2>
        <p className="text-gray-600">
          Productos guardados para más tarde
        </p>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden border-2 border-ml-yellow h-full flex flex-col relative"
          >
            {/* Botón eliminar */}
            <button
              onClick={() => handleRemove(product.id)}
              className="absolute top-2 right-2 bg-ml-yellow text-ml-blue rounded-full w-8 h-8 flex items-center justify-center font-bold hover:scale-110 transition z-10"
              title="Eliminar de favoritos"
            >
              ✕
            </button>

            {/* Imagen */}
            <div
              className="relative w-full h-48 bg-gray-100 overflow-hidden group cursor-pointer"
              onClick={() => onViewDetails?.(product.id)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x300?text=Sin+imagen'
                }}
              />
              
              <div className="absolute top-2 left-2 bg-ml-yellow text-ml-blue">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-3 flex flex-col flex-1">
              {/* Nombre */}
              <h3
                className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 hover:text-ml-blue cursor-pointer transition"
                onClick={() => onViewDetails?.(product.id)}
                title={product.name}
              >
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.floor(product.rating) ? 'text-ml-yellow text-xs' : 'text-gray-300 text-xs'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-600">({product.rating})</span>
              </div>

              {/* Precios */}
              <div className="mb-3">
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-xs text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
                <span className="text-lg font-bold text-ml-blue">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Envío gratis */}
              {product.freeShipping && (
                <p className="text-xs text-green-600 font-bold mb-3">
                  ✓ Envío gratis
                </p>
              )}

              {/* Botones */}
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => onAddToCart?.(product)}
                  className="flex-1 bg-ml-yellow text-ml-blue font-bold py-2 px-2 rounded text-xs hover:bg-yellow-400 transition"
                >
                  Carrito
                </button>
                <button
                  onClick={() => onViewDetails?.(product.id)}
                  className="flex-1 border-2 border-ml-blue text-ml-blue font-bold py-2 px-2 rounded text-xs hover:bg-ml-gray transition"
                >
                  Ver
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón volver a comprar */}
      <div className="flex justify-center mt-8 pb-8">
        <Link
          to="/"
          className="px-6 py-3 bg-ml-blue text-ml-yellow font-bold rounded hover:bg-blue-900 transition"
        >
          ← Volver a Comprar
        </Link>
      </div>
    </div>
  )
}
