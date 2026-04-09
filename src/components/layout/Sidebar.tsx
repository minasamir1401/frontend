"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSidebar } from "@/context/SidebarContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { isRtl, t, language, setLanguage } = useLanguage();
  const { isOpen, toggle } = useSidebar();
  const [userName, setUserName] = React.useState("User");
  const [userImage, setUserImage] = React.useState<string | null>(null);
  const [userRole, setUserRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    const name = localStorage.getItem("userName");
    const img = localStorage.getItem("userImage");
    const role = localStorage.getItem("userRole");
    if (name) setUserName(name);
    if (img) setUserImage(img);
    setUserRole(role);
  }, []);

  const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuCGouCOGOVSCe45ZHd6EA7EHQahXptFNVyjWEGEibuFU6-SN8BJe2j5HU9x7qXyP9rpS0bvOa-9-Y-aeuGPMBnkdFPwiGXr7hrcu9otIxjdmhSOFDBeKs_hVyUZD1g-Yvtwc0BPqd22i9q3Kcaf8MN4MEeI4aWWDzC8uS93T_oc7n6-91Cy3ZutboG5daTytZGcz9_vDar9OquYtbhMLNf1H598Hj6Gd63-Ksn_5GUuDpc267qBxrE0JzrBn9c3-t7uVUN4ky-Fa-Q";

  // Personal & Profile Settings
  const profileNavItems = [
    { name: isRtl ? "الملف الشخصي" : "My Profile", href: "/portfolio", icon: "person", color: "text-blue-500" },
    { name: isRtl ? "الإعدادات العامة" : "General Settings", href: "#", icon: "settings", color: "text-slate-500" },
    { name: isRtl ? "الأمان والخصوصية" : "Security", href: "#", icon: "shield", color: "text-emerald-500" },
    { name: isRtl ? "طرق الدفع" : "Payment Methods", href: "#", icon: "credit_card", color: "text-violet-500" },
    { name: isRtl ? "الإشعارات" : "Notifications", href: "#", icon: "notifications", color: "text-amber-500" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userImage");
    window.location.href = "/";
  };

  const positionClass = isRtl ? "right-0" : "left-0";

  // Don't show sidebar if no user logged in
  if (!userRole) return null;

  const translateValue = isOpen
    ? "translateX(0)"
    : isRtl
    ? "translateX(100%)"
    : "translateX(-100%)";

  return (
    <>
      {/* Overlay to close sidebar */}
      {isOpen && (
        <div 
          onClick={toggle}
          className="fixed inset-0 z-[55] bg-slate-900/20 dark:bg-slate-900/60 backdrop-blur-sm transition-all"
        ></div>
      )}
      
      <aside
        className={`flex flex-col h-[calc(100vh-144px)] md:h-[calc(100vh-176px)] w-72 fixed top-[144px] md:top-[176px] ${positionClass} border-slate-200/20 dark:border-slate-800/50 z-[60] overflow-hidden`}
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          transform: translateValue,
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          visibility: isOpen ? 'visible' : 'hidden',
        }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-cyan-400/5 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-violet-400/5 blur-3xl" />
        </div>

        <div className="relative flex flex-col h-full p-4 space-y-4 overflow-y-auto">
          {/* Profile Card */}
          <Link onClick={() => toggle()} href="/portfolio" className="block group mt-2">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 group-hover:border-cyan-500/40 group-hover:shadow-[0_4px_20px_rgba(6,182,212,0.1)] transition-all duration-300">
              <div className="relative shrink-0">
                <img
                  alt="User Profile"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-cyan-500/30 group-hover:ring-cyan-500 transition-all"
                  src={userImage || defaultAvatar}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-cyan-600 transition-colors">
                  {userName}
                </p>
                <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 ${
                  userRole === "CLIENT"
                    ? "bg-blue-500/10 text-blue-600"
                    : "bg-cyan-500/10 text-cyan-600"
                }`}>
                  {userRole === "CLIENT"
                    ? (isRtl ? "عميل موثّق" : "Verified Client")
                    : (isRtl ? "مطور خبير" : "Elite Developer")}
                </span>
              </div>
              <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
            </div>
          </Link>

          {/* Role Badge */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
            userRole === "CLIENT"
              ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30"
              : "bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-900/30"
          }`}>
            <span className={`material-symbols-outlined text-sm ${userRole === "CLIENT" ? "text-blue-500" : "text-cyan-500"}`}>
              {userRole === "CLIENT" ? "business_center" : "code"}
            </span>
            <p className={`text-xs font-bold ${userRole === "CLIENT" ? "text-blue-700 dark:text-blue-300" : "text-cyan-700 dark:text-cyan-300"}`}>
              {userRole === "CLIENT"
                ? (isRtl ? "لوحة العميل" : "Client Panel")
                : (isRtl ? "لوحة المطور" : "Developer Panel")}
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <p className={`px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ${isRtl ? "text-right" : "text-left"}`}>
              {isRtl ? "إعدادات الحساب" : "Account Settings"}
            </p>
            {profileNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && item.href !== "#" && pathname.startsWith(item.href));
              return (
                <Link
                  onClick={() => toggle()}
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isRtl ? "flex-row-reverse" : ""} ${
                    isActive
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/10"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span className={`material-symbols-outlined text-xl shrink-0 transition-transform group-hover:scale-110 ${isActive ? "" : item.color}`}>
                    {item.icon}
                  </span>
                  <span className={`text-sm font-semibold flex-1 ${isRtl ? "text-right font-arabic" : "text-left"}`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="border-t border-slate-200/60 dark:border-slate-800/60" />

          {/* Secondary Items */}
          <div className="space-y-1">
            <Link
              onClick={() => toggle()}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all text-sm font-medium ${isRtl ? "flex-row-reverse" : ""}`}
            >
              <span className="material-symbols-outlined text-xl text-slate-400">help</span>
              <span className={isRtl ? "font-arabic" : ""}>{isRtl ? "مركز المساعدة" : "Help Center"}</span>
            </Link>
            {userRole && (
              <button
                onClick={() => { toggle(); handleLogout(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all text-sm font-medium ${isRtl ? "flex-row-reverse" : ""}`}
              >
                <span className="material-symbols-outlined text-xl">logout</span>
                <span className={isRtl ? "font-arabic" : ""}>{isRtl ? "تسجيل الخروج" : "Logout"}</span>
              </button>
            )}
            
            {/* Language Switcher moved to Sidebar */}
            <button 
              onClick={() => { toggle(); setLanguage(language === 'en' ? 'ar' : 'en'); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all ${isRtl ? "flex-row-reverse" : ""}`}
            >
              <span className="material-symbols-outlined text-xl">translate</span>
              <span className={`text-sm font-semibold flex-1 ${isRtl ? "text-right font-arabic" : "text-left"}`}>
                {language === 'en' ? 'English (Arabic)' : 'العربية (English)'}
              </span>
            </button>
          </div>

          {/* Bottom CTA Card */}
          <div className="mt-auto pb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:to-slate-900 text-white relative overflow-hidden">
              {/* Decorations */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/20 rounded-full blur-2xl -mr-8 -mt-8" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-violet-500/20 rounded-full blur-2xl -ml-6 -mb-6" />

              <div className={`relative z-10 ${isRtl ? "text-right" : "text-left"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-cyan-400 text-sm">diamond</span>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-60">
                    {isRtl ? "الخطة الحالية" : "Current Plan"}
                  </p>
                </div>
                <p className="font-bold text-sm mb-3 text-white">Enterprise Suite</p>
                <Link onClick={() => toggle()} href={userRole === "CLIENT" ? "/dashboard/client/post-project" : "/jobs"}>
                  <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-xl text-xs font-black hover:from-cyan-400 hover:to-cyan-300 transition-all hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95">
                    {userRole === "CLIENT"
                      ? (isRtl ? "🚀 نشر مشروع جديد" : "🚀 Post a Project")
                      : (isRtl ? "🔍 ابحث عن عمل" : "🔍 Find Gigs")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
