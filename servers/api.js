//API Logics here

var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: "./public/emp_images",
  filename: (req, file, cb) => {
    cb(null, file.originalname + "_" + Date.now());
  },
});

var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});

var app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var conString = "mongodb://127.0.0.1:27017";

app.get("/home", (req, res) => {
  res.send(`<code>welcome To admin Project</code>`);
  res.end();
});

//routes for admin

app.get("/admin-users", (req, res) => {
  mongoClient.connect(conString).then((clientObj) => {
    var database = clientObj.db("admin_internship_database");
    database
      .collection("t_login")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.post("/register-admin", (req, res) => {
  var admin_reg = {
    admin_name: req.body.admin_name,
    admin_email: req.body.admin_email,
    admin_password: req.body.admin_password,
  };

  mongoClient.connect(conString).then((clientObj) => {
    var database = clientObj.db("admin_internship_database");
    //creating table
    //checking that email already exists or not
    database
      .collection("t_login")
      .findOne({ admin_email: req.body.admin_email })
      .then((existingUser) => {
        if (existingUser) {
          res.status(409);
          res.send(`Email is already registered`);
          res.end();
        } else {
          database
            .collection("t_login")
            .insertOne(admin_reg)
            .then(() => {
              console.log("Admin Registered...");
              res.end();
            });
        }
      });
  });
});

//Routes for employee

app.post("/add-employee", upload.single("emp_file"), (req, res) => {
  var emp_data = {
    emp_name: req.body.emp_name,
    emp_email: req.body.emp_email,
    emp_mobile: req.body.emp_mobile,
    emp_designation: req.body.emp_designation,
    emp_gender: req.body.emp_gender,
    emp_course: Array.isArray(req.body.emp_course)
      ? req.body.emp_course
      : [req.body.emp_course],
    emp_file: req.body.emp_file,
    created_date: new Date(),
    userId: req.body.userId,
  };
  mongoClient.connect(conString).then((client_data) => {
    var database = client_data.db("admin_internship_database");
    database
      .collection("t_Employee")
      .findOne({ emp_email: req.body.emp_email })
      .then((existing_email) => {
        if (existing_email) {
          res.status(409);
          res.send("Email already Exists");
          res.end();
        } else {
          database
            .collection("t_Employee")
            .insertOne(emp_data)
            .then(() => {
              console.log("Employee & File Added....");
              res.send();
              res.end();
            });
        }
      });
  });
});

app.get("/all-employee/:userid", (req, res) => {
  mongoClient.connect(conString).then((empObject) => {
    var database = empObject.db("admin_internship_database");
    database
      .collection("t_Employee")
      .find({ userId: req.params.userid })
      .toArray()
      .then((doc) => {
        res.send(doc);
        res.end();
      });
  });
});

app.get("/get-employee/:emp_email", (req, res) => {
  mongoClient.connect(conString).then((edit_emp) => {
    var database = edit_emp.db("admin_internship_database");
    database
      .collection("t_Employee")
      .find({ emp_email: req.params.emp_email })
      .toArray()
      .then((edit_emp) => {
        res.send(edit_emp);
        res.end();
      });
  });
});

app.put("/edit-employee/:emp_email", (req, res) => {
  mongoClient.connect(conString).then((edit_emp) => {
    var database = edit_emp.db("admin_internship_database");
    database
      .collection("t_Employee")
      .updateOne(
        { userId: req.params.emp_email },
        {
          $set: {
            emp_name: req.body.emp_name,
            emp_mobile: req.body.emp_mobile,
            emp_designation: req.body.emp_designation,
            emp_gender: req.body.emp_gender,
            emp_course: req.body.emp_course,
            emp_file: req.body.emp_file,
          },
        }
      )
      .then((update) => {
        if (update.modifiedCount > 0) {
          console.log("Employee Edited...");
          res.send();
          res.end();
        } else {
          console.log("Employee Not Found...");
        }
      });
  });
});

app.get("*", (req, res) => {
  res.send(`<code>The Page Your Looking for is Not available....</code>`);
  res.end();
});

app.listen(5252);
console.log(`Server Started at : http://127.0.0.1:5252`);
