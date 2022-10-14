const fastify = require("fastify")({logger:true}) //installing fastify,mongoose and dotenv packages
const path = require("path")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose");

//Main module ,i am using the fastify framework to finish my assignment 
//connecting the mongodb here
mongoose.connect(process.env.MONGO_URL , {useNewUrlParser: true}, ()=>{
    console.log("Connected to MONGODB");
});

//here using require-all package iam getting all the APIs here
let routes = require('require-all')({
    dirname: __dirname + '/routes/',
    filter: /(.+Routes)\.js$/,
    recursive: false
  })
//to run loop i need length so using getOwnPropertyNames iam getting routes length
let serviceRoutes = Object.getOwnPropertyNames(routes)

let index
//here based on lenth i am runnig all the APIs
for (index = 0; index < serviceRoutes.length; index++) {
  routes[`${serviceRoutes[index]}`].forEach((route, index) => {
    //add authentication here
    fastify.route(route) //calling each route at one time
  })
}




const start = async () => {
    try {
        await fastify.listen(10000,'0.0.0.0') 
    } catch (error) {
       // console.log(error)
        fastify.log.error(error)
        process.exit(1)
    }
};

start()