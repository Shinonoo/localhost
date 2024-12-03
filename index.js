//instantiation
//import express
const express = require("express");
const app = express();

//importing mysql
const mysql = require("mysql");
const cors = require("cors");
const moment= require('moment') 

//if there is a running app in the port
const PORT = process.env.PORT || 5000;

//===========================MYSQL=================================//
//connection to mysql
//methods that will accept objects
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbcompany",
});

//initializing
//using connect method
connection.connect();

//================MIDDLEWARE===================
//for simulation of middleware logger
//all requests accepted by API will be displayed in the console
//before executing the requests by the user it will be forwarded to this logger, if the user is allowed to get the data
const logger = (req, res, next) => {
  //forward the following protocol if it is http or https
  //host - address of who is requesting the data ussually the return value is IP address
  //originalURL of the url for requesting
  //install timestamp package in vscode terminal
  //npm install moment
  //moment - to stamp date of requests
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`)
  next();
  }
  //middleware
  //function
  app.use(logger)
  app.use(express.json())
  app.use(express.urlencoded({extended: false})); //it is normal to use urlencoded the middleware to use
  app.use(cors());

//to manipulate the get, then get the /
//arrow function => the will accept request and response
//creating route that will accept api
//request and response are the parameters
app.get("/api/employee", (req, res) => {
  //create a query function using arrow function, that will accept parameters, error, rows - output and fields
  connection.query("SELECT * FROM tblemployees", (err, rows, fields) => {
    //check if there are errors, then throwing the error
    if (err)
        throw err;
    //if there is no error
    res.json(rows); //response with a json format, default API will be served as JSON espcially if web
  });
});

// //=============================================================
// //using request
// //passing the id parameter
// app.get("/api/employee/:id", (req, res) => {
//   //create a query function using arrow function, that will accept parameters, error, rows - output and fields
//   //variable id
//   //naming convention for id
//   const id = req.params.id;
//   res.send(id);
// });

//=======================USING GET=============================

// //using request
// //passing the id parameter
// app.get("/api/employee/:id", (req, res) => {
//     //create a query function using arrow function, that will accept parameters, error, rows - output and fields
//     //variable id
//     //naming convention for id
//     const id = req.params.id;
//     //to output a prototype in the browser
//     //res.send(id);
   
//     connection.query(
//       `SELECT * FROM tblemployees WHERE userid= '${id}'`,
//       (err, rows, fields) => {
//         //check if  there are errors, then throwing the error
//         if (err)
//           throw err;
//         //check if rows has a value
//         if (rows.length > 0) {
//           //if there is no error
//           res.json(rows); //response with a json format, default API will be served as JSON especially if web
//         } else {
//           //return response status, http protocol
//           //400 bad request
//           //404 page not found
//           //500 server restrictions
//           //etc
//           res.status(400).json({ msg: `${id} id not found!` });
//         }
//       }
//     );
//   });

  //using request
//passing the id parameter
app.get("/api/employee/:id", (req, res) => {
  //create a query function using arrow function, that will accept parameters, error, rows - output and fields
  //variable id
  //naming convention for id
  const id = req.params.id;
  //to output a prototype in the browser
  //res.send(id)
  connection.query(
    `SELECT * FROM tblemployees WHERE userid= ${id}`,
    (err, rows, fields) => {
      //check if there are errors, then throwing the error
      if (err)
        throw err;
     
        //if there is no error
      res.json(rows); //response with a json format, default API will be served as JSON espcially if web
    }
  );
});

//===================POST====================
//CREATING NEW MEMBER
//create an app post
//that will handel URL /api/members
//that will accept callbacks request and response
app.post('/api/employee', (req, res) =>{
  //forward all elements into a variable
  const fname= req.body.firstname;
  const lname= req.body.lastname;
  const address = req.body.address;
  const salary= req.body.salary;
  connection
  query(`INSERT INTO tblemployee (firstname, lastname, adress, salary) VALUES (${fname}${lname}${address}${salary})`,(err, rows, fields) =>{
  //check if  there are errors then throwing the error
  if(err) throw err
  //if successful
  res.json({msg:`Successfully inserted`})
  })
})

//=======================USING GET=============================
//using request
//passing the id parameter
app.get('/api/employee/:id',(req, res) =>{
  //sending a message using send
  //res.send("<H1> Hello World!</H1>")
  //create a query function using arrow function, that will accept parameters, error, rows - output and fields
  //variable id
  //naming convention for id
  const id=req.params.id
  //to output a prototype in the browser
  //res.send(id)
  connection
  .query(`SELECT * FROM tblemployees WHERE userid= '${id}'`,(err, rows, fields) =>{
    //check if  there are errors, then throwing the error
    if(err) throw err
    //check if rows has a value
    if(rows.length > 0){
    //if there is no error
    res.json(rows); //response with a json format, default API will be served as JSON espcially if web
    }else{
    //return response status, http protocol
    //400 bad request
    //404 page not found
    //500 server restrictions
    //etc
    res.status(400).json({msg:`${id} id not found!`})
    }
  })
})

//===================PUT====================
//UPDATING MEMBER
//create an app post
//that will handel URL /api/members
//that will accept callbacks request and response
app.put('/api/employee',(req, res) =>{
  //forward all elements into a variable
  const fname= req.body.firstname;
  const lname= req.body.lastname;
  const address = req.body.address;
  const salary= req.body.salary;

  connection
  .query(`UPDATE tblemployees SET firstname='${fname}', lastname='${lname}', address='${address}', salary='${salary}' WHERE userid='${id}'`,(err, rows, fields) =>{
          //check if  there are errors, then throwing the error
  if(err) throw err
  //if successful
  res.json({msg:`Successfully updated!`})
      })
  })
  
  //specifying public folder
  // app.use(express.static(path.join(__dirname, 'public')))

  //===================DELETE====================
//DELETING MEMBER
//create an app post
//that will handel URL /api/members
//that will accept callbacks request and response
app.delete('/api/employee',(req, res) =>{
  //forward all elements into a variable
  const id=req.body.id;
  //talk about token and certificate for API to access it because its not free to add or delete a record in the database for safe usage instead of passing data in the URL
  connection
  .query(`DELETE FROM tblemployees WHERE userid='${id}'` ,(err, rows, fields) =>{
  //check if  there are errors, then throwing the error
  if(err) throw err
  //if successful
  res.json({msg:`Successfully deleted!`})
  })
})

app.listen(5000, () => {
  console.log(`Server is running in port ${PORT}`);
});