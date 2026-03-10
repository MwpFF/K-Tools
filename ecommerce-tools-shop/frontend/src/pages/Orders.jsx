import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersApi } from '../services/api';
import OrderTable from '../components/OrderTable';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ordersApi
      .getOrders()
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 pt-8 sm:pt-24 flex justify-center items-center min-h-[16rem]">
        <div className="text-xl sm:text-2xl text-gray-600">
          Загрузка заказов...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 pt-8 sm:pt-24 text-center">
        <div className="text-red-600 text-lg sm:text-xl mb-4">
          Ошибка: {error}
        </div>
        <p className="text-gray-600 mb-4">
          Убедитесь, что Order Service запущен на localhost:8080.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
        >
          Повторить
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 pt-8 sm:pt-24">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">
        Мои заказы
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 sm:py-24">
          <div className="text-6xl mb-8">📋</div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-600 mb-4">
            Заказы отсутствуют
          </h2>
          <Link
            to="/"
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600"
          >
            Сделать первый заказ
          </Link>
        </div>
      ) : (
        <OrderTable orders={orders} />
      )}
    </div>
  );
}
