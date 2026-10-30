import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  CartItem,
  SpecialOffer,
  CustomerOrder,
  Review,
  FoodCategory,
  OrderStatus,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_MENU_ITEMS,
  INITIAL_SPECIAL_OFFERS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS,
} from '../data/initialData';

interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'error';
}

interface RestaurantContextType {
  // Menu
  categories: FoodCategory[];
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updated: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  addCategory: (categoryName: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, notes?: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;

  // Special Offers
  specialOffers: SpecialOffer[];
  addSpecialOffer: (offer: Omit<SpecialOffer, 'id'>) => void;
  updateSpecialOffer: (id: string, updated: Partial<SpecialOffer>) => void;
  deleteSpecialOffer: (id: string) => void;
  toggleOfferStatus: (id: string) => void;
  claimOfferDeal: (offer: SpecialOffer) => void;

  // Orders
  orders: CustomerOrder[];
  createOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    paymentMethod: 'cod' | 'card' | 'online';
    orderNotes?: string;
  }) => CustomerOrder;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'verifiedDiner'>) => void;

  // Admin
  isAdmin: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;

  // Modals / Drawer UI States
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAdminLoginOpen: boolean;
  setIsAdminLoginOpen: (open: boolean) => void;
  isAdminDashboardOpen: boolean;
  setIsAdminDashboardOpen: (open: boolean) => void;
  selectedMenuItem: MenuItem | null;
  setSelectedMenuItem: (item: MenuItem | null) => void;
  lastConfirmedOrder: CustomerOrder | null;
  setLastConfirmedOrder: (order: CustomerOrder | null) => void;

  // Feedback Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;

  // Reset
  resetAllDataToDefault: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Categories
  const [categories, setCategories] = useState<FoodCategory[]>(() => {
    const saved = localStorage.getItem('flavora_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // Menu Items
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('flavora_menu_items');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  // Special Offers
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>(() => {
    const saved = localStorage.getItem('flavora_special_offers');
    return saved ? JSON.parse(saved) : INITIAL_SPECIAL_OFFERS;
  });

  // Orders
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    const saved = localStorage.getItem('flavora_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('flavora_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('flavora_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Promo
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Admin
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('flavora_is_admin') === 'true';
  });

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [lastConfirmedOrder, setLastConfirmedOrder] = useState<CustomerOrder | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem('flavora_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('flavora_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('flavora_special_offers', JSON.stringify(specialOffers));
  }, [specialOffers]);

  useEffect(() => {
    localStorage.setItem('flavora_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('flavora_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('flavora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('flavora_is_admin', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Menu Operations
  const addMenuItem = (itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: 'item-' + Date.now().toString(),
    };
    setMenuItems((prev) => [newItem, ...prev]);
    showToast('Menu Item Added', `"${newItem.name}" is now live on the menu.`);
  };

  const updateMenuItem = (id: string, updated: Partial<MenuItem>) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    showToast('Item Updated', 'Changes have been saved successfully.');
  };

  const deleteMenuItem = (id: string) => {
    const item = menuItems.find((m) => m.id === id);
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
    showToast('Item Removed', `"${item?.name || 'Item'}" was removed from the menu.`);
  };

  const addCategory = (categoryName: string) => {
    const trimmed = categoryName.trim();
    if (!trimmed) return;
    if (categories.includes(trimmed as FoodCategory)) {
      showToast('Category Exists', 'This category is already registered.', 'error');
      return;
    }
    setCategories((prev) => [...prev, trimmed as FoodCategory]);
    showToast('Category Created', `Category "${trimmed}" added successfully.`);
  };

  // Cart Operations
  const addToCart = (item: MenuItem, quantity = 1, notes?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.item.id === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          notes: notes || next[existingIndex].notes,
        };
        return next;
      } else {
        return [...prev, { item, quantity, notes }];
      }
    });
    showToast('Added to Cart', `${item.name} (${quantity}x) added.`, 'success');
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
    showToast('Item Removed', 'Removed item from shopping bag.');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);
  const subtotal = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  // Free delivery threshold: $50
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 50 ? 0 : 4.99;
  const discount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FLAVORA10' || clean === 'TASTE10') {
      setPromoCode(clean);
      setDiscountPercent(10);
      showToast('Promo Code Applied!', '10% discount applied to your order.');
      return true;
    } else if (clean === 'VIP20') {
      setPromoCode(clean);
      setDiscountPercent(20);
      showToast('VIP Promo Applied!', '20% VIP discount applied.');
      return true;
    } else {
      showToast('Invalid Promo Code', 'Try "FLAVORA10" for 10% off.', 'error');
      return false;
    }
  };

  // Special Offers
  const addSpecialOffer = (offerData: Omit<SpecialOffer, 'id'>) => {
    const newOffer: SpecialOffer = {
      ...offerData,
      id: 'deal-' + Date.now().toString(),
    };
    setSpecialOffers((prev) => [newOffer, ...prev]);
    showToast('Special Offer Published', `"${newOffer.title}" is now active.`);
  };

  const updateSpecialOffer = (id: string, updated: Partial<SpecialOffer>) => {
    setSpecialOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...updated } : o)));
    showToast('Offer Updated', 'Deal changes have been saved.');
  };

  const deleteSpecialOffer = (id: string) => {
    setSpecialOffers((prev) => prev.filter((o) => o.id !== id));
    showToast('Offer Removed', 'The deal has been deleted.');
  };

  const toggleOfferStatus = (id: string) => {
    setSpecialOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isActive: !o.isActive } : o))
    );
  };

  const claimOfferDeal = (offer: SpecialOffer) => {
    // Creates a combo item and adds to cart
    const comboMenuItem: MenuItem = {
      id: `combo-${offer.id}`,
      name: `${offer.title} (Combo Deal)`,
      category: 'Fast Food',
      description: offer.description,
      price: offer.price,
      image: offer.image,
      isChefSpecial: true,
      preparationTime: '20-25 min',
    };
    addToCart(comboMenuItem, 1);
    setIsCartOpen(true);
  };

  // Orders
  const createOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    paymentMethod: 'cod' | 'card' | 'online';
    orderNotes?: string;
  }): CustomerOrder => {
    const newOrder: CustomerOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      ...orderData,
      items: cart.map((ci) => ({
        id: ci.item.id,
        name: ci.item.name,
        quantity: ci.quantity,
        price: ci.item.price,
      })),
      subtotal,
      deliveryFee,
      discount,
      total,
      status: 'Pending',
      createdAt: 'Just now',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastConfirmedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    showToast('Order Placed Successfully!', `Order #${newOrder.id} is being processed by the kitchen.`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast('Order Status Updated', `Order #${orderId} marked as "${status}".`);
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
    showToast('Order Deleted', `Order #${orderId} has been archived.`);
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'verifiedDiner'>) => {
    const newRev: Review = {
      ...reviewData,
      id: 'rev-' + Date.now().toString(),
      date: 'Just now',
      verifiedDiner: true,
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Review Submitted!', 'Thank you for sharing your FLAVORA dining experience.');
  };

  // Admin Auth
  const adminLogin = (password: string): boolean => {
    if (password === 'flavora2026' || password === 'admin' || password === 'admin123') {
      setIsAdmin(true);
      setIsAdminLoginOpen(false);
      setIsAdminDashboardOpen(true);
      showToast('Welcome, Chef / Admin', 'Admin access unlocked successfully.');
      return true;
    } else {
      showToast('Access Denied', 'Incorrect password. (Hint: flavora2026)', 'error');
      return false;
    }
  };

  const adminLogout = () => {
    setIsAdmin(false);
    setIsAdminDashboardOpen(false);
    showToast('Logged Out', 'Admin session terminated.');
  };

  // Reset to default
  const resetAllDataToDefault = () => {
    setCategories(INITIAL_CATEGORIES);
    setMenuItems(INITIAL_MENU_ITEMS);
    setSpecialOffers(INITIAL_SPECIAL_OFFERS);
    setOrders(INITIAL_ORDERS);
    setReviews(INITIAL_REVIEWS);
    setCart([]);
    localStorage.removeItem('flavora_categories');
    localStorage.removeItem('flavora_menu_items');
    localStorage.removeItem('flavora_special_offers');
    localStorage.removeItem('flavora_orders');
    localStorage.removeItem('flavora_reviews');
    localStorage.removeItem('flavora_cart');
    showToast('System Reset', 'All menu items and sample orders restored to factory defaults.');
  };

  return (
    <RestaurantContext.Provider
      value={{
        categories,
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addCategory,

        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        discount,
        total,
        promoCode,
        applyPromoCode,

        specialOffers,
        addSpecialOffer,
        updateSpecialOffer,
        deleteSpecialOffer,
        toggleOfferStatus,
        claimOfferDeal,

        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,

        reviews,
        addReview,

        isAdmin,
        adminLogin,
        adminLogout,

        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        isAdminDashboardOpen,
        setIsAdminDashboardOpen,
        selectedMenuItem,
        setSelectedMenuItem,
        lastConfirmedOrder,
        setLastConfirmedOrder,

        toasts,
        showToast,
        dismissToast,

        resetAllDataToDefault,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
