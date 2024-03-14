import { useState,useContext } from "react";
import { Navigate } from 'react-router-dom';
import { userContext } from "../context/contextprovider";


function Login() {
  const[email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [redirect,setRedirect]=useState(false);
  const {setUserInfo} = useContext(userContext)




  const login=async(e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:3004/user/login",{
    method:'POST',
    body:JSON.stringify({email,password}),
    headers:{'Content-Type':'application/json'},
    credentials:'include',
    });
    if(response.ok){
      response.json().then(data=>{
        // console.log(data);
        setUserInfo(data);
        setRedirect(true);
      })
    }
    else{
      alert("Wrong credentials");
    }
  }

  if(redirect===true){
     return <Navigate to ={'/posts'}/>
  }

  return (
    <div>
    <div className="container mt-5">
    <div className="row">
    <div className="col-12">
    <h2 className="login">Login</h2>
    <form onSubmit={login}>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
    </div>
    <button type="submit" class="btn btn-primary">login</button>
  </form>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Login;
