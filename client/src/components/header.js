import { useContext,useEffect, useState} from "react";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import { userContext } from "../context/contextprovider";
// import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development"; 
// import { useNavigate } from 'react-router-dom';


function Header() {

    const {userInfo,setUserInfo} = useContext(userContext);
    // const [redirect,setRedirect] = useState(false);

    // const navigate = useNavigate();
    // const Navigate = useNavigate();



    // const logout = async()=>{
    //     await fetch('http://localhost:3004/user/logout',{
    //         credentials:'include',
    //         method:'POST'
    //     })
    //     setUserInfo('');
    //     setRedirect(true);
    // }

  



      // if(redirect===true){
      //   navigate('/');
      // }
    
    
    
    

    // console.log(userInfo);

    useEffect(() => {
        const verifyCookie = async () => {
          try {
            const response = await fetch('http://localhost:3004/user/profile', {
              method: 'GET',
              credentials: 'include', // Include credentials (cookies) in the request
            });

    
            if (response.ok) {
              const data = await response.json();
              // console.log(data.username);
              setUserInfo(data);
            } else {
              console.error('Failed to verify cookie');
            }
          } catch (error) {
            console.error('Error during fetch:', error);
          }
        };
    
        verifyCookie();
      }, []); // Run the effect once when the component mounts


      
    const logout = async () => {
      // Perform logout operation, e.g., making a request to the server
      try {
        // Your logout API request here
        const response=await fetch('http://localhost:3004/user/logout', {
          method: 'POST',
          credentials: 'include',
        });

        const data=response.json();
        console.log(data.message);
  
        // Clear user state (assuming setUser is a function that sets the user state to null)
        setUserInfo(null);
        // navigate('/');
        console.log("I am logout");

        
        // Redirect to the home page
      } catch (error) {
        console.error('Error during logout:', error);
        // Handle error, show a message, or perform any other actions
      }
    };



    //   if(redirect===true){
    //     return <Navigate to ={'/login'}/>
    //  }

    

    const username=userInfo?.username;

    return (
            <div className="container mt-3 mb-4 header p-2">
                <div className="row">
                    <div className="col-3">
                        <Link to="/posts" className="logo display-6 fw-bold">AllBlogs</Link>
                    </div>
                    <div className="col-3  offset-5 ">
                    {
                        !username?(
                        <div>
                        <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <Link className="nav-link fw-bold" to="/login">Login</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link fw-bold" to="/register">Register</Link>
                            </li>
                        </ul>
                        </div>):
                        (
                            <div>
                            <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <h6 className="nav-link fw-bold" to="/createnewpost">{username}</h6>
                            </li>
                            <li className="nav-item mt-2">
                                <a onClick={logout} href="1" className="logout  fw-bold">LogOut</a>
                            </li>
                             </ul>
                            </div>
                        )
                    }          
                    </div>
                </div>
            </div>
    );
}

export default Header;




