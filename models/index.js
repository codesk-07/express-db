const student = require('./students');
const identityCard = require('./identityCard');


student.hasOne(identityCard);
identityCard.belongsTo(student);

module.exports={
    student,
    identityCard
};