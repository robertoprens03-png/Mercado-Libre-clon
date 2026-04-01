import { Link } from 'react-router-dom'
import ProductCard from './TarjetaProducto'

export default function ProductList({ products, onAddToCart, isLoading = false, onViewDetails, onAddToFavorites, favorites = [] }) {
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 text-sm">
          Mostrando {products.length} producto{products.length !== 1 ? 's' : ''}
        </p>
        <Link 
          to="/preview"
          className="px-4 py-2 bg-ml-blue text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          Ver en modo paginado
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
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
    </div>
  )
}
