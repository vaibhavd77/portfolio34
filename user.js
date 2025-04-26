const express=require("express");
const exe=require("./../conn");
const nodemailer = require('nodemailer');
var route=express.Router();


route.get("/",async function(req,res){
    var data=await exe("SELECT * FROM hero_section");
    var about=await exe("SELECT * FROM about_me");
    var skills=await exe("SELECT * FROM skills");
    var obj={"data":data,"about":about,"skills":skills}
    res.render("user/home.ejs",obj)
})

route.post("/save_contact", async function(req,res){
    let d=req.body;
    var sql=`INSERT INTO contact (name,email,message) VALUES (?,?,?)`;
    var data = await exe(sql,[d.name,d.email,d.message]);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: "vaibhavdaspute775@gmail.com",
              pass: "jbji conr nsfy onsa",
            },
          });
          
          // async..await is not allowed in global scope, must use a wrapper
          async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: 'Vaibhav Daspute', // sender address
              to: "vaibhavdaspute775@gmail.com", // list of receivers
              subject:` Visit new user ${req.body.name} on site`, // Subject line
              text: "Hello world?", // plain text body
              html: `  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                     <div class="container">
                        <div class="row">
                             Name    : ${req.body.name}  <br>
                             Email   : ${req.body.email}  <br>
                             Mobile  : ${req.body.message}  
                           
                         </div>
                     </div> `, // html body
            });
          
            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
          }
          
          main().catch(console.error);

    res.redirect("/")
  })
  
module.exports=route;
