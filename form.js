const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'Sql@555',
    database: "mydb"
});
var database_connection_status='';
const path = require('path');

module.exports = connection;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

  

const port = 3000
app.use(express.urlencoded());
app.get('/', function(request, response, next){

	response.sendFile(path.join(__dirname, '/index.html'));

});
app.post('/',function(request,response,next)
{
 var fname =request.body.fname;
 var lname =request.body.lname;
 var email =request.body.email;

connection.connect(function(error){
	if(error)
	{
		database_connection_status = '<h3>MySQL Database is not connected Successfully</h3>';
	}
	else
	{
		database_connection_status = '<h3>MySQL Database is connected Successfully</h3>';
        var sql = "INSERT INTO formSubmit(fname,lname,email) VALUES('"+fname+"','"+lname+"','"+email+"')";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
          });

	}
});
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})