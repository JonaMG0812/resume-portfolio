import { useEffect, useState } from 'react';
import type { CV } from './types/cv';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Education from './components/Education';
import Certificates from './components/Certificates';
import PDFExport from './components/PDFExport';
import './App.css';

function App() {
  const [cvData, setCvData] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔄 Starting resume data upload...');
    // Fetch CV data from JSON file
    fetch('/cv.json')
      .then(response => {
        console.log('📡 Response received:', response.status, response.ok);
        if (!response.ok) {
          throw new Error('Failed to load resume data');
        }
        return response.json();
      })
      .then(data => {
        console.log('✅ Resume data successfully uploaded:', data);
        setCvData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error loading resume data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading resume...</p>
      </div>
    );
  }

  if (error || !cvData) {
    return (
      <div className="error-container">
        <h1>Error</h1>
        <p>{error || 'The resume information could not be loaded'}</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Main Web App */}
      <div className="app">
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
            <p>© {new Date().getFullYear()} {cvData.basics.name}. All rights reserved.</p>
            <p className="footer-note">
              Designed with ❤️ using React + TypeScript
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
