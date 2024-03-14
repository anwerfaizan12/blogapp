const express=require('express');
// const { getUsers } = require('../controllers/userController');
const {signup,login,logout,profile} = require('../controllers/authController');
const { CreatePost, getAllPosts,getAPost,UpdatePost} = require('../controllers/userController')
const userRouter=express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const protectRoute = require('../controllers/authController');



userRouter
.route('/signup')
.post(signup);

userRouter
.route('/login')
.post(login);

userRouter
.route('/profile')
.get(profile)

userRouter
.route('/logout')
.post(logout);


// userRouter.use(protectRoute);
userRouter
.route('/posts')
.get(getAllPosts);

userRouter
.route('/post/:id')
.get(getAPost);

userRouter
.route('/profile')
.get(profile)



userRouter
.post('/createpost',upload.single('file'),CreatePost)

userRouter
.put('/editpost/:id',upload.single('file'),UpdatePost)

module.exports=userRouter