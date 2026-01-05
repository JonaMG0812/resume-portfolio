import { useLanguage } from '../hooks/useLanguage';
import './LanguageToggle.css';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'es' : 'en');
    };

    return (
        <button
            className="language-toggle no-print"
            onClick={toggleLanguage}
            aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
            title={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
        >
            <span className={`lang-option ${language === 'en' ? 'active' : ''}`}>EN</span>
            <span className="separator">|</span>
            <span className={`lang-option ${language === 'es' ? 'active' : ''}`}>ES</span>
        </button>
    );
}
