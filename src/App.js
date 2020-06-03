import React, { useState, useEffect } from "react";
import { map } from "rxjs/operators";
import ApiService from "./services/api.service";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [postvogh, setPostvogh] = useState(null);
  const [first, setFirst] = useState({});

  const addPost = (event) => {
    event.preventDefault();
    const postvogh = {
      body: "body",
      title: "title",
      userId: 8,
    };

    new ApiService("/posts", postvogh).post().subscribe(() => {
      setPostvogh([postvogh]);
    });
  };
  useEffect(() => {
    console.log(posts, "posts");
    console.log(first, "first");
    console.log(postvogh, "postvogh");
  }, [posts, first, postvogh]);

  useEffect(() => {
    const subscription = new ApiService("/posts")
      .get()
      .pipe(
        map((res) => {
          if (res) {
            return res.slice(0, 5);
          } else {
            return [];  
          }
        })
      )
      .subscribe((posts) => {
        setPosts(posts);
      });

    const first = new ApiService("/posts/1")
      .get()
      .pipe(
        map((res) => {
          if (res) {
            return res;
          } else {
            return [];
          }
        })
      )
      .subscribe((first) => {
        setFirst(first);
      });
    return () => {
      subscription.unsubscribe();
      first.unsubscribe();
    };
  }, []);

  return (
    <>
      <button style={buttonStyle} onClick={addPost}>
        Add Post
      </button>
      {posts?.map((e) => (
        <div key={e.id} style={postsStyle}>
          <p>{e.body}</p>
          <p>{e.title}</p>
          <p>{e.userId}</p>
        </div>
      ))}
      <div style={firtStyle}>
        <p>{first?.body}</p>
        <p>{first?.title}</p>
        <p>{first?.userId}</p>
      </div>
      <div style={postvoghStyle}>
        <p>{postvogh && postvogh[0].body}</p>
        <p>{postvogh && postvogh[0].title}</p>
        <p>{postvogh && postvogh[0].userId}</p>
      </div>
    </>
  );
};

const postsStyle = {
  border: "1px solid grey",
  padding: ".4rem 2rem",
  margin: "1.5rem 3rem",
};
const firtStyle = {
  border: "1px solid grey",
  padding: ".4rem 2rem",
  margin: "1.5rem 3rem",
  background: 'blue'
};

const postvoghStyle = {
  border: "1px solid grey",
  padding: ".4rem 2rem",
  margin: "1.5rem 3rem",
  background: 'green'
};

const buttonStyle = {
  background: "darkseagreen",
  border: "none",
  fontSize: "22px",
  cursor: "pointer",
  padding: "8px 15px",
  borderRadius: "2px",
};

export default App;
