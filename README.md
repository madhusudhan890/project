# project

Packages Used:
1.Fastify:fastify is a nodejs framework which is same as express with good features
2.mongoose:mongoose is a mongodb library.Mongoose is an Object Document Mapper (ODM). This means that Mongoose allows you to define objects with a strongly-typed schema that is mapped to a MongoDB document
3.require-all:is a package which is used to call all the constructor at a time 
4.dotenv:Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code.


Flow of input from Api:
Routes -> Controllers -> services -> database

Flow of output through apis:
database -> services -> Controllers -> Routes (we if ignore the main server.js file .this is the main flow)

Routes:
These are endpoints of the url.based on the specified request made by the user.In routes that specified route will respond.And here authentication will happen based on accestoken and 
phone number of the user.If the user is valid to get whatever the information he is looking for then we call service functions to give required response

Controllers:
based on response of route.the route will call call the function in the controllers for the response.

services:
from Controllers authentication.Here we fetch the information the user is looking for.(if the information is there in the database)

Database:
Here i store the all details user whenever he is creating a new contact.And also send the details i stored when it is required



