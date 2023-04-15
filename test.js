const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
//const url = "mongodb+srv://jslsasirekha:Test123@cluster0.gzxnd6y.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const url="mongodb+srv://jslsasirekha:Test123@cluster0.gzxnd6y.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
async function run() {
    try {
        await client.connect();
        console.log("Connected to server");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
