//API Logics here

var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var conString = "mongodb://127.0.0.1:27017";

app.get("/home" , (req , res) => {
    res.send(`<code>welcome To admin Project</code>`);
    res.end();
});

app.get("/admin-users",(req , res) => {
    mongoClient.connect(conString).then((clientObj) => {
        var database = clientObj.db("admin_internship_database");
        database.collection("t_login").find({}).toArray().then((documents)=>{
            res.send(documents);
            res.end();
        })
    });
});


app.post('/register-admin',(req , res) => {
    var admin_reg = {
        admin_name : req.body.admin_name,
        admin_email : req.body.admin_email,
        admin_password : req.body.admin_password
    };
    
    mongoClient.connect(conString).then((clientObj) => {
        var database = clientObj.db("admin_internship_database");
        //creating table 
        //checking that email already exists or not
        database.collection("t_login").findOne({admin_email : req.body.admin_email}).then((existingUser)=>{
            if(existingUser){
                res.status(409) ;
                res.send(`Email is already registered`);
                res.end();
            } else{
                database.collection("t_login").insertOne(admin_reg).then(()=>{
                    console.log("Admin Registered...");
                    res.end();
                });
            }
        });

        
    });

});


app.get("*",(req , res) => {
    res.send(`<code>The Page Your Looking for is Not available....</code>`);
    res.end();
});


app.listen(5252)
console.log(`Server Started at : http://127.0.0.1:5252`);