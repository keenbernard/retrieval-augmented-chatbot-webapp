import {useMsal} from "@azure/msal-react";
import {useEffect} from "react";
import {loginRequest, myMSALObj, requestObj} from "./AuthConfig";
import {callMsGraph} from "./Graph";
import {ProfileData} from "./ProfileData";
import {useProfileData} from "../../hooks/ProfileState";

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const { graphData, setGraphData, userToken, setUserToken} = useProfileData();

  useEffect(() => {
    // function obtains an access token for the Microsoft Graph API using acquireTokenSilent
    // or acquireTokenPopup methods and then calls the callMsGraph function to retrieve user profile data
    const RequestProfileData = () => {
      const request = {
        ...loginRequest,
        account: accounts[0]
      };
      instance.acquireTokenSilent(request).then((response) => {
        callMsGraph(response.accessToken).then(response => {
          setGraphData(response)
          localStorage.setItem('userRole', response.department === 'Legal' ? 'Legal' : 'General')
        });
        const token = response.accessToken;
        setUserToken(token);
        // Schedule token renewal
        const expirationTime = new Date(response.expiresOn).getTime();
        const now = new Date().getTime();
        const timeUntilExpiration = expirationTime - now;
        setTimeout(() => {
          RequestProfileData();
        }, timeUntilExpiration - 5 * 60 * 1000); // Renew token 5 minutes before it expires
      }).catch((e) => {
        console.log(e);
        instance.acquireTokenSilent(request).then((response) => {
          callMsGraph(response.accessToken).then(response => {
            setGraphData(response);
            localStorage.setItem('userRole', response.department === 'Legal' ? 'Legal' : 'General')
          });
          const token = response.accessToken;
          setUserToken(token);
          // Schedule token renewal
          const expirationTime = new Date(response.expiresOn).getTime();
          const now = new Date().getTime();
          const timeUntilExpiration = expirationTime - now;
          setTimeout(() => {
            RequestProfileData();
          }, timeUntilExpiration - 5 * 60 * 1000); // Renew token 5 minutes before it expires
        });
      });
    }

    RequestProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken, instance]);

  useEffect(() => {
    //Signs in the user using a login popup, and calls the acquireTokenPopupAndCallYammerAPI() function.
    const signIn = () => {
      myMSALObj
          .loginPopup(requestObj)
          .catch((error) => {
            console.error("An error occurred while signing in:", error);
          });
    };

    signIn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance]);


  return (
      <>
        { graphData ?
            <ProfileData />
            :
            ''
        }
      </>
  );
}

export default ProfileContent;
