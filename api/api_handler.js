import {Login, storeFormData,getall,update, selectID} from "../control/Form.js";
import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
const __dirname = path.resolve();
export default async function installHandler(app){
    app.use(express.json())
    
    app.use(express.static('./uploads'));
    app.post('/login',async(req,res,next)=>{
        try{
            const result = await Login(req.body.Email,req.body.Password)
            res.send(result)

        } catch(e){
            next(e)
        }
    })

    app.post('/form-data-set',async(req,res) =>{
        res.send(storeFormData(req.body));
    })

   
   app.get('/login',async(req,res)=>{
    const result = await getall()   
    res.send(result)
   })
   
   app.put('/update/:id',async(req,res)=>{
       try {
           let result =await update(req.params.id,req.body)
         res.send(result)
           
       } catch (error) {
        console.log(error);   
       }
   })

   app.use(fileUpload({createParentPath:true}));

   app.post('/upload', async function(req, res) {
     
     let uploadPath;
     const result = await selectID(req.query.Email)
     console.log(result)
    console.log(req.query.Email)
     if (!req.files || Object.keys(req.files).length === 0) {
         console.log("hello")
       return res.status(400).send('No files were uploaded.');
       
     }
   
     const files = ["Photo", "plusTwo_Certificate", "UG_or_PG_Certificate"];

     for(const file of files) {
      const sampleFile = req.files[file];
      const file_name = sampleFile.name.split(".");
      const file_ext = file_name[file_name.length-1];
     uploadPath = __dirname + `/uploads/${result}/`+ file+"."+file_ext;
     sampleFile.mv(uploadPath);
     
     var str = file+'.'+file_ext;
     const filedata = {};
    filedata[file]= str;
    console.log(filedata)
    try {
        await update(result,filedata)
      
        
    } catch (error) {
     console.log(error);   
    }
     
 }
     

   res.send("file upload")
   });




}