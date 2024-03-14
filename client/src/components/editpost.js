import React, { useState ,useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development';


const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ]
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'code-block'
]

const Editpost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null);
    const [redirect,setRedirect] = useState(false);
    const {id}=useParams();

    useEffect(()=>{
        fetch('http://localhost:3004/user/post/'+id,{
            method:'GET',
            credentials:'include',
        })
        .then(response =>{
            response.json().then(info=>{
                setContent(info.content);
                setTitle(info.title);
                setSummary(info.summary);
            })
        })
    },[])


    if(redirect===true){
        return <Navigate to={'/post/'+id}/>
    }


    const handleChange = (value) => {
        setContent(value);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();

            const formData = new FormData();
            formData.append('title', title);
            formData.append('summary', summary);
            formData.append('content', content);
            formData.append('file', file);
            formData.append('id',id);
            // console.log(formData);

            const response = await fetch(`http://localhost:3004/user/editpost/${id}`, {
                method: 'PUT',
                body: formData,
                credentials:'include',
            });

            const data=await response.json();
            console.log(data);
            if(response.ok){
                setRedirect(true);
            }

            setResponseMessage(data.message);
        } 


    return (
        <div>
            <form>
                <h3 className='d-flex justify-content-center mb-3'>Create Post</h3>
                <input class="form-control mb-3" type="title" placeholder="Title" aria-label="default input example " value={title} onChange={(e) => setTitle(e.target.value)} />
                <input class="form-control mb-3" type="summary" placeholder="Summary" aria-label="default input example" value={summary} onChange={(e) => setSummary(e.target.value)} />
                <div class="mb-3">
                    <input class="form-control" type="file" id="formFile" name="file" onChange={handleFileChange} />
                </div>

                <ReactQuill
                    theme="snow" // Specify the theme ('snow' or 'bubble')
                    value={content}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                />

                <div class="d-grid gap-2">
                    <button class="btn btn-secondary mt-3" type="submit" onClick={handleFileUpload}>Edit Post</button>
                    <h5 className=' editpost d-flex justify-content-center'>You can edit your own post only.</h5>
                </div>

                {responseMessage && (
                    <div>
                        <h2>Response Message:</h2>
                        <p>{responseMessage}</p>
                    </div>
                )}
            </form>
        </div>
    )
};

export default Editpost;






// <ReactQuill theme="snow" value={content} onChange={handleChange} modules={modules} formats={formats} />
















// import React from 'react';
// import { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// const FormData = require('form-data');
// // const FormData = require('form-data');



// const modules = {
//     toolbar: [
//         [{ font: [] }],
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],
//         ["bold", "italic", "underline", "strike"],
//         [{ color: [] }, { background: [] }],
//         [{ script: "sub" }, { script: "super" }],
//         ["blockquote", "code-block"],
//         [{ list: "ordered" }, { list: "bullet" }],
//         [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
//         ["link", "image", "video"],
//         ["clean"],
//     ]
// };

// const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image',
//     'code-block'
// ]


// export default function Createpost() {

//     const [title, setTitle] = useState('');
//     const [summary, setSummary] = useState('');
//     const [content, setContent] = useState('');
//     const [files, setFiles] = useState('');

//     const createNewPost = async(e) => {
//         const data =new FormData();
//         data.set("title",title);
//         data.set("summary",summary);
//         data.set("content",content);
//         data.set("files",files[0]);


//         e.preventDefault();

//         console.log(files);
//         console.log(...data);



// const file=fileInput.files[0]

// const data = {
//     title: title,
//     summary: summary,
//     content: content,
//     file: files[0]
// }




// console.log(data);


// const response=await fetch("http://localhost:3004/user/createpost",{
//     method: "POST",
//     body: JSON.stringify(formData)
// });
//     console.log(await response.json());


// const response = await fetch("http://localhost:3004/user/createpost", {
//     method: "POST",
//     // headers: {
//     //     "Content-Type": "application/json",
//     // },
//     body: JSON.stringify(data)
// });

// console.log(await response.json());
// }



//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-12">
//                     <form onSubmit={createNewPost} enctype="multipart/form-data">
//                         <h3 className='d-flex justify-content-center mb-3'>Create Post</h3>
//                         <input class="form-control mb-3" type="title" placeholder="Title" aria-label="default input example " value={title} onChange={(e) => setTitle(e.target.value)} />
//                         <input class="form-control mb-3" type="summary" placeholder="Summary" aria-label="default input example" value={summary} onChange={(e) => setSummary(e.target.value)} />
//                         <div class="mb-3">
//                             <input class="form-control" type="file" id="formFile" name="file" onChange={e => setFiles(e.target.files)} />
//                         </div>
//                         <ReactQuill value={content} onChange={(newValue) => setContent(newValue)} modules={modules} formats={formats} />
//                         <div class="d-grid gap-2">
//                             <button class="btn btn-secondary mt-3" type="submit" >Create Post</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }


// // // <form onSubmit={createNewPost} enctype="multipart/form-data">
// // // <h3 className='d-flex justify-content-center mb-3'>Create Post</h3>
// // // <input class="form-control mb-3" type="title" placeholder="Title" aria-label="default input example " value={title} onChange={(e)=>setTitle(e.target.value)} />
// // // <input class="form-control mb-3" type="summary" placeholder="Summary" aria-label="default input example" value={summary} onChange={(e)=>setSummary(e.target.value)} />
// // // <div class="mb-3">
// // //     <input class="form-control" type="file" id="formFile" name="file" onChange={(e)=>setFiles(e.target.files[0])}/>
// // // </div>
// // // <ReactQuill value={content} onChange={(newValue)=>setContent(newValue)} modules={modules} formats={formats}/>
// // // <div class="d-grid gap-2">
// // // <button class="btn btn-secondary mt-3" type="submit" >Create Post</button>
// // // </div>
// // // </form>




