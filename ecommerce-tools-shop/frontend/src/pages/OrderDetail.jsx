import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ordersApi } from '../services/api';

const statusLabels = {
  PENDING: 'Ожидает обработки',
  RESERVED: 'Зарезервировано',
  CANCELLED: 'Отменён',
};

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    ordersApi
      .getOrder(id)
      .then(setOrder)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 pt-8 sm:pt-24 flex justify-center items-center min-h-[16rem]">
        <div className="text-xl text-gray-600">Загрузка заказа...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-6 pt-8 sm:pt-24 text-center">
        <div className="text-red-600 text-lg mb-4">
          {error || 'Заказ не найден'}
        </div>
        <Link to="/orders" className="text-blue-600 hover:underline">
          ← К списку заказов
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 pt-8 sm:pt-24 max-w-2xl">
      <Link
        to="/orders"
        className="inline-block text-blue-600 hover:text-blue-800 mb-8"
      >
        ← К списку заказов
      </Link>
      <h1 className="text-3xl font-bold mb-8">Заказ #{order.id}</h1>
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Статус</span>
          <span
            className={`font-semibold px-4 py-2 rounded-full ${
              order.status === 'RESERVED'
                ? 'bg-green-100 text-green-800'
                : order.status === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
            }`}
          >
            {statusLabels[order.status] ?? order.status}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Товар</span>
          <span className="font-medium">
            {order.productName || order.productCode}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Количество</span>
          <span className="font-medium">{order.quantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Цена за ед.</span>
          <span className="font-medium">
            {Number(order.unitPrice || 0).toLocaleString('ru-RU')} ₽
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-4 border-t">
          <span>Сумма</span>
          <span className="text-blue-600">
            {Number(order.totalPrice || 0).toLocaleString('ru-RU')} ₽
          </span>
        </div>
        {order.createdAt && (
          <div className="text-gray-500 text-sm pt-2">
            Создан:{' '}
            {new Date(order.createdAt).toLocaleString('ru-RU')}
          </div>
        )}
      </div>
    </div>
  );
}
