//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming


// **************************************************************************
// Define "type": "module" (ES6) in package.json to use "import" statements

// Express is a Web Server that sits on top of Node.js 
import express from "express";

// The Path Module in Node.js provides the utilities for working with file and directory paths.
import path from "path";


//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
import bodyParser from "body-parser";



// is used to resolve a sequence of path-segments to an absolute path.
const __dirname = path.resolve(path.dirname(""));



// Define Express as a variable
const app = express();
// Define the port no.
const port = 3000;

// responsible for parsing the incoming request bodies in a middleware before you handle it
app.use(bodyParser.urlencoded({ extended: true })); 

// Alternatively we can use express. No need to - import bodyParser from "body-parser";
// app.use(express.urlencoded({ extended: true })); 



// Custom Middleware Function
const myLogger = function (req, res, next) {
    console.log("logged");
    req.requestTime = Date.now()
    next();
}

// mount Custom Middleware to be used in this file
app.use(myLogger);





/* Route definition takes the following structure: app.METHOD(PATH, HANDLER)
app - is an instance of express.
METHOD - is an HTTP request method, in lowercase. (e.g. GET, POST, PUT, etc)
PATH - is a path on the server. (e.g. "/", "/Submit", etc)
HANDLER - is the function executed when the route is matched. (e.g. (req, res) => {})*/
app.get("/home", (req, res) => {
    let responseText = 'Hello World!<br>'
    responseText += `<small>Requested at: ${req.requestTime}</small>`
    res.send(responseText)
});



// This app starts a server and listens on port 3000 for connections. 
// The app responds with “Hello World!” 
app.listen(port, () => {
    console.log("Listening on port localhost:3000")
});


// this POST route is being called from index.html form
app.post("/check", (req, res) => {
    console.log(req.body.password);
    let password = req.body.password;
    if (password === "ILoveProgramming") {
        res.sendFile(path.join(__dirname, "public/secret.html"));
        console.log(__dirname, "public/secret.html");
    } else {
        res.send(`Incorrect Password: <button onclick="window.location.href='http://localhost:3000'">Try Again</button>`);
    } 
});

// serves the first (default) static file
app.use(express.static('public'));

















