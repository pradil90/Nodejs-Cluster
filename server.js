var express = require('express');
var app = express();
var mysql = require('mysql');
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var crypto = require('crypto');
var db = require('./database.js');
var fs = require('fs');
var md5 = require('MD5');


var shasum = crypto.createHash('sha1');

var result = db.bar;
// console.log(result);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/form', function(req, res){
   html = fs.readFileSync("registration.html", "utf8");
        res.send(html);
});

app.get('/regKit_Library.js', function(req, res){
   script = fs.readFileSync("regKit_Library.js", "utf8");
        res.send(script);
});

app.post('/', function (req, res) {
  console.log(req.body);
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.json(req.body);
  res.json(result);
});

/*
Initiating Database connection with credentials and creating object
*/


function BD(){
  var connection = mysql.createConnection(
   {user: 'root', password: '',host: 'localhost',port: 3306,database: 'historyDB'}); return connection; }


/*
Handler for POST request for inserting data

Client Type: AJAX request
*/

app.post("/sqlstorage/insert", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
      var objBD = BD();

      var post={FirstName:req.body.fname,LastName:req.body.lname,Email:req.body.email,Password1:req.body.pass,RePassword1:req.body.repass,SSN:req.body.ssn,PhoneNum:req.body.phone,CreditNum:req.body.credit};

 console.log(post);

  objBD.query('INSERT INTO reg_object SET ?', post, function(error){
    if(error){

      console.log(error.message);
    }else{
      console.log('succes');

    }
  });
});


/*
Handler for GET request for querying SQL database to fetch User object

Client Type: AJAX request
*/

app.get("/sqlstorage/select", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
      var objBD = BD();


    objBD.query('SELECT * FROM reg_object', function(err, rows, fields)   
{  
  if (err) throw err;  
  
  console.log(rows[0]); 
  
  res.send(rows[0]); 
});  


  });


/*
Handler for POST request for inserting data in JSON format

Client Type: AJAX request
*/

app.post("/JSONsqlstorage/insert", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
      var objBD = BD();

      

      var result = req.body.JSONobject;
      var form1=[];
      var form1=JSON.parse(result);

      // var s1 = form1[0].username;

      //       s1.on('data', function(d) {
      //         shasum.update(d);
      //       });

      //       s1.on('end', function() {
      //         var d = shasum.digest('hex');
      //         console.log(d + '  ' + s1);
      //       });

      // var result=JSON.parse(post);

      
      var hash_fuser = md5(form1[0].username);
      var hash_luser = md5(form1[0].lastuser);
      var hash_email = md5(form1[0].email);
      var hash_password = md5(form1[0].pass);
      var hash_sex = md5(form1[0].sex);
      var hash_age = md5(form1[0].age);
      var hash_credit = md5(form1[0].creditnum);


      var post={FirstName:hash_fuser,
                LastName:hash_luser,
                Email:hash_email,
                Password1:value=hash_password,
                RePassword1:hash_password,
                Sex:hash_sex,
                Age:hash_age,
                SSN:form1[0].ssn,
                PhoneNum:form1[0].phone,
                CreditNum:hash_credit};

  objBD.query('INSERT INTO reg_object SET ?', post, function(error){
    if(error){

      console.log(error.message);
    }else{
      console.log('succes');
      res.send("User Data Saved Successfully")

    }
  });

});


/*
Handler for GET request for querying SQL database to fetch User object in JSON format

Client Type: AJAX request
*/

app.get("/JSONsqlstorage/select", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
      var objBD = BD();


    objBD.query('SELECT * FROM reg_object', function(err, rows, fields)   
{  
  if (err) throw err;  
  
  console.log(rows[0]); 
    console.log("Ivan da");
  
  var rowresult = rows[0];
  var JSONresult = JSON.stringify(rowresult);
  console.log(JSONresult); 
  res.send(JSONresult); 
});  


  });


// var filename = process.argv[2];
// var crypto = require('crypto');


// var shasum = crypto.createHash('sha1');

// var s = fs.ReadStream(filename);
// s.on('data', function(d) {
//   shasum.update(d);
// });

// s.on('end', function() {
//   var d = shasum.digest('hex');
//   console.log(d + '  ' + filename);
// });

app.listen(3000);









