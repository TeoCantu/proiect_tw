import Sequelize from 'sequelize';

//fisier de configurare a bazei de date
const db = new Sequelize({
    dialect: 'mssql',
    database: 'ProiectTW',
    username: 'sa',
    host: 'localhost',
    port: '55892',
    password: '1234',  
    validateBulkLoadParameters: true,
    define: {
    timestamps: false,
    freezeTableName: true
    }  
})

export default db;