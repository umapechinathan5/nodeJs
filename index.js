import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { format } from 'date-fns';

const app = express();
const dir = path.dirname(fileURLToPath(import.meta.url))

app.get("/",(req,res)=>{
   res.send("hello world")
})


app.get("/create",(req,res)=>{
  try{
     let time = format(new Date(),"dd-MM-yyyy-HH-mm-ss");
     fs.writeFileSync(
      path.join(dir,`files/${time}.txt`),`File created at ${time}`,"utf-8"
     );
     let data = fs.readFileSync(path.join(dir,`files/${time}.txt`),"utf-8");
     res.status(200).send(data);
  }
  catch(error){
    console.log(error);
  }
})

app.get("/display",(req,res)=>{
  let filedir = path.join(dir,"files");
  fs.readdir(filedir,(err,files)=>{
    if(err){
      console.log(err);
    }
    else {
      const filenames = files.filter((file)=> path.extname(file)===".txt");
      let response = filenames.join("<br>");
      res.send(response);
      
    }
  })
})


app.listen(5000);
