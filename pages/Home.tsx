import React, { useState } from 'react';
import { useStore } from '../store';
import { Category } from '../types';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { products, addToCart, storeSettings } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">أفضل العروض في {storeSettings.storeName}</h1>
          <p className="text-xl opacity-90 mb-8">تسوق أحدث المنتجات الإلكترونية والمنزلية ومستلزمات السيارات بأفضل الأسعار</p>
          <a href="#products" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
            تصفح المنتجات
          </a>
        </div>
      </div>

      {/* Categories Filter */}
      <div id="products" className="max-w-7xl mx-auto px-4 mt-12 mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-2 rounded-full border transition-all ${selectedCategory === 'All' ? 'bg-secondary text-white border-secondary' : 'bg-white text-gray-600 border-gray-300 hover:border-secondary'}`}
          >
            الكل
          </button>
          {Object.values(Category).map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full border transition-all ${selectedCategory === cat ? 'bg-secondary text-white border-secondary' : 'bg-white text-gray-600 border-gray-300 hover:border-secondary'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 left-2 bg-white/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-700">
                  {product.category}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
                <p className="text-primary font-bold text-xl mb-4" dir="ltr">{product.price.toLocaleString()} MAD</p>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
                  >
                    <ShoppingCart size={18} />
                    <span>أضف للسلة</span>
                  </button>
                  <Link 
                    to={`/product/${product.id}`}
                    className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <Eye size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            لا توجد منتجات في هذا القسم حالياً.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;