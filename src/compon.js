import React, {useEffect} from "react";
import {getFromState} from "./state/state";
import useServiceGet from "./hooks/hook.service.GET";

const Comp = () => {
// ! call em anum "posts" endpointov u "2" queryiov
  const [isLoadingSecond, second, getSecond] = useServiceGet("posts" , '2');

useEffect(() => {
  getSecond()
}, [getSecond]);

const posts4 = getFromState('posts')[4]
const posts1 = getFromState('posts1')

//! arajin u erkrord divi mej nkarum em APP componentum arats callov stacats datan
  return (
    <div>
        <div style={firstStyle}>
          <p>{posts4.body}</p>
          <p>{posts4.title}</p>
          <p>{posts4.userId}</p>
        </div>


        <div style={post1Style}>
          <p>{posts1.body}</p>
          <p>{posts1.title}</p>
          <p>{posts1.userId}</p>
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