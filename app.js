const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const https = require("https");
const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();
//const mysql=require('mysql');
const ejs = require('ejs');
const { MongoClient } = require("mongodb");



app.set('view engine', 'ejs');


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');


const url="mongodb+srv://jslsasirekha:Test123@cluster0.gzxnd6y.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
async function run() {
    try {
        await client.connect();
        console.log("Connected to server");
    } catch (err) {
        console.log(err.stack);
    }
    // finally {
    //     await client.close();
    // }
}

run().catch(console.error);
// const client = new MongoClient("mongodb://127.0.0.1:27017/");

const db =  client.db("HappyHome");

const collection = db.collection("Users");

  // Get a reference to the workers collection
  const workersCollection =db.collection('workers');
  
  // Define the new worker object
  const newWorker = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '555-555-5555',
    location: 'New York, NY',
    category: 'Electrician',
    description: 'Experienced electrician for residential and commercial projects.',
    password: 'mysecurepassword'
  };
  
  // Insert the new worker into the workers collection
  workersCollection.insertOne(newWorker, (err, result) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    
    console.log('Worker registered successfully...');
    
    // Close the MongoDB connection
  
  });


//const result = await collection.insertOne({ name: "Sami"},{$set:{name:"Sasi Rekha",rollno: "99"}});





// const db = new sqlite3.Database('./UserInfo.db', sqlite3.OPEN_READWRITE, (err) => {
//   if (err)
//     console.log(err.message);
// });
// let sql;

// //CREATE TABLE
// // sql=`CREATE TABLE users(id INTEGER PRIMARY KEY,first_name,last_name,phone,email,password1,password2)`;
// // db.run(sql);

// //DELETE TABLE
// // sql=`DROP TABLE users`;
// // db.run(sql);


app.post('/submit_register', async function (req, res) {
  console.log(req.body);

  const result = await collection.insertOne({first_name:req.body.firstname,last_name:req.body.lastname,phone:req.body.phone,email:req.body.email,password:req.body.cr_password});

  // sql = `INSERT INTO users(first_name,last_name,phone,email,password1,password2)VALUES(?,?,?,?,?,?)`;
  // db.run(sql, [req.body.firstname, req.body.lastname, req.body.phone, req.body.email, req.body.cr_password, req.body.vr_password], (err) => {
  //   if (err) console.log(err);
  // });

  console.log("DataInserted");
  //var sql="insert into login_register(first_n,last_n,phone,email,pwd1,pwd2) VALUES('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.cr_password+"','"+req.body.vr_password+"')";



});

let x=null;

app.post('/submit_login', async function (req, res) {
  console.log(req.body);

  const result= await collection.findOne({email:req.body.email_l,password:req.body.password})

  //var sql1 = "select * from users where email='" + req.body.email_l + "' and password2='" + req.body.password + "'";
  // db.all(sql1, function (err, result, fields) {
  //   if (err) throw err
    console.log(result);

    if (result == "" || result == null) {
      console.log(' not loginned');
      res.send('<h1>Not logged in</h1>')
    }
    else {
       x={
        fname:result.first_name,
        lname:result.last_name,
        email:result.email,
        phone:result.phone,
        password:result.password1
      }
     
      console.log(x);
      console.log('login');
     res.render("project",{user:x});
     
    

    }




});













app.get('/logout',function(req,res){
    x=null;
    res.redirect("/");
})


app.get("/", function (req, res) {
  res.render('project.ejs',{user:x});
});

app.get('/navbar', (req, res) => {
  res.render('navbar.ejs',{user:x});
});


app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.get("/faq", function (req, res) {
  res.sendFile(__dirname + "/faq.html");
});

app.get('/project', (req, res) => {
  res.render('project',{user:x});
});

app.get('/blog', (req, res) => {
  res.render('blog.ejs');
});
app.get('/cart', (req, res) => {
  res.render('cart.ejs');
});
app.get('/about', (req, res) => {
  res.render('about.ejs');
});
app.get('/about_login', (req, res) => {
  res.render('about_login.ejs');
});
app.get('/progressbar', (req, res) => {
  res.render("progressbar.ejs");
});
app.get('/step1', (req, res) => {
  res.render("step1.ejs");
});
app.get('/slideshow', (req, res) => {
  res.render("slideshow.ejs");
});
app.get('/account', (req, res) => {
  console.log(x);
  res.render("account.ejs",{user:x});
});
app.get('/checkout', (req, res) => {
  res.render("checkout.ejs");
});

app.get('/service1', (req, res) => {
  res.render('service1.ejs');
});
app.get('/service2', (req, res) => {
  res.render('service2.ejs');
});
app.get('/service3', (req, res) => {
  res.render('service3.ejs');
});
app.get('/service4', (req, res) => {
  res.render('service4.ejs');
});
app.get('/service5', (req, res) => {
  res.render('service5.ejs');
});
app.get('/service6', (req, res) => {
  res.render('service6.ejs');
});
// app.get('/Worker_Registration', (req, res) => {
//   res.render('Worker_Registration.ejs', { errors: [] });
// });

app.get('/worker_Registration', (req, res) => {
  const category = 'plumber'; // define the category variable
  res.render('worker_Registration.ejs', { category:category,errors:[] }); // pass the category variable to the EJS template
});









app.listen(8000, function () {
  console.log("Server is running on port 8000.");
});