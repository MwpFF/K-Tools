import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersApi } from '../services/api';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cart, clearCart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (cart.length === 0) return;

    setLoading(true);
    try {
      const results = [];
      for (const item of cart) {
        const orderData = {
          productCode: item.code,
          quantity: 1,
          unitPrice: item.price,
        };
        const order = await ordersApi.createOrder(orderData);
        results.push(order);
      }
      const ids = results.map((o) => o.id).join(', ');
      alert(`Заказы созданы: #${ids}. Статусы обновятся после обработки.`);
      clearCart();
    } catch (error) {
      alert('Ошибка при создании заказа: ' + error.message);
    }
    setLoading(false);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6 pt-8 sm:pt-24 text-center">
        <div className="text-6xl mb-8">🛒</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Корзина пуста
        </h2>
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pt-8 sm:pt-24">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">
        Корзина
      </h1>

      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
        {cart.map((item, index) => (
          <div
            key={`${item.code}-${index}`}
            className="flex flex-wrap justify-between items-center py-4 sm:py-6 border-b last:border-b-0 gap-2"
          >
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-semibold truncate">
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm">Арт.: {item.code}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {Number(item.price).toLocaleString('ru-RU')} ₽
              </p>
              <button
                type="button"
                onClick={() => removeFromCart(index)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
                aria-label="Удалить"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8">
        <div className="flex justify-between items-center text-2xl sm:text-3xl font-bold mb-8">
          <span>Итого:</span>
          <span className="text-blue-600">
            {total.toLocaleString('ru-RU')} ₽
          </span>
        </div>

        <button
          type="button"
          onClick={placeOrder}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-5 sm:py-6 rounded-2xl text-lg sm:text-xl font-bold hover:from-green-600 hover:to-green-700 disabled:opacity-50 transform hover:scale-[1.02] transition-all duration-200 shadow-2xl"
        >
          {loading
            ? 'Создание заказа...'
            : `Оформить заказ (${cart.length} ${cart.length === 1 ? 'товар' : 'товаров'})`}
        </button>
      </div>
    </div>
  );
}
