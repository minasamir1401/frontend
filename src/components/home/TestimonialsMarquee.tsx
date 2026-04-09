"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

type VariantKey = "cyan" | "violet" | "emerald" | "amber" | "sky" | "rose";

type Testimonial = {
  quote: { en: string; ar: string };
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  rating: number;
  variant: VariantKey;
  icon: string;
  tag: { en: string; ar: string };
};

const VARIANT_STYLES: Record<
  VariantKey,
  {
    card: string;
    hoverBorder: string;
    accentBar: string;
    tag: string;
    starsOn: string;
    iconWrap: string;
  }
> = {
  cyan: {
    card: "bg-gradient-to-br from-white to-cyan-50/60 dark:from-slate-900 dark:to-cyan-950/25",
    hoverBorder: "hover:border-cyan-400/50",
    accentBar: "bg-cyan-500",
    tag: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20",
    starsOn: "text-cyan-500",
    iconWrap: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  },
  violet: {
    card: "bg-gradient-to-br from-white to-violet-50/60 dark:from-slate-900 dark:to-violet-950/25",
    hoverBorder: "hover:border-violet-400/50",
    accentBar: "bg-violet-500",
    tag: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20",
    starsOn: "text-violet-500",
    iconWrap: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  },
  emerald: {
    card: "bg-gradient-to-br from-white to-emerald-50/60 dark:from-slate-900 dark:to-emerald-950/25",
    hoverBorder: "hover:border-emerald-400/50",
    accentBar: "bg-emerald-500",
    tag: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20",
    starsOn: "text-emerald-500",
    iconWrap: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  amber: {
    card: "bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-amber-950/20",
    hoverBorder: "hover:border-amber-400/50",
    accentBar: "bg-amber-500",
    tag: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20",
    starsOn: "text-amber-500",
    iconWrap: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  },
  sky: {
    card: "bg-gradient-to-br from-white to-sky-50/60 dark:from-slate-900 dark:to-sky-950/25",
    hoverBorder: "hover:border-sky-400/50",
    accentBar: "bg-sky-500",
    tag: "bg-sky-500/10 text-sky-800 dark:text-sky-300 border border-sky-500/20",
    starsOn: "text-sky-500",
    iconWrap: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  },
  rose: {
    card: "bg-gradient-to-br from-white to-rose-50/50 dark:from-slate-900 dark:to-rose-950/20",
    hoverBorder: "hover:border-rose-400/50",
    accentBar: "bg-rose-500",
    tag: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20",
    starsOn: "text-rose-500",
    iconWrap: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  },
};

const ITEMS: Testimonial[] = [
  {
    quote: {
      en: "Shipped two production apps in six weeks. The matching quality is unreal.",
      ar: "سلّمت مشروعين إنتاج خلال ستة أسابيع. جودة المطابقة فوق التوقعات.",
    },
    name: { en: "Lina M.", ar: "لينا م." },
    role: { en: "Full-stack engineer", ar: "مهندسة Full-stack" },
    rating: 5,
    variant: "cyan",
    icon: "rocket_launch",
    tag: { en: "Fast delivery", ar: "تسليم سريع" },
  },
  {
    quote: {
      en: "Finally a place that speaks engineer. Clear scopes and fair budgets.",
      ar: "أخيراً منصة تفهم المبرمج. نطاق واضح وميزانيات عادلة.",
    },
    name: { en: "Omar H.", ar: "عمر ح." },
    role: { en: "Backend developer", ar: "مطور Backend" },
    rating: 5,
    variant: "violet",
    icon: "psychology",
    tag: { en: "Fair scope", ar: "نطاق عادل" },
  },
  {
    quote: {
      en: "We hired a senior for our API redesign. Communication stayed in one thread.",
      ar: "وظّفنا مهندساً لإعادة تصميم الـ API. التواصل كان منظم في مكان واحد.",
    },
    name: { en: "Sara K.", ar: "سارة ك." },
    role: { en: "Product lead", ar: "قائدة منتج" },
    rating: 5,
    variant: "emerald",
    icon: "forum",
    tag: { en: "Clear comms", ar: "تواصل واضح" },
  },
  {
    quote: {
      en: "Escrow and milestones removed the usual freelance anxiety.",
      ar: "الدفع عبر الضمان والمراحل أزال قلق العمل الحر المعتاد.",
    },
    name: { en: "Youssef N.", ar: "يوسف ن." },
    role: { en: "Mobile developer", ar: "مطور موبايل" },
    rating: 5,
    variant: "amber",
    icon: "verified_user",
    tag: { en: "Secure pay", ar: "دفع آمن" },
  },
  {
    quote: {
      en: "Portfolio reviews helped us shortlist in hours, not weeks.",
      ar: "معرض الأعمال ساعدنا نختصر القائمة في ساعات بدل أسابيع.",
    },
    name: { en: "Mariam T.", ar: "مريم ت." },
    role: { en: "CTO, startup", ar: "مديرة تقنية، ستارت أب" },
    rating: 5,
    variant: "sky",
    icon: "folder_special",
    tag: { en: "Great portfolios", ar: "معارض ممتازة" },
  },
  {
    quote: {
      en: "Dark mode + clean UI — I actually enjoy opening the dashboard.",
      ar: "الوضع الداكن والواجهة النظيفة خلّتني أستمتع بفتح لوحة التحكم.",
    },
    name: { en: "Karim A.", ar: "كريم أ." },
    role: { en: "Frontend developer", ar: "مطور واجهات" },
    rating: 5,
    variant: "rose",
    icon: "palette",
    tag: { en: "Polished UI", ar: "واجهة أنيقة" },
  },
];

function Stars({ count, filledClass }: { count: number; filledClass: string }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`material-symbols-outlined text-lg ${i < count ? filledClass : "text-slate-300 dark:text-slate-600"}`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

const ROUND_VARIANTS = [
  "rounded-[1.75rem]",
  "rounded-3xl",
  "rounded-[2rem] rounded-tl-sm",
  "rounded-3xl rounded-br-sm",
  "rounded-[1.5rem]",
  "rounded-[2.25rem]",
] as const;

function TestimonialCard({
  item,
  lang,
  shapeIndex,
}: {
  item: Testimonial;
  lang: "en" | "ar";
  shapeIndex: number;
}) {
  const v = VARIANT_STYLES[item.variant];
  const round = ROUND_VARIANTS[shapeIndex % ROUND_VARIANTS.length];

  return (
    <article
      className={`relative flex-shrink-0 w-[min(100vw-3rem,22rem)] md:w-80 overflow-hidden border border-slate-200/80 dark:border-slate-800 p-6 pt-7 shadow-lg shadow-slate-900/5 dark:shadow-black/20 text-start transition-transform duration-300 hover:scale-[1.02] ${v.card} ${v.hoverBorder} ${round}`}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 ${v.accentBar} opacity-90`} aria-hidden />
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${v.iconWrap}`}>
          <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
        </div>
        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${v.tag}`}>
          {item.tag[lang]}
        </span>
      </div>
      <div className="mt-4">
        <Stars count={item.rating} filledClass={v.starsOn} />
      </div>
      <p className="mt-3 text-sm md:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
        &ldquo;{item.quote[lang]}&rdquo;
      </p>
      <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-700/80">
        <p className="font-bold text-slate-900 dark:text-white text-sm">{item.name[lang]}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.role[lang]}</p>
      </div>
    </article>
  );
}

/** ترتيب مختلف للصف الثاني */
const ITEMS_ROW2: Testimonial[] = [...ITEMS.slice(3), ...ITEMS.slice(0, 3)];

function shapeIndexFor(item: Testimonial) {
  const idx = ITEMS.findIndex((t) => t.name.en === item.name.en);
  return idx >= 0 ? idx : 0;
}

export default function TestimonialsMarquee() {
  const { t, isRtl } = useLanguage();
  const lang = isRtl ? "ar" : "en";

  const topMarquee = isRtl ? "animate-testimonials-marquee-rtl" : "animate-testimonials-marquee-ltr";
  const bottomMarquee = isRtl
    ? "animate-testimonials-marquee-ltr-slow"
    : "animate-testimonials-marquee-rtl-slow";

  const doubledTop = [...ITEMS, ...ITEMS];
  const doubledBottom = [...ITEMS_ROW2, ...ITEMS_ROW2];

  const maskStyle = {
    maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  } as const;

  return (
    <section
      className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border-y border-slate-200/60 dark:border-slate-800/80 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-6 sm:px-12 mb-12 text-center max-w-3xl">
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-600 dark:text-cyan-400 mb-3">
          {isRtl ? "تقييمات" : "Reviews"}
        </p>
        <h2
          id="testimonials-heading"
          className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white font-plus-jakarta tracking-tight"
        >
          {t("testimonialsTitle")}
        </h2>
        <p className="mt-4 text-slate-500 dark:text-slate-400 text-base md:text-lg font-be-vietnam">
          {t("testimonialsSubtitle")}
        </p>
      </div>

      <div className="group/testimonials space-y-6">
        <div className="relative w-full" style={maskStyle}>
          <div
            className={`flex gap-6 w-max ${topMarquee} group-hover/testimonials:[animation-play-state:paused]`}
          >
            {doubledTop.map((item, i) => (
              <TestimonialCard
                key={`top-${item.name.en}-${i}`}
                item={item}
                lang={lang}
                shapeIndex={shapeIndexFor(item)}
              />
            ))}
          </div>
        </div>

        <div className="relative w-full" style={maskStyle}>
          <div
            className={`flex gap-6 w-max ${bottomMarquee} group-hover/testimonials:[animation-play-state:paused]`}
          >
            {doubledBottom.map((item, i) => (
              <TestimonialCard
                key={`bottom-${item.name.en}-${i}`}
                item={item}
                lang={lang}
                shapeIndex={shapeIndexFor(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
