import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { clearAllQuotesAndSavedData } from './utils/quotesManager';

// On page reload / refresh, start with empty Saved and My Quotes
clearAllQuotesAndSavedData(false);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
