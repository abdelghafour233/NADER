import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">المنتج غير موجود</h2>
        <Link to="/" className="text-primary hover:underline">العودة للصفحة الرئيسية</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
        <ArrowRight size={20} />
        <span>العودة للمتجر</span>
      </Link>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-96 md:h-[500px] bg-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="text-sm text-primary font-bold bg-primary/10 px-3 py-1 rounded-full w-fit mb-4">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto">
              <span className="text-3xl font-bold text-gray-900" dir="ltr">{product.price.toLocaleString()} MAD</span>
              
              <button 
                onClick={() => addToCart(product)}
                className="w-full sm:w-auto flex-1 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
              >
                <ShoppingCart size={24} />
                أضف إلى سلة المشتريات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;