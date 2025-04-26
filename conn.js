const mysql=require("mysql");
const util=require("util");

const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"a2z_44_ portpolio"
})

const exe=util.promisify(conn.query).bind(conn);

module.exports=exe;