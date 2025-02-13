import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./AuthConfig";
import {Button} from "react-bootstrap";

function handleLogin(instance) {
  instance.loginRedirect(loginRequest).catch(e => {
    console.error(e);
  });
}

export const SignInButton = () => {
  const { instance } = useMsal();

  return (
      <Button variant="secondary" className="ml-auto" onClick={() => handleLogin(instance)}>Sign in</Button>
  );
}
