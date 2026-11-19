const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'my_database'
})

connection.connect((err) =>{
    if(err){
        console.log(err)
        return ;
    }
    console.log("connection has been created")

    const creationQuery = `create table IF NOT EXISTS students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(20),
    age INT 
    )`    
    connection.execute(creationQuery,(err) =>{
        if(err){
            console.log(err)
            connection.end();
            return;
        }
        console.log("table is created")
    })
})

module.exports = connection;