import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import ImageUpload from "./ImageUpload";
import Loading from "./Loading";
import { auth, db } from "../utils/firebase";
import "../styles/Profile.css";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({ user: [] });
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUser = () => {
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          let userList = [];
          userList.push(doc.data());
          setUserProfile({ user: userList });
        });
    };
    fetchUser();
  }, [currentUser.uid]);

  useEffect(() => {
   auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        setIsLoading(false);
      } else {
        //user is logged out
        setIsLoading(true);
      }
    });

  }, []);

  if (isLoading) {
    return <Loading />
  } else {

  return (
    <div>
      <div className="nav-bar">
        <Nav />
      </div>

      <div className="profile">
        <div className="wrapper">
          <div className="img-area">
            <div className="inner-area">
              <img src="./images/avatar.png" alt="avatar"/>
            </div>
          </div>
          <div className="icon arrow">
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="icon dots">
            <i className="fas fa-ellipsis-v"></i>
          </div>
          <div className="name">
            {userProfile.user.map((data) => (
              <h1>{data.fullname}</h1>
            ))}
          </div>
          <div className="username">
            {userProfile.user.map((data) => (
              <h1>username:{data.displayName}</h1>
            ))}
          </div>
        </div>
      </div>

      

      <ImageUpload email={currentUser.displayName} />
    </div>
  
  );
            }
}
