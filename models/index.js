const student = require('./students');
const identityCard = require('./identityCard');
const department = require("./department");
const course = require("./course");
const studentCourses = require("./studentCourses");

//one to one
student.hasOne(identityCard);
identityCard.belongsTo(student);


//one to many
department.hasMany(student);
student.belongsTo(department);

//many to many
student.belongsToMany(course,{through:studentCourses});
course.belongsToMany(student,{through:studentCourses})

module.exports={
    student,
    identityCard,
    department,
        course,
        studentCourses
};