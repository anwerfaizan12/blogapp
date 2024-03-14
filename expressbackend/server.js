const express=require('express');
const path = require('path');
const app=express();
const userRouter=require('./routers/userRouter');
const cors=require('cors');
const cookieParser=require('cookie-parser');
// const cookieParser=require('cookie-parser');

app.use(express.json());
app.use(cors({credentials:true,origin:'http://localhost:3001'}));
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + './uploads'));
// app.use(express.static(path.join(__dirname, 'uploads')));



app.listen(3004);

app.use('/user',userRouter);