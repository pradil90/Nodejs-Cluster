var mysql      = require('mysql');
var connection = mysql.createConnection({
                                        host     : 'localhost',
                                        user     : 'root',
                                        password : '',
                                        database : 'historyDB'
                                        });

connection.connect();


connection.query('select * from reg_object', function(err, rows, fields) {
                 if (!err)
                 console.log('The solution is: ', rows);
                 else
                 console.log('Error while performing Query.', err);
                 });

connection.end();