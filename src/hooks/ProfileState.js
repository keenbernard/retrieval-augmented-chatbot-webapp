import React, {createContext, useContext, useMemo, useState} from "react";
import {localPort, prodPort, testPort} from "../portConfigurtion";

const ProfileState = createContext(undefined);

export const useProfileData = () => {
    return useContext(ProfileState);
}

export const ProfileProvider = ({ children }) => {
    const [graphData, setGraphData] = useState(null);
    const [userToken, setUserToken] = useState('');
    const [yammerToken, setYammerToken] = useState();
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole"))

    const authorizationHeader = useMemo(() => {
        return `Bearer ${userToken}`;
    }, [userToken]);

    const dataHeaders = new Headers();
    dataHeaders.append("Authorization", authorizationHeader);
    dataHeaders.append("ConsistencyLevel", 'eventual');
    const fetchUserDataHeader = { method: "GET", headers: dataHeaders };

    const imageHeaders = new Headers();
    imageHeaders.append("Authorization", `Bearer ${userToken}`);
    imageHeaders.append("Content-type", 'image/jpeg');
    const fetchUserImageHeader = {method: "GET", headers: imageHeaders};

    const localHost = `http://localhost:${localPort}`;
    const serverConnection = localHost;

    return (
        <ProfileState.Provider value={{graphData, setGraphData, userToken, setUserToken, yammerToken, setYammerToken, setUserRole, fetchUserDataHeader, fetchUserImageHeader, serverConnection, userRole }}>
            {children}
        </ProfileState.Provider>
    );
}
