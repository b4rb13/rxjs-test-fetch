import React, { useState, useEffect } from "react";
import useServiceGet from "./hooks/hook.service.GET";
import useServicePost from "./hooks/hook.service.POST";

const App = () => {
  const [postData, setPostData] = useState(null);
  // const [isLoadingPosts, posts, getPosts] = useServiceGet("api");
  const [isLoadingPosts, posts, getPosts] = useServiceGet("posts");
  const [isLoadingFirst, first, getFirst] = useServiceGet("posts/1");
  const [isLoadingAdd, addResponse, addPost] = useServicePost(
    "posts",
    postData
  );

  useEffect(() => {
    getPosts()
    getFirst();
  }, [ getPosts, getPosts]);

  useEffect(() => {
    console.log(posts, "posts");
    // console.log(first, "first");
    // console.log(addResponse, "addResponse");
  }, [posts]);

  const addNewPost = (event) => {
    event.preventDefault();
    const postvogh = {
      body: "body",
      title: "title",
      userId: 8,
    };
    setPostData(postvogh);
    addPost();
  };

  return (
    <>
      <button style={buttonStyle} disabled={isLoadingAdd} onClick={addNewPost}>
        Add Post
      </button>
      {isLoadingAdd && <div>Sending ...</div>}
      {addResponse && (
        <div style={sendStyle}>
          <h1>Post sended</h1>
        </div>
      )}

      {first && (
        <div style={firtStyle}>
          <p>{first.body}</p>
          <p>{first.title}</p>
          <p>{first.userId}</p>
        </div>
      )}

      {isLoadingPosts && <div>Posts Loading ...</div>}
      {posts?.map((e) => (
        <div key={e.id} style={postsStyle}>
          <p>{e.email}</p>
          <p>{e.gender}</p>
          <p>{e.phone}</p>
        </div>
      ))}
      {/* {isLoadingFirst && <div>First Loading...</div>} */}
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
  background: "blue",
};
const sendStyle = {
  border: "1px solid grey",
  padding: ".4rem 2rem",
  margin: "1.5rem 3rem",
  background: "green",
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
