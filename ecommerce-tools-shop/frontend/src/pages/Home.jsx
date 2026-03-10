import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';

const tools = [
  {
    id: 1,
    code: 'PERF001',
    name: 'Перфоратор Bosch GBH 2-28',
    price: 25000,
  },
  {
    id: 2,
    code: 'SAW001',
    name: 'Лобзик Makita DJV180',
    price: 12000,
  },
  {
    id: 3,
    code: 'DRILL001',
    name: 'Дрель-шуруповерт DeWalt DCD791',
    price: 18000,
  },
];

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 pt-8 sm:pt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Строительные инструменты
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Профессиональное оборудование для строительства и ремонта
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {tools.map((tool) => (
          <ProductCard key={tool.id} tool={tool} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}
