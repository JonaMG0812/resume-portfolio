import { useEffect, useState } from 'react';
import type { CV } from './types/cv';
import { useLanguage } from './hooks/useLanguage';
import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Education from './components/Education';
import Certificates from './components/Certificates';
import PDFExport from './components/PDFExport';
import './App.css';

// Static text translations
const translations = {
  en: {
    loading: 'Loading resume...',
    error: 'Error',
    errorMessage: 'The resume information could not be loaded',
    footerRights: 'All rights reserved.',
    footerNote: 'Designed with ❤️ using React + TypeScript'
  },
  es: {
    loading: 'Cargando currículum...',
    error: 'Error',
    errorMessage: 'No se pudo cargar la información del currículum',
    footerRights: 'Todos los derechos reservados.',
    footerNote: 'Diseñado con ❤️ usando React + TypeScript'
  }
};

function App() {
  const { language } = useLanguage();
  const [cvData, setCvData] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language];

  useEffect(() => {
    // Reset state when language changes
    setLoading(true);
    setError(null);

    // Fetch CV data from appropriate JSON file based on language
    const cvFile = language === 'es' ? '/cv-es.json' : '/cv.json';

    fetch(cvFile)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load resume data');
        }
        return response.json();
      })
      .then(data => {
        setCvData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error loading resume data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [language]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t.loading}</p>
      </div>
    );
  }

  if (error || !cvData) {
    return (
      <div className="error-container">
        <h1>{t.error}</h1>
        <p>{error || t.errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Main Web App */}
      <div className="app">
        <LanguageToggle />
        <ThemeToggle />
        <PDFExport />

        <main>
          <Hero basics={cvData.basics} />
          <Experience work={cvData.work} />
          <Education education={cvData.education} languages={cvData.languages} />
          <Certificates certificates={cvData.certificates} />
        </main>

        <footer className="footer no-print">
          <div className="container">
            <p>© {new Date().getFullYear()} {cvData.basics.name}. {t.footerRights}</p>
            <p className="footer-note">
              {t.footerNote}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

