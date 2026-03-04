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
  { icon: 'box', title: 'Mis compras', desc: 'Seguimiento y estado de pedidos' },
  { icon: 'card', title: 'Pagos', desc: 'Metodos de pago y facturacion' },
  { icon: 'truck', title: 'Envios', desc: 'Informacion sobre envios y entregas' },
  { icon: 'return', title: 'Devoluciones', desc: 'Politica de devoluciones y reembolsos' },
  { icon: 'lock', title: 'Seguridad', desc: 'Proteccion de cuenta y datos' },
  { icon: 'shop', title: 'Vendedores', desc: 'Ayuda para publicar y vender' },
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
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">¿En qué podemos ayudarte?</h1>
            <p className="text-gray-700 text-base md:text-lg mb-6">Encontrá respuestas a las preguntas más frecuentes</p>
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
            {helpCategories.map((cat) => {
              const iconMap = {
                box: <svg className="w-7 h-7 text-ml-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
                card: <svg className="w-7 h-7 text-ml-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
                truck: <svg className="w-7 h-7 text-ml-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16H3m10 0h4.5M21 16h-1.5M16.5 16a2.5 2.5 0 11-5 0m5 0a2.5 2.5 0 10-5 0M3 16a2.5 2.5 0 005 0M3 16a2.5 2.5 0 015 0m0 0h5" /></svg>,
                return: <svg className="w-7 h-7 text-ml-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>,
                lock: <svg className="w-7 h-7 text-ml-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
                shop: <svg className="w-7 h-7 text-ml-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
              }
              return (
              <div
                key={cat.title}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition border border-gray-100 cursor-pointer"
              >
                <div className="mb-3">{iconMap[cat.icon]}</div>
                <h3 className="font-bold text-gray-900 mb-1">{cat.title}</h3>
                <p className="text-sm text-gray-500">{cat.desc}</p>
              </div>
              )
            })}
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
