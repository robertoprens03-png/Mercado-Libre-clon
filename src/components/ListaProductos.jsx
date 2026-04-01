import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from './TarjetaProducto'

export default function ProductList({ products, onAddToCart, isLoading = false, onViewDetails, onAddToFavorites, favorites = [] }) {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Paginación
  const ITEMS_PER_PAGE = 12
  const currentPage = parseInt(searchParams.get('page')) || 1
  
  console.log('📊 ProductList recibido:', { productCount: products?.length || 0, isLoading, currentPage })
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-ml-yellow border-t-ml-blue mb-6 mx-auto"></div>
          <p className="text-xl text-gray-700 font-medium">Buscando productos...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    console.warn('⚠️ No hay productos para mostrar')
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6">
          <svg className="w-20 h-20 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <p className="text-2xl text-gray-700 font-medium">No se encontraron productos</p>
        <p className="text-gray-600 mt-2">Intenta con otra búsqueda o categoría</p>
      </div>
    )
  }

  // Calcular paginación
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedProducts = products.slice(startIndex, endIndex)

  console.log(`✅ Mostrando ${paginatedProducts.length} productos (página ${currentPage}/${totalPages})`)

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() })
    window.scrollTo(0, 0)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header con info de paginación */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-600 text-sm">
            Mostrando {startIndex + 1} - {Math.min(endIndex, products.length)} de {products.length} producto{products.length !== 1 ? 's' : ''}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Página {currentPage} de {totalPages}
          </p>
        </div>
        <Link 
          to="/preview"
          className="px-4 py-2 bg-ml-blue text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          Ver en modo paginado
        </Link>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {paginatedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
            onAddToFavorites={onAddToFavorites}
            isFavorite={favorites.some(fav => fav.id === product.id)}
          />
        ))}
      </div>

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 pb-8">
          {/* Botón anterior */}
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
          >
            ← Anterior
          </button>

          {/* Números de página */}
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-lg font-medium transition text-sm ${
                  currentPage === page
                    ? 'bg-ml-blue text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Botón siguiente */}
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  )
}
