"use client";
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useSidebar } from "@/context/SidebarContext";
import { API_URL } from "@/lib/api";

export default function Page() {
  const { t, isRtl } = useLanguage();
  const { isOpen } = useSidebar();
  const [chatList, setChatList] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Use Refs for polling to avoid closure traps
  const activeChatRef = useRef<any>(null);
  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    userIdRef.current = localStorage.getItem("userId");
    activeChatRef.current = activeChat;
  }, [activeChat]);

  // Combined data fetching
  const fetchData = async () => {
    const userId = userIdRef.current;
    if (!userId) return;

    try {
      // 1. Fetch Chats (Proposals)
      const jobResp = await fetch(`${API_URL}/jobs`);
      const allJobs = await jobResp.json();
      
      const myJobsAsClient = allJobs.filter((j: any) => j.clientId === userId);
      const allPropsAsClient = await Promise.all(myJobsAsClient.map(async (j: any) => {
        const pResp = await fetch(`${API_URL}/proposals/job/${j.id}`);
        const props = await pResp.json();
        return props.map((p: any) => ({ ...p, jobTitle: j.title, otherUser: p.developer }));
      }));

      const allPropsAsDev = allJobs.flatMap((j: any) => 
        (j.proposals || []).filter((p: any) => p.developerId === userId).map((p: any) => ({ ...p, jobTitle: j.title, otherUser: j.client }))
      );

      const unifiedThreads = [...allPropsAsClient.flat(), ...allPropsAsDev];
      const uniqueThreadsMap = new Map();
      unifiedThreads.forEach(p => uniqueThreadsMap.set(p.id, p));
      
      const mappedChats = Array.from(uniqueThreadsMap.values()).map((p: any) => ({
        id: p.id,
        name: p.otherUser?.name || 'User',
        lastMsg: `${isRtl ? 'مشروع:' : 'Job:'} ${p.jobTitle}`,
        image: p.otherUser?.image,
        otherUserId: p.otherUser?.id,
        jobId: p.jobId,
        fullProposal: p
      }));

      setChatList(mappedChats);
      if (!activeChatRef.current && mappedChats.length > 0) {
        setActiveChat(mappedChats[0]);
        activeChatRef.current = mappedChats[0];
      }

      // 2. Fetch Messages
      const token = localStorage.getItem("authToken");
      const msgResp = await fetch(`${API_URL}/messages/${userId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const allMessages = await msgResp.json();
      
      if (activeChatRef.current) {
        const filtered = allMessages.filter((m: any) => 
          (m.senderId === activeChatRef.current.otherUserId || m.receiverId === activeChatRef.current.otherUserId)
        );
        // Only update if messages changed to avoid scroll jumping
        setMessages(prev => JSON.stringify(prev) !== JSON.stringify(filtered) ? filtered : prev);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000); // More frequent polling (3s)
    return () => clearInterval(interval);
  }, [isRtl]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !activeChat) return;
    const userId = userIdRef.current;
    
    const newMsg = {
      text: input,
      senderId: userId,
      receiverId: activeChat.otherUserId,
      jobId: activeChat.jobId
    };

    // Optimistic update
    const optimisticMsg = { ...newMsg, id: 'temp-' + Date.now(), createdAt: new Date() };
    setMessages(prev => [...prev, optimisticMsg]);
    setInput("");

    try {
      const token = localStorage.getItem("authToken");
      const resp = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newMsg)
      });
      if (!resp.ok) throw new Error("Failed to send");
      fetchData(); // Sync with DB
    } catch (err) {
      console.error(err);
      // Remove optimistic msg on error (optional)
    }
  };

  return (
    <div className={`bg-slate-50 dark:bg-slate-950 min-h-screen ${isRtl ? 'font-arabic' : ''}`}>
      <Header />
      <div className={`flex pt-[144px] md:pt-[176px] ${isRtl ? 'flex-row-reverse' : 'flex-row'} overflow-hidden h-screen relative`}>
        <Sidebar aria-hidden={!isOpen} />
        <main className={`flex-1 ${isRtl ? 'mr-0 md:mr-72' : 'ml-0 md:ml-72'} h-[calc(100vh-144px)] md:h-[calc(100vh-176px)] flex flex-col md:flex-row items-stretch text-start overflow-hidden w-full relative z-10 transition-all duration-300`}>
          <div className={`w-full md:w-96 ${isRtl ? 'md:border-l' : 'md:border-r'} border-slate-200/50 bg-white dark:bg-slate-900 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
             <div className="p-4 sm:p-8 border-b border-slate-200/50">
               <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-plus-jakarta tracking-tight">{t('messages')}</h2>
             </div>
             <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {chatList.map((chat, idx) => (
                  <div 
                    key={`${chat.id}-${idx}`} 
                    onClick={() => setActiveChat(chat)}
                    className={`p-3 sm:p-4 rounded-[1.25rem] sm:rounded-[1.5rem] cursor-pointer transition-all ${activeChat?.id === chat.id ? 'bg-cyan-50 dark:bg-cyan-900/20 shadow-sm border border-cyan-500/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                  >
                     <div className={`flex items-center gap-3 sm:gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200 overflow-hidden ring-1 ring-white dark:ring-slate-800 shrink-0">
                          <img src={chat.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBd7OTuIwFmItoGmeNt2T6umCv87RdiOY6kzRNjEsjZMYQ5H1Xp0o2We3qzi9AY-rURpfICWUNUXKbgmXhaog-gPZoFzUwNXOk2ZcW62q9k8-8LqJoDbd3RG6DXCRmRKhWsy4qX6S-RMkUFqWPdoSa4pqClciB1Ne03KyPwj0zCeBu0F-DdkaIIul92f0BiVUfTCYOEm5uhDj8-8-fa9u-OxyDmQSa0EMBDlh6HXh1WlPWh8WXJaZiRZL-oEygi_ZUDCl2Ce-8cfQY"} className="w-full h-full object-cover"/>
                       </div>
                       <div className="flex-1 min-w-0">
                         <p className={`font-bold text-slate-900 dark:text-white truncate text-sm text-start`}>{chat.name}</p>
                         <p className="text-[10px] text-cyan-600 truncate text-start font-bold uppercase tracking-tighter">{chat.lastMsg}</p>
                       </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className={`flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
             {activeChat ? (
               <>
                 <div className="p-4 sm:p-6 border-b border-slate-200/50 bg-white dark:bg-slate-900 flex justify-between items-center shadow-sm">
                    <div className={`flex items-center gap-3 sm:gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <button onClick={() => setActiveChat(null)} className="md:hidden p-2 text-slate-400 hover:text-cyan-600 transition-all">
                        <span className="material-symbols-outlined">{isRtl ? 'arrow_forward' : 'arrow_back'}</span>
                      </button>
                      <div className="w-10 h-10 rounded-full bg-slate-200">
                         <img src={activeChat.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBd7OTuIwFmItoGmeNt2T6umCv87RdiOY6kzRNjEsjZMYQ5H1Xp0o2We3qzi9AY-rURpfICWUNUXKbgmXhaog-gPZoFzUwNXOk2ZcW62q9k8-8LqJoDbd3RG6DXCRmRKhWsy4qX6S-RMkUFqWPdoSa4pqClciB1Ne03KyPwj0zCeBu0F-DdkaIIul92f0BiVUfTCYOEm5uhDj8-8-fa9u-OxyDmQSa0EMBDlh6HXh1WlPWh8WXJaZiRZL-oEygi_ZUDCl2Ce-8cfQY"} className="w-full h-full object-cover rounded-full"/>
                      </div>
                      <div className="text-start">
                        <p className="font-bold text-slate-900 dark:text-white font-plus-jakarta">{activeChat.name}</p>
                        <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">{t('activeNow')}</p>
                      </div>
                    </div>
                 </div>

                 <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-12 space-y-6 sm:space-y-8">
                    {messages.map((m) => (
                      <div key={m.id} className={`flex ${m.senderId === userIdRef.current ? (isRtl ? 'justify-start' : 'justify-end') : (isRtl ? 'justify-end' : 'justify-start')}`}>
                        <div className={`max-w-[85%] sm:max-w-md p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[1.75rem] shadow-sm flex flex-col gap-1 sm:gap-2 ${m.senderId === userIdRef.current 
                          ? `bg-slate-900 dark:bg-white text-white dark:text-slate-900 ${isRtl ? 'rounded-bl-none' : 'rounded-br-none'}` 
                          : `bg-white dark:bg-slate-900 text-slate-800 dark:text-white ${isRtl ? 'rounded-br-none' : 'rounded-bl-none'} border border-slate-100 dark:border-slate-800`}`}>
                           <p className="text-[13px] sm:text-sm leading-relaxed text-start break-words">{m.text}</p>
                           <span className={`text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-start opacity-50`}>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    ))}
                 </div>

                 <div className="p-4 sm:p-8 bg-white dark:bg-slate-900 border-t border-slate-200/50">
                    <div className={`flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={isRtl ? "اكتب رسالة..." : "Type a message..."}
                        className={`flex-1 px-4 sm:px-8 py-3 sm:py-4 rounded-full bg-slate-50 dark:bg-slate-800 border-0 outline-none text-xs sm:text-sm text-start`}
                      />
                      <button onClick={handleSend} className="p-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full hover:scale-105 transition-all shadow-xl">
                         <span className={`material-symbols-outlined font-bold ${isRtl ? 'rotate-180' : ''}`}>send</span>
                      </button>
                    </div>
                 </div>
               </>
             ) : (
               <div className="flex-1 flex items-center justify-center p-20 text-center">
                  <div className="space-y-4 max-w-sm">
                     <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-slate-300 text-4xl">inbox</span>
                     </div>
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white">{isRtl ? 'مركز التواصل الآمن' : 'Secure Message Vault'}</h3>
                  </div>
               </div>
             )}
          </div>
        </main>
      </div>
    </div>
  );
}
