import './App.css';
import { AuthenticatedTemplate } from "@azure/msal-react";
import { useMsalAuthentication } from "@azure/msal-react";
import {InteractionType} from "@azure/msal-browser";
import React from 'react';
import ChatInterface from "./components/ChatInterface/ChatInterface";

const App = () => {
  useMsalAuthentication(InteractionType.Redirect);

  return (
    <AuthenticatedTemplate>
      <ChatInterface />
    </AuthenticatedTemplate>
  );
};

export default App;