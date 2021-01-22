import db from '../dbConfig.js';
import Sequelize from 'sequelize';

//Entitatea de student din baza de date
const Student = db.define("Studenti", {
    StudentId: 
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    StudentNume:
    {
        type: Sequelize.STRING,
        allowNull: false,
    },

    StudentPrenume:
    {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

export default Student;
