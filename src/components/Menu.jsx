export default function Menu({ onCategorySelect, selectedCategory }) {
  // Categorías de Platzi API
  const categories = [
    { id: 'todos', name: 'Todos', categoryId: null },
    { id: 'electronics', name: 'Electrónica', categoryId: 2 },
    { id: 'clothes', name: 'Ropa', categoryId: 1 },
    { id: 'furniture', name: 'Muebles', categoryId: 3 },
    { id: 'shoes', name: 'Zapatos', categoryId: 4 },
    { id: 'miscellaneous', name: 'Otros', categoryId: 5 },
  ]

  return (
    <div className="bg-white border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition ${
                selectedCategory === category.id
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
