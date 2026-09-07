import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import UngDung from './UngDung';
import './kieu-dang/toanCuc.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UngDung />
    </BrowserRouter>
  </StrictMode>,
);
