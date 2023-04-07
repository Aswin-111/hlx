const db = require ('mysql2');

const connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass@123',
    database: 'hlx'
  });
// customer table
  // connection.query(
  //   'CREATE TABLE Customers (Id INT PRIMARY KEY AUTO_INCREMENT,Name VARCHAR(255),Mobile VARCHAR(255),Address VARCHAR(255),City VARCHAR(255),State VARCHAR(255),Email VARCHAR(255) UNIQUE,Password VARCHAR(255),Role VARCHAR(255))',
  //   function(err, results) {
        
  //       console.log(err);
  //     console.log(results); // results contains rows returned by server
     
  //   }
  // );
//   customer dummy data
//   connection.query(
//     `INSERT INTO Customers (Name ,Mobile,Address,City,State,Email,Password) 
//     VALUES('sayana','9564856245','address illaaaaa','alappuzha','kerala','nandhu@gmail.com','sayana@123')`,
//     function(err, results) {
        
//         console.log(err);
//       console.log(results); // results contains rows returned by server
     
//     }
//   );

//customer read data
// connection.query(
//     `SELECT * FROM Customers`,
//     function(err, results) {
        
//         console.log(err);
//       console.log(results); // results contains rows returned by server
     
//     }
//   );

// vendor 


connection.query(
    'CREATE TABLE Vendors (Id INT PRIMARY KEY AUTO_INCREMENT,Name VARCHAR(255),Mobile VARCHAR(255),Address VARCHAR(255),City VARCHAR(255),State VARCHAR(255),Qualification VARCHAR(255),Experience VARCHAR(255),Email VARCHAR(255) UNIQUE,Password VARCHAR(255),Role VARCHAR(255))',
     function(err, results) {
        
        console.log(err);
      console.log(results); // results contains rows returned by server
     
    }
  );
  connection.end()