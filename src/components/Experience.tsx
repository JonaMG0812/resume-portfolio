import type { Work } from '../types/cv';
import './Experience.css';

interface ExperienceProps {
    work: Work[];
}

export default function Experience({ work }: ExperienceProps) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Present';
        const date = new Date(dateString);
        // Using en-US to get capitalized months (e.g. "May", "June")
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    const calculateDuration = (start: string, end: string | null) => {
        const startDate = new Date(start);
        const endDate = end ? new Date(end) : new Date();
        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            (endDate.getMonth() - startDate.getMonth());
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        if (years === 0) return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
        if (remainingMonths === 0) return `${years} ${years === 1 ? 'year' : 'years'}`;
        return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    };

    return (
        <section className="section experience-section" id="experience">
            <div className="container">
                <h2 className="section-title">Work Experience</h2>

                <div className="timeline">
                    {work.map((job, index) => (
                        <div
                            key={index}
                            className={`timeline-item card fade-in`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="timeline-marker"></div>

                            <div className="experience-header">
                                <div>
                                    <h3 className="experience-position">{job.position}</h3>
                                    <a
                                        href={job.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="experience-company"
                                    >
                                        {job.name}
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
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </a>
                                </div>

                                <div className="experience-date">
                                    <div className="date-range">
                                        {formatDate(job.startDate)} - {formatDate(job.endDate)}
                                    </div>
                                    <div className="date-duration">
                                        {calculateDuration(job.startDate, job.endDate)}
                                    </div>
                                </div>
                            </div>

                            <p className="experience-summary">{job.summary}</p>

                            {job.highlights && job.highlights.length > 0 && (
                                <ul className="experience-highlights">
                                    {job.highlights.map((highlight, idx) => (
                                        <li key={idx}>{highlight}</li>
                                    ))}
                                </ul>
                            )}

                            {job.keywords && job.keywords.length > 0 && (
                                <div className="experience-technologies">
                                    {job.keywords.map((keyword, idx) => (
                                        <span key={idx} className="badge">{keyword}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
