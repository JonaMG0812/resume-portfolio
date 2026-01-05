import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext.tsx'



const rootElement = document.getElementById('root');


if (!rootElement) {
  console.error('❌ Root element not found!');
} else {


  try {
    createRoot(rootElement).render(
      <StrictMode>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </StrictMode>,
    );

  } catch (error) {
    console.error('❌ Error rendering the application:', error);
  }
}
