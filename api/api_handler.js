import {Login, storeFormData,getall,update, selectID,fetchData,userUpdate} from "../control/Form.js";
import express, { response } from "express";
import fileUpload from "express-fileupload";
import path from "path";
import querystring from 'query-string';
//import { request } from "https";
import https from 'https'
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
    app.post('/data', async(req, res)=>{
        const result = await fetchData(req.body.Email, req.body.Password);
        res.send(result);
      });

    app.post('/list',async(req,res)=>{
        const result = await getall(req.body.Email, req.body.Password)  
        res.send(result)
       })


    app.post('/form-data-set',async(req,res) =>{
        console.log()
        if (req.body.captcha === undefined ||
            req.body.captcha === '' ||
            req.body.captcha === null){
                return res.json({"success":false, 'msg':'please select captcha'})
            } const secretKey = '6LcJmgQbAAAAAERIyZyuaZQCfd7HDOJ-tVyszujQ';
           // const verifyUrl = `https://google.com/recatcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

            const postData = querystring.stringify({
                secret: secretKey,
                response: req.body.captcha
              });
              
              const options = {
                hostname: 'www.google.com',
                path: `/recaptcha/api/siteverify`,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Content-Length': Buffer.byteLength(postData)
                }
              };
              

const request = https.request(options, (response) => {
	let data = '';
	response.on('data', (chunk) => {
		data = data + chunk.toString();
	});

	response.on('end', () => {
        console.log(data)
		const body = JSON.parse(data);
		console.log(body);
        if (typeof body.success !== "undefined" && !body.success){
            return res.json({"success":false, 'msg':'Faild captcha verification'})
        }
        storeFormData(req.body.data);
        return ({"success":true, 'msg':'Captcha verification succeeded'})
	});
})

request.on('error', (error) => {
	console.log('An error', error);
});
request.write(postData)
request.end()
        
    })

   

   
    app.put('/update',async(req,res)=>{
        try {
            let result =await update(req.body.form, req.body.pass)
          res.send(result)
            
        } catch (error) {
         console.log(error);
        }
    })

   app.use(fileUpload({createParentPath:true}));

   app.post('/upload', async function(req, res){ 
    try{ 
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
        await userUpdate(result,filedata)
      
        
    } catch (error) {
     console.log(error);   
    }
     
  }
     

   res.send("file upload")
     } catch (err) {res.send(`file not uploaded.${err}`)} 
    
   });
 
    
}

