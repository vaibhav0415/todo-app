import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"

import todoRoute from "../backend/routes/todo.route.js"
import userRoute from "../backend/routes/user.route.js"

const app=express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
     origin:process.env.FRONTEND_URL || "http://localhost:5173",
     credentials:true,
     methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"]
}));

dotenv.config();

 const PORT=process.env.PORT || 4001;
 const DB_URI=process.env.MONGODB_URI;

 //database connection code
try {
     await mongoose.connect(DB_URI)
     console.log("connected to mongodb")
} catch (error) {
    console.log(error)
}

//routes define

app.use("/todo",todoRoute);
app.use("/user",userRoute);







const port =4002;
app.listen(PORT,()=>{
 console.log(`server is running on port ${PORT}`)
});

app.get("/", (req, res) => {
    res.send("Welcome to the TODO API!");
});
