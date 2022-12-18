//require modules
const express = require("express");
const path=require("path");
const hbs=require("hbs");
const app = express();

const port=process.env.PORT||3000;

//paths & links
const publicStaticPath=path.join(__dirname,"../public");
const templatePath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");

app.set('view engine','hbs');
app.set('views',templatePath);
hbs.registerPartials(partialsPath);

//routing
app.use(express.static(publicStaticPath));

app.get("/",(req,resp)=>{
    resp.render('index.hbs');
})
app.get("/about",(req,resp)=>{
    resp.render('about.hbs');
})
app.get("/weather",(req,resp)=>{
    resp.render('weather.hbs');
})
app.get("*",(req,resp)=>{
    resp.render('404err.hbs');
})

app.listen(port,()=>{
    console.log("server is listening port : "+port);
})