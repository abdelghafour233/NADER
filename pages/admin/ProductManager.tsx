import React, { useState } from 'react';
import { useStore } from '../../store';
import { Category, Product } from '../../types';
import { Plus, Trash2, Edit2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ProductManager: React.FC = () => {
  const { products, addProduct, deleteProduct, updateProduct } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/400/400',
    description: '',
    stock: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct({ ...formData, id: editingId });
    } else {
      addProduct({ ...formData, id: Math.random().toString(36).substr(2, 9) });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      category: Category.ELECTRONICS,
      image: 'https://picsum.photos/400/400',
      description: '',
      stock: 0,
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product.id);
    setIsFormOpen(true);
  };

  // AI Description Generator (Simulated if no key, or Real if key exists)
  const generateDescription = async () => {
    if (!formData.name) return alert('الرجاء إدخال اسم المنتج أولاً');
    
    setLoadingAI(true);
    try {
      if (process.env.API_KEY) {
         const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
         const prompt = `Write a compelling Arabic sales description for a product named "${formData.name}" in the category "${formData.category}". Keep it concise (under 200 characters) and marketing-focused.`;
         
         const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
         });
         
         if (response.text) {
             setFormData(prev => ({...prev, description: response.text.trim()}));
         }
      } else {
         // Fallback if no API key provided in environment for this demo
         setTimeout(() => {
            const descs = [
               "منتج عالي الجودة يضمن لك أفضل تجربة استخدام مع ضمان شامل.",
               "تصميم عصري وأداء قوي يلبي جميع احتياجاتك اليومية.",
               "أفضل قيمة مقابل السعر في السوق المغربي حالياً."
            ];
            setFormData(prev => ({...prev, description: descs[Math.floor(Math.random() * descs.length)]}));
         }, 1000);
      }
    } catch (error) {
        console.error("AI Error", error);
        alert("حدث خطأ أثناء توليد الوصف");
    } finally {
        setLoadingAI(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة المنتجات</h2>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700"
        >
          <Plus size={20} />
          <span>إضافة منتج</span>
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
          <h3 className="font-bold text-lg mb-4">{editingId ? 'تعديل منتج' : 'إضافة منتج جديد'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">اسم المنتج</label>
              <input 
                type="text" 
                required 
                className="w-full border p-2 rounded" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">السعر (MAD)</label>
              <input 
                type="number" 
                required 
                className="w-full border p-2 rounded" 
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">التصنيف</label>
              <select 
                className="w-full border p-2 rounded"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as Category})}
              >
                {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
               <label className="block text-sm font-medium mb-1">رابط الصورة</label>
               <input 
                type="text" 
                required 
                className="w-full border p-2 rounded" 
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-1">
                 <label className="block text-sm font-medium">الوصف</label>
                 <button 
                    type="button" 
                    onClick={generateDescription}
                    disabled={loadingAI}
                    className="text-xs flex items-center gap-1 text-purple-600 font-bold hover:text-purple-800"
                 >
                    <Sparkles size={14} />
                    {loadingAI ? 'جاري الكتابة...' : 'اكتب لي وصفاً باستخدام AI'}
                 </button>
              </div>
              <textarea 
                required 
                className="w-full border p-2 rounded" 
                rows={3}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              <button type="button" onClick={resetForm} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">إلغاء</button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-emerald-700">حفظ المنتج</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4">المنتج</th>
              <th className="p-4">السعر</th>
              <th className="p-4">التصنيف</th>
              <th className="p-4">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={product.image} alt="" className="w-10 h-10 rounded object-cover" />
                  <span className="font-medium">{product.name}</span>
                </td>
                <td className="p-4" dir="ltr">{product.price} MAD</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={18} /></button>
                  <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;