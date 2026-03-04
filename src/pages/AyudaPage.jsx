import { useState } from 'react'
import Navbar from '../components/BarraNavegacion'
import Footer from '../components/PieDePagina'

const faqs = [
  {
    question: '¿Cómo hago una compra?',
    answer: 'Buscá el producto que querés, hacé clic en "Ver más" para ver los detalles y luego en "Agregar al carrito". Finalizá tu compra desde el carrito.'
  },
  {
    question: '¿Cómo hago seguimiento de mi pedido?',
    answer: 'En la sección "Mis compras" encontrás el estado actualizado de todos tus pedidos, incluyendo el número de seguimiento una vez despachado.'
  },
  {
    question: '¿Cuánto tarda el envío?',
    answer: 'Los envíos estándar demoran entre 5 y 7 días hábiles. El envío express llega en 2-3 días y el envío en el día está disponible en ciudades principales.'
  },
  {
    question: '¿Puedo devolver un producto?',
    answer: 'Sí. Tenés hasta 30 días desde la recepción para solicitar una devolución. El producto debe estar en su estado original sin uso.'
  },
  {
    question: '¿Cómo agrego una tarjeta de pago?',
    answer: 'Al momento del checkout podés ingresar los datos de tu tarjeta de crédito o débito de forma segura. Aceptamos Visa, Mastercard y Amex.'
  },
  {
    question: '¿Cómo vendo en Mercado Libre?',
    answer: 'Visitá la sección "Vender" en el menú superior. Podés publicar tus productos gratis y solo pagás comisión cuando concretás una venta.'
  },
  {
    question: '¿Cómo contacto al vendedor?',
    answer: 'En la página de detalle del producto encontrás un botón para enviar un mensaje directo al vendedor.'
  },
  {
    question: '¿Qué es Mercado Pago?',
    answer: 'Mercado Pago es la billetera digital integrada con Mercado Libre. Te permite pagar de forma segura y recibir el dinero de tus ventas.'
  }
]

const helpCategories = [
  { icon: '📦', title: 'Mis compras', desc: 'Seguimiento y estado de pedidos' },
  { icon: '💳', title: 'Pagos', desc: 'Métodos de pago y facturación' },
  { icon: '🚚', title: 'Envíos', desc: 'Información sobre envíos y entregas' },
  { icon: '↩️', title: 'Devoluciones', desc: 'Política de devoluciones y reembolsos' },
  { icon: '🔒', title: 'Seguridad', desc: 'Protección de cuenta y datos' },
  { icon: '🛍️', title: 'Vendedores', desc: 'Ayuda para publicar y vender' },
]

export default function AyudaPage({
  isLoggedIn = false,
  user = null,
  onSearch = () => {},
  onLoginClick = () => {},
  onLogoutClick = () => {},
  cart = [],
  favorites = [],
  onCartClick = () => {},
  onCategorySelect = () => {}
}) {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen bg-ml-gray flex flex-col">
      <Navbar
        onSearch={onSearch}
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        cartCount={cart.length}
        onCartClick={onCartClick}
        favoritesCount={favorites.length}
        onCategorySelect={onCategorySelect}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-ml-yellow py-12">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">¿En qué podemos ayudarte?</h1>
            <p className="text-gray-700 text-lg mb-6">Encontrá respuestas a las preguntas más frecuentes</p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Buscar en el centro de ayuda..."
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ml-blue text-gray-900"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-ml-blue">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Categorías de ayuda */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Temas de ayuda</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {helpCategories.map((cat) => (
              <div
                key={cat.title}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition border border-gray-100 cursor-pointer"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{cat.title}</h3>
                <p className="text-sm text-gray-500">{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-medium text-gray-900 hover:bg-gray-50 transition"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer onCategorySelect={onCategorySelect} />
    </div>
  )
}
