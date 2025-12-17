import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { MOROCCAN_CITIES } from '../constants';
import { CheckCircle } from 'lucide-react';
import { Order } from '../types';

const Checkout: React.FC = () => {
  const { cart, clearCart, addOrder, storeSettings } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: MOROCCAN_CITIES[0],
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      customerName: formData.name,
      city: formData.city,
      phone: formData.phone,
      items: cart,
      total: total,
      date: new Date().toISOString(),
      status: 'pending'
    };

    // Simulate network delay
    setTimeout(() => {
      addOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (cart.length === 0 && !isSuccess) {
    navigate('/');
    return null;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-2">شكراً لطلبك!</h2>
          <p className="text-gray-600 mb-6">تم استلام طلبك بنجاح. سنتصل بك قريباً لتأكيد الطلب.</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-emerald-700"
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">تأكيد الطلب</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow-md order-2 md:order-1">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm">1</span>
            بيانات الشحن
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">الاسم الكامل</label>
              <input 
                type="text" 
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="أدخل اسمك الكامل"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">رقم الهاتف</label>
              <input 
                type="tel" 
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="06XXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">المدينة</label>
              <select 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              >
                {MOROCCAN_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg mt-6 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  جاري المعالجة...
                </>
              ) : 'تأكيد الطلب'}
            </button>
          </form>
        </div>

        {/* Order Preview */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 order-1 md:order-2 h-fit">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm">2</span>
            ملخص الطلب
          </h2>
          
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative">
                   <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                   <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-800 line-clamp-2">{item.name}</h4>
                  <p className="text-gray-500 text-sm" dir="ltr">{item.price} MAD</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 flex justify-between items-center text-xl font-bold">
            <span>المبلغ الإجمالي</span>
            <span className="text-primary" dir="ltr">{total.toLocaleString()} MAD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;