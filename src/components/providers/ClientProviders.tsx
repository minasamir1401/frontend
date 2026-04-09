"use client";
import React from "react";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import { LanguageProvider } from "@/context/LanguageContext";
import { SidebarProvider } from "@/context/SidebarContext";
import ScrollAnimationProvider from "@/components/providers/ScrollAnimationProvider";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SidebarProvider>
        <ScrollAnimationProvider>
          {children}
          <ConditionalFooter />
        </ScrollAnimationProvider>
      </SidebarProvider>
    </LanguageProvider>
  );
}
