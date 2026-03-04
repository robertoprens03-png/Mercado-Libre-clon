import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProductPreview({ products, onViewDetails, onAddToCart, onAddToFavorites, favorites = [] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getDiscount = (originalPrice, price) => {
    if (originalPrice && originalPrice > price) {
      return Math.round(((originalPrice - price) / originalPrice) * 100)
    }
    return 0
  }

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-2xl text-gray-700 font-medium">No hay productos para mostrar</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-ml-blue mb-2">
            Mostrando {products.length} productos
          </h2>
          <p className="text-gray-600">
            Página {currentPage} de {totalPages}
          </p>
        </div>
        <Link 
          to="/"
          className="px-4 py-2 bg-ml-blue text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
        >
          ← Volver a grid
        </Link>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {paginatedProducts.map((product) => {
          const discount = getDiscount(product.originalPrice, product.price)
          const isFavorite = favorites.some(fav => fav.id === product.id)
          
          return (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-200 h-full flex flex-col relative"
            >
              {/* Botón Favorito */}
              <button
                onClick={() => onAddToFavorites?.(product)}
                className="absolute top-2 right-2 z-10 text-2xl hover:scale-125 transition"
                title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                {isFavorite ? '❤️' : '🤍'}
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
                
                {discount > 0 && (
                  <div className="absolute top-2 right-2 bg-ml-blue text-ml-yellow px-2 py-1 rounded font-bold text-xs">
                    -{discount}%
                  </div>
                )}
                
                {product.freeShipping && (
                  <div className="absolute bottom-2 left-2 bg-ml-yellow text-ml-blue px-2 py-1 rounded font-bold text-xs">
                    ✓ Envío gratis
                  </div>
                )}
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
          )
        })}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 pb-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-ml-yellow text-ml-blue font-bold rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transition"
          >
            ← Anterior
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded font-bold transition ${
                  currentPage === page
                    ? 'bg-ml-blue text-ml-yellow'
                    : 'bg-ml-gray text-ml-blue hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-ml-yellow text-ml-blue font-bold rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transition"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  )
}
