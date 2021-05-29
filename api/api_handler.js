import {Login, storeFormData,getall,update} from "../control/Form.js";
import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
const __dirname = path.resolve();
export default async function installHandler(app){
    app.use(express.json())
    
    
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

   app.use(fileUpload());

   app.post('/upload', function(req, res) {
     let sampleFile;
     let uploadPath;
    console.log(req.query.Email)
     if (!req.files || Object.keys(req.files).length === 0) {
         console.log("hello")
       return res.status(400).send('No files were uploaded.');
       
     }
   
     sampleFile = req.files.photo;
     
     uploadPath = __dirname + '/uploads/' + sampleFile.name;
     console.log(uploadPath)
     sampleFile.mv(uploadPath, function(err) {
       if (err)
         return res.status(500).send(err);
   
       res.send('File uploaded!');
     });
   });




}