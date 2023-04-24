const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const https = require("https");
const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs');
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const { Console } = require("console");
const nodemailer = require('nodemailer');

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');


const url="mongodb+srv://jslsasirekha:Test123@cluster0.gzxnd6y.mongodb.net/HappyHome?retryWrites=true&w=majority"
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
const WorkerSchema= new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  Profession: String,
  Password: String,
  CheckStatus: String,
  password: String,
});
const ServiceBookedSchema= new mongoose.Schema({
   userId: String,
   requiredService: String,
   workStatus: String,
    workerId: String,
    
});
const FeedbackSchema= new mongoose.Schema({
  userId: String,
  message: String,
});
const AnnouncementSchema= new mongoose.Schema({
  message: String,
});
const Service1 = mongoose.model('Service1', ServiceSchema);
const Service2 = mongoose.model('Service2', ServiceSchema);
const Service3 = mongoose.model('Service3', ServiceSchema);
const Service4 = mongoose.model('Service4', ServiceSchema);
const Service5 = mongoose.model('Service5', ServiceSchema);
const Service6 = mongoose.model('Service6', ServiceSchema);

const Service1Booked=mongoose.model('Bookedservice1',ServiceBookedSchema);
const Feedbacks=mongoose.model('Feedbacks',FeedbackSchema);
const Announcements=mongoose.model('Announcements',AnnouncementSchema);


const UserCollection= mongoose.model('User', UserSchema);
const AdminCollection= mongoose.model('Admin', AdminSchema);
const WorkerCollection= mongoose.model('Worker', WorkerSchema);


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

  WorkerDetails=[];
  UserDetails=[];
  UserBookedDetails=[];

//---------------Inserting Data into Database-----------------//
// Service1.insertMany(msaloon);
// Service2.insertMany(wsaloon);
// Service3.insertMany(carpenter);
// Service4.insertMany(plumber);
// Service5.insertMany(houseRepair);
// Service6.insertMany(repair);
//AdminCollection.insertMany({email:"sasirekha@gmail.com",key:"admin",name:"Sasi"});
//WorkerCollection.insertMany({name:"Williams",email:"willy@gmail.com",phone:"7891234561",location:"Hyderabad",Profession:"Men Saloon",CheckStatus:"Approved"});










app.post('/SendFeedback', async function (req, res) {
  console.log(req.body);
  await Feedbacks.insertMany({userId:req.body.userid,message:req.body.message});
  console.log('Feedback Sent');
  res.redirect('/account');
});
app.post('/submit_register', async function (req, res) {
  console.log(req.body);

  const result = await UserCollection.insertMany({first_name:req.body.firstname,last_name:req.body.lastname,phone:req.body.phone,email:req.body.email,password:req.body.cr_password});

  console.log("DataInserted");

});
app.post('/UpdateProfile', async function (req, res) {
  console.log(req.body);
  await UserCollection.updateMany({_id:req.body.id},{$set:{first_name:req.body.fname,last_name:req.body.lname,phone:req.body.phone,email:req.body.email,password:req.body.c_pass}});
  const result= await UserCollection.findById(req.body.id);
  console.log("Data Inserted");
  console.log(result);
  res.render("project",{user:x});

});

app.post('/submit_register_worker', async function (req, res) {
  console.log(req.body);

  const result= await WorkerCollection.insertMany({name:req.body.name,email:req.body.email,phone:req.body.phone,location:req.body.location,Profession:req.body.profession,CheckStatus:"NotApproved",password:req.body.cr_password});

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
        password:result.password,
        id:result._id,
       
      }
     
      console.log(x);
      console.log('login');
     res.render("project",{user:x});
    }

});

app.post('/submit_login_worker', async function (req, res) {
  console.log(req.body);

  const result= await WorkerCollection.findOne({email:req.body.email_l,password:req.body.password})
    console.log(result);

    if (result == "" || result == null) {
      console.log(' not loginned');
      res.send('<h1>Not logged in</h1>')
    }
    else {
       x={
        fname:result.name,
        email:result.email,
        phone:result.phone,
        password:result.password,
        id:result._id,
       
      }
     
      console.log(x);
      console.log('login');
     res.redirect("/worker/"+x.id);
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
        password:result.key,
        id:result._id,
      }
      
      console.log(x);
      console.log('login');
      const WorkerCount=await WorkerCollection.countDocuments();
      const UserCount= await UserCollection.countDocuments();
      const WorkerApprovedCount= await WorkerCollection.countDocuments({CheckStatus:"Approved"});
      const WorkerRejectedCount= await WorkerCollection.countDocuments({CheckStatus:"Rejected"});
     console.log(WorkerCount);
        await WorkerCollection.find({}).then(workers => {
          WorkerDetails=workers;
        });
        await UserCollection.find({}).then(users => {
          UserDetails=users;
        });
        await Feedbacks.find({}).then(feedbacks => {
          FeedbackDetails=feedbacks;
        });
        res.render("admin.ejs",{Workers:WorkerDetails,Users:UserDetails,WorkerCount:WorkerCount,UserCount:UserCount,WorkerApprovedCount:WorkerApprovedCount,WorkerRejectedCount:WorkerRejectedCount,feedbacks:FeedbackDetails});
  
    }

});
app.post('/workerApproval', async function (req, res) {
   console.log('Approved');
   console.log(req.body.WorkerId);
   await WorkerCollection.findByIdAndUpdate({_id:req.body.WorkerId},{CheckStatus:"Approved"})
   const WorkerCount=await WorkerCollection.countDocuments();
   const UserCount= await UserCollection.countDocuments();
   const WorkerApprovedCount= await WorkerCollection.countDocuments({CheckStatus:"Approved"});
   const WorkerRejectedCount= await WorkerCollection.countDocuments({CheckStatus:"Rejected"});
   
  console.log(WorkerCount);
     await WorkerCollection.find({}).then(workers => {
       WorkerDetails=workers;
     });
     await UserCollection.find({}).then(users => {
       UserDetails=users;
     });
     await Feedbacks.find({}).then(feedbacks => {
      FeedbackDetails=feedbacks;
    });
     res.render("admin.ejs",{Workers:WorkerDetails,Users:UserDetails,WorkerCount:WorkerCount,UserCount:UserCount,WorkerApprovedCount:WorkerApprovedCount,WorkerRejectedCount:WorkerRejectedCount,feedbacks:FeedbackDetails});
   
});

app.post('/workerRejected', async function (req, res) {
  console.log('Rejected');
  console.log(req.body.WorkerId);
  await WorkerCollection.findByIdAndUpdate({_id:req.body.WorkerId},{CheckStatus:"Rejected"});
  const WorkerCount=await WorkerCollection.countDocuments();
  const UserCount= await UserCollection.countDocuments();
  const WorkerApprovedCount= await WorkerCollection.countDocuments({CheckStatus:"Approved"});
  const WorkerRejectedCount= await WorkerCollection.countDocuments({CheckStatus:"Rejected"});
 console.log(WorkerCount);
    await WorkerCollection.find({}).then(workers => {
      WorkerDetails=workers;
    });
    await UserCollection.find({}).then(users => {
      UserDetails=users;
    });
    await Feedbacks.find({}).then(feedbacks => {
      FeedbackDetails=feedbacks;
    });
    res.render("admin.ejs",{Workers:WorkerDetails,Users:UserDetails,WorkerCount:WorkerCount,UserCount:UserCount,WorkerApprovedCount:WorkerApprovedCount,WorkerRejectedCount:WorkerRejectedCount,feedbacks:FeedbackDetails});
  
});

app.post('/userRejected', async function (req, res) {
  console.log('Rejected');
  console.log(req.body.UserId);
  await UserCollection.deleteOne({ _id:req.body.UserId });
  const WorkerCount=await WorkerCollection.countDocuments();
  const UserCount= await UserCollection.countDocuments();
  const WorkerApprovedCount= await WorkerCollection.countDocuments({CheckStatus:"Approved"});
  const WorkerRejectedCount= await WorkerCollection.countDocuments({CheckStatus:"Rejected"});
 console.log(WorkerCount);
    await WorkerCollection.find({}).then(workers => {
      WorkerDetails=workers;
    });
    await UserCollection.find({}).then(users => {
      UserDetails=users;
    });
    await Feedbacks.find({}).then(feedbacks => {
      FeedbackDetails=feedbacks;
    });
    res.render("admin.ejs",{Workers:WorkerDetails,Users:UserDetails,WorkerCount:WorkerCount,UserCount:UserCount,WorkerApprovedCount:WorkerApprovedCount,WorkerRejectedCount:WorkerRejectedCount,feedbacks:FeedbackDetails});
  
});
app.post('/userBooked', async function (req, res) {
  console.log('Booked');
     const WorkerId=req.body.WorkerId;
   console.log(req.body.UserId);
   const name=req.body.fname+req.body.lname;
   await Service1Booked.insertMany({userId:req.body.UserId,required_service:"Service1",workStatus:"Not Started"});
});
app.post('/workerAccepted/:workerId',async function(req,res){
  await Service1Booked.updateOne({userId:req.body.UserId },{$set:{workStatus:"Accepted",workerId:req.params.workerId}});
  res.redirect("/worker/"+req.params.workerId);
});
app.post('/workerRejected/:workerId',async function(req,res){
  await Service1Booked.updateOne({userId:req.body.UserId},{$set:{workStatus:"Not Started",workerId:"null"}});
  res.redirect("/worker/"+req.params.workerId);
});
app.post('/SendMail',async function(req,res){
  console.log(req.body.mail);
  await Announcements.insertMany({message:req.body.mail});
  res.redirect("/admin");
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
app.get('/card', (req, res) => {
  res.render('card.ejs');
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
app.get('/account', async (req, res) => {
  console.log(x);
  var AnnouncementsDetails=[];
  await Announcements.find({}).then(announcement => {
    AnnouncementsDetails=announcement;
  });
  res.render("account.ejs",{user:x,announcements:AnnouncementsDetails});
});
app.get('/checkout', (req, res) => {
  res.render("checkout.ejs",{user:x});
});

app.get('/admin', async (req, res) => {

  const WorkerCount=await WorkerCollection.countDocuments();
  const UserCount= await UserCollection.countDocuments();
  const WorkerApprovedCount= await WorkerCollection.countDocuments({CheckStatus:"Approved"});
  const WorkerRejectedCount= await WorkerCollection.countDocuments({CheckStatus:"Rejected"});
 console.log(WorkerCount);
    await WorkerCollection.find({}).then(workers => {
      WorkerDetails=workers;
    });
    await UserCollection.find({}).then(users => {
      UserDetails=users;
    });
    await Feedbacks.find({}).then(feedbacks => {
      FeedbackDetails=feedbacks;
    });
    res.render("admin.ejs",{Workers:WorkerDetails,Users:UserDetails,WorkerCount:WorkerCount,UserCount:UserCount,WorkerApprovedCount:WorkerApprovedCount,WorkerRejectedCount:WorkerRejectedCount,feedbacks:FeedbackDetails});
});



app.get('/service'+':serviceNumber',async (req, res) => {
      await ServiceTable[req.params.serviceNumber-1].find({}).then(saloons => {
    res.render("service"+req.params.serviceNumber,{Category:saloons,user:x});
  })

});

app.get('/worker_Registration', (req, res) => {
  const category = 'plumber'; 
  res.render('worker_Registration.ejs', { category:category,errors:[] }); 
});
app.get('/servicesFooter.ejs', (req, res) => {
  res.render('servicesFooter.ejs');
});


app.get('/worker/:workerId', async (req, res) => {
  let UserBookedDetails=[];
  await Service1Booked.find({workStatus:"Not Started"}).then(async userbooked => {
    ServiceDetails=userbooked;
    for(var i=0;i<userbooked.length;i++){
     await UserCollection.findById(userbooked[i].userId).then(user => {
     
      UserBookedDetails.push(user);
     });
    }
  });
  let AcceptedDetails=[];
  await Service1Booked.find({workStatus:"Accepted",workerId:req.params.workerId}).then(async userbooked => {
    for(var i=0;i<userbooked.length;i++){
     await UserCollection.findById(userbooked[i].userId).then(user => {
     
      AcceptedDetails.push(user);
     });
    }
  });
 
  res.render("Worker",{Users:UserBookedDetails,workerId:req.params.workerId,AcceptedDetails:AcceptedDetails});

      
});






//------------Connecting to server port 8000--------------------------------------------------
app.listen(8000, function () {
  console.log("Server is running on port 8000.");
});