import React from 'react';
import { Button } from '../ui/Button';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between rtl:flex-row-reverse">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-gradient">
            Vegecurity
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-on-surface font-medium">
          <a href="#" className="hover:text-primary transition-colors">الرئيسية</a>
          <a href="#" className="hover:text-primary transition-colors">عن المنصة</a>
          <a href="#" className="hover:text-primary transition-colors">الخدمات</a>
          <a href="#" className="hover:text-primary transition-colors">المطورين</a>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost">تسجيل دخول</Button>
          <Button>انضم إلينا كعميل</Button>
        </div>
      </div>
    </nav>
  );
};
