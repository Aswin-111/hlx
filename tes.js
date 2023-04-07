const db = require ('mysql2');

const connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pass@123',
    database: 'hlx'
  });

const datalist = require('./services')
//customer read data
const data = [
  {
    Id: 1,
    Name: 'superman',
    Mobile: '7777777777',
    Address: 'krypton',
    City: 'kryptic',
    State: 'kepler',
    Email: 'superman@gmail.com',
    Password: 'superman@123'
  },
  {
    Id: 2,
    Name: 'batman',
    Mobile: '8888888888',
    Address: 'batland',
    City: 'gotham',
    State: 'la',
    Email: 'batman@gmail.com',
    Password: 'bat@123'
  },
  {
    Id: 3,
    Name: 'mickey',
    Mobile: '907776545',
    Address: 'mickey house',
    City: 'disney land',
    State: 'la',
    Email: 'mickey@gmail.com',
    Password: 'mickey@123'
  },
  {
    Id: 4,
    Name: 'oswald',
    Mobile: '9900666986',
    Address: 'oswalds',
    City: 'oswa',
    State: 'oswalder',
    Email: 'oswal@gmail.com',
    Password: 'oswald@123'
  },
  {
    Id: 5,
    Name: 'ben10',
    Mobile: '4578524178',
    Address: 'ben villa',
    City: 'benten',
    State: 'england',
    Email: 'ben@gmail.com',
    Password: 'ben12345'
  }
]


let copylist = [];

// connection.query(
//   `CREATE TABLE Users(Name,Mobile,Address,City,State,Qualification,Service VARCHAR(255),Experience TINYINT,Email VARCHAR(255) NOT NULL UNIQUE,Password VARCHAR(255),Role VARCHAR(255) NOT NULL)`,
//   function(err, results) {
//     console.log(err);
//     console.log(results)
//   }
//     );
function getVendor(){
  return new Promise(function (res,rej){
    connection.query(
      `SELECT * FROM Services WHERE Title = 'carpenting'`,
      function(err1, results1) {
        connection.query(
          `SELECT * FROM Vendors WHERE Service = 'carpenting'`,
          function(err2, results2) {
            // console.log(results2)
            if(results1.length > 0 && results2.length > 0){
                res([...results1,...results2])
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
// getVendor().then(function(result){
//   console.log(result)
// }).catch(function (err){
//   console.log(err)
// })

[
  {
    id: 1,
    Name: 'superman',
    Mobile: 7777777777,
    Address: 'krypton',
    City: 'kryptic',
    State: 'kepler',
    Qualification: '',
    Service: '',
    Experience: '',
    Email: 'superman@gmail.com',
    Password: 'superman@123',
    Role: 'Customer'
  },
  {
    id: 2,
    Name: 'batman',
    Mobile: 8888888888,
    Address: 'batland',
    City: 'gotham',
    State: 'la',
    Qualification: '',
    Service: '',
    Experience: '',
    Email: 'batman@gmail.com',
    Password: 'bat@123',
    Role: 'Customer'
  },
  {
    id: 3,
    Name: 'mickey',
    Mobile: 907776545,
    Address: 'mickey house',
    City: 'disney land',
    State: 'la',
    Qualification: '',
    Service: '',
    Experience: '',
    Email: 'mickey@gmail.com',
    Password: 'mickey@123',
    Role: 'Customer'
  },
  {
    id: 4,
    Name: 'oswald',
    Mobile: 9900666986,
    Address: 'oswalds',
    City: 'oswa',
    State: 'oswalder',
    Qualification: 'sslc',
    Service: 'carpenting',
    Experience: '3 yrs',
    Email: 'oswal@gmail.com',
    Password: 'oswald@123',
    Role: 'Vendor'
  },
  {
    id: 5,
    Name: 'ben10',
    Mobile: 4578524178,
    Address: 'ben villa',
    City: 'benten',
    State: 'england',
    Qualification: 'Plus two',
    Service: 'carpenting',
    Experience: '5 yrs',
    Email: 'ben@gmail.com',
    Password: 'ben12345',
    Role: 'Vendor'
  },
  {
    id: 6,
    Name: 'dragon',
    Mobile: 7485964569,
    Address: 'dragon fam',
    City: 'dragoo',
    State: 'dragous',
    Qualification: 'Plus two',
    Service: 'plumbing',
    Experience: '5 yrs',
    Email: 'dragon@gmail.com',
    Password: 'dragon123',
    Role: 'Vendor'
  },
  {
    id: 9,
    Name: 'Joker',
    Mobile: 4532456789,
    Address: '',
    City: '',
    State: '',
    Qualification: '',
    Service: '',
    Experience: '',
    Email: 'joker@gmail.com',
    Password: 'joker123',
    Role: 'Admin'
  }
]
connection.query(
  `SELECT * FROM Users`,
  function(err, results) {
    console.log(err);
    console.log(results)
  }
    );
//     connection.query(
//   `CREATE TABLE Services(id INT PRIMARY KEY AUTO_INCREMENT,Title VARCHAR(255) UNIQUE,Description VARCHAR(255),Image VARCHAR(255))`,
//   function(err, results) {
//     console.log(err);
//     console.log(results)
//   }
//     );
      // connection.query(
      //   `CREATE TABLE Vendors(id INT PRIMARY KEY AUTO_INCREMENT,Name VARCHAR(255),Mobile BIGINT UNIQUE,Address VARCHAR(255),City VARCHAR(255),State VARCHAR(255),Qualification VARCHAR(255),Service VARCHAR(255),Experience TINYINT,Email VARCHAR(255),Password VARCHAR(255))`,
      //   function(err, results) {
      //     console.log(err);
      //     console.log(results)
      //   }
      //     );

        //   connection.query(
        // `CREATE TABLE Users(id INT PRIMARY KEY AUTO_INCREMENT,Name VARCHAR(255),Mobile BIGINT,Address VARCHAR(255),City VARCHAR(255),State VARCHAR(255),Qualification VARCHAR(255),Service VARCHAR(255),Experience VARCHAR(255),Email VARCHAR(255) NOT NULL UNIQUE,Password VARCHAR(255),Role VARCHAR(255) NOT NULL)`,
        // function(err, results) {
        //   console.log(err);
        //   console.log(results)
        // }
        //   );
      // datalist.forEach(function (i){
      //   connection.query(
      //     `INSERT INTO Services(Title,Description,Image) VALUES('${i.service}','${i.tagline}','${i.image}')`,
      //     function(err, results) {
      //       console.log(err);
      //       console.log(results)
      //     }
      //       );
      //   })
      
     /*  connection.query(
        `INSERT INTO Users(Name,Mobile ,Address ,City,State,Qualification,Service,Experience,Email,Password,Role) 
        VALUES('dragon','7485964569','dragon fam','dragoo','dragous','Plus two','plumbing','5 yrs','dragon@gmail.com','dragon123','Vendor')`,
        function(err, results) {
          console.log(err);
          console.log(results)
        }
          ) */;
          
          
          
      // connection.query(
      //       `INSERT INTO Users(Name,Mobile,Address,City,State,Qualification,Service,Experience,Email,Password,Role) 
      //       VALUES('Joker','4532456789','','','','','','','joker@gmail.com','joker123','Admin')`,
      //       function(err, results) {
      //         console.log(err);
      //         console.log(results)
      //       }
      //         ); 

   
      
  // connection.end()