const express = require("express");
const cors = require('cors');
const app = express();
const path = require("path");
const jwt = require('jsonwebtoken')
const auth = require('./middleware/auth')
const services = require('./services');
const secret_key = require('./key')
const db = require ('mysql2');

const connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass@123',
    database: 'hlx'
  });

let database = {
    username:"sayana",
    password:"sayana@123"
}
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth)
app.get("/", function (req, res) {
  res.send("<h1>Home page</h1>");
});

app.get("/about", function (req, res) {
  res.send("<h1>About page<h1>");
});
app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/login", function (req, res) {
  console.log('in /login');
  // console.log(req.body.username)
  connection.query(
    `SELECT * FROM Users WHERE Email = '${req.body.username}'`,
    function(err, results) {
      if(err){
        return res.json({message:"Something went wrong!",status:false})
       }
       

      // [
      //   {
      //     id: 5,
      //     Name: 'ben10',
      //     Mobile: 4578524178,
      //     Address: 'ben villa',
      //     City: 'benten',
      //     State: 'england',
      //     Qualification: 'Plus two',
      //     Service: 'carpenting',
      //     Experience: '5 yrs',
      //     Email: 'ben@gmail.com',
      //     Password: 'ben12345',
      //     Role: 'Vendor'
      //   }
      // ]
       if(results.length != 0){

        // console.log(results)
        if(req.body.password === results[0].Password){
          const token = jwt.sign({ userdata:results[0] }, "supersecret");
          return res.json({status:true,token})
        }
        else{
          return res.json({message:"Username or password is incorrect",status : false});
        }
       }
       else{
       return res.json({message:"Username or password is incorrect",status : false}); 
       }
   
    }
      );
  // if(req.body.username === database.username && req.body.password === database.password){
  //   return res.json({message:"login successful",action :true})
  // }
  // else{
  //   return res.json({message:"Username or password is incorrect",action : false});
  // }

});



app.get('/services',function (req,res){
  connection.query(
    `SELECT * FROM Services`,
    function(err, results) {
      // console.log(err);
      // console.log(results)
      if(err){
        return res.status(400).json({message:"Something went wrong!",status:false})
       }
       if(results){
        return res.status(200).json({data:results,status:true})
       }
    }
      );
})
app.post('/register/customer',function (req,res){
 let registerDetails = req.body.data;
 connection.query(
  `SELECT * FROM Customers WHERE Email = "${registerDetails.email}"`,
  function(err, results) {
  if(results && results.length === 0){
      connection.query(
    `INSERT INTO Customers (Name,Mobile,Address,City,State,Email,Password,Role) 
    VALUES('${registerDetails.name}','${registerDetails.mobile}','${registerDetails.address}','${registerDetails.city}','${registerDetails.state}','${registerDetails.email}','${registerDetails.password}','Customer')`,
    function(err, results2) {
        
       if(err){
        return res.status(400).json({message:"Something went wrong!",status:false})
       }
       if(results2){
        return res.status(200).json({message:"User registered successfully",status:true})
       }
      //console.log(results2); // results contains rows returned by server
     
    } 
      );
  }
  else{
    return res.status(404).json({message:"User has already registered. Please login",status:false})
  }
   
  }
);
})
app.post('/addservice',function (req,res){
  // { title: 'Saloon', desc: 'qwerty', data: 'wyefyuyaefw' }
  //console.log(req.body);
  connection.query(
    `INSERT INTO Services (Title,Description,Image)
    VALUES('${req.body.title}','${req.body.desc}','${req.body.data}')`,
    function(err, results2) {
        
       if(err){
        return res.status(400).json({message:"Service already exists int the database",status:false})
       }
       if(results2){
        return res.status(200).json({message:"Service added successfully",status:true})
       }
      //console.log(results2); // results contains rows returned by server
     
    } 
      );
  
  
})
app.post('/register/vendor',function (req,res){
  let registerDetails = req.body.data;
  connection.query(
   `SELECT * FROM Vendor WHERE Email = "${registerDetails.email}"`,
   function(err, results) {
    //console.log(results);
   if(results && results.length === 0){
       connection.query(
     `INSERT INTO Vendors (Name,Mobile,Address,City,State,Qualification,Experience,Email,Password,Role) 
     VALUES('${registerDetails.name}','${registerDetails.mobile}','${registerDetails.address}','${registerDetails.city}','${registerDetails.state}',
     '${registerDetails.qualification}'
     ,
     
     '${registerDetails.experience}','${registerDetails.email}','${registerDetails.password}'),'Vendor'`,
     function(err, results2) {
         
        if(err){
         return res.status(400).json({message:"Something went wrong!",status:false})
        }
        if(results2){
         return res.status(200).json({message:"User registered successfully",status:true})
        }
       //console.log(results2); // results contains rows returned by server
      
     } 
       );
   }
   else{
     return res.status(404).json({message:"User has already registered. Please login",status:false})
   }
    
   }
 );
 });


app.get('/admin/users',function (req,res){
  connection.query(
    `SELECT * FROM Customers`,
    function(err, results) {
      let copylist = [...results] ;
      if(results.length){
      

        return res.json({data:copylist});
      }
    }
      );

})



app.get('/servicedetails/:service',function (req,res){
  // console.log(req.params.service)
  function getVendor(){
    return new Promise(function (res,rej){
      connection.query(
        `SELECT * FROM Services WHERE Title = '${req.params.service}'`,
        function(err1, results1) {
          connection.query(
            `SELECT * FROM Vendors WHERE Service = '${req.params.service}'`,
            function(err2, results2) {
            console.log(results1,results2,'line ')
              if(results1 && results1.length > 0 && results2 && results2.length > 0){
                  res([...results1,[...results2]])
              }
              else{
                rej("Something went wrong")
              }
            }
              );
        }
          );
    })
  }
  getVendor().then(function(result){
    return res.status(200).json({data:result,status:true})
  }).catch(function (err){
    return res.status(400).json({message:err,status:false})
  })
  // connection.query(
  //   `SELECT * FROM Services WHERE Title = '${req.params.service}'`,
  //   function(err, results) {

    
  //     if(err){
  //       return res.status(400).json({message:"Something went wrong!",status:false})
  //      }
  //      if(results){
  //       return res.status(200).json({data:results,status:true})
  //      }
  //   }
  //     );
})
app.listen(5000, function () {
  console.log("Server started successfully at port 5000");
});
