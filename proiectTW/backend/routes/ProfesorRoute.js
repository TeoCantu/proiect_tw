import express from 'express'
import {getProfesor, getProfesorById, createProfesor, updateProfesor, deleteProfesor} from '../logic/ProfesoriLogic.js'



//rute pentru apeluri REST din baza de date 
const router = express.Router();
router.route("/profesor").post(async (req, res) => {
    try{
        let profesor = await createProfesor(req.body);

        if(profesor.hasErrors)
            res.status(400).json(profesor);
        else
            res.status(200).json(profesor);
    }
    catch(e) {
        res.status(500).json({hasErrors: true, message: e.message})
    }
});

router.route("/profesor").get(async (req, res) => {
    try{
        res.status(200).json(await getProfesor());
    }
    catch(e) {
        res.status(500).json({hasErrors: true, message: e.message});
    }
});

router.route("/profesor/:ProfesorId").put(async (req,res) => {
    try{
        let profesor = await updateProfesor(req.params.ProfesorId, req.body);
        
        if(profesor.hasErrors)
            res.status(400).json(profesor);
        else
            res.status(200).json(profesor);
    }
    catch(e) {
        res.status(500).json({hasErrors: true, message: e.message});
    }
})

router.route("/profesor/:ProfesorId").delete(async (req, res) => {
    try{
        let profesor = await deleteProfesor(req.params.ProfesorId);

        if(profesor.hasErrors)
            res.status(400).json(profesor);
        else
            res.status(200).json(profesor);
    }
    catch(e) {
        res.status(500).json({hasErrors: true, message: e.message});
    }
});

export default router;