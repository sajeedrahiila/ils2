"use client";

import { useLocale } from "./LocaleProvider";

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  
  return (
    <div className="flex gap-2 items-center">
      <button
        className={`px-3 py-1 rounded text-sm ${
          locale === "en" 
            ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200" 
            : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
        }`}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
      <button
        className={`px-3 py-1 rounded text-sm ${
          locale === "ar" 
            ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200" 
            : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
        }`}
        onClick={() => setLocale("ar")}
      >
        العربية
      </button>
    </div>
  );
}
