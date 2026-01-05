import type { Education as EducationType, Language } from '../types/cv';
import { useLanguage } from '../hooks/useLanguage';
import './Education.css';

interface EducationProps {
    education: EducationType[];
    languages?: Language[];
}

export default function Education({ education, languages }: EducationProps) {
    const { cv, language } = useLanguage();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formatted = date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short' });
        // Capitalize first letter for Spanish months
        if (language === 'es') {
            return formatted.charAt(0).toUpperCase() + formatted.slice(1);
        }
        return formatted;
    };

    return (
        <section className="section education-section" id="education">
            <div className="container">
                <h2 className="section-title">{cv.ui.educationAndLanguages}</h2>

                <div className="education-grid">
                    {education.map((edu, index) => (
                        <div
                            key={`edu-${index}`}
                            className={`education-card card fade-in`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="education-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                </svg>
                            </div>

                            <div className="education-content">
                                <h3 className="education-degree">{edu.studyType} {cv.ui.in} {edu.area}</h3>
                                <a
                                    href={edu.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="education-institution"
                                >
                                    {edu.institution}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </a>

                                <div className="education-meta">
                                    <span className="education-date">
                                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                    </span>
                                    {edu.score && (
                                        <span className="education-score">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                            {edu.score}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {languages && languages.map((lang, index) => (
                        <div key={`lang-${index}`} className="education-card card fade-in" style={{ animationDelay: `${(index + education.length) * 0.1}s` }}>
                            <div className="education-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                            </div>
                            <div className="education-content">
                                <h3 className="education-degree">{lang.language}</h3>
                                <div className="education-institution" style={{ marginBottom: '4px', color: 'var(--text-primary)' }}>
                                    {lang.fluency}
                                </div>
                                {lang.description && (
                                    <div className="education-date">
                                        {lang.description}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
