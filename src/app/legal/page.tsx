"use client";

import React from "react";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/context/LanguageContext";

export default function LegalPage() {
  const { isRtl } = useLanguage();

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 ${isRtl ? "font-arabic" : ""}`}>
      <Header />
      <main className="pt-[144px] md:pt-[176px] pb-20 px-6 sm:px-12 max-w-3xl mx-auto text-start">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white font-plus-jakarta tracking-tight mb-4">
          {isRtl ? "الصفحة التحتية والمعلومات القانونية" : "Legal & site information"}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-12 leading-relaxed">
          {isRtl
            ? "هذه الصفحة تجمع المعلومات الأساسية عن استخدام المنصة. يمكن تحديث المحتوى لاحقاً حسب سياساتك الفعلية."
            : "This page collects baseline information about using the platform. Replace with your real policies when ready."}
        </p>

        <section id="terms" className="scroll-mt-28 space-y-4 mb-14">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isRtl ? "شروط الاستخدام" : "Terms of use"}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {isRtl
              ? "باستخدامك للمنصة فإنك توافق على الالتزام بالقواعد المعمول بها، بما في ذلك حسن التعامل بين العملاء والمبرمجين، ودقة المعلومات المقدمة في الملفات والعروض."
              : "By using the platform you agree to follow applicable rules, including fair conduct between clients and developers, and accuracy of profile and proposal information."}
          </p>
        </section>

        <section id="privacy" className="scroll-mt-28 space-y-4 mb-14">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isRtl ? "سياسة الخصوصية" : "Privacy policy"}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {isRtl
              ? "نلتزم بحماية بياناتك وفق الممارسات المعقولة. لا تشارك كلمات المرور مع أي طرف، ويُنصح بمراجعة إعدادات الحساب بانتظام."
              : "We protect your data with reasonable practices. Do not share passwords with third parties, and review your account settings regularly."}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isRtl ? "التواصل" : "Contact"}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {isRtl
              ? "للاستفسارات القانونية أو الإدارية يمكن التواصل عبر قنوات الدعم الرسمية للمنصة (حدّث هذا النص ببريد أو نموذج حقيقي)."
              : "For legal or administrative questions, contact official platform support (update this text with a real email or form)."}
          </p>
        </section>
      </main>
    </div>
  );
}
