import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProductDetails } from '../services/fakeStoreApi'

export default function ProductDetail({ productId, onClose, onAddToCart }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true)
      const details = await getProductDetails(productId)
      setProduct(details)
      setLoading(false)
    }
    fetchDetails()
  }, [productId])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getDiscount = () => {
    if (product?.originalPrice && product?.price < product.originalPrice) {
      const discount = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
      return discount
    }
    return 0
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-ml-yellow border-t-ml-blue mb-4"></div>
            <p className="text-gray-700">Cargando detalles...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
          <p className="text-center text-gray-700">No se pudo cargar el producto</p>
          <button
            onClick={onClose}
            className="mt-4 w-full bg-ml-yellow text-ml-blue py-2 rounded font-bold hover:bg-yellow-300 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    )
  }

  const images = product.pictures && product.pictures.length > 0
    ? product.pictures
    : [{ url: product.image }]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-ml-blue">Detalles del Producto</h2>
          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Galería de Imágenes */}
          <div className="flex flex-col gap-4">
            {/* Imagen principal */}
            <div className="bg-ml-gray rounded-lg overflow-hidden h-96 flex items-center justify-center">
              <img
                src={images[selectedImage]?.url || product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Miniaturas */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded border-2 transition ${
                      selectedImage === idx
                        ? 'border-ml-blue'
                        : 'border-gray-300 hover:border-ml-yellow'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`Imagen ${idx + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del Producto */}
          <div className="flex flex-col gap-6">
            {/* Título */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'text-ml-yellow' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating}/5 ({product.reviewsCount} reseñas)
                </span>
              </div>
            </div>

            {/* Precios */}
            <div className="border-t border-b py-4">
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-ml-yellow text-ml-blue px-3 py-1 rounded font-bold text-sm">
                    -{getDiscount()}%
                  </span>
                </div>
              )}
              <div className="text-4xl font-bold text-ml-blue mb-2">
                {formatPrice(product.price)}
              </div>
              
              {/* Envio */}
              {product.freeShipping && (
                <div className="text-ml-blue font-semibold flex items-center gap-2">
                  <span className="text-xl">✓</span> Envío gratis a todo el país
                </div>
              )}
            </div>

            {/* Disponibilidad */}
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-semibold">Stock disponible:</span> {product.available || 'Disponible'}
              </p>
              <p>
                <span className="font-semibold">Vendidos:</span> {product.soldQuantity || 0} unidades
              </p>
              <p>
                <span className="font-semibold">Condición:</span> {product.condition === 'used' ? 'Usado' : 'Nuevo'}
              </p>
            </div>

            {/* Cantidad */}
            <div className="flex items-center gap-4">
              <span className="font-semibold">Cantidad:</span>
              <div className="flex border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-l border-r border-gray-300 py-2"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  onAddToCart({ ...product, quantity })
                  onClose()
                }}
                className="flex-1 bg-ml-yellow text-ml-blue py-3 rounded font-bold hover:bg-yellow-300 transition text-lg"
              >
                Agregar al carrito
              </button>
              <Link
                to={`/producto/${product.id}`}
                onClick={onClose}
                className="flex-1 border-2 border-ml-blue text-ml-blue py-3 rounded font-bold hover:bg-ml-gray transition text-center"
              >
                Ver detalles
              </Link>
            </div>

            {/* Descripción */}
            {product.description && (
              <div className="border-t pt-4">
                <h3 className="font-bold text-gray-800 mb-2">Descripción</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Atributos/Especificaciones */}
            {product.attributes && product.attributes.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-bold text-gray-800 mb-3">Especificaciones</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {product.attributes.map((attr, idx) => (
                    <div key={idx} className="text-gray-600">
                      <span className="font-semibold">{attr.name}:</span> {attr.value_name || attr.values?.[0]?.name || '-'}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
