export default function ProductCard({ tool, onAdd }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <div className="w-48 h-48 rounded-xl shadow-md bg-white flex items-center justify-center text-6xl text-gray-300">
          🔧
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {tool.name}
        </h3>
        <div className="text-3xl font-bold text-blue-600 mb-6">
          {Number(tool.price).toLocaleString('ru-RU')} ₽
        </div>
        <button
          type="button"
          onClick={() => onAdd(tool)}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}
