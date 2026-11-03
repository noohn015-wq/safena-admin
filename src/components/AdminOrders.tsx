import { useState } from "react";
import { Search, MapPin, Clock, Phone, UtensilsCrossed, CheckCircle, Bike, package } from "lucide-react";
import { databases, APPWRITE_DATABASE_ID, ORDERS_TABLE_ID } from "../lib/appwrite";

export function AdminOrders({ orders, onUpdate }: { orders: any[]; onUpdate: () => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"active" | "completed" | "all">("active");

  // تحديث حالة الطلب في Appwrite فوراً
  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await databases.updateDocument(
        APPWRITE_DATABASE_ID,
        ORDERS_TABLE_ID,
        orderId,
        { status: newStatus }
      );
      onUpdate();
    } catch (error) {
      console.error("فشل تحديث الحالة:", error);
      alert("حدث خطأ أثناء تحديث حالة الطلب");
    }
  };

  // فلترة الطلبات
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_phone?.includes(searchTerm) ||
      order.$id.includes(searchTerm);

    if (filterStatus === "active") {
      return matchesSearch && (order.status === "pending" || order.status === "on_the_way" || order.status === "قيد المعالجة" || order.status === "على الطريق");
    } else if (filterStatus === "completed") {
      return matchesSearch && (order.status === "delivered" || order.status === "completed" || order.status === "مكتمل");
    }
    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-amber-400 font-bold text-base mt-2">
        <Package className="w-5 h-5" />
        <h2>إدارة الطلبات</h2>
      </div>

      {/* شريط البحث */}
      <div className="relative">
        <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="بحث برقم الطلب أو الاسم..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pr-10 pl-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
        />
      </div>

      {/* أزرار الفلترة */}
      <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setFilterStatus("all")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${filterStatus === "all" ? "bg-amber-400 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"}`}
        >
          الإجمالي ({orders.length})
        </button>
        <button
          onClick={() => setFilterStatus("completed")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${filterStatus === "completed" ? "bg-amber-400 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"}`}
        >
          المكتملة
        </button>
        <button
          onClick={() => setFilterStatus("active")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${filterStatus === "active" ? "bg-amber-400 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"}`}
        >
          النشطة
        </button>
      </div>

      {/* قائمة الطلبات */}
      <div className="flex flex-col gap-3">
        {filteredOrders.length === 0 ? (
          <p className="text-center text-slate-500 py-8 text-sm">لا توجد طلبات مطابقة</p>
        ) : (
          filteredOrders.map((order) => {
            const isPending = order.status === "pending" || order.status === "قيد المعالجة";
            const isOnWay = order.status === "on_the_way" || order.status === "على الطريق";
            const isCompleted = order.status === "delivered" || order.status === "completed" || order.status === "مكتمل";

            return (
              <div key={order.$id} className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
                {/* رأس البطاقة */}
                <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center gap-1 font-semibold">
                    <Clock className="w-3 h-3" />
                    {isPending ? "قيد المعالجة" : isOnWay ? "على الطريق" : "مكتمل"}
                  </span>
                  <span className="font-black text-white text-sm">طلب #{order.$id.slice(-5)}</span>
                </div>

                {/* معلومات العميل */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>{order.customer_phone || "0981412535"}</span>
                    <span className="font-bold text-white">({order.customer_name || "عميل"})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{order.location || "الموقع غير محدد"}</span>
                </div>

                {/* محتويات الطلب */}
                <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-3 flex flex-col gap-2">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" /> محتويات الطلب:
                  </span>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-center text-sm text-white font-medium">
                    {order.items || "لا توجد تفاصيل"}
                  </div>
                  <div className="flex justify-between items-center mt-1 text-sm font-bold">
                    <span className="text-amber-400">{order.total || 0} ل.س</span>
                    <span className="text-slate-400 text-xs">الإجمالي</span>
                  </div>
                </div>

                {/* أزرار التحكم بالأسفل */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60">
                  <button
                    onClick={() => updateStatus(order.$id, "pending")}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${isPending ? "bg-amber-400 text-slate-950 shadow-md" : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"}`}
                  >
                    <Clock className="w-3.5 h-3.5" /> قيد المعالجة
                  </button>
                  <button
                    onClick={() => updateStatus(order.$id, "on_the_way")}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${isOnWay ? "bg-blue-500 text-white shadow-md" : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"}`}
                  >
                    <Bike className="w-3.5 h-3.5" /> على الطريق
                  </button>
                  <button
                    onClick={() => updateStatus(order.$id, "delivered")}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${isCompleted ? "bg-emerald-500 text-white shadow-md" : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"}`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> مكتمل
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
