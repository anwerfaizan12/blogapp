import { useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom/dist/umd/react-router-dom.development";

function Register() {

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const[email,setEmail]=useState("");
const [redirect,setRedirect] = useState(false);

if(redirect===true){
  <Navigate to ={'/login'}/>
}

const register=async(e)=>{
 e.preventDefault();
//  const userData = {
//   username:username,
//   email: email,
//   password: password
// };
axios.post("http://localhost:3004/user/signup", {username,email,password}).then((response) => {
  setRedirect(true);
});
}

    return (
        <div>
        <div className="container mt-5">
        <div className="row">
        <div className="col-12">
        <h2 className="register mb-4">Register</h2>
        <form onSubmit={register}>
        <div class="mb-3">
          <input type="text" class="form-control" id="exampleInputText" aria-describedby="textHelp" placeholder="User Name" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        </div>
        <div class="mb-3">
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div class="mb-3">
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button type="submit" class="btn btn-primary">SignIn</button>
      </form>
        </div>
        </div>
        </div>
        </div>
    );
  }
  
  export default Register;
  





//   import { useState } from "react";
// import axios from 'axios';
// import { Navigate } from "react-router-dom/dist/umd/react-router-dom.development";

// function Register() {

// const [username,setUsername]=useState("");
// const [password,setPassword]=useState("");
// const[email,setEmail]=useState("");
// const [redirect,setRedirect] = useState(false);

// if(redirect===true){
//   <Navigate to ={'/login'}/>
// }

// const register=async(e)=>{
//  e.preventDefault();
// //  const userData = {
// //   username:username,
// //   email: email,
// //   password: password
// // };
// axios.post("http://localhost:3004/user/signup", {username,email,password}).then((response) => {
//   setRedirect(true);
// });
// }

//     return (
//         <div>
//         <div className="container mt-5">
//         <div className="row">
//         <div className="col-12">
//         <h2 className="register mb-4">Register</h2>
//         <form onSubmit={register}>
//         <div class="mb-3">
//           <input type="text" class="form-control" id="exampleInputText" aria-describedby="textHelp" placeholder="User Name" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
//         </div>
//         <div class="mb-3">
//           <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
//         </div>
//         <div class="mb-3">
//           <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
//         </div>
//         <button type="submit" class="btn btn-primary">SignIn</button>
//       </form>
//         </div>
//         </div>
//         </div>
//         </div>
//     );
//   }
  
//   export default Register;
  