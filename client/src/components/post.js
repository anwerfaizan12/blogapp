import React from 'react';
import { Link } from 'react-router-dom/dist/umd/react-router-dom.development';


function Post({_id,title,summary,content,cover,author,createdAt}) {
  // console.log('http://localhost:3004/'+cover);
  return (
    <div className="container mt-4 bg-light mb-4 ">
    <div className="row">
    <div className="col-lg-6 p-0" >
    <Link to={`/post/${_id}`}>
    <img src={'http://localhost:3004/'+cover} className='img-fluid rounded-lg'  alt=""/>
    </Link>
    </div>
    <div className="col-lg-6 bg-light mt-lg-0 m-0 p-0">
    <h3 className='title d-flex justify-content-center'>{title}</h3>
    <h4 className='d-flex justify-content-center'>{summary}</h4>
    <div className="author d-flex justify-content-center fw-bold">Author - faizu</div>
    <time className='d-flex justify-content-center fw-light'>Created at - {createdAt}</time>
    <p className="summary justify-content-center m-3">{content}</p>
    </div>
    </div>
    </div>
  );
}

export default Post;

// import React from 'react';
// import { Link } from 'react-router-dom';

// function Post({_id, title, summary, content, cover, author}) {
//   return (
//     <div className="container mt-4 bg-light">
//       <div className="row p-2">
//         <div className="col-lg-5">
//           <div className="image">
//             <Link to={`/post/${_id}`}>
//               <img src={`http://localhost:3004/${cover}`} alt="" />
//             </Link>
//           </div>
//         </div>
//         <div className="col-lg-7">
//           <h4 className='title'>{title}</h4>
//           <p className="info p-2">
//             <a className="author p-3">{author.username}</a>
//             <time>05-12-2023 12:00</time>
//           </p>
//           <p className="summary justify-content-center">{summary}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Post;

