import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import App from './App.jsx';
import './index.css';
import './styles/normalize.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Normalize />
      {/*<Provider store={store}>*/}
      <App />
      {/*</Provider>*/}
    </BrowserRouter>
    Ï
  </StrictMode>,
);
