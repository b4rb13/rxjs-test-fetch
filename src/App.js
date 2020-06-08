import React, { useState, useEffect } from "react";
import Comp from "./compon";
import useServiceGet from "./hooks/hook.service.GET";
import useServicePost from "./hooks/hook.service.POST";
import {state} from './state/state'

const App = () => {
  const [postData, setPostData] = useState(null);

  const mutator = data => data.slice(0, 5); //! talis em get anogh Hookin vor transform ani ekats datan u im uzats dzevov qci state

  // ! kanchum e hoky call em anum    "posts" endpointov
  const [isLoadingPosts, posts, getPosts] = useServiceGet("posts", '', mutator);

  // ! kanchum e hoky call em anum    "posts" endpointov "1" queryov
  const [isLoadingFirst, first, getFirst] = useServiceGet("posts" , '1');

  //! post em anum "posts enpointov" u ira areqn el em qcum state
  const [isLoadingAdd, addResponse, addPost] = useServicePost(
    "posts", '',
    postData
  );


  const [show, setShow] = useState(false);  // ! cuyca talis erkrord componenty POST aneluc heto

  useEffect(() => {
    getPosts();
    getFirst();
  }, [ getPosts, getFirst]);


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

      <button
        style={loggerStyle}
        onClick={()=> console.log(state)}  //es buttony console loga anum state-y
      >
        State Logger
      </button>
      <button style={buttonStyle} disabled={isLoadingAdd} onClick={addNewPost}>
        Add Post
      </button>

      {show ? <Comp /> : null}
      {isLoadingAdd && <div>Sending ...</div>}
      {addResponse && (
        <div style={sendStyle}>
          <h1>Post sended</h1>
          <button onClick={() => setShow(true)}>show comp</button>
        </div>
      )}

      {isLoadingFirst && <div>First Loading ...</div>}
      {first && (
        <div style={firstStyle}>
          <p>{first.body}</p>
          <p>{first.title}</p>
          <p>{first.userId}</p>
        </div>
      )}

      {isLoadingPosts && <div>Posts Loading ...</div>}
      {posts?.map((e) => (
        <div key={e.id} style={postsStyle}>
          <p>{e.body}</p>
          <p>{e.title}</p>
          <p>{e.userId}</p>
        </div>
      ))}


    </>
  );
};

const postsStyle = {
  border: "1px solid grey",
  padding: ".4rem 2rem",
  margin: "1.5rem 3rem",
};
const firstStyle = {
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
const loggerStyle = {
  position: "absolute",
  right: "5px",
  top: "5px",
  background: "darkseagreen",
  border: "none",
  fontSize: "22px",
  cursor: "pointer",
  padding: "8px 15px",
  borderRadius: "2px",
};

export default App;
