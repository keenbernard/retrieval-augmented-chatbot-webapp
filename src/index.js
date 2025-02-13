import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./components/Microsoft/AuthConfig";
import {ProfileProvider} from "./hooks/ProfileState";

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MsalProvider instance={msalInstance}>
        <ProfileProvider>
            <App />
        </ProfileProvider>
    </MsalProvider>
);

