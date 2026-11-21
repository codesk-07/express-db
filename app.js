const express = require('express')
const db = require(`./utils/db-connection`)
const studentRoutes = require('./routes/studentsRoutes')
const courseRoutes = require('./routes/courseRoute');


 require('./models')

const app = express();
app.use(express.json());



app.get('/',(req,res) =>{
    res.send("Welcome to Student Management API");
})


app.use("/students",studentRoutes);
app.use("/courses",courseRoutes);


db.sync({force:true}).then(()=>{
    app.listen(3000,(err)=>{
        console.log("server is running");
    })
}).catch((err)=>{
    console.log(err);
})
