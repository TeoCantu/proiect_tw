import express from 'express'
import {getStudent, getStudentById, createStudent, updateStudent, deleteStudent} from '../logic/StudentiLogic.js'

const router = express.Router();


//rute pentru apeluri REST din baza de date 
router.route("/student").post(async(req, res) => {
    try{
        let student = await createStudent(req.body);

        if(student.hasErrors)
            res.status(400).json(student);
        else
            res.status(200).json(student);
    }
catch(e) {
    res.status(500).json({hasErrors: true, message: e.message});
}  
});

router.route("/student").get(async(req, res) => {
    try{
        res.status(200).json(await getStudent());
    }
    catch(e) {
        res.status(500).json({hasErrors: true, message: e.message});
    }

});

router.route("/student/:id").put(async (req, res) => {
    try{
        let student = await updateStudent(req.params.id, req.body);

        if(student.hasErrors)
            res.status(400).json(student);
        else
            res.status(200).json(student);
    }
    catch(e) {
        res.status(500).json({hasErrors: true, message: e.message});
    }
})

router.route("/student/:StudentId").delete(async(req, res) =>{
    try{
        let student = await deleteStudent(req.params.StudentId);

        if(student.hasErrors) {
            res.status(400).json(student);
        }
        else{
            res.status(200).json(student);
        }
    }
    catch(e) {
        res.status(500).json({hasErrors: true, message: e.message});
    }
});

export default router;