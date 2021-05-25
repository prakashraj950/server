import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import installHandler from "./api/api_handler.js";
dotenv.config();

//const ui_origin = process.env.UI_ORIGIN || "http://localhost:3000";

const app = express();

//app.use((req,res,next) => {
    //res.header('Access-Control-Allow-Origin',ui_origin);
    //res.header('Access-Control-Allow-Headers','Content-Type');
   // next();
//});

app.use(cors())

installHandler(app)


const port = process.env.API_PORT || 5000;

app.listen(port,()=>{
    console.log(`API server on port ${port}`);
});

