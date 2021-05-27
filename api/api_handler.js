import {Login, storeFormData,getall,update} from "../control/Form.js";
import express from "express";

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
    /*

    app.delete('/delete',(req,res)=>{
        res.send(delete(req.body))
    })*/


}