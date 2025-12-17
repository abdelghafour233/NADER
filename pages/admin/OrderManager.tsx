import React from 'react';
import { useStore } from '../../store';

const OrderManager: React.FC = () => {
  const { orders } = useStore();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">إدارة الطلبات</h2>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">التاريخ</th>
              <th className="p-4">اسم العميل</th>
              <th className="p-4">المدينة</th>
              <th className="p-4">الهاتف</th>
              <th className="p-4">المنتجات</th>
              <th className="p-4">الإجمالي</th>
              <th className="p-4">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 text-sm">
                <td className="p-4">{order.id}</td>
                <td className="p-4 text-gray-500">{new Date(order.date).toLocaleDateString('ar-MA')}</td>
                <td className="p-4 font-bold">{order.customerName}</td>
                <td className="p-4">{order.city}</td>
                <td className="p-4" dir="ltr">{order.phone}</td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    {order.items.map(item => (
                      <span key={item.id} className="text-xs text-gray-600">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 font-bold text-primary" dir="ltr">{order.total} MAD</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${order.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                    {order.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}
                  </span>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
                <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">لا توجد طلبات لعرضها</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManager;