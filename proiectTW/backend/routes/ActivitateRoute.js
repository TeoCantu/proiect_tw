import express from 'express'
import {getActivitate, getActivitateByCodUnicActivitate, createActivitate, updateActivitate, deleteActivitate} from '../logic/ActivitateLogic.js'


//rute pentru apeluri REST din baza de date 
const router = express.Router();

router.route("/activitate").post(async (req, res) => {
   try{
        let activitate = await createActivitate(req.body)
        if(activitate.hasErrors)
            res.status(400).json(activitate);
        else    
            res.status(200).json(activitate);
   } catch(e)
   {
       res.status(500).json({hasErrors: true, message: e.message })
   }
})

router.route("/activitate").get(async (req, res) => {
    try{
        res.status(200).json(await getActivitate());
    }
    catch(e){
        res.status(500).json({hasErrors: true, message: e.message})
        
    }
})

router.route("/activitate/:CodUnicActivitate").put(async (req,res) => {
    try {
        let activitate = await  updateActivitate(req.params.CodUnicActivitate, req.body);

        if (activitate.hasErrors)
            res.status(400).json(activitate);
        else
            res.status(200).json(activitate);
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }  
})

router.route("/activitate/:CodUnicActivitate").delete(async (req, res) => {
    try {
        let activitate = await deleteMagazin(req.params.CodUnicActivitate);

        if (activitate.hasErrors)
            res.status(400).json(activitate);
        else
            res.status(200).json(activitate);
    }
    catch (e) {
        res.status(500).json({ hasErrors: true, message: e.message })
    }  
})

export default router;