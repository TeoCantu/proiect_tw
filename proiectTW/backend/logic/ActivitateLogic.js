import Activitate from '../entities/Activitate.js';
import Feedback from '../entities/Feedback.js';


//Relatii intre tabele 

Activitate.hasMany(Feedback, {as: "FeedbackuriActivitate", foreignKey: "CodUnicActivitate"});
Feedback.belongsTo(Activitate, {foreignKey:"CodUnicActivitate"});

//Functie de validare a datelor
function validateActivitate(activitate){
    if (!activitate || Object.entries(activitate).length === 0)
    return { hasErrors: true, message: "You must provide information about activity" };

if (!activitate.Descriere)
    return { hasErrors: true, message: "Description is mandatory" };

if (!activitate.DataActivitate)
    return { hasErrors: true, message: "Date is mandatory" };

if (!activitate.ProfesorId)
    return { hasErrors: true, message: "Prof id is mandatory" };

if(!activitate.Durata)
    return { hasErrors: true, message: "Durata is mandatory" };

return { hasErrors: false, message: "" };
}

//Functii pentru operatiile CRUD 

async function createActivitate(activitate){
    let error = validateActivitate(activitate);
    if(error.hasErrors)
        return error;

    return await Activitate.create(activitate, {
        include: [
            {model: Feedback, as: "FeedbackuriActivitate"}
        ]
    });
}

async function getActivitate(){
    return await Activitate.findAll(
        {
            include: [
                {model: Feedback, as: "FeedbackuriActivitate"}
            ]
        }
    )
}

async function getActivitateByCodUnicActivitate(CodUnicActivitate){
    return await Activitate.findByPk(CodUnicActivitate)
}

async function updateActivitate(id, activitate){
    if(parseInt(id) !== activitate.CodUnicActivitate){
        console.log("Entity CodUnicActivitate diff");
        return;
    }

    let updateEntity = await getActivitateByCodUnicActivitate(id);

    if(!updateEntity){
        console.log("There isn't an activity with this id");
        return;
    }

    let error = validateActivitate(activitate);
    if(error.hasErrors)
        return error;
        
    return await updateEntity.update(activitate);
}


async function deleteActivitate(CodUnicActivitate){
    let deleteElem = await Activitate.findByPk(CodUnicActivitate);

    if(!deleteElem){
        console.log("This element does not existm, so it cannot be deleted!");
        return;
    }

    try{
        return await deleteElem.destroy();
    } catch(e){
        if(e.message.includes("FK_Feedback_Activitate"))
          return "This entity is already in use, so it cannot be deleted any more";
        else
          throw(e)
    }
}

export {getActivitate, getActivitateByCodUnicActivitate, createActivitate, updateActivitate, deleteActivitate};