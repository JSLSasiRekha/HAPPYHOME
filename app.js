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
const mongoose = require("mongoose");



app.set('view engine', 'ejs');


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');


const url="mongodb+srv://jslsasirekha:Test123@cluster0.gzxnd6y.mongodb.net/HappyHome?retryWrites=true&w=majority"
// const client = new MongoClient(url);
// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected to server");
//     } catch (err) {
//         console.log(err.stack);
//     }
//     // finally {
//     //     await client.close();
//     // }
// }

const client = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

if(client) {
  console.log("Connected to mongodb atlas");
}

const ServiceSchema = new mongoose.Schema({
  sname:String,
});

const UserSchema= new mongoose.Schema({
  // UserId: {
  //   type: String,
  //   unique: true,
  //   index: true,
  //   required: true,
  // },
  first_name: String,
  last_name: String,
  phone: String,
  email: String,
  password: String,
});
const AdminSchema= new mongoose.Schema({
   email: String,
   key: String,
   name: String,
 });


const Service1 = mongoose.model('Service1', ServiceSchema);
const Service2 = mongoose.model('Service2', ServiceSchema);
const Service3 = mongoose.model('Service3', ServiceSchema);
const Service4 = mongoose.model('Service4', ServiceSchema);
const Service5 = mongoose.model('Service5', ServiceSchema);
const Service6 = mongoose.model('Service6', ServiceSchema);

const UserCollection= mongoose.model('User', UserSchema);
const AdminCollection= mongoose.model('Admin', AdminSchema);

const ServiceTable=[Service1,Service2,Service3,Service4,Service5,Service6]
// run().catch(console.error);
// const client = new MongoClient("mongodb://127.0.0.1:27017/");

//  const db =  client.db("HappyHome");

//  const collection = db.collection("Users");

  // Get a reference to the workers collection
  // const workersCollection =db.collection('workers');
  
  //const Womensaloon=db.collection("WomenSaloon");
  //const collection=mongoose.model("Users",);

  const wsaloon=[
    {sname:"Hair Cut"},
    {sname:"Waxing"},
    {sname:"Facials"},
    {sname:"Make Up"}

  ]
  const msaloon=[
    {sname:"Beard Trimming"},
    {sname:"Hair Cut"},
    {sname:"Facials"},
    {sname:"Therapy"}

  ]
  const carpenter=[
    {sname:"Door"},
    {sname:"Bed"},
    {sname:"Furniture Assembly"},
    {sname:"Furniture Repair"}

  ]
  const plumber=[
    {sname:" Basin And Sink"},
    {sname:" Drainage Pipes"},
    {sname:" Bath Fitting"},
    {sname:" Toilets"},
    {sname:" Tap And Mixer"}
  ]
  const houseRepair=[
    {sname:"Furnished Apartment"},
    {sname:"Furnished Bungalow"},
    {sname:"Mini Services"},
    {sname:"Modern Services"}
  ]
  const repair=[
    {sname:"Air Conditioner Repairing"},
    {sname:"Fan Repairing"},
    {sname:"Washing Machine Repairing"},
    {sname:"Other Things Repairing"}
  ]

//---------------Inserting Data into Database-----------------//
// Service1.insertMany(msaloon);
// Service2.insertMany(wsaloon);
// Service3.insertMany(carpenter);
// Service4.insertMany(plumber);
// Service5.insertMany(houseRepair);
// Service6.insertMany(repair);
//AdminCollection.insertMany({email:"sasirekha@gmail.com",key:"admin",name:"Sasi"});



  // Define the new worker object
  // const newWorker = {
  //   name: 'John Doe',
  //   email: 'johndoe@example.com',
  //   phone: '555-555-5555',
  //   location: 'New York, NY',
  //   category: 'Electrician',
  //   description: 'Experienced electrician for residential and commercial projects.',
  //   password: 'mysecurepassword'
  // };
  
  // // Insert the new worker into the workers collection
  // workersCollection.insertOne(newWorker, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     process.exit(1);
  //   }
    
  //   console.log('Worker registered successfully...');

  
  // });


app.post('/submit_register', async function (req, res) {
  console.log(req.body);

  const result = await UserCollection.insertMany({first_name:req.body.firstname,last_name:req.body.lastname,phone:req.body.phone,email:req.body.email,password:req.body.cr_password});

  console.log("DataInserted");

});


let x=null;



app.post('/submit_login', async function (req, res) {
  console.log(req.body);

  const result= await UserCollection.findOne({email:req.body.email_l,password:req.body.password})

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

app.post('/submit_admin', async function (req, res) {
  console.log(req.body);

  const result= await AdminCollection.findOne({email:req.body.email,key:req.body.cr_password})
    console.log(result);

    if (result == "" || result == null) {
      console.log(' not loginned');
      res.send('<h1>Not logged in</h1>')
    }
    else {
       x={
        fname:result.name,
        email:result.email,
        password:result.key
      }
      
      console.log(x);
      console.log('login');
     res.render("admin.ejs");
    }

});


app.get('/logout',function(req,res){
    x=null;
    res.redirect("/");
})

//-----------------------------------Routing---------------------------------------------------------------------
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
app.get('/admin', (req, res) => {
  res.render("admin.ejs");
});



app.get('/service'+':serviceNumber',async (req, res) => {
      await ServiceTable[req.params.serviceNumber-1].find({}).then(saloons => {
    res.render("service"+req.params.serviceNumber,{Category:saloons})
  })

});

app.get('/worker_Registration', (req, res) => {
  const category = 'plumber'; 
  res.render('worker_Registration.ejs', { category:category,errors:[] }); 
});
app.get('/servicesFooter.ejs', (req, res) => {
  res.render('servicesFooter.ejs');
});







//------------Connecting to server port 8000--------------------------------------------------
app.listen(8000, function () {
  console.log("Server is running on port 8000.");
});