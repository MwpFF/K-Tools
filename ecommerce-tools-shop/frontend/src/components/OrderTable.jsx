import { Link } from 'react-router-dom';

const statusStyles = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  RESERVED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default function OrderTable({ orders }) {
  return (
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="p-4 sm:p-6 text-left font-semibold text-gray-800">
                ID заказа
              </th>
              <th className="p-4 sm:p-6 text-left font-semibold text-gray-800">
                Товар
              </th>
              <th className="p-4 sm:p-6 text-left font-semibold text-gray-800">
                Статус
              </th>
              <th className="p-4 sm:p-6 text-left font-semibold text-gray-800">
                Сумма
              </th>
              <th className="p-4 sm:p-6 text-left font-semibold text-gray-800">
                Дата
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 sm:p-6 font-mono text-lg">
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    #{order.id}
                  </Link>
                </td>
                <td className="p-4 sm:p-6 font-medium">
                  {order.productName || order.productCode}
                </td>
                <td className="p-4 sm:p-6">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                      statusStyles[order.status] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4 sm:p-6 font-bold text-xl sm:text-2xl text-blue-600">
                  {Number(order.totalPrice || 0).toLocaleString('ru-RU')} ₽
                </td>
                <td className="p-4 sm:p-6 text-gray-500">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString('ru-RU')
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
