"use client";

import Link from "next/link";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function SiteFooter() {
  const { t, isRtl } = useLanguage();

  return (
    <footer
      className={`w-full border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-start ${isRtl ? "font-arabic" : ""}`}
    >
      <div className="container mx-auto px-6 sm:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h4 className="text-xl font-bold font-headline text-slate-900 dark:text-white">MG</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t("heroSubtitle")}</p>
        </div>
        <div className="space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {isRtl ? "المنصة" : "Platform"}
          </h5>
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Link href="/jobs" className="hover:text-cyan-600 transition-colors">
              {t("projects")}
            </Link>
            <Link href="/developers" className="hover:text-cyan-600 transition-colors">
              {isRtl ? "المبرمجون" : "Developers"}
            </Link>
            <Link href="/dashboard/client" className="hover:text-cyan-600 transition-colors">
              {t("postAProject")}
            </Link>
            <Link href="/portfolio" className="hover:text-cyan-600 transition-colors">
              {t("portfolio")}
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {isRtl ? "الشركة" : "Company"}
          </h5>
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Link href="/legal" className="hover:text-cyan-600 transition-colors">
              {isRtl ? "الصفحة التحتية والقانونية" : "Legal & info"}
            </Link>
            <Link href="/legal#privacy" className="hover:text-cyan-600 transition-colors">
              {isRtl ? "الخصوصية" : "Privacy"}
            </Link>
            <Link href="/legal#terms" className="hover:text-cyan-600 transition-colors">
              {isRtl ? "الشروط" : "Terms"}
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400">{t("joinOurVision")}</h5>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isRtl ? "تابعنا لآخر التحديثات التقنية." : "Stay updated with platform releases."}
          </p>
          <p className="text-[10px] text-slate-400 font-mono pt-2">Build v0.2.2-Elite</p>
        </div>
      </div>
      <div className="border-t border-slate-200/60 dark:border-slate-800/80 py-4 text-center text-xs text-slate-500 dark:text-slate-500">
        {isRtl ? "© جميع الحقوق محفوظة." : "© All rights reserved."}{" "}
        {new Date().getFullYear()} MG
      </div>
    </footer>
  );
}
