const express=require("express");
const mysql=require("mysql");
const bodyparser=require("body-parser");
const util=require("util");
const session=require("express-session");
const upload=require("express-fileupload");
const user_route=require("./router/user");
const admin_route=require("./router/admin");
const path = require('path');
const bodyParser = require('body-parser');



var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"a2z_44"
})

const exe=util.promisify(conn.query).bind(conn);
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public/"));
app.use(upload());

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"qwertyuio"
}))

app.use("/",user_route);
app.use("/admin",admin_route)



app.post("/save", async function(req,res){
    var d=req.body;
    var sql=`INSERT INTO demo (demo_name,demo_email,demo_mas)
    VALUES
    (?,?,?)`
    var data=await exe(sql,[d.name,d.email,d.message])
    res.redirect("/");
})
const adminRoutes = require("./router/admin"); // Update path if needed
app.use("/admin", adminRoutes);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));





app.listen(1000);