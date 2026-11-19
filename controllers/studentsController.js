
const db = require('../utils/db-connection')

const addEntries = (req,res)=>{
    const{name,email,age} =req.body;
    const insertQuery = `INSERT INTO students (name, email, age) VALUES (?,?,?)`

db.execute(insertQuery,[name , email , age],(err)=>{
    if(err){
        console.log(err.message)
        res.status(500).send(err.message);
        db.end();
        return;
    }
    console.log("Student has been inserted")
    res.status(200).send(`Student with name ${name} succesfully added`);
})
}   

const updateEntries = (req,res)=>{
    const {id} = req.params;
    const {name, email} =req.body;

    const updateQuery = "UPDATE  students  set name = ? ,email =? where  id =? ";

    db.execute(updateQuery,[name, email ,id] , (err,result)=>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return ;
        
        }
        if(result.affectedRows===0){
            res.status(404).send("Student not found")
            return;
        }

        res.status(200).send("User has been updated");

    })
}

    const deleteEntries = (req,res) =>{
    const {id} = req.params;
    const deleteQuery = `DELETE from students where id=?`;
    
    db.execute(deleteQuery, [id] , (err,results)=>{
    if(err) {
        console.log(err.message);
        res.status(500).send(err.message);
        return;
        
    }
    if( results.affectedRows===0){
        res.status(404).send("Student is not found ");
        return;
    }
    res.status(200).send(`User with ${id} is deleted`)
    })
   }

   const getStudent = (req, res) =>{
    const getStudentQuery = `Select * from students`;
    db.execute(getStudentQuery ,(err,result) =>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
        }
        return res.status(200).json(result);
    })
   }
   

   const getStudentById = (req, res) =>{
    const {id} = req.params;
    const getStudentByIdQuery = `Select * from students where id=?`;
    db.execute(getStudentByIdQuery,[id] , (err,result) =>{
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
        }
              if (result.length === 0) {
            return res.status(404).send('Student not found');
        }
                return res.status(200).json(result[0]);
    })

   }

   module.exports = {
    addEntries,
    updateEntries,
    deleteEntries,
    getStudent,
    getStudentById
}