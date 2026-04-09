"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    projects: "Browse Repos & Gigs",
    clientView: "Client View",
    finances: "Finances",
    portfolio: "Code Portfolio",
    eliteDeveloper: "10x Developer",
    verifiedClient: "Verified Client",
    customizeProfile: "Customize Config",
    publishChanges: "Commit & Push",
    professionalStack: "Tech Stack",
    caseArchives: "Project Archives",
    addSkill: "Add Dependency",
    deployShowcase: "Deploy Showcase",
    launchApp: "Run App",
    viewRepo: "View Source",
    techArsenal: "Technical Arsenal",
    masteryOrbit: "Algorithm Mastery",
    switchCreator: "Switch to Developer Mode",
    nextGenEngineering: "Your Git & Code Platform",
    heroTitle: "The Ecosystem for Elite Programmers",
    heroSubtitle: "Compile your freelance career. We connect top-tier developers and system architects with high-value technical challenges. Built by engineers, for engineers.",
    imADeveloper: "sudo init(Developer)",
    imAClient: "sudo init(Client)",
    devBenefits: "Discover high-quality software projects in your tech stack, commit code, and merge your expertise.",
    clientBenefits: "Compile your requirements and hire expert system architects for any technical stack.",
    applyToJoin: "Request Access",
    postAProject: "Deploy a Project",
    trustIndex: "Trust Quotient",
    aiVerifiedTalent: "Algorithmically Verified Network",
    backedByBest: "Backed by Top Tech Guilds",
    marketplace: "Code Exchange",
    findTalent: "Find Engineers",
    aboutUs: "About.md",
    legal: "License.txt",
    careers: "Careers()",
    joinOurVision: "Fork our vision",
    subscribe: "Subscribe",
    explorePremium: "Explore premium engineering architectures from around the globe.",
    searchPlaceholder: "Search repositories & bounties...",
    applyNow: "Submit Pull Request",
    priorityBid: "Priority Execution",
    urgentPriority: "Urgent Hotfix",
    verified: "SHA-256 Verified",
    budget: "Budget Allocation",
    clientProjects: "Active Deployments",
    manageSubscription: "Manage Subscription",
    enterpriseSuite: "Enterprise Suite",
    currentPlan: "Current Plan",
    analytics: "Telemetry",
    messages: "Terminal Chat",
    searchChats: "Grep chats...",
    typeSecureMessage: "Type secure packet...",
    activeNow: "Online",
    totalEarnings: "Total Earnings",
    successRate: "Build Success Rate",
    avgResponseTime: "Ping Latency",
    performanceRating: "Performance Rating",
    monthlyRevenue: "Monthly Revenue",
    incomeTrends: "Financial metrics over the last 6 months",
    growth: "Growth",
    skillPulse: "Skill Pulse",
    upgradePro: "Upgrade to Pro to unlock advanced API rate limits and deep market analytics.",
    jan: "Jan", feb: "Feb", mar: "Mar", apr: "Apr", may: "May", jun: "Jun",

    // Scientific / Programmed Content
    scientificVerification: "Runtime Validation & Audits",
    infrastructureTitle: "High-Performance Architecture",
    infrastructureDesc: "Our underlying ecosystem is built to track code metrics, compile execution stats, and provide an accurate measure of developer throughput and quality.",
    missionStatement: "Providing a low-latency, highly concurrent marketplace for the world's most capable engineers.",
    technicalPrecision: "O(1) Efficiency",
    algorithmicTrust: "Algorithmic Matching",
    quantumSecurity: "End-to-End Encryption",
    biotechIntegration: "Microservices & APIs",
    cloudNative: "Serverless Deployments",
    cybernetics: "AI-Assisted Architecture",
    globalLabs: "Global Dev Nodes",
    researchPartners: "Integration Tech",
    verifiedTitle: "Rigorous Technical Selection",
    verifiedDesc: "Standardized CI/CD checks for every developer profile, ensuring technical requirements meet production-level standards.",
    dataDriven: "Data-Driven Platform",
    scalingSolutions: "Auto-Scaling Solutions",
    blockchainArch: "Immutable Logs",
    fullStackExcellence: "Full-Stack Excellence",
    securityAudit: "Comprehensive Penetration Testing",
    aiGrading: "Automated Code Review System",
    smartContracts: "Smart Contract Escrow",
    scientificMethod: "Test-Driven Development",
    mathematicalProof: "Verified Commit History",
    
    // New Home Page Added Content
    domainsTitle: "Supported Development Domains",
    domainAI: "Artificial Intelligence & ML",
    domainBlockchain: "Web3 & Smart Contracts",
    domainCloud: "Cloud Architecture & DevOps",
    domainSystems: "System Programming & Automation",
    pipelineTitle: "Continuous Delivery Pipeline",
    step1Title: "Define Architecture",
    step1Desc: "Create detailed engineering docs.",
    step2Title: "Execute Codebase",
    step2Desc: "Engineers build and push your features.",
    step3Title: "CI/CD & Deploy",
    step3Desc: "Automated testing and production deployment.",
    joinCtaTitle: "Ready to write the future?",
    beginCompileBtn: "Begin Compilation",
    
    sysDocTitle: "System Documentation",
    sysDoc1: "How are engineers vetted?",
    sysDoc1Desc: "Every dev passes a multi-stage technical audit covering algo efficiency and real-world system design.",
    sysDoc2: "What is algorithmic pricing?",
    sysDoc2Desc: "Budgets are algorithmically optimized based on project scope, required expertise, and market telemetry.",
    sysDoc3: "Who owns the codebase?",
    sysDoc3Desc: "Clients receive full IP and repository rights immediately upon milestone approval.",
    sysDoc4: "Is there a service SLA?",
    sysDoc4Desc: "Yes, our enterprise contracts guarantee 99.9% uptime for communications and escrow services.",
    
    prodCasesTitle: "Production Case Studies",
    case1: "FinTech Core Migration",
    case1Desc: "Legacy monolithic app refactored into a highly available microservices cluster, saving 30% computing costs.",
    case2: "AI Trading Model",
    case2Desc: "Integrated a real-time predictive pipeline with latency less than 12ms for HFT execution."
  },
  ar: {
    dashboard: "لوحة التحكم",
    projects: "تصفح المشاريع والأكواد",
    clientView: "عرض العميل",
    finances: "المالية",
    portfolio: "معرض الأكواد",
    eliteDeveloper: "مطور 10x",
    verifiedClient: "عميل موثق",
    customizeProfile: "تخصيص الإعدادات",
    publishChanges: "حفظ وتحديث",
    professionalStack: "التقنيات (Stack)",
    caseArchives: "أرشيف المشاريع",
    addSkill: "إضافة تقنية",
    deployShowcase: "نشر مشروع",
    launchApp: "تشغيل التطبيق",
    viewRepo: "عرض الكود",
    techArsenal: "الترسانة البرمجية",
    masteryOrbit: "مجال احتراف الخوارزميات",
    switchCreator: "التبديل لوضع المطور",
    nextGenEngineering: "بيئة التطوير الخاصة بك",
    heroTitle: "المنصة الأولى للمبرمجين ومهندسي البرمجيات",
    heroSubtitle: "اكتب كود نجاحك. نجمع بين المبرمجين المحترفين والمشاريع التقنية المعقدة. منصة صنعت بواسطة المهندسين، للمهندسين.",
    imADeveloper: "أنا مبرمج",
    imAClient: "أبحث عن مبرمج",
    devBenefits: "استكشف مشاريع بجودة عالية تتناسب مع تقنياتك، واعمل على كتابة أكواد وحلول مبتكرة.",
    clientBenefits: "انشر تفاصيل وبنية مشروعك الهندسي، ووظف أفضل العقول لإنجازه.",
    applyToJoin: "طلب انضمام",
    postAProject: "نشر مشروع",
    trustIndex: "مؤشر الثقة البرمجي",
    aiVerifiedTalent: "شبكة مطورين مدققة بالذكاء الاصطناعي",
    backedByBest: "بدعم من كبرى الشركات التقنية",
    marketplace: "سوق الأكواد",
    findTalent: "ابحث عن مبرمجين",
    aboutUs: "من نحن",
    legal: "الشروط",
    careers: "الوظائف",
    joinOurVision: "شاركنا الرؤية",
    subscribe: "اشتراك",
    explorePremium: "استكشف أحدث معماريات البرمجيات والمشاريع من حول العالم.",
    searchPlaceholder: "ابحث عن مشاريع وأكواد...",
    applyNow: "تقديم عرض (Pull Request)",
    priorityBid: "تنفيذ ذو أولوية",
    urgentPriority: "مشكلة حرجة (Hotfix)",
    verified: "موثق تقنياً",
    budget: "الميزانية المخصصة",
    clientProjects: "المنصات الفعالة",
    manageSubscription: "إدارة الاشتراك",
    enterpriseSuite: "حزمة الشركات",
    currentPlan: "الخطة الحالية",
    analytics: "تحليلات الأداء",
    messages: "وحدة التحكم (Terminal)",
    searchChats: "بحث في المحادثات...",
    typeSecureMessage: "اكتب رسالة مشفرة...",
    activeNow: "متصل",
    totalEarnings: "إجمالي الأرباح",
    successRate: "معدل نجاح البناء",
    avgResponseTime: "زمن الاستجابة",
    performanceRating: "تقييم الأداء",
    monthlyRevenue: "الإيرادات الشهرية",
    incomeTrends: "تحليلات الدخل لآخر ٦ أشهر",
    growth: "معدل النمو",
    skillPulse: "تحليل المهارات",
    upgradePro: "قم بالترقية لفتح المزيد من واجهات البرمجة وتحليلات السوق.",
    jan: "يناير", feb: "فبراير", mar: "مارس", apr: "أبريل", may: "مايو", jun: "يونيو",

    // Scientific / Programmed Content
    scientificVerification: "التحقق التقني وتدقيق الجودة",
    infrastructureTitle: "بنية تحتية هندسية عالية الأداء",
    infrastructureDesc: "نظامنا يعتمد على تتبع مقاييس الجودة البرمجية، وتحليل كفاءة التنفيذ والموارد، لتقديم تقييم دقيق للمبرمجين.",
    missionStatement: "توفير بيئة منخفضة التأخير ومتوازية لتمكين نخبة مهندسي البرمجيات في العالم.",
    technicalPrecision: "كفاءة و تعقيد O(1)",
    algorithmicTrust: "توفيق بالخوارزميات",
    quantumSecurity: "تشفير تام من الطرفين",
    biotechIntegration: "أنظمة واجهات وخوادم (APIs)",
    cloudNative: "هيكلية بدون خوادم (Serverless)",
    cybernetics: "تحليل معماري بالذكاء الاصطناعي",
    globalLabs: "عقد تطوير عالمية (Nodes)",
    researchPartners: "شركاء تكامل التقنية",
    verifiedTitle: "اختيار تقني دقيق ومعياري",
    verifiedDesc: "فحوصات (CI/CD) معيارية لكل ملف شخصي لضمان جودة الأكواد والتطبيقات ونجاحها في بيئة الإنتاج.",
    dataDriven: "منصة تعتمد على البيانات",
    scalingSolutions: "حلول برمجية قابلة للتوسع",
    blockchainArch: "سجلات بيانات غير قابلة للتعديل",
    fullStackExcellence: "هندسة متكاملة (Full-Stack)",
    securityAudit: "اختبارات اختراق وأمان شاملة",
    aiGrading: "نظام مراجعة كود مؤتمت",
    smartContracts: "عقود ذكية للمشاريع",
    scientificMethod: "تطوير موجه بالاختبارات (TDD)",
    mathematicalProof: "سجلات إنجازات موثقة (Commits)",

    // New Home Page Added Content
    domainsTitle: "مجالات التطوير والأنظمة المدعومة",
    domainAI: "الذكاء الاصطناعي وتعلم الآلة",
    domainBlockchain: "تقنيات الويب ٣ والعقود الذكية",
    domainCloud: "معمارية الحوسبة السحابية (DevOps)",
    domainSystems: "برمجة الأنظمة والأتمتة",
    pipelineTitle: "دورة حياة بناء واستلام المشروع",
    step1Title: "بناء معمارية المشروع",
    step1Desc: "كتابة مستندات تقنية وهندسية لتفاصيل التطبيق.",
    step2Title: "كتابة وتطوير الشيفرة",
    step2Desc: "المبرمجون يقومون بكتابة ودمج الميزات البرمجية.",
    step3Title: "الفحص التلقائي والنشر",
    step3Desc: "عمليات فحص مؤتمتة ونشر مباشر على بيئة الإنتاج.",
    joinCtaTitle: "هل أنت مستعد لكتابة كود المستقبل؟",
    beginCompileBtn: "ابدأ عملية بناء نظامك",

    sysDocTitle: "مستندات النظام المرجعية (FAQ)",
    sysDoc1: "كيف يتم تقييم المهندسين المتقدمين؟",
    sysDoc1Desc: "يجتاز كل مهندس فحصاً تقنياً متعدد المراحل يشمل كفاءة الخوارزميات وتصميم الأنظمة المعقدة.",
    sysDoc2: "ما هو مبدأ التسعير الخوارزمي؟",
    sysDoc2Desc: "يتم حساب وتحسين الميزانية خوارزمياً بناءً على تعقيد المشروع، والخبرات المطلوبة، وحالة السوق.",
    sysDoc3: "من يمتلك حقوق ومصدر الكود البرمجي (Source Code)؟",
    sysDoc3Desc: "يحصل العميل على حقوق الملكية الفكرية الكاملة للمستودع فور الموافقة على الدفع والتسليم.",
    sysDoc4: "هل يوجد مستوى خدمة موثق (SLA)؟",
    sysDoc4Desc: "نعم، عقودنا تضمن لمواقع المؤسسات استمرارية وحماية لبيئة العمل (Uptime) بنسبة 99.9%.",

    prodCasesTitle: "دراسات حالة من بيئة الإنتاج",
    case1: "نقل نواة نظام مالي (FinTech API)",
    case1Desc: "تم إعادة هيكلة النظام القديم إلى خدمات مصغرة (Microservices) ذات اعتمادية عالية، ليوفر ٣٠٪ من تكلفة السيرفرات.",
    case2: "نموذج ذكاء اصطناعي للتحليل",
    case2Desc: "دمج نموذج بيانات في الزمن الفعلي (Real-time Pipeline) بمعدل تأخير لا يتجاوز ١٢ مللي ثانية."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('siteLang') as Language;
    if (saved) setLanguage(saved);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('siteLang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string) => translations[language][key] || key;
  const isRtl = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
