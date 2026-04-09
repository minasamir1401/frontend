"use client";
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
  const { t, isRtl } = useLanguage();
  const transactions = [
    { id: 1, type: isRtl ? "دفعة خارجية" : "Payout", amount: "+$3,500.00", date: isRtl ? "١٢ يونيو ٢٠٢٤" : "June 12, 2024", status: isRtl ? "مكتمل" : "Completed", icon: "arrow_downward", color: "text-green-500 bg-green-50 dark:bg-green-900/20" },
    { id: 2, type: isRtl ? "ضمان" : "Escrow", amount: "$5,200.00", date: isRtl ? "١٠ يونيو ٢٠٢٤" : "June 10, 2024", status: isRtl ? "قيد الانتظار" : "Pending", icon: "lock", color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
    { id: 3, type: isRtl ? "رسوم" : "Fee", amount: "-$12.50", date: isRtl ? "٨ يونيو ٢٠٢٤" : "June 08, 2024", status: isRtl ? "مكتمل" : "Completed", icon: "receipt_long", color: "text-slate-400 bg-slate-50 dark:bg-slate-800" },
  ];

  const handleWithdraw = () => {
    alert(isRtl ? "تم بدء عملية السحب. التحقق مطلوب." : "Withdrawal process initiated. Verification required.");
  };

  return (
    <div className={`bg-slate-50 dark:bg-slate-950 min-h-screen ${isRtl ? 'font-arabic' : ''}`}>
      <Header />
      
      <div className={`flex pt-[194px] md:pt-[226px] ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <Sidebar />
        
        <main className={`flex-1 ${isRtl ? 'mr-0 md:mr-80' : 'ml-0 md:ml-80'} p-4 sm:p-8 space-y-12 text-start w-full overflow-hidden`}>
          <section className={`flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200/50 pb-8 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
            <div className={`space-y-4 w-full`}>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-plus-jakarta tracking-tight break-words">{isRtl ? "المركز المالي" : "Financial Hub"}</h1>
              <p className="text-slate-500 font-medium font-be-vietnam text-sm sm:text-base leading-relaxed">{isRtl ? "إدارة أرباحك، مدفوعاتك، وصحتك المالية." : "Manage your earnings, payouts, and fiscal health."}</p>
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 w-full md:w-auto ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
               <button className="w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white px-8 py-3.5 rounded-full font-extrabold text-sm hover:shadow-lg transition-all active:scale-95">{isRtl ? "تحميل ملف CSV" : "Download CSV"}</button>
               <button 
                onClick={handleWithdraw}
                className="w-full sm:w-auto bg-cyan-500 text-slate-900 px-8 py-3.5 rounded-full font-extrabold text-sm hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
              >{isRtl ? "سحب الأموال" : "Withdraw Funds"}</button>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-start">
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10 space-y-12 text-start">
                 <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">{isRtl ? "الرصيد المتاح" : "Available Balance"}</p>
                   <p className={`text-3xl sm:text-5xl font-extrabold font-plus-jakarta tracking-tight break-words ${isRtl ? 'flex flex-row-reverse justify-end gap-1' : ''}`}>$18,420<span className="text-xl sm:text-2xl text-cyan-500">.50</span></p>
                 </div>
                 <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/5 p-4 sm:p-6 rounded-[1.5rem] border border-white/5 gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                    <div className="text-start">
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">{isRtl ? "القادم الأسبوع المقبل" : "Incoming Next Week"}</p>
                      <p className="font-bold text-base sm:text-lg font-plus-jakarta text-start">+$2,450.00</p>
                    </div>
                    <span className="material-symbols-outlined text-cyan-500 text-3xl sm:text-4xl">trending_up</span>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm space-y-8 text-start">
              <div className={`flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                <h4 className="text-2xl font-bold font-plus-jakarta">{isRtl ? "النشاط الأخير" : "Recent Activity"}</h4>
                <button className="text-cyan-600 font-bold text-sm hover:underline">{isRtl ? "عرض الكل" : "View All"}</button>
              </div>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 border border-transparent hover:border-cyan-500/30 transition-all group cursor-default gap-6 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-4 sm:gap-6 w-full ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-2xl flex items-center justify-center ${tx.color} group-hover:scale-110 transition-transform flex-shrink-0`}>
                        <span className="material-symbols-outlined text-lg sm:text-xl">{tx.icon}</span>
                      </div>
                      <div className="text-start min-w-0">
                        <p className="font-bold text-slate-800 dark:text-white font-plus-jakarta text-sm sm:text-base truncate">{tx.type}</p>
                        <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium font-be-vietnam uppercase tracking-widest truncate">{tx.date}</p>
                      </div>
                    </div>
                    <div className={`w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 border-slate-200/20 pt-4 sm:pt-0 ${isRtl ? 'sm:text-left' : 'sm:text-right'}`}>
                      <p className={`font-extrabold text-base sm:text-lg font-plus-jakarta ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-slate-900 dark:text-white'}`}>{tx.amount}</p>
                      <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
