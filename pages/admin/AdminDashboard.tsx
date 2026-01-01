import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Settings, FileDown, Github } from 'lucide-react';
import ProductManager from './ProductManager';
import OrderManager from './OrderManager';
import SettingsManager from './SettingsManager';
import { useStore } from '../../store';
import ProjectDownloader from '../../components/ProjectDownloader';

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const { storeSettings } = useStore();

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md z-10">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">لوحة التحكم</h2>
          <p className="text-xs text-gray-500 mt-1">{storeSettings.domain}</p>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink to="/admin" icon={<LayoutDashboard size={20} />} label="نظرة عامة" active={location.pathname === '/admin'} />
          <NavLink to="/admin/products" icon={<Package size={20} />} label="المنتجات" active={location.pathname === '/admin/products'} />
          <NavLink to="/admin/orders" icon={<ShoppingBag size={20} />} label="الطلبات" active={location.pathname === '/admin/orders'} />
          <NavLink to="/admin/settings" icon={<Settings size={20} />} label="الإعدادات والبيكسل" active={location.pathname === '/admin/settings'} />
          
          <div className="pt-8 px-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 px-2">تصدير الموقع</h3>
             <NavLink to="/admin/download" icon={<Github size={20} />} label="تحميل للكود (GitHub)" active={location.pathname === '/admin/download'} />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/products" element={<ProductManager />} />
          <Route path="/orders" element={<OrderManager />} />
          <Route path="/settings" element={<SettingsManager />} />
          <Route path="/download" element={<ProjectDownloader />} />
        </Routes>
      </main>
    </div>
  );
};

const NavLink = ({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

const DashboardOverview = () => {
  const { orders, products } = useStore();
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">نظرة عامة</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="إجمالي المبيعات" value={`${totalRevenue.toLocaleString()} MAD`} color="bg-blue-500" />
        <StatCard title="الطلبات الجديدة" value={pendingOrders.toString()} color="bg-orange-500" />
        <StatCard title="عدد المنتجات" value={products.length.toString()} color="bg-emerald-500" />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-lg mb-4">أحدث الطلبات</h3>
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="p-3">رقم الطلب</th>
                  <th className="p-3">العميل</th>
                  <th className="p-3">المبلغ</th>
                  <th className="p-3">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.slice(0, 5).map(order => (
                  <tr key={order.id}>
                    <td className="p-3 text-gray-500">#{order.id}</td>
                    <td className="p-3 font-medium">{order.customerName}</td>
                    <td className="p-3" dir="ltr">{order.total} MAD</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${order.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                        {order.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">لا توجد طلبات حتى الآن.</p>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }: { title: string, value: string, color: string }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border-r-4 border-r-transparent hover:border-r-current transition-all overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-1 h-full ${color}`}></div>
    <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
    <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
  </div>
);

export default AdminDashboard;