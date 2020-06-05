import React, {useEffect} from "react";
import {state} from "./state/state";
import useServiceGet from "./hooks/hook.service.GET";

const Comp = () => {

  const [isLoadingSecond, second, getSecond] = useServiceGet("posts" , '2');

useEffect(() => {
  getSecond()
}, [getSecond]);
  return (
    <div>


        <div style={firstStyle}>
          <p>{state.posts[4].body}</p>
          <p>{state.posts[4].title}</p>
          <p>{state.posts[4].userId}</p>
        </div>


        <div style={post1Style}>
          <p>{state.posts1.body}</p>
          <p>{state.posts1.title}</p>
          <p>{state.posts1.userId}</p>
        </div>
      {isLoadingSecond && <div>Second Loading ...</div>}
      {second && (
        <div style={secondStyle}>
          <p>{second.body}</p>
          <p>{second.title}</p>
          <p>{second.userId}</p>
        </div>
      )}



    </div>
  )
};

const firstStyle = {
  border: "1px solid grey",
  padding: ".4rem 2rem",
  margin: "1.5rem 3rem",
  background: "red",
};
const secondStyle = {
  border: "1px solid grey",
  padding: ".4rem 2rem",
  margin: "1.5rem 3rem",
  background: "yellow",
};
const post1Style = {
  border: "1px solid grey",
  padding: ".4rem 2rem",
  margin: "1.5rem 3rem",
  background: "lightblue",
};

export default Comp;