import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//import multer from "multer";
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
//file upload

var storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname)
    }
})
var upload = multer({storage:storage}).array('file');
app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError){
            return res.status(500).json(err)
        } else if(err){
            return res.status(500).json(err)
        }
     return res.status(200).send(req.file)
    })
})
installHandler(app)


const port = process.env.API_PORT || 5000;

app.listen(port,()=>{
    console.log(`API server on port ${port}`);
});

