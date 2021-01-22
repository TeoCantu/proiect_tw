import Profesor from '../entities/Profesori.js';
import Activitate from '../entities/Activitate.js';


//Relatii intre tabele 
Profesor.hasMany(Activitate, {as: "Activitati", foreignKey: "ProfesorId"});
Activitate.belongsTo(Profesor, {foreignKey: "ProfesorId"});


//Functie de validare a datelor
function validateProfesor(profesor){
    if (!profesor || Object.entries(profesor).length === 0)
    return { hasErrors: true, message: "You must provide information about teacher" };

if (!profesor.ProfesorNume)
    return { hasErrors: true, message: "Name is mandatory" };

if (!profesor.ProfesorPrenume)
    return { hasErrors: true, message: "First name is mandatory" };

return { hasErrors: false, message: "" };
}


//Functii pentru operatiile CRUD 
async function createProfesor(profesor){

    let error = validateProfesor(profesor);
    if(error.hasErrors)
        return error;

    return await Profesor.create(profesor, {
        include: [
            {model: Activitate, as: "Activitati"}             
        ]
    });
}

async function getProfesor(){
    return await Profesor.findAll(
        {              
            include: [
               {model: Activitate, as: "Activitati"}
            ]
        }
    )
}

async function getProfesorById(id){
    return await Profesor.findByPk(id);
}

async function updateProfesor(id, profesor){
    if(parseInt(id) !== profesor.ProfesorId){
        console.log("Entity id different");
        return;
    }

    let updateEntity = await getProfesorById(id);

    if(!updateEntity){
        console.log("There isn't a profesor with this id");
        return;
    }

    let error = validateProfesor(profesor);
    if(error.hasErrors)
        return error;
        
    return await updateEntity.update(profesor);
}


async function deleteProfesor(ProfesorId){
  let deleteElem = await Profesor.findByPk(ProfesorId);

  if (!deleteElem){
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }  

  try{
      return await deleteElem.destroy();
  }catch(e){
      if (e.message.includes("FK_Activitate_Profesor"))
          return "This entity is already in use, so it cannot be deleted any more";
      else
        throw(e)
  }
}

export {getProfesor, getProfesorById, createProfesor, updateProfesor, deleteProfesor};