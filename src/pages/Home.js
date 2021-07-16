import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import Post from "./Post";
import ImageUpload from "./ImageUpload";
import { auth } from "../utils/firebase";
import "../styles/Home.css";
import Loading from "./Loading";
import Nav from "./Nav";

function Home() {
  const [userLogin, setUserLogin] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        console.log(authUser);
        setUserLogin(authUser);
        setIsLoading(false);
      } else {
        //user is logged out
        setUserLogin(null);
        setIsLoading(true);
      }
    });

    return () => {
      // perform clean up actions
      unsubscribe();
    };
  }, [userLogin]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //everytime a new post added
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div>
        {/* <Nav /> */}
        <div className="nav-bar">
          <Nav />
        </div>

        <div className="homePostContain">
          {posts.map(({ id, post }) => (
            <Post
              postId={id}
              key={id}
              email={post.email}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>

        <ImageUpload email={userLogin.displayName} />
      </div>
    );
  }
}

export default Home;
