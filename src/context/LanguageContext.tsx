"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "zh";

interface LanguageContextValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  toggleLang: () => void;
  t: <T>(en: T, zh: T) => T;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
  t: (en) => en,
});

const STORAGE_KEY = "switchcn_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    // Shield React 18/19 against Chrome / Edge auto-translate DOM mutations (<font> wrapping)
    if (typeof Node === "function" && Node.prototype) {
      const origRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function <T extends Node>(child: T): T {
        if (child.parentNode !== this) {
          return child;
        }
        return origRemoveChild.call(this, child) as T;
      };

      const origInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function <T extends Node>(
        newNode: T,
        referenceNode: Node | null
      ): T {
        if (referenceNode && referenceNode.parentNode !== this) {
          return newNode;
        }
        return origInsertBefore.call(this, newNode, referenceNode) as T;
      };
    }

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "zh" || saved === "en") {
        setLangState(saved);
        document.documentElement.lang = saved === "zh" ? "zh-CN" : "en";
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    } catch {
      // ignore storage errors
    }
  };

  const toggleLang = () => setLang(lang === "en" ? "zh" : "en");

  const t = <T,>(en: T, zh: T): T => (lang === "zh" ? zh : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
