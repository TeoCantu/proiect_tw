import db from '../dbConfig.js';
import Sequelize from 'sequelize';

//Entitatea de activitate din baza de date
const Activitate=db.define("Activitate",
{
	CodUnicActivitate:
	{
		type: Sequelize.INTEGER,
        	primaryKey: true,
		allowNull: false
	},
	Descriere:
	{
		type: Sequelize.STRING,
       		allowNull: false
	},
	DataActivitate:
	{
		type: Sequelize.STRING,
		allowNull: false
	},
	Durata:
	{
		type: Sequelize.INTEGER,
		allowNull: false
	},
    ProfesorId: {
        type: Sequelize.INTEGER,
		allowNull: false
    }
});

export default Activitate;
