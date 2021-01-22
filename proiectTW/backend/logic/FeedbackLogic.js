import Feedback from '../entities/Feedback.js';

//Functie de validare a datelor
function validateFeedback(feedback){
    if (!feedback || Object.entries(feedback).length === 0)
    return { hasErrors: true, message: "You must provide information about activity" };

if (!feedback.StudentId)
    return { hasErrors: true, message: "Student id is mandatory" };

if (!feedback.Timp)
    return { hasErrors: true, message: "Time is mandatory" };

if (!feedback.CodUnicActivitate)
    return { hasErrors: true, message: "Activity is mandatory" };

if (!feedback.FeedbackTip)
    return { hasErrors: true, message: "Feedback Type is mandatory" };

return { hasErrors: false, message: "" };
}



//Functii pentru operatiile CRUD 
async function createFeedback(feedback){
    let error = validateFeedback(feedback);
    if(error.hasErrors)
        return error;

    return await Feedback.create(feedback);
}

async function getFeedback(){
    return await Feedback.findAll();
}

async function getFeedbackById(id){
    return await Feedback.findByPk(id);
}

async function updateFeedback(id, feedback){
    if(parseInt(id) !== feedback.FeedbackId){
        console.log("Entity id different");
        return;
    }

    let updateEntity = await getFeedbackById(id);

    if(!updateEntity){
        console.log("There isn't a feedback with this id");
        return;
    }

    let error = validateFeedback(feedback);
    if(error.hasErrors)
        return error;

    return await updateEntity.update(feedback);
}


async function deleteFeedback(FeedbackId){
  let deleteElem = await Feedback.findByPk(FeedbackId);

  if (!deleteElem){
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }  


    return await deleteElem.destroy();
 
}


export {getFeedback, getFeedbackById, createFeedback, updateFeedback, deleteFeedback};