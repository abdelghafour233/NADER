import React from 'react';
import { useStore } from '../store';

const Footer: React.FC = () => {
    const { storeSettings } = useStore();
    return (
        <footer className="bg-secondary text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="mb-2 font-bold text-lg">{storeSettings.storeName}</p>
                <p className="text-sm">جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
                <p className="text-xs mt-4 text-gray-500">تم التطوير باستخدام React & Tailwind</p>
            </div>
        </footer>
    );
};

export default Footer;