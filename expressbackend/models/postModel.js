// const userModel=require('./userModel');
// const mongoose=require('mongoose');
// const db_Link = "mongodb+srv://faizan:oKMHRGkHQucaw65B@cluster0.hg2c6no.mongodb.net/?retryWrites=true&w=majority";

// mongoose.connect(db_Link)
// .then(function(db){
//     console.log("post db connected successfully");
// }).catch(function(err){
//     console.log(err);
// })

// // oKMHRGkHQucaw65B

// const postSchema=mongoose.Schema({
//     title:{
//         type:String,
//         required:true,
//     },
//     summary:{
//         type:String,
//         required:true
//     },
//     content:{
//         type:String,
//         required:true
//     },
//     cover:{
//         type:String,
//         required:true
//     },
//     author:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'userModel',
//         required:[true,'post must belong to an author']
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now()
//     }
// }
// );

// postSchema.pre(/^find/, function(next) {
//     this.populate({
//         path: "author",
//         select: "username",
//     });
//     next();
// })



// const postModel=mongoose.model('posts',postSchema);

// module.exports=postModel;




// postModel.js
const userModel = require('./userModel');
const mongoose = require('mongoose');
// const username = require('./userModel'); // Remove this line if not needed

const db_Link = "mongodb+srv://faizan:oKMHRGkHQucaw65B@cluster0.hg2c6no.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db_Link)
    .then(function (db) {
        console.log("Post database connected successfully");
    })
    .catch(function (err) {
        console.log(err);
    });

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel', // Update to the model name used in userModel.js
        required: [true, 'Post must belong to an author']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
}
    // ...
);

// postSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'author',
//         select: 'username',
//     });
//     next();
// });

const postModel = mongoose.model('posts', postSchema); // Updated model name to 'Post'

module.exports = postModel;

