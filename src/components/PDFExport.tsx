import './PDFExport.css';

export default function PDFExport() {
    return (
        <a
            href="/Jonathan MG Resume.pdf"
            download="Jonathan MG Resume.pdf"
            className="pdf-export-btn btn btn-primary no-print"
            aria-label="Exportar a PDF"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download CV
        </a>
    );
}
