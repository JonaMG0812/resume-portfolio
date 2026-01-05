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
    footerRights: 'All rights reserved.',
    footerNote: 'Designed with ❤️ using React + TypeScript'
  },
  es: {
    footerRights: 'Todos los derechos reservados.',
    footerNote: 'Diseñado con ❤️ usando React + TypeScript'
  }
};

function App() {
  const { language, cv } = useLanguage();
  const t = translations[language];

  return (
    <div className="app-container">
      {/* Main Web App */}
      <div className="app">
        <LanguageToggle />
        <ThemeToggle />
        <PDFExport />

        <main>
          <Hero basics={cv.basics} />
          <Experience work={cv.work} />
          <Education education={cv.education} languages={cv.languages} />
          <Certificates certificates={cv.certificates} />
        </main>

        <footer className="footer no-print">
          <div className="container">
            <p>© {new Date().getFullYear()} {cv.basics.name}. {t.footerRights}</p>
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
