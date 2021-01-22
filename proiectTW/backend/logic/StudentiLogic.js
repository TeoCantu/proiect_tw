import Student from '../entities/Studenti.js';
import Feedback from '../entities/Feedback.js';


//Relatii intre tabele 
Student.hasMany(Feedback, {as: "FeedbackuriStudent", foreignKey: "StudentId"});
Feedback.belongsTo(Student, {foreignKey: "StudentId"});

//Functie de validare a datelor
function validateStudent(student){
    if (!student || Object.entries(student).length === 0)
    return { hasErrors: true, message: "You must provide information about student" };

if (!student.StudentNume)
    return { hasErrors: true, message: "Name is mandatory" };

if (!student.StudentPrenume)
    return { hasErrors: true, message: "First name is mandatory" };

return { hasErrors: false, message: "" };
}


//Functii pentru operatiile CRUD
async function createStudent(student){
    let error = validateStudent(student);
    if(error.hasErrors)
        return error;

    return await Student.create(student, {
        include: [
            {model: Feedback, as: "FeedbackuriStudent"}
        ]
    });
}


async function getStudent(){
    return await Student.findAll(
        {              
            include: [
               {model: Feedback, as: "FeedbackuriStudent"}
            ]
        }
    )
}

async function getStudentById(id){
    return await Student.findByPk(id);
}

async function updateStudent(id, student){
    if(parseInt(id) !== student.StudentId){
        console.log("Entity id diff");
        return;
    }

    let updateStudent = await getStudentById(id);
    if(!updateStudent){
        console.log("There isn't a magazin with this id");
        return;
    }

    let error = validateStudent(student);
    if(error.hasErrors)
        return error;
    return await updateStudent.update(student);
}

async function deleteStudent(StudentId){
    let deleteElem = await Student.findByPk(StudentId);

    if(!deleteElem){
        console.log("This student does not exist");

        return;
    }
    try{
        return await deleteElem.destroy();
    }
    catch(e){
        if(e.message.include("FK_Feedback_Student")){
            return "This entity is already in use, so it cannot be deleted anymore";
        }
        else
            throw(e);
    }
}

export {getStudent, getStudentById, createStudent, updateStudent, deleteStudent};
