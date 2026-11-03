import { User, Edit3 } from "lucide-react";

export function AdminAccount() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mt-2">
        <button 
          onClick={() => alert("تم حفظ التعديلات بنجاح")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-xs shadow-md hover:scale-105 transition-all"
        >
          <Edit3 className="w-4 h-4" /> تعديل المعلومات
        </button>
        <div className="text-right">
          <h2 className="text-base font-bold text-white">حسابي</h2>
          <p className="text-xs text-slate-400">إدارة وتعديل معلوماتك الشخصية المرتبطة بالنظام</p>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-slate-800 pb-3">
          <User className="w-4 h-4" />
          <span>بيانات الملف الشخصي</span>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">الاسم الكامل</label>
            <input 
              type="text" 
              defaultValue="نوح" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400" 
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">رقم الجوال</label>
            <input 
              type="text" 
              defaultValue="0959213965" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400" 
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">اسم الأب</label>
            <input 
              type="text" 
              defaultValue="خالد" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400" 
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">اسم الأم</label>
            <input 
              type="text" 
              defaultValue="تركيه" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400" 
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">العمر</label>
            <input 
              type="text" 
              defaultValue="21" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400" 
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">العنوان التفصيلي</label>
            <textarea 
              rows={3}
              defaultValue="تيبت" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400 resize-none" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
