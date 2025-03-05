import * as Msal from "msal";

const localConfig = {
    clientId: 'ebe9c0c6-dac9-4710-b40c-08265bcd367a',
    authority: 'https://login.microsoftonline.com/a209cfec-d685-41c4-8e6f-4a4c0917c8ea',
    redirectUri: 'http://localhost:3000'
};
const prodConfig = {
    clientId: '0b36731d-08f5-481b-804f-997ce6db11cd',
    authority: 'https://login.microsoftonline.com/a209cfec-d685-41c4-8e6f-4a4c0917c8ea',
    redirectUri: 'https://iamdigi.belizetelemedia.net:3443'
};

const testConfig = {
    clientId: 'defda4fe-2a52-4729-8c18-c191cc5829cd',
    authority: 'https://login.microsoftonline.com/a209cfec-d685-41c4-8e6f-4a4c0917c8ea',
    redirectUri: 'https://172.21.56.34:3448'
};

export const msalConfig = {
    //Redirect Configuration
    auth: localConfig,
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true,
    },
    resource: "https://api.yammer.com"
};

//This will allow the APP to call the Yammer APIs.
export const requestObj = {
    scopes: ["https://api.yammer.com/user_impersonation"]
};

export const myMSALObj = new Msal.UserAgentApplication(msalConfig); //create a new MSAL object.

export const loginRequest = {
    scopes: ["User.Read.All"]
};

export const graphConfig = {
    graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me?$select=id,displayName,jobTitle,department,userPrincipalName,mail',
    graphManagerEndpoint: 'https://graph.microsoft.com/v1.0/me/manager',
    graphUsers: 'https://graph.microsoft.com/v1.0/users'
}
