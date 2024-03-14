import { useState,useEffect } from "react";
import Post from "./post";

function Posts() {
const[posts,setPosts] = useState([]);

  useEffect(()=>{
      fetch('http://localhost:3004/user/posts',
    {
      method:'GET',
      credentials:'include'
    }).then(response=>{
      response.json().then(data=>{
        setPosts(data);
      })
    })
  },[])

    return (
      <div>
      {
        posts.length >0 && posts.map((post)=>(
          <Post {...post}/>
        ))
      }
      </div>
    );
  }
  
  export default Posts;
  