import React, { useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import "../styles/Login-signup.css";

function Signup() {
  const [user, setUser] = useState(null);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    confirmPass: "",
    firstname: "",
    lastname: "",
  });
  const [username, setUsername] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //user is logged out
        setUser(null);
      }
    });
  }, [user, username]);

  const handleChange = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
  };
  const register = (e) => {
    e.preventDefault();

    if (!payload.email || !payload.password || !payload.confirmPass) {
      alert("Fields are empty");
    } else if (payload.password !== payload.confirmPass) {
      alert("Please check the password");
    } else {
      auth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((auth) => {
          if (auth.user) {
            auth.user
              .updateProfile({
                displayName: username,
              })
              .then((s) => {
                db.collection("users")
                  .doc(auth.user.uid)
                  .set({
                    uid: auth.user.uid,
                    fullname: payload.firstname + " " + payload.lastname,
                    displayName: auth.user.displayName,
                    email: auth.user.email,
                  });
              });
          }
        })
        .catch((error) => alert(error.message));

      alert("You have successfully registered and logged in");
    }
  };
  return (
    <div className="signup-body">
      <div className="signup-wrap">
        <h2>Signup form</h2>
        <input
          type="text"
          value={payload.firstname}
          onChange={handleChange("firstname")}
          placeholder="Enter your First name"
        />
        <input
          type="text"
          value={payload.lastname}
          onChange={handleChange("lastname")}
          placeholder="Enter your Last name"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <input
          type="text"
          value={payload.email}
          name="email"
          placeholder="Enter your email"
          onChange={handleChange("email")}
        />
        <input
          type="password"
          value={payload.password}
          name="password"
          placeholder="Enter your password"
          onChange={handleChange("password")}
        />
        <input
          type="password"
          value={payload.confirmPass}
          name="confirmPass"
          placeholder="Confirm Password"
          onChange={handleChange("confirmPass")}
        />
        <button onClick={register} className="btn-login">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Signup;
