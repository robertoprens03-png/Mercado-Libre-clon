import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CheckoutPage({ cart, onRemoveFromCart, onPurchase }) {
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [purchased, setPurchased] = useState(false)
  const navigate = useNavigate()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const shippingCosts = {
    standard: 15000,
    express: 35000,
    same_day: 85000,
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shippingMethod === 'free' ? 0 : shippingCosts[shippingMethod]
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + shippingCost + tax

  const shippingDays = {
    standard: '5-7 días',
    express: '2-3 días',
    same_day: 'Hoy',
  }

  if (purchased) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-ml-blue mb-2">¡Compra confirmada!</h2>
        <p className="text-gray-600 mb-6">Tu pedido fue registrado. Podés seguirlo en <strong>Mis compras</strong>.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/mis-compras')}
            className="bg-ml-blue text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Ver mis compras
          </button>
          <button
            onClick={() => navigate('/')}
            className="border-2 border-ml-blue text-ml-blue font-bold px-6 py-3 rounded-lg hover:bg-ml-gray transition"
          >
            Seguir comprando
          </button>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-ml-blue mb-2">Carrito vacio</h2>
        <p className="text-gray-600 mb-6">Agrega productos para proceder con la compra</p>
        <button
          onClick={() => navigate('/')}
          className="bg-ml-blue text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          Ir a comprar
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-ml-blue mb-6 md:mb-8">Resumen de Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Productos */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-ml-blue mb-4">
              Productos ({cart.length})
            </h2>
            
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b pb-4 last:border-b-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=Sin+imagen'
                    }}
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Cantidad: {item.quantity}
                    </p>
                    <p className="font-bold text-ml-blue mt-2">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => onRemoveFromCart?.(item.id)}
                    className="text-red-500 hover:text-red-700 font-bold transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Envío */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-ml-blue mb-4">Método de Envío</h2>
            
            <div className="space-y-3">
              {Object.entries(shippingCosts).map(([method, cost]) => (
                <label key={method} className="flex items-center gap-3 p-3 border-2 rounded cursor-pointer hover:bg-ml-gray transition"
                  style={{
                    borderColor: shippingMethod === method ? '#001F3F' : '#ddd',
                    backgroundColor: shippingMethod === method ? '#F5F5F5' : 'white'
                  }}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={method}
                    checked={shippingMethod === method}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 capitalize">
                      {method.replace('_', ' ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {shippingDays[method]}
                    </p>
                  </div>
                  <p className="font-bold text-ml-blue">
                    +{formatPrice(cost)}
                  </p>
                </label>
              ))}
            </div>
          </div>

          {/* Pago */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-ml-blue mb-4">Método de Pago</h2>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border-2 border-ml-blue rounded cursor-pointer bg-ml-gray">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-bold text-gray-900">Tarjeta de Credito/Debito</p>
                  <p className="text-sm text-gray-600">Visa, Mastercard, Amex</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded cursor-pointer hover:bg-ml-gray transition">
                <input
                  type="radio"
                  name="payment"
                  value="transfer"
                  checked={paymentMethod === 'transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-bold text-gray-900">Transferencia Bancaria</p>
                  <p className="text-sm text-gray-600">Bancos participantes</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded cursor-pointer hover:bg-ml-gray transition">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-bold text-gray-900">Efectivo en Tienda</p>
                  <p className="text-sm text-gray-600">Recoge en ubicación cercana</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Resumen de Totales */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 shadow-sm sticky top-20 space-y-4">
            <h2 className="text-xl font-bold text-ml-blue">Resumen de Pago</h2>
            
            <div className="space-y-3 border-b pb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-bold">{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Envío:</span>
                <span className="font-bold">
                  {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">IVA (8%):</span>
                <span className="font-bold">{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="bg-ml-yellow rounded p-4">
              <p className="text-sm text-ml-blue mb-1">Total a pagar:</p>
              <p className="text-2xl md:text-3xl font-bold text-ml-blue">
                {formatPrice(total)}
              </p>
            </div>

            <button
              className="w-full bg-ml-blue text-ml-yellow font-bold py-3 rounded hover:bg-blue-900 transition text-lg"
              onClick={() => {
                if (onPurchase) onPurchase()
                setPurchased(true)
              }}
            >
              Confirmar compra
            </button>

            <button
              className="w-full border-2 border-ml-blue text-ml-blue font-bold py-2 rounded hover:bg-ml-gray transition"
              onClick={() => navigate('/')}
            >
              Seguir Comprando
            </button>

            {/* Info adicional */}
            <div className="bg-blue-50 rounded p-3 text-sm text-gray-700 space-y-2">
              <p>✓ Compra segura</p>
              <p>✓ Protección al comprador</p>
              <p>✓ Garantía de producto</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
