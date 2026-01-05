import { createContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguageState] = useState<Language>(() => {
        // Check localStorage first
        const savedLang = localStorage.getItem('preferred-language') as Language | null;
        if (savedLang === 'en' || savedLang === 'es') {
            return savedLang;
        }

        // Detect browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('es')) {
            return 'es';
        }

        // Default to English
        return 'en';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('preferred-language', lang);
    };

    useEffect(() => {
        // Update document lang attribute for accessibility
        document.documentElement.lang = language;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}
