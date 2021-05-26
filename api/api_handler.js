import {Login, storeFormData} from "../control/Form.js";
import express from "express";

export default function installHandler(app){
    app.use(express.json())
    
    
    app.post('/login',async(req,res,next)=>{
        try{
            const result = await Login(req.body.Email,req.body.Password)
            res.send(result)

        } catch(e){
            next(e)
        }
    })

    app.post('/form-data-set',(req,res) =>{
        res.send(storeFormData(req.body));
    })

    /*app.put('/update',(req,res,next)=>{
      try{  
        const result =  await update(req.body)
        res.send(result)
    }catch(e){
        next(e)
    }
    })

    app.delete('/delete',(req,res)=>{
        res.send(delete(req.body))
    })*/


}