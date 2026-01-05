import type { Certificate } from '../types/cv';
import { useLanguage } from '../hooks/useLanguage';
import './Certificates.css';

interface CertificatesProps {
    certificates: Certificate[];
}

export default function Certificates({ certificates }: CertificatesProps) {
    const { cv, language } = useLanguage();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formatted = date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long' });
        // Capitalize first letter for Spanish months
        if (language === 'es') {
            return formatted.charAt(0).toUpperCase() + formatted.slice(1);
        }
        return formatted;
    };

    return (
        <section className="section certificates-section" id="certificaciones">
            <div className="container">
                <h2 className="section-title">{cv.ui.certifications}</h2>

                <div className="certificates-grid grid grid-2">
                    {certificates.map((cert, index) => (
                        <a
                            key={index}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="certificate-card card fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="certificate-header">
                                <div className="certificate-icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                        <path d="M9 12l2 2 4-4"></path>
                                    </svg>
                                </div>
                                <svg
                                    className="certificate-external"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
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
                            </div>

                            <h3 className="certificate-name">{cert.name}</h3>
                            <p className="certificate-issuer">{cert.issuer}</p>
                            <p className="certificate-date">{formatDate(cert.date)}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
