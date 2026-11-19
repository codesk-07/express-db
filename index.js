const express = require('express')
const db = require(`./utils/db-connection`)
const studentRoutes = require('./routes/studentsRoutes')

const app = express();
app.use(express.json());



app.get('/',(req,res) =>{
    res.send("Welcome to Student Management API");
})


app.use("/students",studentRoutes);
app.listen(3000,() =>{
    console.log("server is running")
})