import React, { useState, useMemo } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Tag,
  Grid,
  RotateCcw,
  LogOut,
  CheckCircle,
  Clock,
  Phone,
  MapPin,
  Flame,
  Search,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, FoodCategory, OrderStatus, SpecialOffer } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminDashboardOpen,
    setIsAdminDashboardOpen,
    adminLogout,
    categories,
    addCategory,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    orders,
    updateOrderStatus,
    deleteOrder,
    specialOffers,
    addSpecialOffer,
    updateSpecialOffer,
    deleteSpecialOffer,
    toggleOfferStatus,
    resetAllDataToDefault,
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'analytics' | 'menu' | 'orders' | 'offers' | 'categories'>('analytics');

  // Menu item add / edit modal state
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemFormData, setItemFormData] = useState<{
    name: string;
    category: FoodCategory;
    price: string;
    description: string;
    image: string;
    isChefSpecial: boolean;
    isPopular: boolean;
    isSpicy: boolean;
    isVegetarian: boolean;
    preparationTime: string;
    calories: string;
  }>({
    name: '',
    category: 'Pizza',
    price: '',
    description: '',
    image: '/src/assets/images/flavora_hero_gourmet_spread_1793366442649.jpg',
    isChefSpecial: false,
    isPopular: false,
    isSpicy: false,
    isVegetarian: false,
    preparationTime: '15 min',
    calories: '650',
  });

  // Category input state
  const [newCategoryName, setNewCategoryName] = useState('');

  // Special Offer add state
  const [isAddingOffer, setIsAddingOffer] = useState(false);
  const [offerFormData, setOfferFormData] = useState({
    title: '',
    subtitle: '',
    discountTag: 'Save 20%',
    price: '',
    originalPrice: '',
    description: '',
    includedItemsText: '',
    image: '/src/assets/images/flavora_hero_gourmet_spread_1793366442649.jpg',
    badge: 'Limited Offer',
  });

  // Search in admin menu
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedAdminCategory, setSelectedAdminCategory] = useState<string>('All');

  // Sales Analytics Calculations
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
    const activeOrders = orders.filter(
      (ord) => ord.status === 'Pending' || ord.status === 'Preparing' || ord.status === 'Out for Delivery'
    ).length;
    const deliveredCount = orders.filter((ord) => ord.status === 'Delivered').length;
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    return {
      totalRevenue,
      totalOrdersCount: orders.length,
      activeOrders,
      deliveredCount,
      avgOrderValue,
      totalMenuItems: menuItems.length,
      totalCategories: categories.length,
    };
  }, [orders, menuItems, categories]);

  if (!isAdminDashboardOpen) return null;

  // Open Edit Item Modal
  const handleOpenEditItem = (item: MenuItem) => {
    setEditingItemId(item.id);
    setItemFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
      image: item.image,
      isChefSpecial: !!item.isChefSpecial,
      isPopular: !!item.isPopular,
      isSpicy: !!item.isSpicy,
      isVegetarian: !!item.isVegetarian,
      preparationTime: item.preparationTime || '15 min',
      calories: item.calories ? item.calories.toString() : '650',
    });
    setIsEditingItem(true);
  };

  const handleOpenAddItem = () => {
    setEditingItemId(null);
    setItemFormData({
      name: '',
      category: categories[0] || 'Pizza',
      price: '',
      description: '',
      image: '/src/assets/images/flavora_hero_gourmet_spread_1793366442649.jpg',
      isChefSpecial: false,
      isPopular: false,
      isSpicy: false,
      isVegetarian: false,
      preparationTime: '15 min',
      calories: '650',
    });
    setIsEditingItem(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(itemFormData.price);
    if (!itemFormData.name || isNaN(priceNum)) return;

    if (editingItemId) {
      updateMenuItem(editingItemId, {
        name: itemFormData.name,
        category: itemFormData.category,
        price: priceNum,
        description: itemFormData.description,
        image: itemFormData.image,
        isChefSpecial: itemFormData.isChefSpecial,
        isPopular: itemFormData.isPopular,
        isSpicy: itemFormData.isSpicy,
        isVegetarian: itemFormData.isVegetarian,
        preparationTime: itemFormData.preparationTime,
        calories: parseInt(itemFormData.calories, 10) || undefined,
      });
    } else {
      addMenuItem({
        name: itemFormData.name,
        category: itemFormData.category,
        price: priceNum,
        description: itemFormData.description,
        image: itemFormData.image,
        isChefSpecial: itemFormData.isChefSpecial,
        isPopular: itemFormData.isPopular,
        isSpicy: itemFormData.isSpicy,
        isVegetarian: itemFormData.isVegetarian,
        preparationTime: itemFormData.preparationTime,
        calories: parseInt(itemFormData.calories, 10) || undefined,
      });
    }

    setIsEditingItem(false);
  };

  // Add Special Offer Submit
  const handleSaveSpecialOffer = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(offerFormData.price);
    const origNum = parseFloat(offerFormData.originalPrice) || priceNum * 1.25;
    if (!offerFormData.title || isNaN(priceNum)) return;

    const items = offerFormData.includedItemsText
      ? offerFormData.includedItemsText.split('\n').filter((t) => t.trim().length > 0)
      : ['1x Signature Dish', '1x Side & Drink'];

    addSpecialOffer({
      title: offerFormData.title,
      subtitle: offerFormData.subtitle || 'Chef Combo Deal',
      discountTag: offerFormData.discountTag || 'Special Price',
      price: priceNum,
      originalPrice: origNum,
      description: offerFormData.description,
      includedItems: items,
      image: offerFormData.image,
      badge: offerFormData.badge || 'Limited Edition',
      isActive: true,
    });

    setIsAddingOffer(false);
    setOfferFormData({
      title: '',
      subtitle: '',
      discountTag: 'Save 20%',
      price: '',
      originalPrice: '',
      description: '',
      includedItemsText: '',
      image: '/src/assets/images/flavora_hero_gourmet_spread_1793366442649.jpg',
      badge: 'Limited Offer',
    });
  };

  // Add category submit
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    addCategory(newCategoryName);
    setNewCategoryName('');
  };

  // Filtered menu for admin table
  const adminFilteredMenu = menuItems.filter((item) => {
    if (selectedAdminCategory !== 'All' && item.category !== selectedAdminCategory) return false;
    if (menuSearch.trim()) {
      const q = menuSearch.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#16171b] border border-[#2b2d35] rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 bg-[#1a1b1f] border-b border-[#262830] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f76707] to-[#e8590c] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#f76707]/30">
              F
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold text-[#f7f4ed]">
                  FLAVORA Executive Dashboard
                </h3>
                <span className="text-[10px] bg-[#f76707]/20 text-[#f76707] px-2 py-0.5 rounded font-mono font-semibold border border-[#f76707]/40">
                  Owner Portal
                </span>
              </div>
              <p className="text-xs text-[#ede7dd]/60">
                Menu Management, Live Kitchen Orders, Special Offers, and Sales Analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                if (window.confirm('Reset all menu items, orders, and deals back to original demo state?')) {
                  resetAllDataToDefault();
                }
              }}
              className="px-3 py-1.5 bg-[#22242a] hover:bg-[#282a32] text-[#ede7dd]/70 hover:text-white border border-[#2e313b] rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Reset sample data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>

            <button
              onClick={adminLogout}
              className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/40 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>

            <button
              onClick={() => setIsAdminDashboardOpen(false)}
              className="p-1.5 rounded-lg text-[#ede7dd]/60 hover:text-white hover:bg-[#22242a] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#121316] border-b border-[#262830] px-6 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'analytics', label: 'Sales Statistics', icon: TrendingUp },
            { id: 'menu', label: `Menu Items (${menuItems.length})`, icon: Grid },
            { id: 'orders', label: `Customer Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'offers', label: `Special Offers (${specialOffers.length})`, icon: Tag },
            { id: 'categories', label: `Categories (${categories.length})`, icon: Grid },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[#f76707] text-[#f76707]'
                    : 'border-transparent text-[#ede7dd]/60 hover:text-[#ede7dd]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: SALES & ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Metric Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#1a1b1f] border border-[#2b2d35] rounded-xl p-5">
                  <div className="flex items-center justify-between text-xs text-[#ede7dd]/60 mb-2">
                    <span>Total Sales Revenue</span>
                    <DollarSign className="w-4 h-4 text-[#f76707]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#f7f4ed] tabular-nums">
                    ${stats.totalRevenue.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-emerald-400 mt-1 block">
                    Calculated from all customer orders
                  </span>
                </div>

                <div className="bg-[#1a1b1f] border border-[#2b2d35] rounded-xl p-5">
                  <div className="flex items-center justify-between text-xs text-[#ede7dd]/60 mb-2">
                    <span>Active In Kitchen</span>
                    <Clock className="w-4 h-4 text-[#ff922b]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#ff922b] tabular-nums">
                    {stats.activeOrders} Orders
                  </div>
                  <span className="text-[11px] text-[#ede7dd]/60 mt-1 block">
                    Pending, Preparing & In Transit
                  </span>
                </div>

                <div className="bg-[#1a1b1f] border border-[#2b2d35] rounded-xl p-5">
                  <div className="flex items-center justify-between text-xs text-[#ede7dd]/60 mb-2">
                    <span>Delivered Orders</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                    {stats.deliveredCount} Orders
                  </div>
                  <span className="text-[11px] text-[#ede7dd]/60 mt-1 block">
                    Successfully completed
                  </span>
                </div>

                <div className="bg-[#1a1b1f] border border-[#2b2d35] rounded-xl p-5">
                  <div className="flex items-center justify-between text-xs text-[#ede7dd]/60 mb-2">
                    <span>Average Ticket</span>
                    <TrendingUp className="w-4 h-4 text-[#f76707]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#f7f4ed] tabular-nums">
                    ${stats.avgOrderValue.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-[#ede7dd]/60 mt-1 block">
                    Per customer order
                  </span>
                </div>
              </div>

              {/* Order Status Breakdown & Quick Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#1a1b1f] border border-[#2b2d35] rounded-xl p-6 space-y-4">
                  <h4 className="font-serif text-base font-bold text-[#f7f4ed]">
                    Live Order Pipeline Breakdown
                  </h4>
                  <div className="space-y-3">
                    {(['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'] as OrderStatus[]).map(
                      (status) => {
                        const count = orders.filter((o) => o.status === status).length;
                        const percent = orders.length > 0 ? (count / orders.length) * 100 : 0;
                        return (
                          <div key={status} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-[#ede7dd]/80">{status}</span>
                              <span className="font-mono text-[#f7f4ed] tabular-nums font-bold">
                                {count} ({percent.toFixed(0)}%)
                              </span>
                            </div>
                            <div className="w-full bg-[#121316] h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  status === 'Delivered'
                                    ? 'bg-emerald-500'
                                    : status === 'Cancelled'
                                    ? 'bg-red-500'
                                    : 'bg-[#f76707]'
                                }`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                <div className="bg-[#1a1b1f] border border-[#2b2d35] rounded-xl p-6 space-y-4">
                  <h4 className="font-serif text-base font-bold text-[#f7f4ed]">
                    Culinary Category Distribution
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.map((cat) => {
                      const count = menuItems.filter((m) => m.category === cat).length;
                      return (
                        <div
                          key={cat}
                          className="bg-[#121316] border border-[#2b2d35] p-3 rounded-lg text-center"
                        >
                          <span className="text-xs text-[#ede7dd]/70 block truncate">{cat}</span>
                          <span className="text-base font-bold font-mono text-[#f76707] tabular-nums">
                            {count} items
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MENU ITEMS MANAGEMENT */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              {/* Menu controls bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#1a1b1f] p-4 rounded-xl border border-[#2b2d35]">
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-[#ede7dd]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      placeholder="Search menu..."
                      className="w-full pl-8 pr-3 py-1.5 bg-[#121316] border border-[#2b2d35] rounded-lg text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                    />
                  </div>

                  <select
                    value={selectedAdminCategory}
                    onChange={(e) => setSelectedAdminCategory(e.target.value)}
                    className="px-3 py-1.5 bg-[#121316] border border-[#2b2d35] rounded-lg text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                  >
                    <option value="All">All Categories</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleOpenAddItem}
                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-[#f76707] to-[#e8590c] hover:from-[#e8590c] hover:to-[#d9480f] text-white text-xs font-bold uppercase rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Food Item</span>
                </button>
              </div>

              {/* Menu items table */}
              <div className="bg-[#1a1b1f] border border-[#2b2d35] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#121316] text-[#ede7dd]/60 uppercase tracking-wider text-[10px] border-b border-[#2b2d35]">
                      <tr>
                        <th className="p-3.5">Item</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Price</th>
                        <th className="p-3.5">Badges</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#262830]">
                      {adminFilteredMenu.map((item) => (
                        <tr key={item.id} className="hover:bg-[#20222a] transition-colors">
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover shrink-0 bg-[#2b2d35]"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <div className="font-bold text-[#f7f4ed] text-xs font-serif">
                                  {item.name}
                                </div>
                                <div className="text-[11px] text-[#ede7dd]/60 truncate max-w-xs">
                                  {item.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 text-[#ede7dd]/80 whitespace-nowrap">
                            {item.category}
                          </td>
                          <td className="p-3.5 font-mono font-bold text-[#f7f4ed] whitespace-nowrap tabular-nums">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <div className="flex gap-1">
                              {item.isChefSpecial && (
                                <span className="bg-[#f76707]/20 text-[#f76707] px-1.5 py-0.5 rounded text-[10px] font-semibold">
                                  Chef Special
                                </span>
                              )}
                              {item.isVegetarian && (
                                <span className="bg-emerald-950/60 text-emerald-400 px-1.5 py-0.5 rounded text-[10px]">
                                  Veg
                                </span>
                              )}
                              {item.isSpicy && (
                                <span className="bg-red-950/60 text-red-400 px-1.5 py-0.5 rounded text-[10px]">
                                  Spicy
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditItem(item)}
                                className="p-1.5 bg-[#22242a] hover:bg-[#2e313b] text-[#ede7dd] rounded-lg transition-colors"
                                title="Edit item"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete "${item.name}" from the menu?`)) {
                                    deleteMenuItem(item.id);
                                  }
                                }}
                                className="p-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 rounded-lg transition-colors"
                                title="Delete item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMER ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#ede7dd]/70 bg-[#1a1b1f] p-4 rounded-xl border border-[#2b2d35]">
                <span>Orders are received in real-time when guests place orders online or via WhatsApp.</span>
                <span className="font-mono text-[#f76707] font-bold">Total: {orders.length} orders</span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 bg-[#1a1b1f] rounded-xl border border-[#2b2d35]">
                  <p className="font-serif text-base text-[#f7f4ed]">No orders placed yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-[#1a1b1f] border border-[#2b2d35] rounded-xl p-5 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#262830] pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm text-[#f76707]">
                            #{ord.id}
                          </span>
                          <span className="text-xs text-[#ede7dd]/50">·</span>
                          <span className="text-xs font-bold text-[#f7f4ed]">
                            {ord.customerName}
                          </span>
                          <span className="text-xs text-[#ede7dd]/50">·</span>
                          <span className="text-xs text-[#ede7dd]/60 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#f76707]" />
                            {ord.customerPhone}
                          </span>
                        </div>

                        {/* Status Changer Dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#ede7dd]/50">Status:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors focus:outline-none ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400'
                                : ord.status === 'Cancelled'
                                ? 'bg-red-950/60 border border-red-500/40 text-red-400'
                                : 'bg-[#f76707]/15 border border-[#f76707]/40 text-[#f76707]'
                            }`}
                          >
                            <option value="Pending" className="bg-[#1a1b1f] text-white">Pending</option>
                            <option value="Preparing" className="bg-[#1a1b1f] text-white">Preparing</option>
                            <option value="Out for Delivery" className="bg-[#1a1b1f] text-white">Out for Delivery</option>
                            <option value="Delivered" className="bg-[#1a1b1f] text-white">Delivered</option>
                            <option value="Cancelled" className="bg-[#1a1b1f] text-white">Cancelled</option>
                          </select>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete order #${ord.id}?`)) {
                                deleteOrder(ord.id);
                              }
                            }}
                            className="p-1.5 text-[#ede7dd]/40 hover:text-red-400 rounded-lg hover:bg-[#22242a]"
                            title="Delete order"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Items and Address */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-[11px] font-semibold text-[#ede7dd]/50 uppercase tracking-wider block mb-1">
                            Items Ordered:
                          </span>
                          <div className="space-y-1">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between text-[#ede7dd]/80">
                                <span>{it.quantity}x {it.name}</span>
                                <span className="font-mono tabular-nums">${(it.price * it.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2 mt-2 border-t border-[#262830] flex justify-between font-bold text-[#f7f4ed]">
                            <span>Total Bill ({ord.paymentMethod.toUpperCase()})</span>
                            <span className="font-mono text-[#f76707] tabular-nums text-sm">
                              ${ord.total.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#262830] md:pl-4 pt-2 md:pt-0">
                          <div>
                            <span className="text-[11px] font-semibold text-[#ede7dd]/50 uppercase tracking-wider block mb-0.5">
                              Delivery Address:
                            </span>
                            <p className="text-[#ede7dd]/80 flex items-start gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#f76707] shrink-0 mt-0.5" />
                              <span>{ord.deliveryAddress}</span>
                            </p>
                          </div>
                          {ord.orderNotes && (
                            <div>
                              <span className="text-[11px] font-semibold text-[#ede7dd]/50 uppercase tracking-wider block mb-0.5">
                                Instructions:
                              </span>
                              <p className="text-[#ede7dd]/70 italic">"{ord.orderNotes}"</p>
                            </div>
                          )}
                          <div className="text-[11px] text-[#ede7dd]/50 pt-1">
                            Placed: {ord.createdAt}
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SPECIAL OFFERS MANAGEMENT */}
          {activeTab === 'offers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#1a1b1f] p-4 rounded-xl border border-[#2b2d35]">
                <span className="text-xs text-[#ede7dd]/70">
                  Manage promotional meal deals and bundle packages featured on the website.
                </span>
                <button
                  onClick={() => setIsAddingOffer(true)}
                  className="px-4 py-2 bg-[#f76707] hover:bg-[#e8590c] text-white text-xs font-bold uppercase rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Deal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-[#1a1b1f] border border-[#2b2d35] rounded-xl p-5 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#f76707] bg-[#f76707]/15 px-2 py-0.5 rounded border border-[#f76707]/30">
                          {offer.discountTag}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleOfferStatus(offer.id)}
                            className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                              offer.isActive
                                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                                : 'bg-gray-800 text-gray-400 border border-gray-700'
                            }`}
                          >
                            {offer.isActive ? 'Active' : 'Inactive'}
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete deal "${offer.title}"?`)) {
                                deleteSpecialOffer(offer.id);
                              }
                            }}
                            className="p-1 text-red-400 hover:text-red-300"
                            title="Delete offer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-serif text-lg font-bold text-[#f7f4ed]">
                        {offer.title}
                      </h4>
                      <p className="text-xs text-[#ede7dd]/70 mt-1 line-clamp-2">
                        {offer.description}
                      </p>
                    </div>

                    <div className="flex items-baseline justify-between pt-3 border-t border-[#262830]">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-lg font-bold text-[#f7f4ed] tabular-nums">
                          ${offer.price.toFixed(2)}
                        </span>
                        <span className="font-mono text-xs line-through text-[#ede7dd]/40 tabular-nums">
                          ${offer.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#ede7dd]/60">{offer.includedItems.length} items bundled</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CATEGORIES MANAGEMENT */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="bg-[#1a1b1f] border border-[#2b2d35] rounded-xl p-5 space-y-4">
                <h4 className="font-serif text-base font-bold text-[#f7f4ed]">
                  Add New Category
                </h4>
                <form onSubmit={handleAddCategory} className="flex gap-2 max-w-md">
                  <input
                    type="text"
                    required
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="e.g. Seafood & Platters"
                    className="flex-1 px-3.5 py-2 bg-[#121316] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#f76707] hover:bg-[#e8590c] text-white text-xs font-bold uppercase rounded-xl transition-colors whitespace-nowrap"
                  >
                    Add Category
                  </button>
                </form>
              </div>

              <div className="bg-[#1a1b1f] border border-[#2b2d35] rounded-xl p-5">
                <h4 className="font-serif text-base font-bold text-[#f7f4ed] mb-4">
                  Existing Food Categories ({categories.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {categories.map((cat, idx) => {
                    const itemCount = menuItems.filter((m) => m.category === cat).length;
                    return (
                      <div
                        key={cat}
                        className="bg-[#121316] border border-[#2b2d35] rounded-xl p-3 flex items-center justify-between"
                      >
                        <div>
                          <span className="font-semibold text-xs text-[#f7f4ed] block">{cat}</span>
                          <span className="text-[10px] text-[#ede7dd]/50">{itemCount} items linked</span>
                        </div>
                        <span className="text-xs text-[#f76707] font-mono">#{idx + 1}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* EDIT / ADD MENU ITEM MODAL */}
      {isEditingItem && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#16171b] border border-[#2b2d35] rounded-2xl w-full max-w-lg p-6 sm:p-8 relative shadow-2xl my-8">
            <button
              onClick={() => setIsEditingItem(false)}
              className="absolute top-5 right-5 p-2 rounded-lg text-[#ede7dd]/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="font-serif text-xl font-bold text-[#f7f4ed] mb-4">
              {editingItemId ? 'Edit Menu Item' : 'Add New Food Item'}
            </h4>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={itemFormData.name}
                  onChange={(e) => setItemFormData({ ...itemFormData, name: e.target.value })}
                  placeholder="e.g. Sourdough Truffle Pizza"
                  className="w-full px-3 py-2 bg-[#121316] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">Category *</label>
                  <select
                    value={itemFormData.category}
                    onChange={(e) => setItemFormData({ ...itemFormData, category: e.target.value as FoodCategory })}
                    className="w-full px-3 py-2 bg-[#121316] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={itemFormData.price}
                    onChange={(e) => setItemFormData({ ...itemFormData, price: e.target.value })}
                    placeholder="18.50"
                    className="w-full px-3 py-2 bg-[#121316] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">Description *</label>
                <textarea
                  required
                  rows={2}
                  value={itemFormData.description}
                  onChange={(e) => setItemFormData({ ...itemFormData, description: e.target.value })}
                  placeholder="Appetizing description of ingredients and preparation..."
                  className="w-full px-3 py-2 bg-[#121316] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">Image Path / URL</label>
                <input
                  type="text"
                  value={itemFormData.image}
                  onChange={(e) => setItemFormData({ ...itemFormData, image: e.target.value })}
                  placeholder="/src/assets/images/..."
                  className="w-full px-3 py-2 bg-[#121316] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                />
                <span className="text-[10px] text-[#ede7dd]/50 mt-1 block">
                  Defaults to high quality food photography asset.
                </span>
              </div>

              {/* Checkbox tags */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemFormData.isChefSpecial}
                    onChange={(e) => setItemFormData({ ...itemFormData, isChefSpecial: e.target.checked })}
                    className="rounded text-[#f76707]"
                  />
                  <span>Chef's Special</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemFormData.isPopular}
                    onChange={(e) => setItemFormData({ ...itemFormData, isPopular: e.target.checked })}
                    className="rounded text-[#f76707]"
                  />
                  <span>Popular Item</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemFormData.isVegetarian}
                    onChange={(e) => setItemFormData({ ...itemFormData, isVegetarian: e.target.checked })}
                    className="rounded text-[#f76707]"
                  />
                  <span>Vegetarian</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemFormData.isSpicy}
                    onChange={(e) => setItemFormData({ ...itemFormData, isSpicy: e.target.checked })}
                    className="rounded text-[#f76707]"
                  />
                  <span>Spicy</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-[#262830]">
                <button
                  type="button"
                  onClick={() => setIsEditingItem(false)}
                  className="px-4 py-2 text-xs text-[#ede7dd]/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#f76707] hover:bg-[#e8590c] text-white text-xs font-bold uppercase rounded-xl transition-colors"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE SPECIAL OFFER MODAL */}
      {isAddingOffer && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#16171b] border border-[#2b2d35] rounded-2xl w-full max-w-lg p-6 sm:p-8 relative shadow-2xl my-8">
            <button
              onClick={() => setIsAddingOffer(false)}
              className="absolute top-5 right-5 p-2 rounded-lg text-[#ede7dd]/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="font-serif text-xl font-bold text-[#f7f4ed] mb-4">
              Create Promotional Offer
            </h4>

            <form onSubmit={handleSaveSpecialOffer} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">Deal Title *</label>
                <input
                  type="text"
                  required
                  value={offerFormData.title}
                  onChange={(e) => setOfferFormData({ ...offerFormData, title: e.target.value })}
                  placeholder="e.g. Master Chef Duo Platter"
                  className="w-full px-3 py-2 bg-[#121316] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">Deal Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={offerFormData.price}
                    onChange={(e) => setOfferFormData({ ...offerFormData, price: e.target.value })}
                    placeholder="39.99"
                    className="w-full px-3 py-2 bg-[#121316] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={offerFormData.originalPrice}
                    onChange={(e) => setOfferFormData({ ...offerFormData, originalPrice: e.target.value })}
                    placeholder="49.99"
                    className="w-full px-3 py-2 bg-[#121316] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">Description *</label>
                <textarea
                  required
                  rows={2}
                  value={offerFormData.description}
                  onChange={(e) => setOfferFormData({ ...offerFormData, description: e.target.value })}
                  placeholder="What makes this deal special..."
                  className="w-full px-3 py-2 bg-[#121316] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#ede7dd]/80 mb-1">
                  Included Items (One item per line)
                </label>
                <textarea
                  rows={3}
                  value={offerFormData.includedItemsText}
                  onChange={(e) => setOfferFormData({ ...offerFormData, includedItemsText: e.target.value })}
                  placeholder="1x Wood-Fired Margherita Pizza&#10;2x Smash Burgers&#10;2x Cold Brews"
                  className="w-full px-3 py-2 bg-[#121316] border border-[#2b2d35] rounded-xl text-xs text-[#f7f4ed] focus:outline-none focus:border-[#f76707] font-mono resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-[#262830]">
                <button
                  type="button"
                  onClick={() => setIsAddingOffer(false)}
                  className="px-4 py-2 text-xs text-[#ede7dd]/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#f76707] hover:bg-[#e8590c] text-white text-xs font-bold uppercase rounded-xl transition-colors"
                >
                  Publish Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
