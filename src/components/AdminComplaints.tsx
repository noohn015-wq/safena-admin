import { MessageSquare, CheckCircle, Phone } from "lucide-react";
import { databases, APPWRITE_DATABASE_ID, COMPLAINTS_TABLE_ID } from "../lib/appwrite";

export function AdminComplaints({ complaints, onUpdate }: { complaints: any[]; onUpdate: () => void }) {
  
  const markAsResolved = async (complaintId: string) => {
    try {
      await databases.updateDocument(
        APPWRITE_DATABASE_ID,
        COMPLAINTS_TABLE_ID,
        complaintId,
        { status: "تم الحل" }
      );
      onUpdate();
    } catch (error) {
      console.error("فشل تحديث الشكاوي:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-amber-400 font-bold text-base mt-2">
        <MessageSquare className="w-5 h-5" />
        <h2>شكاوى العملاء</h2>
      </div>

      <div className="flex flex-col gap-3">
        {complaints.length === 0 ? (
          <p className="text-center text-slate-500 py-8 text-sm">لا توجد شكاوي حالياً</p>
        ) : (
          complaints.map((item) => (
            <div key={item.$id} className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                <button
                  onClick={() => markAsResolved(item.$id)}
                  className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-semibold hover:bg-emerald-500/20 transition-colors"
                >
                  <CheckCircle className="w-3 h-3" /> {item.status || "تم الحل"}
                </button>
                <span className="font-bold text-white text-sm">{item.title || item.subject || "شكوى"}</span>
              </div>

              <p className="text-sm text-slate-200 bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                {item.message || item.description || "لا يوجد تفاصيل للشكوى"}
              </p>

              <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.phone || item.customer_phone || "0981412535"}</span>
                  <span className="font-bold text-white">({item.name || item.customer_name || "عميل"})</span>
                </div>
                <span>{item.$createdAt ? new Date(item.$createdAt).toLocaleDateString('ar-SY') : "حديث"}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
