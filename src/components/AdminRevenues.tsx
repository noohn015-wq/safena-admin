import { Wallet, Package, CheckCircle } from "lucide-react";

export function AdminRevenues({ orders }: { orders: any[] }) {
  const completedOrders = orders.filter(
    (o) => o.status === "delivered" || o.status === "completed" || o.status === "مكتمل"
  );

  const totalRevenue = completedOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const completedCount = completedOrders.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-amber-400 font-bold text-base mt-2">
        <Wallet className="w-5 h-5" />
        <h2>إجمالي الإيرادات</h2>
      </div>

      {/* بطاقة الإيرادات الموصلة */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
          <Wallet className="w-6 h-6" />
        </div>
        <span className="text-2xl font-black text-white mb-1">{totalRevenue} ل.س</span>
        <span className="text-xs text-slate-400">إجمالي الإيرادات (الموصلة)</span>
      </div>

      {/* بطاقة الطلبات المكتملة */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
          <Package className="w-6 h-6" />
        </div>
        <span className="text-2xl font-black text-white mb-1">{completedCount}</span>
        <span className="text-xs text-slate-400">طلبات مكتملة</span>
      </div>

      {/* بطاقة إضافية */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
          <CheckCircle className="w-6 h-6" />
        </div>
        <span className="text-2xl font-black text-white mb-1">{orders.length} ل.س</span>
        <span className="text-xs text-slate-400">إجمالي قيمة الطلبات الكلية</span>
      </div>
    </div>
  );
}
