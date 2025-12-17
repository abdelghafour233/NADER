import React, { useState } from 'react';
import { useStore } from '../../store';
import { Save } from 'lucide-react';

const SettingsManager: React.FC = () => {
  const { pixelSettings, updatePixelSettings, storeSettings, updateStoreSettings } = useStore();
  
  const [pixels, setPixels] = useState(pixelSettings);
  const [store, setStore] = useState(storeSettings);

  const handleSavePixels = (e: React.FormEvent) => {
    e.preventDefault();
    updatePixelSettings(pixels);
    alert('تم حفظ إعدادات التتبع بنجاح');
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(store);
    alert('تم حفظ إعدادات المتجر بنجاح');
  };

  return (
    <div className="space-y-8">
      {/* Store & Domain Settings */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold mb-4 pb-2 border-b">إعدادات المتجر والدومين</h3>
        <form onSubmit={handleSaveStore} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">اسم المتجر</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded" 
                value={store.storeName}
                onChange={e => setStore({...store, storeName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الدومين (Domain Name)</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded" 
                value={store.domain}
                onChange={e => setStore({...store, domain: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">رابط Google Apps Script Webhook (للربط مع Google Sheets)</label>
            <input 
              type="text" 
              className="w-full border p-2 rounded font-mono text-sm text-gray-600" 
              placeholder="https://script.google.com/macros/s/..."
              value={store.googleSheetWebhook}
              onChange={e => setStore({...store, googleSheetWebhook: e.target.value})}
            />
            <p className="text-xs text-gray-500 mt-1">سيتم إرسال بيانات الطلبات الجديدة تلقائياً إلى هذا الرابط.</p>
          </div>
          <button type="submit" className="bg-secondary text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-700">
            <Save size={18} />
            <span>حفظ الإعدادات</span>
          </button>
        </form>
      </div>

      {/* Tracking Pixels */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold mb-4 pb-2 border-b">أكواد التتبع والبيكسل</h3>
        <form onSubmit={handleSavePixels} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Facebook Pixel ID</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded" 
                placeholder="1234567890"
                value={pixels.facebookPixelId}
                onChange={e => setPixels({...pixels, facebookPixelId: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">TikTok Pixel ID</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded" 
                placeholder="C5.................."
                value={pixels.tiktokPixelId}
                onChange={e => setPixels({...pixels, tiktokPixelId: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Google Analytics / GTM ID</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded" 
                placeholder="G-XXXXXXXXXX"
                value={pixels.googleAnalyticsId}
                onChange={e => setPixels({...pixels, googleAnalyticsId: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Custom JavaScript (Header)</label>
            <textarea 
              className="w-full border p-2 rounded font-mono text-sm h-32" 
              placeholder="<script>...</script>"
              value={pixels.customHeadScript}
              onChange={e => setPixels({...pixels, customHeadScript: e.target.value})}
            />
            <p className="text-xs text-red-500 mt-1">تنبيه: أضف فقط الأكواد الموثوقة. الأكواد الخاطئة قد تعطل الموقع.</p>
          </div>

          <button type="submit" className="bg-secondary text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-700">
            <Save size={18} />
            <span>حفظ البيكسل</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsManager;