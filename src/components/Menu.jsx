export default function Menu({ onCategorySelect, selectedCategory }) {
  // Categorías reales de FakeStore API con traducciones
  const categories = [
    { id: 'todos', name: 'Todos', apiName: null },
    { id: 'electronics', name: 'Electrónica', apiName: 'electronics' },
    { id: 'jewelery', name: 'Joyería', apiName: 'jewelery' },
    { id: "men's clothing", name: "Hombre", apiName: "men's clothing" },
    { id: "women's clothing", name: "Mujer", apiName: "women's clothing" },
  ]

  return (
    <div className="bg-white border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.apiName || 'todos')}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition ${
                selectedCategory === (category.apiName || 'todos')
                  ? 'text-ml-blue border-b-2 border-ml-blue'
                  : 'text-gray-700 hover:text-ml-blue'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
