"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState, createContext, useContext } from 'react';

function getMessages(locale: string) {
  // Simple messages without next-intl for now
  const messages = {
    en: {
      welcome: "Welcome",
      dashboard: "Dashboard",
      chat: "Chat",
      calls: "Calls",
      media: "Media",
      catalog: "Catalog",
      library: "Library"
    },
    ar: {
      welcome: "أهلاً وسهلاً",
      dashboard: "لوحة التحكم", 
      chat: "الدردشة",
      calls: "المكالمات",
      media: "الوسائط",
      catalog: "الكتالوج",
      library: "المكتبة"
    }
  };
  return messages[locale as keyof typeof messages] || messages.en;
}

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  messages: any;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState(getMessages('en'));

  useEffect(() => {
    const saved = localStorage.getItem('locale');
    if (saved) {
      setLocale(saved);
      setMessages(getMessages(saved));
    }
  }, []);

  const switchLocale = (lang: string) => {
    setLocale(lang);
    setMessages(getMessages(lang));
    localStorage.setItem('locale', lang);
    router.refresh();
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: switchLocale, messages }}>
      {children}
    </LocaleContext.Provider>
  );
}
