import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { clearAllQuotesAndSavedData } from './utils/quotesManager';

// On page reload / refresh, reset all application data to start fresh
try {
  localStorage.clear();
  sessionStorage.clear();
} catch (e) {
  console.warn('Storage reset error:', e);
}

clearAllQuotesAndSavedData(true);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
