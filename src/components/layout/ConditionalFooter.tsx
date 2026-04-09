"use client";

import { usePathname } from "next/navigation";
import React from "react";
import SiteFooter from "@/components/layout/SiteFooter";

const HIDE_PREFIXES = ["/dashboard", "/admin", "/register"];

export default function ConditionalFooter() {
  const pathname = usePathname();
  const hide = HIDE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (hide) return null;
  return <SiteFooter />;
}
