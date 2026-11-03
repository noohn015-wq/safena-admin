import { useState, useEffect } from "react";
import { Package, Wallet, MessageSquare, User, LogOut, RefreshCw } from "lucide-react";
import { databases, APPWRITE_DATABASE_ID, ORDERS_TABLE_ID, COMPLAINTS_TABLE_ID } from "./lib/appwrite";
import { AdminOrders } from "./components/AdminOrders";
import { AdminRevenues } from "./components/AdminRevenues";
import { AdminComplaints } from "./components/AdminComplaints";
import { AdminAccount } from "./components/AdminAccount";

export function App() {
  const [activeTab, setActiveTab] = useState<"orders" | "revenues" | "complaints" | "account">("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // جلب البيانات من Appwrite
  const fetchData = async () => {
    setLoading(true);
    try {
      const ordersRes = await databases.listDocuments(APPWRITE_DATABASE_ID, ORDERS_TABLE_ID);
      setOrders(ordersRes.documents);

      const complaintsRes = await databases.listDocuments(APPWRITE_DATABASE_ID, COMPLAINTS_TABLE_ID);
      setComplaints(complaintsRes.documents);
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // حساب الإحصائيات العلوية
  const totalRevenue = orders
    .filter((o) => o.status === "delivered" || o.status === "completed" || o.status === "مكتمل")
    .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  const totalOrdersCount = orders.length;
  const activeOrdersCount = orders.filter(
    (o) => o.status === "pending" || o.status === "on_the_way" || o.status === "قيد المعالجة" || o.status === "على الطريق"
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-24 font-sans select-none" dir="rtl">
      {/* الهيدر العلوي */}
      <header className="flex items-center justify-between p-4 border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-md">
        <button 
          onClick={() => alert("تم تسجيل الخروج بنجاح")}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 text-right">
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">سفينة نوح</h1>
            <p className="text-xs text-slate-400">لوحة تحكم الإدارة</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950">
            <Package className="w-6 h-6" />
          </div>
        </div>
      </header>

      {/* الـ Widgets الثلاثة العلوية للإحصائيات */}
      <div className="grid grid-cols-3 gap-3 p-4">
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 text-center flex flex-col items-center justify-center shadow-md">
          <Wallet className="w-5 h-5 text-emerald-400 mb-2" />
          <span className="text-lg font-black text-white">{totalRevenue}</span>
          <span className="text-[11px] text-slate-400">ل.س</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 text-center flex flex-col items-center justify-center shadow-md">
          <Package className="w-5 h-5 text-amber-400 mb-2" />
          <span className="text-lg font-black text-white">{totalOrdersCount}</span>
          <span className="text-[11px] text-slate-400">إجمالي</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 text-center flex flex-col items-center justify-center shadow-md">
          <div className="w-5 h-5 text-blue-400 mb-2 flex items-center justify-center font-bold">🚲</div>
          <span className="text-lg font-black text-white">{activeOrdersCount}</span>
          <span className="text-[11px] text-slate-400">نشطة</span>
        </div>
      </div>

      {/* زر التحديث السريع */}
      <div className="px-4 mb-2 flex justify-start">
        <button 
          onClick={fetchData} 
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-amber-400 hover:bg-slate-800 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          تحديث البيانات
        </button>
      </div>

      {/* المحتوى حسب التبويب النشط */}
      <main className="flex-1 px-4">
        {activeTab === "orders" && <AdminOrders orders={orders} onUpdate={fetchData} />}
        {activeTab === "revenues" && <AdminRevenues orders={orders} />}
        {activeTab === "complaints" && <AdminComplaints complaints={complaints} onUpdate={fetchData} />}
        {activeTab === "account" && <AdminAccount />}
      </main>

      {/* شريط التنقل السفلي الثابت */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-4 py-3 flex justify-around items-center z-50">
        <button
          onClick={() => setActiveTab("account")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "account" ? "text-amber-400" : "text-slate-400 hover:text-slate-200"}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[11px] font-medium">حسابي</span>
        </button>

        <button
          onClick={() => setActiveTab("complaints")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "complaints" ? "text-amber-400" : "text-slate-400 hover:text-slate-200"}`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[11px] font-medium">الشكاوي</span>
        </button>

        <button
          onClick={() => setActiveTab("revenues")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "revenues" ? "text-amber-400" : "text-slate-400 hover:text-slate-200"}`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[11px] font-medium">إجمالي الإيرادات</span>
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "orders" ? "text-amber-400" : "text-slate-400 hover:text-slate-200"}`}
        >
          <Package className="w-5 h-5" />
          <span className="text-[11px] font-medium">الطلبات</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
