const express=require('express');
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken');
// const { sendMail } = require('../utility/nodeMailer');
const JWT_KEY='hgh6767ghghg8979';
const cookieParser=require('cookie-parser');

// user signup
module.exports.signup=async function signup(req,res){
    try{
        let dataObj=req.body;
    let user=await userModel.create(dataObj);
    sendMail("signup",user);
    if(user){
       return res.json({
        message:"user signed up",
        data:user
    })
}
else{
    res.json({
        message:"error while signing up"
    })
}
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}



// user login
module.exports.login=async function login(req,res){
    try
    {
    let data=req.body;
    // console.log(data);
    if(data.email){
    let user=await userModel.findOne({email:data.email});
    if(user){
        if(user.password===data.password){
            let uid=user['_id'];  // uid
            let token=jwt.sign({username:user.username,payload:uid},JWT_KEY);  // is se signature banega aur header and uid ke sath milkar jwt bna dega
        //    console.log(token);
            res.cookie('isLoggedIn',token,{httpOnly:true});
            return res.json({
                id:user._id,
                username:user.username
            })
        }
        else
        {
            // return res.json({
            //     message:"wrong credentials"
            // })
            console.log("you don't have account");
        }
    }
    else
    {
        console.log("you don't have account");
    }
}
else{
    console.log("you don't have account");
}
    }
    catch(err){
        console.log(err);
    }
}

module.exports.profile = function profile(req, res) {
    const isLoggedInCookie = req.cookies['isLoggedIn'];
  
    if (!isLoggedInCookie) {
      return res.status(401).json({ error: 'Unauthorized - Cookie not found' });
    }
  
    jwt.verify(isLoggedInCookie, JWT_KEY, (err, decoded) => {
      if (err) {
        console.error('JWT verification error:', err.message);
        return res.status(401).json({ error: 'Unauthorized - Invalid JWT' });
      }
  
    //   console.log(decoded);
      // Attach the decoded payload to the request for further processing
      res.json(decoded);
    });
  };
  


// module.exports.profile=function profile(req,res) {
//     const isLoggedInCookie = req.cookies['isLoggedIn'];
  
//     if (!isLoggedInCookie) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
  
//     jwt.verify(isLoggedInCookie, JWT_KEY, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ error: 'Unauthorized' });
//       }
//       console.log(decoded)
//       // Attach the decoded payload to the request for further processing
//       res.json(decoded);
//     });
//   };
  
  



// logout
module.exports.logout=function logout(req,res){
    res.cookie('isLoggedIn','',{maxAge:1});
     res.status(200).json({
        success:true,
        message:"user logged out successfully"
    })
}







// protect route
// module.exports.protectRoute=async function protectRoute(req,res,next){
//     try{
//     let token;
//     if(req.cookies.isLoggedIn){     // It gives the information of login status.
//         token=req.cookies.isLoggedIn;
//         let payload=jwt.verify(token,JWT_KEY);   // yeh purane wale ka header aur payload ko le lega aur naya signature banayega agar purana signature naya signature se match kar rha h to login h otherwise nhi h.
//         // console.log("payload=>",payload.payload);
//         if(payload){
//             const user=await userModel.findById(payload.payload);
//             req.role=user.role;
//             req.id=user.id;
//             next();   // next karne par next route m chale jayenge aur abhi req m jo kuch bhi h wo agle route k req m chla jayega -> example(role aur id)
//         }
//         else{
//             res.json({
//                 message:"please login again"
//             })
//         }
//     }
//     else{
//         let client=req.get("User-Agent");
//         if(client.includes("Mozilla")==true){
//             return res.redirect('/login');
//         }
//         else{
//         return res.json({
//             message:"Please login"
//         })
//     }
//     }
// }
// catch(err){
//     res.json({
//         message:err.message
//     })
// }
// }

module.exports.protectRoute=function protectRoute(req,res,next){
    if(req.cookies.isLoggedIn){
        next();
    }
    else{
        res.json({
            message:"Login Please."
        })
    }
}