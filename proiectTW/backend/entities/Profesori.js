import db from '../dbConfig.js';
import Sequelize from 'sequelize';

//Entitatea de profesor din baza de date
const Profesor = db.define("Profesori", {
    ProfesorId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    ProfesorNume:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    ProfesorPrenume:
    {
        type: Sequelize.STRING,
        allowNull: false
    }

})

export default Profesor;