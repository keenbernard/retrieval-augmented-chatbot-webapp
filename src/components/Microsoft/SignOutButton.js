import React from "react";
import { useMsal } from "@azure/msal-react";
import {NavDropdown} from "react-bootstrap";
import './SignOutButton.css';
import ProfilePhoto from "../../features/ProfilePhoto/ProfilePhoto";

const handleLogout = (instance) => {
  localStorage.removeItem('userRole');
  instance.logoutRedirect().catch(e => {
    console.error(e);
  });
}

const SignOutButton = () => {
  const {instance} = useMsal();

  return (
      <NavDropdown
          align="start" id="basic-nav-dropdown"
          title={<ProfilePhoto />}>
        <NavDropdown.Item onClick={() => handleLogout(instance)}>Log Out</NavDropdown.Item>
      </NavDropdown>
  );
}

export default SignOutButton;
