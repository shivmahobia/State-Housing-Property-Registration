const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize ) {
    const attributes = {
        username: { type: DataTypes.STRING, allowNull: true },
        email_id: { type: DataTypes.STRING, allowNull: true },
        mobile_number: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: true },
        img_url: { type: DataTypes.STRING, allowNull: true },
        ApplicantId: { type: DataTypes.STRING, allowNull: true },
        
    };
    

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['password'] }
        },
        
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes,options );
    
}