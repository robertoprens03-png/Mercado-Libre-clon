import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetails } from '../services/fakeStoreApi';
import { formatPrice } from '../utils/formatPrice';

const ProductDetailPage = ({ 
  onAddToCart = () => {},
  onAddToFavorites = () => {},
  isFavorite = false 
}) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [favoriteState, setFavoriteState] = useState(isFavorite);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const details = await getProductDetails(productId);
        if (details) {
          setProduct(details);
        }
      } catch (error) {
        console.error('Error cargando producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          <p className="mt-4 text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb de navegación */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 text-sm text-gray-500">
          <button
            onClick={() => navigate('/')}
            className="hover:text-ml-blue transition"
          >
            Inicio
          </button>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 flex items-center justify-center min-h-48 md:min-h-96">
            <img
              src={product.image}
              alt={product.name}
                className="max-w-full md:max-w-sm h-48 sm:h-64 md:h-96 object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">
                    {i < Math.round(product.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-gray-600 ml-2">
                {product.rating.toFixed(1)} ({product.reviewsCount} reseñas)
              </span>
            </div>

            {/* Price Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="mb-4">
                <p className="text-gray-600 text-sm mb-2">Precio</p>
                <div className="flex items-baseline space-x-2">
                    <span className="text-2xl md:text-4xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {discount > 0 && (
                    <>
                      <span className="text-lg line-through text-gray-500">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Free Shipping Badge */}
              {product.freeShipping && (
                <div className="bg-green-50 border border-green-200 rounded p-3 text-green-700 text-sm font-semibold">
                  ✓ Envío gratis a todo el país
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Descripción</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="font-semibold text-gray-700">
                  Cantidad:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-none outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={() => {
                  onAddToCart({ ...product, quantity })
                  setQuantity(1)
                }}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-lg transition duration-200 text-lg">
                Agregar al carrito
              </button>

              {/* Favorite Button */}
              <button
                onClick={() => {
                  setFavoriteState(!favoriteState)
                  onAddToFavorites(product)
                }}
                className={`w-full py-3 px-6 rounded-lg font-bold transition duration-200 flex items-center justify-center space-x-2 ${
                  favoriteState
                    ? 'bg-red-50 text-red-600 border border-red-300 hover:bg-red-100'
                    : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                }`}
              >
                <span className="text-2xl">{favoriteState
                  ? <svg className="w-7 h-7 text-red-500 inline" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                  : <svg className="w-7 h-7 text-gray-400 inline" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                }</span>
                <span>{favoriteState ? 'Agregado a favoritos' : 'Agregar a favoritos'}</span>
              </button>
            </div>

            {/* Product Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <p className="text-sm text-gray-700">
                <strong>Fuente:</strong> {product.source === 'fakestore' ? 'FakeStore API' : 'Mercado Libre'}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Disponibilidad:</strong> En stock
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
