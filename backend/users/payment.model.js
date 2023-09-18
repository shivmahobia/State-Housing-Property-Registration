const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize ) {
    const attributes = {
        Application_id: { type: DataTypes.INTEGER, allowNull: true },
        ApplicantName: { type: DataTypes.STRING, allowNull: true },
        ApplicantPhone_number: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        project: { type: DataTypes.STRING, allowNull: true },
        property: { type: DataTypes.STRING, allowNull: true },
        Quarter: { type: DataTypes.STRING, allowNull: true },
        Quarter_Price: { type: DataTypes.INTEGER, allowNull: true },
        payment_id: { type: DataTypes.STRING, allowNull: true },
        
    };
    

    return sequelize.define('Payment', attributes );
    
}