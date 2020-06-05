import React from "react";
import {state} from "./state/state";

const Comp = () => {

  console.log(state);
  return (
    <div>

      {state.posts && (
        <div style={firstStyle}>
          <p>{state.posts.body}</p>
          <p>{state.posts.title}</p>
          <p>{state.posts.userId}</p>
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

export default Comp;