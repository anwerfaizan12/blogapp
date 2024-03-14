import React, { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import { Link } from 'react-router-dom';



export default function Postpage(){
    const [postInfo,setPostInfo] = useState(null);
    const {id}=useParams();


    useEffect(()=>{
        fetch('http://localhost:3004/user/post/'+id,{
            method:'GET',
            credentials:'include',
        }).then(response=>{
            response.json().then(info=>{ 
                setPostInfo(info);
            });

        });
    },[])

    return(
        <div>
        {postInfo &&
        <div className='container mt-4'>
        <div className='row'>
        <div className='col-12' >
        <h3 className='d-flex justify-content-center'>{postInfo.title}</h3>
        <h6 className='d-flex justify-content-center text-secondary'>12-08-2023</h6>
        <h5 className= 'd-flex justify-content-center' >by @{postInfo.username}</h5>
        <div className='d-flex justify-content-center'>
        <Link to={`/editpost/${id}`}>
        <button className=' btn btn-dark ' type="button" ><span className='p-1'><i class="bi bi-pencil "></i></span><span className='p-1'>Edit the post</span></button>
        </Link>
        </div>
        </div>
        <div className='col-6 offset-3  d-flex justify-content-center mt-3'>
        <img src={`http://localhost:3004/${postInfo.cover}`} alt="" className='img-fluid rounded-lg'/>
        </div>
        <div className='col-8 offset-2  bg-secondary mt-4'>
        <p>{postInfo.content}</p>
        </div>
        </div>
        </div>
        }
        </div>
    )
}