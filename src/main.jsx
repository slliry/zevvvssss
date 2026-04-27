import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './i18n'; // Initialize i18n
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { TranslationEditorProvider } from './context/TranslationEditorContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <TranslationEditorProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </TranslationEditorProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
