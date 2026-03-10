import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const location = useLocation();

  const linkClass = (path) =>
    `hover:text-blue-600 transition-colors ${location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-700'}`;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            K-Tools
          </Link>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/" className={linkClass('/')}>
              Каталог
            </Link>
            <Link to="/cart" className={linkClass('/cart')}>
              Корзина ({cart.length})
            </Link>
            <Link to="/orders" className={linkClass('/orders')}>
              Заказы
            </Link>
            <Link to="/profile" className={linkClass('/profile')}>
              Профиль
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
