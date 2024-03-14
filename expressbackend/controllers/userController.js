const userModel = require('../models/userModel')
const fs = require('fs');
const postModel = require('../models/postModel')
const JWT_KEY = 'hgh6767ghghg8979';
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');



// module.exports.getAllPosts=async function getAllPosts(req,res){
//     const {isLoggedIn} = req.cookies;
//     jwt.verify(isLoggedIn,JWT_KEY,{},async(err,info)=>{
//         if(err) throw err;
//         const data=await postModel.find().sort({createdAt:-1}); //.populate('author',['username']);   // .sort({createdAt:-1})
//         res.json(data);
//     });

// }


module.exports.getAllPosts = async function getAllPosts(req, res) {
    try {
        const { isLoggedIn } = req.cookies;
        if (!isLoggedIn) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decodedToken = jwt.verify(isLoggedIn, JWT_KEY);
        // Assuming `decodedToken` contains user information, you can use it as needed.

        const data = await postModel.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        console.error('Error in getAllPosts:', error);
        // Handle the error appropriately, e.g., send an error response to the client
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports.CreatePost = async function CreatePost(req, res) {
    const { isLoggedIn } = req.cookies;
    jwt.verify(isLoggedIn, JWT_KEY, {}, async (err, info) => {
        if (err) throw err;
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        const { title, summary, content } = req.body;
        // console.log(info);
        const doc = await postModel.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.payload
        });
        console.log(doc);
        res.json(doc);
    })
}


module.exports.getAPost = async function getAPost(req, res) {
    const { isLoggedIn } = req.cookies;
    jwt.verify(isLoggedIn, JWT_KEY, {}, async (err, info) => {
        if (err) throw err;
        const { id } = req.params;
        const doc = await postModel.findById(id);
        res.json(doc);
    })
}

module.exports.UpdatePost = async function UpdatePost(req, res) {
    const { isLoggedIn } = req.cookies;
    jwt.verify(isLoggedIn, JWT_KEY, {}, async (err, info) => {
        if (err) throw err;
        let newPath = '';
        if (req.file) {
            const { originalname, path } = req.file;
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
        }
        const { id, title, summary, content } = req.body;
        const doc = await postModel.findById(id);
        const isAuthor = JSON.stringify(doc.author) === JSON.stringify(info.payload);
        // console.log(isAuthor);
        if (!isAuthor) {
            return res.status(400).json("you are not the author");
        }

        await doc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : doc.cover
        })

        res.json(doc);

    })
}


