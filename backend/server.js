//.env import
require("dotenv").config(); // dotenv global object is now available in our express app

// dns fix by copilot:
require('node:dns/promises').setServers(['1.1.1.1','8.8.8.8']);
require('dotenv').config();

//checking uri
console.log("MONG_URI=", !!process.env.MONG_URI)

// importing express packages (express provides abstraction layer on top of node.js framework,
//  to create backend api in a simple way where low level work is handled by express so that we can simply focus on functionality/business logic)
const express = require("express");


// importing Cors packages
const cors = require( "cors");

//creating express application object by calling express factory function from Express packages (library/framework)
const app = express();

//middleware

app.use(cors()); // CORS middle ware should run before route handlers

app.use(express.json()); // parsing req.body while client hit post api

app.use((req,res,next)=>{               // api testing
    console.log(req.path,req.method);
    next();
});


// routes import

const workoutRouter = require("./routes/workoutsRoutes");

// routes registeration

app.use("/api", workoutRouter);


//default route

app.get("/",(req,res)=>{
    console.log("API is running successfully , path='root' and method='get'")
    res.status(200).send("Api is running ");
});




// import mongoose and creating a connection
const db = require("mongoose");

db.connect(process.env.MONG_URI)
.then(()=>{
    // asynchronous so we use .then() // also said promise, need to dive more into it
    console.log("connected to MongoDB");

    // server starts listening...
    app.listen(
    process.env.PORT, ()=>{
        console.log(`"server is listening on port:${process.env.PORT}"`)
    });
}).catch(
    (error)=>{
        console.log(error)
    }
)





// nodemon globally installed
// setup window firewall to allow nodejs through private network
// created express app and server is listening
