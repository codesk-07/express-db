const {Sequelize,DataTypes} = require("sequelize");
const sequelize = require("../utils/db-connection");

const IdentityCard = sequelize.define(
    'identityCard', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:true
    },
    cardNo:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true
    }
})
module.exports = IdentityCard;