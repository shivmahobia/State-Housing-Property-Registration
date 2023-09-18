const { DATEONLY } = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        Q_id: { type: DataTypes.INTEGER, allowNull: true ,primaryKey: true},
        P_id: { type: DataTypes.INTEGER, allowNull: true ,primaryKey: true},
        Quarters: { type: DataTypes.STRING, allowNull: true },
        Quarters_Price: { type: DataTypes.STRING, allowNull: true },
        Booking_flag:{type:DataTypes.BOOLEAN,allowNull: true}

       

    };


    return sequelize.define('Quarter', attributes);
}