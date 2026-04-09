"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
  const { isRtl } = useLanguage();
  const [activeCase, setActiveCase] = useState(true);
  const handleAction = (label: string) =>
    alert(
      isRtl
        ? `تم بدء إجراء: ${label}`
        : `${label} flow is now being processed by our legal conduits.`
    );

  const events = [
    {
      title: isRtl ? "تم تعيين وسيط" : "Mediator Appointed",
      time: isRtl ? "اليوم، 10:30 ص" : "Today, 10:30 AM",
      user: isRtl ? "سارة ك." : "Sara K.",
    },
    {
      title: isRtl ? "تم رفع الأدلة" : "Evidence Uploaded",
      time: isRtl ? "أمس، 02:15 م" : "Yesterday, 02:15 PM",
      user: isRtl ? "العميل" : "Client",
    },
    {
      title: isRtl ? "تم فتح النزاع رسميًا" : "Dispute Opened officially",
      time: isRtl ? "14 أكتوبر، 09:00 ص" : "Oct 14, 09:00 AM",
      user: isRtl ? "النظام" : "System",
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Header />

      <div className={`flex pt-[144px] md:pt-[176px] ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
        <Sidebar />
        <main className={`flex-1 ${isRtl ? "mr-0 md:mr-80" : "ml-0 md:ml-80"} pb-20 px-8 max-w-[1440px] w-full mx-auto space-y-16`}>
        <header className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-slate-200/50 pb-12 mt-[100px]">
          <div className="space-y-4">
             <h1 className="text-6xl font-extrabold tracking-tight font-plus-jakarta text-slate-900 dark:text-white leading-tight">
               {isRtl ? "مركز إدارة" : "Resolution"} <br />
               <span className="text-cyan-600">{isRtl ? "بروتوكولات النزاعات." : "Protocol Center."}</span>
             </h1>
             <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl font-be-vietnam">
               {isRtl
                 ? "نظام فض النزاعات في المنصة لضمان العدالة والامتثال والتحكيم التقني باحترافية."
                 : "Vegecurity Dispute Resolution System. Ensuring fair compliance and technical arbitration for the modern ecosystem."}
             </p>
          </div>
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
             <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-2 relative z-10">
               {isRtl ? "حالة القضية الحالية" : "Active Case Status"}
             </p>
             <h3 className="text-2xl font-bold font-plus-jakarta relative z-10 tracking-tight">
               {isRtl ? "بانتظار مراجعة الوسيط" : "Awaiting Mediator Review"}
             </h3>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
             <section className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1.5 h-full bg-cyan-500 group-hover:w-2 transition-all"></div>
                <h3 className="text-2xl font-bold font-plus-jakarta mb-10 flex items-center gap-3">
                   <span className="material-symbols-outlined text-cyan-600">info</span>
                   {isRtl ? "تفاصيل القضية: #DS-8921-VEGE" : "Case Detail: #DS-8921-VEGE"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isRtl ? "سياق المشروع" : "Project Context"}</p>
                        <p className="font-bold text-slate-900 dark:text-white text-lg font-plus-jakarta">
                          {isRtl ? "منصة تجارة إلكترونية عضوية V2" : "Organic E-commerce Platform V2"}
                        </p>
                        <Link href="#" className="text-cyan-600 text-xs font-bold hover:underline">
                          {isRtl ? "عرض عقد المشروع" : "View Project Contract"}
                        </Link>
                      </div>
                      <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                         <div className="w-12 h-12 rounded-2xl bg-slate-200 overflow-hidden"></div>
                         <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isRtl ? "المدعي" : "Plaintiff"}</p>
                            <p className="font-bold text-slate-900 dark:text-white">{isRtl ? "أحمد العلي (عميل)" : "Ahmed Al-Ali (Client)"}</p>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isRtl ? "تاريخ الفتح" : "Opened Date"}</p>
                        <p className="font-bold text-slate-900 dark:text-white text-lg font-plus-jakarta">{isRtl ? "14 أكتوبر 2024" : "October 14, 2024"}</p>
                      </div>
                      <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                         <div className="w-12 h-12 rounded-2xl bg-cyan-100 overflow-hidden"></div>
                         <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isRtl ? "المدعى عليه" : "Defendant"}</p>
                            <p className="font-bold text-slate-900 dark:text-white">{isRtl ? "شركة كلاود سحاب (مطور)" : "Cloud Sahab Co. (Developer)"}</p>
                         </div>
                      </div>
                   </div>
                </div>
             </section>

             <section className="space-y-8">
                <h3 className="text-2xl font-bold font-plus-jakarta text-slate-900 dark:text-white flex items-center gap-3">
                   <span className="material-symbols-outlined text-cyan-600">history</span>
                   {isRtl ? "الجدول الزمني للأحداث" : "Event Timeline"}
                </h3>
                <div className="relative pl-12 space-y-12">
                   <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800"></div>
                   {events.map((e, i) => (
                     <div key={i} className="relative group">
                        <div className="absolute -left-[50px] w-[50px] flex justify-center">
                           <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 ring-4 ring-white dark:ring-slate-950 group-hover:bg-cyan-500 transition-colors"></div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all">
                           <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest mb-2">{e.time}</p>
                           <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{e.title}</h4>
                           <p className="text-sm text-slate-500 leading-relaxed">
                             {isRtl
                               ? `تم بدء الإجراء الرسمي بواسطة ${e.user}. جميع السجلات مشفرة وموثقة.`
                               : `Official process initiated by ${e.user}. All logs are encrypted and verified.`}
                           </p>
                        </div>
                     </div>
                   ))}
                </div>
             </section>
          </div>

          <aside className="lg:col-span-4 space-y-12">
             <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl space-y-10">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-bold">{isRtl ? "دردشة قانونية" : "Legal Chat"}</h3>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {isRtl ? "نشط الآن" : "Live Conduits"}
                  </span>
                </div>
                <div className="h-[400px] overflow-y-auto space-y-6 px-2 custom-scrollbar">
                   <div className="bg-white/5 p-4 rounded-2xl text-xs leading-relaxed max-w-[85%]">
                     {isRtl
                       ? "مرحبًا، أنا المحكم الرئيسي لهذه القضية (#8921). يتم مراجعة الأدلة الآن."
                       : "Greetings. I am the lead arbitrator for this case (#8921). Reviewing evidence now."}
                   </div>
                   <div className="bg-cyan-500 text-slate-900 p-4 rounded-2xl text-xs font-bold leading-relaxed max-w-[85%] self-end ml-auto">
                     {isRtl
                       ? "شكرًا سارة، قمت برفع أحدث سجلات الأداء بصيغة PDF."
                       : "Thank you Sara. I have uploaded the latest performance logs in PDF format."}
                   </div>
                </div>
                <div className="pt-8 border-t border-white/5">
                   <div className="relative">
                      <input
                        className="w-full bg-white/5 border-none rounded-2xl py-4 pr-12 text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500"
                        placeholder={isRtl ? "اكتب ردك..." : "Type response..."}
                        type="text"
                      />
                      <button onClick={() => handleAction("Message Sent")} className="absolute right-2 top-2 h-10 w-10 bg-cyan-500 rounded-xl flex items-center justify-center text-slate-900 hover:scale-105 active:scale-95 transition-all"><span className="material-symbols-outlined">send</span></button>
                   </div>
                </div>
             </div>
             
             <div onClick={() => handleAction("File Upload")} className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center text-center group cursor-pointer hover:border-cyan-500/50 transition-all">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <span className="material-symbols-outlined text-slate-400 text-3xl">upload_file</span>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">{isRtl ? "رفع الأدلة القانونية" : "Upload Legal Evidence"}</h4>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{isRtl ? "PDF, ZIP, LOG (الحد الأقصى 50MB)" : "PDF, ZIP, LOG (Max 50MB)"}</p>
             </div>
          </aside>
        </div>
        </main>
      </div>
    </div>
  );
}
