const tedious = require('tedious');
const { Sequelize } = require('sequelize');

const { dbName, dbConfig } = require('config.json');

module.exports = db = {};

initialize();

async function initialize() {
    const dialect = 'mssql';
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;

    // create db if it doesn't already exist
    await ensureDbExists(dbName);

    // connect to db
    const sequelize = new Sequelize(dbName, userName, password, { host, dialect });

    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);

    db.Property = require('../users/property.model')(sequelize);

    db.Project = require('../users/project.model')(sequelize);

    db.Quarter = require('../users/Quarters.model')(sequelize);
    
    db.ApplicationForm = require('../users/application-form.model')(sequelize);

    db.Payment = require('../users/payment.model')(sequelize);




    // sync all models with database
 


    //create database and table

                                        await sequelize.sync({ alter: true });

    
    //create database and table
}

async function ensureDbExists(dbName) {
    
    return new Promise((resolve, reject) => {
        const connection = new tedious.Connection(dbConfig);
        connection.connect((err) => {
            if (err) {
                console.error(err);
                reject(`Connection Failed: ${err.message}`);
            }

            const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
            const request = new tedious.Request(createDbQuery, (err) => {
                if (err) {
                    console.error(err);
                    reject(`Create DB Query Failed: ${err.message}`);
                }

                // query executed successfully
                resolve();
            });

            connection.execSql(request);
        });
    });
}
