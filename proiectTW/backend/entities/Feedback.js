import db from '../dbConfig.js';
import Sequelize from 'sequelize';

//Entitatea de feedback din baza de date
const Feedback = db.define("Feedback", {
    FeedbackId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    StudentId:
    {
       type: Sequelize.INTEGER,
       allowNull: false 
    },

    Timp: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    CodUnicActivitate:
    {
       type: Sequelize.INTEGER,
       allowNull: false 
    },

    FeedbackTip:
    {
       type: Sequelize.STRING,
       allowNull:false
    }

})
export default Feedback;
