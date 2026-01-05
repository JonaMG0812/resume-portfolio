import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { CV } from '../types/cv';

export type Language = 'en' | 'es';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    cv: CV;
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

    const [cv, setCv] = useState<CV | null>(null);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('preferred-language', lang);
    };

    useEffect(() => {
        // Update document lang attribute for accessibility
        document.documentElement.lang = language;

        // Load CV data based on language
        const cvPath = language === 'es' ? '/cv-es.json' : '/cv.json';
        fetch(cvPath)
            .then(res => res.json())
            .then(data => setCv(data))
            .catch(err => console.error('Error loading CV data:', err));
    }, [language]);

    // Don't render children until CV data is loaded
    if (!cv) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, cv }}>
            {children}
        </LanguageContext.Provider>
    );
}
