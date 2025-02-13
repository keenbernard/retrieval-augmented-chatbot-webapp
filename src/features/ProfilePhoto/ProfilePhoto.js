import React, {useEffect, useState} from "react";
import './ProfilePhoto.css';
import {NotificationManager} from "react-notifications";
import {useProfileData} from "../../hooks/ProfileState";

const MyPhoto = () => {
  const [image, setImage] = useState();
  const { userToken, fetchUserImageHeader } = useProfileData();

  console.log(userToken)

  const getProfilePhoto = async () => {
    try {
      const response = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", fetchUserImageHeader);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        const base64data = reader.result;
        setImage(base64data);
      }
    } catch (error) {
      NotificationManager.error('Unable to retrieve Profile Photo', 'ALERT', 5000);
    }
  };

  useEffect(() => {
    Promise.all([
      getProfilePhoto()
    ]).then(() =>{
      return () => {
        const controller = new AbortController();
        controller.abort();
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userToken]);


  return (
      <div>
        <img src={image} alt={'Your Profile'} />
      </div>
  )
}

export default React.memo(MyPhoto);
