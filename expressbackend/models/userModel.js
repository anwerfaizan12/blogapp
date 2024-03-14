// const mongoose=require('mongoose');
// const bcrypt=require("bcrypt");
// const db_Link = "mongodb+srv://faizan:oKMHRGkHQucaw65B@cluster0.hg2c6no.mongodb.net/?retryWrites=true&w=majority";

// mongoose.connect(db_Link)
// .then(function(db){
//     console.log("user db connected successfully");
// }).catch(function(err){
//     console.log(err);
// })

// // oKMHRGkHQucaw65B

// const userSchema=mongoose.Schema({
//     username:{
//         type:String,
//         required:true,
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })

// userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
// })

// const userModel=mongoose.model('users',userSchema);

// module.exports=userModel;


const mongoose = require('mongoose');
const {Schema,model} = require('mongoose');
const bcrypt = require('bcrypt');
const emailValidator=require('email-validator');
const db_Link = "mongodb+srv://faizan:oKMHRGkHQucaw65B@cluster0.hg2c6no.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db_Link)
    .then(function (db) {
        console.log("User database connected successfully");
    })
    .catch(function (err) {
        console.log(err);
    });

const userSchema = Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true
    },
}

);

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

const userModel = model('users', userSchema);

module.exports = userModel;
