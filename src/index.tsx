import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'ag-grid-enterprise';
import { LicenseManager } from 'ag-grid-enterprise';
import { Environment } from './services/Environment'

const agGridLicenseKey = Environment.getAgGridLicenseKey();
LicenseManager.setLicenseKey(agGridLicenseKey);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);