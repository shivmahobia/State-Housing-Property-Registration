const { DATEONLY } = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        Project_name: { type: DataTypes.STRING, allowNull: true },
        Project_img: { type: DataTypes.STRING, allowNull: true },
        Project_address: { type: DataTypes.STRING, allowNull: true },
        Project_city: { type: DataTypes.STRING, allowNull: true },
        Project_type: { type: DataTypes.STRING, allowNull: true },
        Project_date: { type: DataTypes.STRING, allowNull: true },
        Project_flag:{type:DataTypes.BOOLEAN,allowNull: true}

    };


    return sequelize.define('Project', attributes);
}