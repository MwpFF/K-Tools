export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-6 pt-8 sm:pt-24 max-w-2xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">
        Профиль
      </h1>

      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
        <div className="text-center mb-10 sm:mb-12">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl">👤</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Менеджер
          </h2>
          <p className="text-gray-600">manager@k-tools.ru</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between p-4 sm:p-6 bg-gray-50 rounded-2xl">
            <span className="text-gray-700">Всего заказов</span>
            <span className="font-bold text-xl sm:text-2xl text-blue-600">
              12
            </span>
          </div>
          <div className="flex justify-between p-4 sm:p-6 bg-gray-50 rounded-2xl">
            <span className="text-gray-700">Сумма заказов</span>
            <span className="font-bold text-xl sm:text-2xl text-green-600">
              1 245 000 ₽
            </span>
          </div>
          <div className="flex justify-between p-4 sm:p-6 bg-gray-50 rounded-2xl">
            <span className="text-gray-700">Средний чек</span>
            <span className="font-bold text-lg sm:text-xl text-purple-600">
              103 750 ₽
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
