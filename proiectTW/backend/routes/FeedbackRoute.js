import express from 'express'
import {getFeedback, getFeedbackById, createFeedback, updateFeedback, deleteFeedback} from '../logic/FeedbackLogic.js'



//rute pentru apeluri REST din baza de date 
const router = express.Router();

router.route("/feedback").post(async (req, res) => {
    try{
    let feedback = await createFeedback(req.body)
     if(feedback.hasErrors)
        res.status(400).json(feedback);
    else    
        res.status(200).json(feedback);
    }
    catch(e){
        res.status(500).json({ hasErrors: true, message: e.message });
    }
})

router.route("/feedback").get(async (req, res) => {
    try{
        res.status(200).json(await getFeedback());

    }
    catch(e){
        res.status(500).json({ hasErrors: true, message: e.message });
    }
})

router.route("/feedback/:FeedbackId").put(async (req,res) => {
    try{
        let feedback = await updateFeedback(req.params.FeedbackId, req.body);
        if(feedback.hasErrors)
            res.status(400).json(feedback);
        else   
            res.status(200).json(feedback);
    }
    catch(e){
        res.status(500).json({ hasErrors: true, message: e.message });
    }
})

router.route("/feedback/:FeedbackId").delete(async (req, res) => {
    try{
        let feedback = await deleteFeedback(req.params.FeedbackId);
        if(feedback.hasErrors)
            res.status(400).json(feedback);
        else    
            res.status(200).json(feedback);
    }
    catch(e){
        res.status(500).json({ hasErrors: true, message: e.message })
    }
    
})

export default router;