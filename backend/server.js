const express =require("express");
const cors = require("cors")

const app= express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const userRoute=require("./routes/userRoute");
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.URI).
then(()=>{
    console.log("connected successfully");
    app.listen(process.env.PORT || 8000,(err)=>{

        if(err)console.log(err);

        console.log("runnimg successfully",process.env.PORT)
    });
}).catch((error)=>{
    console.log("error",error);
})

app.use(userRoute);


