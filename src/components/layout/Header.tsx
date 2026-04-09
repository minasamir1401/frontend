"use client";
import Link from "next/link";
import React from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSidebar } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const [userRole, setUserRole] = React.useState<string | null>(null);
  const [userName, setUserName] = React.useState<string>("User");
  const [userImage, setUserImage] = React.useState<string | null>(null);
  const { language, setLanguage, t, isRtl } = useLanguage();
  const { isOpen, toggle } = useSidebar();
  const pathname = usePathname();

  const developerNavItems = [
    { name: isRtl ? "تصفح المشاريع" : "Browse Jobs", href: "/jobs", icon: "work" },
    { name: isRtl ? "لوحة التحكم" : "Dashboard", href: "/dashboard/developer", icon: "dashboard" },
    { name: isRtl ? "الرسائل" : "Messages", href: "/messages", icon: "chat_bubble" },
    { name: isRtl ? "معرض الأعمال" : "Portfolio", href: "/portfolio", icon: "grid_view" },
    { name: isRtl ? "المالية" : "Finance", href: "/dashboard/finance", icon: "account_balance_wallet" },
    { name: isRtl ? "الشهادات" : "Certifications", href: "/certifications", icon: "workspace_premium" },
  ];

  const clientNavItems = [
    { name: isRtl ? "نشر مشروع" : "Post a Project", href: "/dashboard/client/post-project", icon: "add_circle" },
    { name: isRtl ? "مشاريعي" : "My Projects", href: "/dashboard/client", icon: "folder_open" },
    { name: isRtl ? "تصفح المطورين" : "Browse Developers", href: "/developers", icon: "group" },
    { name: isRtl ? "الرسائل" : "Messages", href: "/messages", icon: "chat_bubble" },
    { name: isRtl ? "المالية" : "Finance", href: "/dashboard/finance", icon: "account_balance_wallet" },
    { name: isRtl ? "النزاعات" : "Disputes", href: "/disputes", icon: "gavel" },
  ];

  const navItems = userRole === "CLIENT" ? clientNavItems : developerNavItems;

  React.useEffect(() => {
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("userName");
    const img = localStorage.getItem("userImage");
    setUserRole(role);
    if (name) setUserName(name);
    if (img) setUserImage(img);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userImage");
    setUserRole(null);
    window.location.href = "/";
  };

  const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuCGouCOGOVSCe45ZHd6EA7EHQahXptFNVyjWEGEibuFU6-SN8BJe2j5HU9x7qXyP9rpS0bvOa-9-Y-aeuGPMBnkdFPwiGXr7hrcu9otIxjdmhSOFDBeKs_hVyUZD1g-Yvtwc0BPqd22i9q3Kcaf8MN4MEeI4aWWDzC8uS93T_oc7n6-91Cy3ZutboG5daTytZGcz9_vDar9OquYtbhMLNf1H598Hj6Gd63-Ksn_5GUuDpc267qBxrE0JzrBn9c3-t7uVUN4ky-Fa-Q";

  return (
    <header className={`fixed top-0 w-full z-50 bg-white dark:bg-slate-900 shadow-[0_10px_30px_rgba(33,48,62,0.05)] border-b border-slate-200/50 dark:border-slate-800/50 flex flex-col transition-all duration-300 ${isRtl ? 'font-arabic' : ''}`}>
      <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className={`flex justify-between items-center px-4 md:px-8 h-20 md:h-28 max-w-[1920px] w-full mx-auto ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <Link
              href="/"
              className={`text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-1 ${isRtl ? 'font-arabic' : 'font-plus-jakarta'}`}
            >
              MG
              <span className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.5)]"></span>
            </Link>
            {userRole && (
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border hidden sm:block ${userRole === 'DEVELOPER' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600' : 'bg-blue-600/10 border-blue-600/30 text-blue-600'}`}>
                {userRole === 'DEVELOPER' ? t('eliteDeveloper') : t('verifiedClient')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}


            <div className="hidden md:flex items-center gap-2">
              <Link href="/messages" className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
                <span className="material-symbols-outlined">chat_bubble</span>
              </Link>
              <button className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>
            </div>

            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2 hidden md:block"></div>

            {userRole ? (
              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                <Link href="/portfolio" className="shrink-0">
                  <div className="w-8 h-8 md:w-8 md:h-8 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800">
                    <img
                      alt="Profile"
                      src={userImage || defaultAvatar}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                {/* Sidebar Menu Button */}
                <button
                  onClick={toggle}
                  title={isOpen ? (isRtl ? "إخفاء القائمة" : "Hide Sidebar") : (isRtl ? "إظهار القائمة" : "Show Sidebar")}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-700 dark:text-white flex items-center justify-center shadow-sm border border-slate-200/50 dark:border-slate-700/50 shrink-0"
                >
                  {isOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <Link href="/register?mode=login">
                  <button className="px-3 sm:px-6 py-2 py-2.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
                    {isRtl ? "دخول" : "Sign In"}
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-4 sm:px-8 py-2 sm:py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-[10px] sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/5 whitespace-nowrap">
                    {isRtl ? "بدأ" : "Start"}
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Navbar for Main Navigation */}
      {userRole && (
        <div className="w-full border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md block text-center overflow-hidden">
          <div className={`flex items-center justify-start md:justify-center px-4 md:px-8 h-16 max-w-[1920px] w-full mx-auto gap-4 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            {navItems.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 text-[11px] md:text-sm font-bold transition-all relative h-full group shrink-0 ${isRtl ? 'flex-row-reverse' : 'flex-row'} ${isActive
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                    }`}
                >
                  <span className={`material-symbols-outlined text-base md:text-lg shrink-0 ${isActive ? "fill-1" : ""}`}>{item.icon}</span>
                  <span className="whitespace-nowrap">{item.name}</span>
                  {isActive && (
                    <div className="absolute -bottom-[1px] left-0 right-0 h-[4px] bg-cyan-600 dark:bg-cyan-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
