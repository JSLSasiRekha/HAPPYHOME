const express = require('express');
const { MongoClient } = require('mongodb');

// Set up MongoDB connection options
const uri="mongodb+srv://jslsasirekha:Test123@cluster0.gzxnd6y.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true });

// Connect to MongoDB Atlas
client.connect(err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  
  console.log('MongoDB Atlas connected...');
  
  // Get a reference to the workers collection
  const workersCollection = client.db('HappyHome').collection('workers');
  
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
    client.close();
  });
});

// Create an Express app
const app = express();

app.get('/',(req,res)=>{
    res.render('Worker_Registration.ejs');
});
app.get('/Worker_Registration', (req, res) => {
    res.render('Worker_Registration.ejs');
  });

// Set up middleware and routes here...

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
