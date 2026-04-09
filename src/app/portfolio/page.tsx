"use client";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams } from "next/navigation";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  liveLink: string;
  repoLink: string;
  image: string;
  gallery: string[];
  tags: string[];
}

interface UserProfile {
  name: string;
  title: string;
  bio: string;
  phone: string;
  skills: string[];
  avatar: string;
}

const DEFAULT_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuCGouCOGOVSCe45ZHd6EA7EHQahXptFNVyjWEGEibuFU6-SN8BJe2j5HU9x7qXyP9rpS0bvOa-9-Y-aeuGPMBnkdFPwiGXr7hrcu9otIxjdmhSOFDBeKs_hVyUZD1g-Yvtwc0BPqd22i9q3Kcaf8MN4MEeI4aWWDzC8uS93T_oc7n6-91Cy3ZutboG5daTytZGcz9_vDar9OquYtbhMLNf1H598Hj6Gd63-Ksn_5GUuDpc267qBxrE0JzrBn9c3-t7uVUN4ky-Fa-Q";
import { API_URL as API } from "@/lib/api";

function PortfolioContent() {
  const { t, isRtl } = useLanguage();
  const searchParams = useSearchParams();
  const targetUid = searchParams.get("uid");
  
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "Mina Ghareeb",
    title: "Senior Full-stack Developer",
    bio: "Passionate engineer with over 8 years of experience in building scalable web applications and security architecture.",
    phone: "+20 123 456 7890",
    skills: ["React", "Next.js", "Rust", "TypeScript", "Node.js", "PostgreSQL"],
    avatar: DEFAULT_AVATAR
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const isOwner = loggedInUserId && (!targetUid || targetUid === loggedInUserId);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");
    setLoggedInUserId(id);
    setUserRole(role);

    const fetchId = targetUid || id;
    if (fetchId) {
      fetchUserData(fetchId);
    } else {
      setLoading(false);
    }
  }, [targetUid]);

  const fetchUserData = async (id: string) => {
    try {
      const res = await fetch(`${API}/users/${id}`);
      if (res.ok) {
        const user = await res.json();
        setProfile({
          name: user.name || "Mina Ghareeb",
          title: user.title || "Elite Professional",
          bio: user.bio || "",
          phone: user.phone || "",
          skills: user.skills ? user.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
          avatar: user.image || DEFAULT_AVATAR
        });

        if (user.portfolioProjects) {
          const mapped: Project[] = user.portfolioProjects.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            description: p.description,
            liveLink: p.liveLink || "https://",
            repoLink: p.repoLink || "https://github.com/",
            image: p.image || "",
            gallery: p.gallery ? JSON.parse(p.gallery) : [],
            tags: p.tags ? p.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []
          }));
          setProjects(mapped);
        }
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    if (!loggedInUserId) return;
    setIsSaving(true);
    try {
      const token = localStorage.getItem("authToken");
      await fetch(`${API}/users/${loggedInUserId}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profile.name,
          bio: profile.bio,
          title: profile.title,
          phone: profile.phone,
          skills: profile.skills.join(','),
          image: profile.avatar.startsWith('data:') ? null : profile.avatar
        })
      });
      localStorage.setItem("userName", profile.name);
      setIsEditMode(false);
      alert(isRtl ? "تمت المزامنة بنجاح!" : "Synced successfully!");
    } catch (err) {
      alert("Error saving");
    } finally {
      setIsSaving(false);
    }
  };

  const saveProjectForm = async () => {
    if (!editingProject || !loggedInUserId) return;
    const isExisting = projects.find(p => p.id === editingProject.id);
    const token = localStorage.getItem("authToken");
    try {
      if (isExisting && !editingProject.id.startsWith('new-')) {
        await fetch(`${API}/users/${loggedInUserId}/portfolio/${editingProject.id}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(editingProject)
        });
        setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
      } else {
        const res = await fetch(`${API}/users/${loggedInUserId}/portfolio`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(editingProject)
        });
        const created = await res.json();
        setProjects([...projects, { ...editingProject, id: created.id }]);
      }
    } catch (err) { console.error(err); }
    setEditingProject(null);
  };

  const deleteProject = async (id: string) => {
    if (!loggedInUserId || !confirm("Delete?")) return;
    const token = localStorage.getItem("authToken");
    await fetch(`${API}/users/${loggedInUserId}/portfolio/${id}`, { 
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    setProjects(projects.filter(p => p.id !== id));
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      <div className="h-12 w-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className={`bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 relative overflow-hidden ${isRtl ? 'font-arabic' : ''}`}>
      {/* Structural Scientific Background */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
         <div className="absolute top-1/4 -right-10 opacity-[0.02] dark:opacity-[0.03] text-[20vw] font-mono font-black text-cyan-600 rotate-45">{"#"}</div>
         <div className="absolute bottom-1/4 -left-20 opacity-[0.02] dark:opacity-[0.03] text-[25vw] font-mono font-black text-slate-500 -rotate-12 animate-[pulse_6s_ease-in-out_infinite]">{"*"}</div>
      </div>
      <Header />
      <input type="file" hidden ref={fileInputRef} onChange={(e) => {
        const f = e.target.files?.[0];
        if (f) {
          const r = new FileReader();
          r.onloadend = () => setProfile({...profile, avatar: r.result as string});
          r.readAsDataURL(f);
        }
      }} />

      {editingProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
           <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[4rem] p-12 shadow-2xl relative animate-in">
              <button onClick={() => setEditingProject(null)} className="absolute top-12 right-12 p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-cyan-600 transition-all font-bold">
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="space-y-8 max-h-[80vh] overflow-y-auto px-4">
                 <h2 className="text-4xl font-black text-slate-900 dark:text-white font-plus-jakarta tracking-tighter">
                   {isRtl ? "إعدادات المشروع" : "Project Identity"}
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-cyan-500 outline-none text-slate-900 dark:text-white font-bold" value={editingProject.title} onChange={(e) => setEditingProject({...editingProject, title: e.target.value})} placeholder="Project Title" />
                    <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-cyan-500 outline-none font-bold text-slate-900 dark:text-white" value={editingProject.category} onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}>
                       <option>Full-stack</option><option>AI Engineering</option><option>Security</option>
                    </select>
                 </div>
                 <textarea className="w-full px-6 py-4 rounded-3xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-cyan-500 outline-none h-32 resize-none text-slate-900 dark:text-white" value={editingProject.description} onChange={(e) => setEditingProject({...editingProject, description: e.target.value})} placeholder="Describe the stack and impact..." />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input className="w-full px-6 py-4 rounded-full bg-slate-50 dark:bg-slate-800 outline-none border-2 border-transparent focus:border-cyan-500 text-slate-900 dark:text-white" value={editingProject.liveLink} onChange={(e) => setEditingProject({...editingProject, liveLink: e.target.value})} placeholder="Live URL" />
                    <input className="w-full px-6 py-4 rounded-full bg-slate-50 dark:bg-slate-800 outline-none border-2 border-transparent focus:border-cyan-500 text-slate-900 dark:text-white" value={editingProject.repoLink} onChange={(e) => setEditingProject({...editingProject, repoLink: e.target.value})} placeholder="Repo URL" />
                 </div>
                 <div onClick={() => { 
                   const i = document.createElement('input'); i.type = 'file'; i.onchange = (e: any) => {
                     const f = e.target.files[0];
                     const r = new FileReader(); r.onloadend = () => setEditingProject({...editingProject, image: r.result as string}); r.readAsDataURL(f);
                   }; i.click();
                 }} className="aspect-video w-full rounded-3xl border-4 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center cursor-pointer overflow-hidden bg-slate-50 dark:bg-slate-800/50 hover:border-cyan-500 transition-all">
                    {editingProject.image ? <img src={editingProject.image} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-4xl text-slate-300">add_photo_alternate</span>}
                 </div>
                 <button onClick={saveProjectForm} className="w-full py-5 bg-cyan-600 text-white rounded-full font-black text-xl shadow-xl hover:bg-cyan-500 transition-all">
                   {isRtl ? "تحديث المعرض" : "Update Portfolio Gallery"}
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className={`flex pt-52 md:pt-48 relative z-10 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <Sidebar />
        <main className={`flex-1 ${isRtl ? 'mr-0 md:mr-72' : 'ml-0 md:ml-72'} p-4 sm:p-8 space-y-16 md:space-y-32 max-w-[1400px] mx-auto w-full overflow-hidden transition-all duration-300 relative z-10`}>
          
          <section className="relative overflow-hidden rounded-[2rem] sm:rounded-[4rem] bg-white dark:bg-slate-900 p-6 sm:p-12 lg:p-20 border border-slate-100 dark:border-slate-800 shadow-3xl text-start">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-10">
                   <div className="space-y-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-600 flex items-center gap-2">
                        <span className="w-4 h-[2px] bg-cyan-600"></span>
                        {isRtl ? 'ملف مهندس موثق' : 'Verified Engineering Identity'}
                      </p>
                      {isEditMode ? (
                        <div className="space-y-6">
                           <input className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl w-full border-2 border-cyan-500 outline-none" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                           <input className="text-2xl text-cyan-600 font-black bg-slate-50 dark:bg-slate-800 p-4 rounded-xl w-full border-2 border-cyan-500 outline-none" value={profile.title} onChange={(e) => setProfile({...profile, title: e.target.value})} />
                           <textarea className="text-slate-500 text-lg font-medium bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl w-full h-32 border-2 border-cyan-500 outline-none resize-none" value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} />
                        </div>
                      ) : (
                        <div className="space-y-6">
                           <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-900 dark:text-white font-plus-jakarta tracking-tighter leading-none break-words">{profile.name}</h1>
                           <p className="text-xl sm:text-2xl text-cyan-600 font-bold uppercase tracking-widest font-plus-jakarta break-words">{profile.title}</p>
                           <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium font-be-vietnam max-w-xl">{profile.bio}</p>
                        </div>
                      )}
                   </div>
                   <div className="flex gap-4 flex-wrap">
                      {isEditMode ? (
                        <button onClick={handleSaveAll} disabled={isSaving} className="px-12 py-5 bg-green-600 text-white rounded-full font-black text-lg shadow-2xl hover:scale-105 transition-all">
                          {isSaving ? "Saving..." : t('publishChanges')}
                        </button>
                      ) : isOwner ? (
                        <button onClick={() => setIsEditMode(true)} className="px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black shadow-xl hover:scale-105 transition-all">
                           {t('customizeProfile')}
                        </button>
                      ) : (
                        <Link href="/messages" className="px-12 py-5 bg-cyan-600 text-white rounded-full font-black shadow-xl hover:scale-105 transition-all">
                           Contact Expert
                        </Link>
                      )}
                   </div>
                </div>
                <div className="relative group rounded-[4rem] overflow-hidden border-[10px] border-white dark:border-slate-800 shadow-3xl aspect-square">
                   <img src={profile.avatar || DEFAULT_AVATAR} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   {isEditMode && (
                     <div onClick={() => fileInputRef.current?.click()} className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer text-white opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="material-symbols-outlined text-5xl">photo_camera</span>
                     </div>
                   )}
                </div>
             </div>
          </section>

          <section className="space-y-16 text-start">
             <div className={`flex justify-between items-end border-b border-slate-200/50 pb-12 ${isRtl ? 'flex-row-reverse' : ''}`}>
               <h2 className="text-5xl font-black text-slate-900 dark:text-white font-plus-jakarta tracking-tighter">{t('caseArchives')}</h2>
               {isOwner && (
                 <button onClick={() => setEditingProject({ id: 'new-'+Date.now(), title: "", category: "Full-stack", description: "", liveLink: "https://", repoLink: "https://", image: "", gallery: [], tags: [] })} className="px-8 py-4 bg-cyan-600 text-white rounded-2xl font-black shadow-lg flex items-center gap-2 hover:bg-cyan-500 transition-all">
                   <span className="material-symbols-outlined">add_box</span> New Entry
                 </button>
               )}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                {projects.map((p, index) => (
                   <div key={p.id} 
                     className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-700 group relative overflow-hidden"
                     style={{ animation: `fadeIn 0.5s ease-out ${index * 0.15}s forwards`, opacity: 0 }}
                   >
                      <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none font-mono text-[12rem] font-black group-hover:scale-110 transition-transform duration-700">{"{}"}</div>
                      <div className="relative z-10">
                         {isOwner && (
                            <div className="absolute top-6 right-6 flex gap-2">
                            <button onClick={() => setEditingProject(p)} className="p-3 bg-white shadow-xl rounded-xl text-cyan-600 hover:scale-110 transition-all"><span className="material-symbols-outlined">edit</span></button>
                            <button onClick={() => deleteProject(p.id)} className="p-3 bg-white shadow-xl rounded-xl text-red-500 hover:scale-110 transition-all"><span className="material-symbols-outlined">delete</span></button>
                         </div>
                      )}
                      <div className="aspect-video w-full rounded-[2rem] overflow-hidden mb-8 shadow-md">
                         <img src={p.image || "/placeholder.jpg"} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                      </div>
                      <div className="space-y-4">
                         <span className="text-[10px] font-black uppercase text-cyan-600 tracking-widest">{p.category}</span>
                         <h3 className="text-3xl font-black text-slate-900 dark:text-white font-plus-jakarta truncate">{p.title}</h3>
                         <p className="text-slate-500 font-medium line-clamp-3 leading-relaxed">{p.description}</p>
                         <div className="flex gap-4 pt-4">
                            <a href={p.liveLink} target="_blank" className="text-xs font-black uppercase text-slate-400 hover:text-cyan-600 transition-colors">Live Review</a>
                            <a href={p.repoLink} target="_blank" className="text-xs font-black uppercase text-slate-400 hover:text-cyan-600 transition-colors">Source Code</a>
                         </div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  );
}
