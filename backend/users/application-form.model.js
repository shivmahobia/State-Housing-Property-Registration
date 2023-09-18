const { DATEONLY } = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        
        ApplicantId: { type: DataTypes.INTEGER, allowNull: true,primaryKey: true},
        Applicant_name: { type: DataTypes.STRING, allowNull: true },
        FatherHusband_name: { type: DataTypes.STRING, allowNull: true },
        DateOfBirth: { type: DataTypes.STRING, allowNull: true },
        Applicant_age: { type: DataTypes.STRING, allowNull: true },
        Mobile_number: { type: DataTypes.STRING, allowNull: true },
        Email_id: { type: DataTypes.STRING, allowNull: true },
        ContactHome_number: { type: DataTypes.STRING, allowNull: true },
        ContactOffice_number: { type: DataTypes.STRING, allowNull: true },
        Correspondence_address: { type: DataTypes.STRING, allowNull: true },
        Permanent_address: { type: DataTypes.STRING, allowNull: true },
        Profession: { type: DataTypes.STRING, allowNull: true },
        AnnualIncome: { type: DataTypes.STRING, allowNull: true },
        BankName: { type: DataTypes.STRING, allowNull: true },
        AccountNumber: { type: DataTypes.STRING, allowNull: true },
        BranchName: { type: DataTypes.STRING, allowNull: true },
        IfscCode: { type: DataTypes.STRING, allowNull: true },
        Category: { type: DataTypes.STRING, allowNull: true },


        Nominee_name: { type: DataTypes.STRING, allowNull: true },
        Nominee_age: { type: DataTypes.STRING, allowNull: true },
        Nominee_number: { type: DataTypes.STRING, allowNull: true },
        Nominee_relation: { type: DataTypes.STRING, allowNull: true },
        Nominee_address: { type: DataTypes.STRING, allowNull: true },


        PhotoUrl: { type: DataTypes.STRING, allowNull: true },
        SignatureUrl: { type: DataTypes.STRING, allowNull: true },
        IdentityDocument: { type: DataTypes.STRING, allowNull: true },
        IdentityDocumentNumber: { type: DataTypes.STRING, allowNull: true },
        IdentityUrl: { type: DataTypes.STRING, allowNull: true },
        AddressDocumentNumber: { type: DataTypes.STRING, allowNull: true },
        AddressDocument: { type: DataTypes.STRING, allowNull: true },
        AddressUrl: { type: DataTypes.STRING, allowNull: true },
        IncomeUrl: { type: DataTypes.STRING, allowNull: true },
        CasteUrl: { type: DataTypes.STRING, allowNull: true },


        //BOOKING DETAILS OF USER

        Project_Data: { type: DataTypes.STRING, allowNull: true },
        Property_Data: { type: DataTypes.STRING, allowNull: true },
        Quarter_Data: { type: DataTypes.STRING, allowNull: true },
        Quarter_Price: { type: DataTypes.STRING, allowNull: true }


 

    };


    return sequelize.define('Application-Form', attributes);
}