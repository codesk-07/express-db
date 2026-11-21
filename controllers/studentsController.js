
const db = require('../utils/db-connection')
const Student= require('../models/students');
//const Students = require('../models/students');
const IdentityCard = require('../models/identityCard');

const addEntries = async (req,res)=>{
    try{

            const{name,email} =req.body;
            const student = await Student.create({
                email:email,
                name:name,
                
            });
            res.status(201).send(`User with name: ${name} is created`)
    }
    catch(error){
        res.status(500).send('unable to make an entries');
    }









    //     const insertQuery = `INSERT INTO students (name, email, age) VALUES (?,?,?)`

    // db.execute(insertQuery,[name , email , age],(err)=>{
    //     if(err){
    //         console.log(err.message)
    //         res.status(500).send(err.message);
    //         db.end();
    //         return;
    //     }
    //     console.log("Student has been inserted")
    //     res.status(200).send(`Student with name ${name} succesfully added`);
    // })
}   

const updateEntries = async (req,res)=>{

    try{
         const {id} = req.params;
         const {name, email} =req.body;

         const student = await Student.findByPk(id);
         if(!student){
            res.status(404).send("users is not found");
         }
         student.name = name;
         student.email= email;
         await student.save();

         res.status(200).send("user has been updated");
    }
   
    catch(error){
     res.status(500).send("user cannot be updated");
    }




    // const updateQuery = "UPDATE  students  set name = ? ,email =? where  id =? ";

    // db.execute(updateQuery,[name, email ,id] , (err,result)=>{
    //     if(err){
    //         console.log(err.message);
    //         res.status(500).send(err.message);
    //         db.end();
    //         return ;
        
    //     }
    //     if(result.affectedRows===0){
    //         res.status(404).send("Student not found")
    //         return;
    //     }

    //     res.status(200).send("User has been updated");

    // })
}

    const deleteEntries = async (req,res) =>{

        try{
                const {id} = req.params;
                const student = await Student.destroy({
                    where:{
                        id:id
                    }
                    })
                    if(!student){
                        res.status(404).send("student not found");
                    }
                        res.status(200).send("student delete ");
              

        }
        catch(err){
            console.log(err);
            res.status(500).send("student not delete");
        }


    // const deleteQuery = `DELETE from students where id=?`;
    
    // // db.execute(deleteQuery, [id] , (err,results)=>{
    // // if(err) {
    //     console.log(err.message);
    //     res.status(500).send(err.message);
    //     return;
        
    // }
    // if( results.affectedRows===0){
    //     res.status(404).send("Student is not found ");
    //     return;
    // }
    // res.status(200).send(`User with ${id} is deleted`)
    // })
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



   const addValueToStudentAndIdentityCard = async(req, res)=>{
    try {
        const student = await Student.create(req.body.students)
        const identityCard = await IdentityCard.create({
            ...req.body.identityCard,
            StudentId:student.id
        })

        res.status(200).json(student,identityCard);
    } catch (error) {
        res.status(500).json(error.message);
    }
   }

   module.exports = {
    addEntries,
    updateEntries,
    deleteEntries,
    getStudent,
    getStudentById,
    addValueToStudentAndIdentityCard
}