export default function Menu({ onCategorySelect, selectedCategory }) {
  // Categorías de Platzi API con traducciones
  // Platzi devuelve: 1=Clothes, 2=Electronics, 3=Furniture, 4=Shoes, 5=Miscellaneous
  const categories = [
    { id: 'todos', name: 'Todos', apiName: null },
    { id: '2', name: '🔌 Electrónica', apiName: '2' },
    { id: '1', name: '👕 Ropa', apiName: '1' },
    { id: '3', name: '🛋️ Muebles', apiName: '3' },
    { id: '4', name: '👟 Zapatos', apiName: '4' },
    { id: '5', name: '🎁 Otros', apiName: '5' },
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
