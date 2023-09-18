const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        
        id:{type: DataTypes.INTEGER, allowNull: true },
        P_id:{type: DataTypes.INTEGER, allowNull: false,primaryKey:true },
        Property_type: { type: DataTypes.STRING, allowNull: true },
        Property_available : { type: DataTypes.INTEGER, allowNull: true },
        Property_flag:{type:DataTypes.BOOLEAN,allowNull: true}

   
        
    };

    return sequelize.define('Property', attributes);
}