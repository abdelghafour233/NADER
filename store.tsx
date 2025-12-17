import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, Product, CartItem, Order, PixelSettings, StoreSettings } from './types';
import { INITIAL_PRODUCTS, INITIAL_PIXEL_SETTINGS, INITIAL_STORE_SETTINGS } from './constants';

const StoreContext = createContext<AppState | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [pixelSettings, setPixelSettings] = useState<PixelSettings>(INITIAL_PIXEL_SETTINGS);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(INITIAL_STORE_SETTINGS);

  // Load state from local storage on mount (simulating persistence)
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    const savedOrders = localStorage.getItem('orders');
    const savedPixels = localStorage.getItem('pixelSettings');
    const savedSettings = localStorage.getItem('storeSettings');

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedPixels) setPixelSettings(JSON.parse(savedPixels));
    if (savedSettings) setStoreSettings(JSON.parse(savedSettings));
  }, []);

  // Save changes to local storage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('pixelSettings', JSON.stringify(pixelSettings));
  }, [pixelSettings]);
  
  useEffect(() => {
    localStorage.setItem('storeSettings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  // Inject scripts when pixel settings change
  useEffect(() => {
    if (pixelSettings.customHeadScript) {
      try {
        // Warning: executing strings as scripts is risky, but requested by user feature.
        // In a real app, use safe injection or GTM.
        // For this demo, we just log that we would inject it.
        console.log('Injecting custom scripts:', pixelSettings.customHeadScript);
      } catch (e) {
        console.error('Error injecting scripts', e);
      }
    }
  }, [pixelSettings]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    // Simulate Google Sheets Export if configured
    if (storeSettings.googleSheetWebhook) {
      console.log(`Sending order ${order.id} to Google Sheets webhook: ${storeSettings.googleSheetWebhook}`);
    }
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePixelSettingsState = (settings: PixelSettings) => {
    setPixelSettings(settings);
  };
  
  const updateStoreSettingsState = (settings: StoreSettings) => {
    setStoreSettings(settings);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        pixelSettings,
        storeSettings,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        updatePixelSettings: updatePixelSettingsState,
        updateStoreSettings: updateStoreSettingsState
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};