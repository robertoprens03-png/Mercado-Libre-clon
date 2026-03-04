import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/BarraNavegacion'
import Footer from '../components/PieDePagina'

const PUBLICATION_TYPES = [
  { id: 'productos', label: 'Productos', color: 'bg-blue-100 text-blue-700', initial: 'P', description: 'Ropa, electrónica, hogar y más' },
  { id: 'vehiculos', label: 'Vehículos', color: 'bg-orange-100 text-orange-700', initial: 'V', description: 'Autos, motos y accesorios' },
  { id: 'inmuebles', label: 'Inmuebles', color: 'bg-green-100 text-green-700', initial: 'I', description: 'Casas, apartamentos y terrenos' },
  { id: 'servicios', label: 'Servicios', color: 'bg-purple-100 text-purple-700', initial: 'S', description: 'Trabajos y servicios profesionales' },
]

const CATEGORIES = [
  'Electrónica', 'Ropa y Moda', 'Hogar y Jardín', 'Deportes', 'Juguetes',
  'Libros', 'Belleza y Salud', 'Autopartes', 'Alimentos', 'Otros',
]

const CONDITIONS = [
  { id: 'new', label: 'Nuevo' },
  { id: 'used', label: 'Usado' },
  { id: 'refurbished', label: 'Reacondicionado' },
]

export default function VenderPage({
  isLoggedIn = false,
  user = null,
  onSearch = () => {},
  onLoginClick = () => {},
  onLogoutClick = () => {},
  cart = [],
  favorites = [],
  onCartClick = () => {},
  onCategorySelect = () => {},
  onProductPublished = () => {},
}) {
  const [showForm, setShowForm] = useState(false)
  const [step, setStep] = useState(0)
  const [pubType, setPubType] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    keyword: '',
    title: '',
    description: '',
    price: '',
    stock: '1',
    condition: 'new',
    category: '',
    imageUrl: '',
  })
  const formRef = useRef(null)

  const handleStartPublish = () => {
    if (!isLoggedIn) {
      onLoginClick()
      return
    }
    setShowForm(true)
    setStep(0)
    setSubmitted(false)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleSelectType = (typeId) => {
    setPubType(typeId)
    setStep(1)
  }

  const handleKeywordNext = () => {
    if (!form.keyword.trim()) return
    setForm(f => ({ ...f, title: f.keyword }))
    setStep(2)
  }

  const handleFormChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProduct = {
      ...form,
      id: Date.now(),
      publishedAt: new Date().toISOString(),
      seller: user?.email || 'anónimo',
    }
    try {
      const existing = JSON.parse(localStorage.getItem('ml_listed_products') || '[]')
      localStorage.setItem('ml_listed_products', JSON.stringify([newProduct, ...existing]))
    } catch {
      // silently ignore storage errors
    }
    onProductPublished()
    setSubmitted(true)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleNewPublication = () => {
    setSubmitted(false)
    setStep(0)
    setPubType('')
    setForm({ keyword: '', title: '', description: '', price: '', stock: '1', condition: 'new', category: '', imageUrl: '' })
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const benefits = [
    { color: 'bg-blue-100 text-blue-700', initial: 'M', title: 'Llegá a millones de compradores', description: 'Publicá tus productos y accedé a la base de compradores más grande de Latinoamérica.' },
    { color: 'bg-sky-100 text-sky-700', initial: 'E', title: 'Envíos con Mercado Envíos', description: 'Usá nuestra red de logística para enviar tus productos de forma rápida y segura.' },
    { color: 'bg-green-100 text-green-700', initial: 'P', title: 'Cobrá con Mercado Pago', description: 'Recibí tu dinero de forma segura con todas las opciones de pago disponibles.' },
    { color: 'bg-indigo-100 text-indigo-700', initial: 'G', title: 'Gestioná tus ventas', description: 'Controlá tu stock, ventas y reputación desde un solo lugar.' },
    { color: 'bg-orange-100 text-orange-700', initial: 'S', title: 'Segurito Vendedor', description: 'Protección para vos y tus productos ante devoluciones o inconvenientes.' },
    { color: 'bg-yellow-100 text-yellow-700', initial: 'G', title: 'Sin costo de publicación', description: 'Publicá gratis. Solo pagás una comisión cuando vendés.' },
  ]

  const steps = [
    { number: '1', title: 'Creá tu cuenta', description: 'Registrate gratis en Mercado Libre en menos de 2 minutos.' },
    { number: '2', title: 'Publicá tu producto', description: 'Agregá fotos, descripción, precio y stock de lo que querés vender.' },
    { number: '3', title: 'Recibí tus pedidos', description: 'Cuando alguien compre, te avisamos y gestionás el envío desde la plataforma.' },
    { number: '4', title: 'Cobrá tu dinero', description: 'Recibís el pago directo en tu cuenta de Mercado Pago.' },
  ]

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
        <section className="bg-ml-yellow py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Vendé en Mercado Libre
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Llegá a millones de compradores y hacé crecer tu negocio con la plataforma de e-commerce líder en Latinoamérica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartPublish}
                className="bg-ml-blue text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition"
              >
                {isLoggedIn ? 'Publicar un producto' : 'Comenzar a vender gratis'}
              </button>
              <Link
                to="/"
                className="bg-white text-gray-800 font-bold px-8 py-4 rounded-lg text-lg border border-gray-300 hover:bg-gray-50 transition"
              >
                Ver productos disponibles
              </Link>
            </div>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="bg-white py-12 border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '+100M', label: 'Compradores activos' },
                { value: '+350M', label: 'Publicaciones activas' },
                { value: '18', label: 'Países de presencia' },
                { value: '99%', label: 'Satisfacción compradores' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-bold text-ml-blue">{stat.value}</p>
                  <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-16 max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            ¿Por qué vender en Mercado Libre?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100">
                <div className={`w-12 h-12 rounded-xl ${benefit.color} flex items-center justify-center font-bold text-lg mb-4`}>{benefit.initial}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              ¿Cómo funciona?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((s) => (
                <div key={s.number} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-ml-yellow text-gray-900 font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow">
                    {s.number}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-ml-blue py-14 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-4">¿Listo para empezar?</h2>
            <p className="text-blue-100 text-lg mb-8">
              Registrate gratis y empezá a vender hoy mismo. Sin comisión inicial.
            </p>
            <button
              onClick={handleStartPublish}
              className="bg-ml-yellow text-gray-900 font-bold px-10 py-4 rounded-lg text-lg hover:brightness-95 transition"
            >
              {isLoggedIn ? 'Publicar mi primer producto' : 'Crear mi cuenta gratis'}
            </button>
          </div>
        </section>

        {/* ── FORMULARIO DE PUBLICACIÓN (visible solo cuando showForm=true) ── */}
        {showForm && (
          <section ref={formRef} className="max-w-3xl mx-auto px-4 py-16">

            {/* Pantalla de éxito */}
            {submitted ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-ml-blue mb-2">¡Publicación creada!</h2>
                <p className="text-gray-600 mb-2">
                  Tu producto <strong>{form.title}</strong> fue publicado correctamente.
                </p>
                <p className="text-gray-500 text-sm mb-8">
                  Los compradores ya pueden encontrarlo en la plataforma.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button
                    onClick={handleNewPublication}
                    className="bg-ml-blue text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-800 transition"
                  >
                    Publicar otro producto
                  </button>
                  <Link
                    to="/mis-productos"
                    className="bg-ml-yellow text-gray-900 font-bold px-6 py-3 rounded-lg hover:brightness-95 transition"
                  >
                    Ver mis productos
                  </Link>
                  <Link
                    to="/"
                    className="border-2 border-ml-blue text-ml-blue font-bold px-6 py-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    Ver tienda
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Indicador de pasos */}
                <div className="flex items-center gap-2 mb-8 text-sm text-gray-500">
                  <span className={step >= 0 ? 'text-ml-blue font-semibold' : ''}>1. Tipo</span>
                  <span className="mx-1 text-gray-300">›</span>
                  <span className={step >= 1 ? 'text-ml-blue font-semibold' : ''}>2. Buscar</span>
                  <span className="mx-1 text-gray-300">›</span>
                  <span className={step >= 2 ? 'text-ml-blue font-semibold' : ''}>3. Detalles</span>
                </div>

                {/* PASO 0: Seleccionar tipo de publicación */}
                {step === 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-full bg-ml-yellow flex items-center justify-center font-bold text-gray-900 text-lg flex-shrink-0">1</div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Paso 1 de 3</p>
                        <h2 className="text-xl font-bold text-gray-900">¿Qué vas a publicar?</h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {PUBLICATION_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleSelectType(type.id)}
                          className="border-2 border-gray-200 rounded-xl p-6 text-center hover:border-ml-blue hover:bg-blue-50 transition group"
                        >
                          <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center font-bold text-lg mx-auto mb-3`}>{type.initial}</div>
                          <p className="font-bold text-gray-900 group-hover:text-ml-blue">{type.label}</p>
                          <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* PASO 1: Buscar / describir producto */}
                {step === 1 && (
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="flex items-center gap-1 text-ml-blue text-sm mb-6 hover:underline"
                    >
                      ‹ Anterior
                    </button>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-ml-yellow flex items-center justify-center font-bold text-gray-900 text-lg flex-shrink-0">2</div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Paso 2 de 3</p>
                        <h2 className="text-xl font-bold text-gray-900">Para publicar más rápido, buscá tu producto</h2>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 font-semibold mb-1">
                      Escribí la marca, modelo y características del producto
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Cuanto más detalle sumes, mejores serán los resultados.
                    </p>
                    <input
                      type="text"
                      value={form.keyword}
                      onChange={(e) => handleFormChange('keyword', e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleKeywordNext()}
                      placeholder="Ej.: Celular Samsung Galaxy A56 5g 256gb 8gb Ram Gris"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ml-blue text-gray-900 mb-6"
                      autoFocus
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleKeywordNext}
                        disabled={!form.keyword.trim()}
                        className="bg-ml-blue text-white font-bold px-10 py-3 rounded-lg hover:bg-blue-800 transition disabled:opacity-40"
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
                )}

                {/* PASO 2: Detalles completos */}
                {step === 2 && (
                  <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-5">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1 text-ml-blue text-sm hover:underline"
                    >
                      ‹ Anterior
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-ml-yellow flex items-center justify-center font-bold text-gray-900 text-lg flex-shrink-0">3</div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Paso 3 de 3</p>
                        <h2 className="text-xl font-bold text-gray-900">Completá los detalles</h2>
                      </div>
                    </div>

                    {/* Título */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Título del producto <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.title}
                        onChange={(e) => handleFormChange('title', e.target.value)}
                        placeholder="Ej.: Samsung Galaxy A56 5G 256GB Gris"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ml-blue"
                        required
                      />
                      <p className="text-xs text-gray-400 mt-1">{form.title.length} / 60 caracteres recomendados</p>
                    </div>

                    {/* Categoría */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Categoría <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => handleFormChange('category', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ml-blue bg-white"
                        required
                      >
                        <option value="">Seleccionar categoría</option>
                        {CATEGORIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* Condición */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Condición</label>
                      <div className="flex gap-3 flex-wrap">
                        {CONDITIONS.map(c => (
                          <label
                            key={c.id}
                            className={`flex items-center gap-2 px-4 py-2 border-2 rounded-lg cursor-pointer transition select-none ${
                              form.condition === c.id
                                ? 'border-ml-blue bg-blue-50 text-ml-blue'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <input
                              type="radio"
                              name="condition"
                              value={c.id}
                              checked={form.condition === c.id}
                              onChange={(e) => handleFormChange('condition', e.target.value)}
                              className="hidden"
                            />
                            <span className="font-medium text-sm">{c.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Precio y Stock */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Precio (COP) <span className="text-red-500">*</span>
                        </label>
                        <div className="flex border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-ml-blue overflow-hidden">
                          <span className="flex items-center px-3 text-gray-500 font-medium bg-gray-50 border-r border-gray-300 select-none">$</span>
                          <input
                            type="number"
                            value={form.price}
                            onChange={(e) => handleFormChange('price', e.target.value)}
                            placeholder="0"
                            min="1"
                            className="flex-1 px-3 py-2.5 focus:outline-none bg-white"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Stock disponible</label>
                        <input
                          type="number"
                          value={form.stock}
                          onChange={(e) => handleFormChange('stock', e.target.value)}
                          placeholder="1"
                          min="1"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ml-blue"
                        />
                      </div>
                    </div>

                    {/* Descripción */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                      <textarea
                        value={form.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        placeholder="Describí las características, estado y cualquier detalle relevante del producto..."
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ml-blue resize-none"
                      />
                    </div>

                    {/* URL de imagen */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">URL de imagen (opcional)</label>
                      <input
                        type="url"
                        value={form.imageUrl}
                        onChange={(e) => handleFormChange('imageUrl', e.target.value)}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ml-blue"
                      />
                      {form.imageUrl && (
                        <img
                          src={form.imageUrl}
                          alt="Vista previa"
                          className="mt-3 h-32 object-contain rounded border border-gray-200"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      )}
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700 space-y-1">
                      <p>✓ Publicación gratuita</p>
                      <p>✓ Solo pagás comisión al vender</p>
                      <p>✓ Visible para millones de compradores</p>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-ml-blue text-ml-yellow font-bold py-4 rounded-lg hover:bg-blue-900 transition text-lg"
                    >
                      Publicar producto
                    </button>
                  </form>
                )}
              </>
            )}
          </section>
        )}
      </main>

      <Footer onCategorySelect={onCategorySelect} />
    </div>
  )
}
