import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <ShoppingCart size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">سلة المشتريات فارغة</h2>
        <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات للسلة بعد.</p>
        <Link to="/" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors">
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">سلة المشتريات</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-center gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
              
              <div className="flex-1 text-center sm:text-right">
                <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                <p className="text-primary font-medium" dir="ltr">{item.price} MAD</p>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 hover:bg-white rounded-md shadow-sm transition-all"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-white rounded-md shadow-sm transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                title="حذف المنتج"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
            <h2 className="text-xl font-bold mb-6 border-b pb-4">ملخص الطلب</h2>
            
            <div className="flex justify-between mb-2 text-gray-600">
              <span>مجموع المنتجات</span>
              <span dir="ltr">{total.toLocaleString()} MAD</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>الشحن</span>
              <span className="text-green-600 font-medium">مجاني</span>
            </div>
            
            <div className="flex justify-between mb-8 text-xl font-bold text-gray-900 border-t pt-4">
              <span>الإجمالي</span>
              <span dir="ltr">{total.toLocaleString()} MAD</span>
            </div>

            <Link 
              to="/checkout"
              className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg"
            >
              إتمام الطلب
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;