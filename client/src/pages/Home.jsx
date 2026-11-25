import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Could not load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-4 py-12">
      {/* Top Header */}
      <header className="flex flex-col items-center text-center mb-12">
        <img
          src="/images/logo.png"
          alt="Power Zenox Logo"
          className="w-24 h-24 rounded-full border-2 border-amber-500/70 object-cover mb-4"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
          Welcome to Power Zenox
        </h1>
        <span className="bg-[#1d4ed8] text-white text-xs font-semibold px-3 py-1 rounded">
          Explore our premium products
        </span>
      </header>

      {/* Product Grid */}
      <main className="w-full max-w-4xl">
        {loading && (
          <p className="text-center text-neutral-400 text-sm">Loading products...</p>
        )}

        {error && (
          <p className="text-center text-red-400 text-sm">{error}</p>
        )}

        {!loading && !error && (
          <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#141414] rounded-xl overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5 text-center">
                  <h2 className="text-lg font-bold text-white mb-2">
                    {product.name}
                  </h2>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-[#ef4444] text-sm font-semibold inline-block hover:underline"
                  >
                    বিস্তারিত &gt;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
