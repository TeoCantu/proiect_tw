import { TextField, Grid,Button,Paper, IconButton } from '@material-ui/core';
import React, {Component} from 'react';
import { activitateRoute, feedbackRoute } from '../ApiRoutes';
import {get, post} from '../Calls';
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied';
import SentimentVerySatisfied from '@material-ui/icons/SentimentVerySatisfied';
import SentimentSatisfiedAlt from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';
import swal from 'sweetalert'


// Clasa pentru pagina studentului

const enlarge={
    icon1:{
        width:100,
        height:100,
        color:'#dd2828'
    },
    icon2:{
        width:100,
        height:100,
        color:'#d14b4b'
    },
    icon3:{
        width:100,
        height:100,
        color:'#2d9731'
    },
    icon4:{
        width:100,
        height:100,
        color:'#1dae23'
    }
};
var bodyParser = require('body-parser');

export default class Student extends Component{
    constructor(props){
        super(props);

        this.state = {
            student: this.props.location.data,
            codActivitate: null,
            listaActivitati: null,
            activitateCurenta: null,
            Feedback: {
                StudentId: 0,
                Timp: null,
                CodUnicActivitate: 0,
                FeedbackTip: ""
            },
            stare: null
        }
        console.log(this.state.student);
        
    }

    async componentDidMount(){
        let data = await get(activitateRoute);
        if(data.hasErrors){
            alert(data.message);
            return;
        }

        this.setState({listaActivitati: data});
        
    }

    //preluare cod activitate
    onHandleChange(e){
        this.setState({codActivitate: e.target.value});
    }


    //handler pentru apasare enter
    keyPress(e){
        var a = this.state.listaActivitati.find(x => x.CodUnicActivitate == this.state.codActivitate);
        if(e.key === 'Enter'){
            if(a !== 'undefined'){

               
                var dataCurenta = new Date();
                var oldDateObj = new Date(a.DataActivitate);
                var newDateObj = new Date();
                newDateObj.setTime(oldDateObj.getTime() + (a.Durata * 60 * 1000));
                if(dataCurenta.getTime()>=oldDateObj.getTime() && dataCurenta.getTime()<=newDateObj.getTime())
                {
                    this.setState({activitateCurenta: a});
                    swal("Felicitari!","Puteti adauga feedback","success");
                    this.setState({stare:true})
                }
                else
                if(dataCurenta.getTime()>=newDateObj.getTime()){
                    swal("Atentie!","Activitate terminata","warning");
                    this.setState({stare:false})
                }
                else{
                    swal("Atentie!","Activitatea inca nu a inceput","warning");
                    this.setState({stare:false})
                }
                
            }
        }     
        
    }

    //adaugare feedback in baza de date
    async adaugaFeedback(feedbackTip){

        if(this.state.stare){
        let timp = new Date();

        let fb = this.state.Feedback;
        fb.CodUnicActivitate = this.state.codActivitate;
        fb.StudentId = this.state.student.StudentId;
        fb.Timp = timp;
        fb.FeedbackTip = feedbackTip;
        this.setState({Feedback: fb});
        var feedback = await post( feedbackRoute, 
            this.state.Feedback);
        if(feedback.hasErrors){
            alert(feedback.message);
            return;
        }
        swal("Felicitari!","Feedback adaugat!","success");
    }
    }
   
    render(){
        return (
            <Paper>
                <Button variant="text" 
            style={
                {align:"left"}
            }
            onClick={()=>{this.props.history.push({pathname:'/'})}}>
                Inapoi
            </Button>
            <Grid container
            direction="column"
            justify="center"
            alignItems="center"
            style = {{minHeight: "100vh"}}>
                <TextField
                id = "tfActivitate"
                label="Cod activitate"
                variant="filled"
                type="number"
                required
                onChange = {e => {
                    this.onHandleChange(e);
                }}
                onKeyPress = {e => this.keyPress(e)}></TextField>
           <div>
             <IconButton onClick={()=>{this.adaugaFeedback('FoarteRau'); }}>
                    <SentimentVeryDissatisfied fontSize="large" style={enlarge.icon1} ></SentimentVeryDissatisfied>
            </IconButton>
            <IconButton onClick={()=>{this.adaugaFeedback('Rau'); }}>
                <SentimentDissatisfied fontSize="large" style={enlarge.icon2} ></SentimentDissatisfied>
            </IconButton>
           </div>
           <div>
           <IconButton onClick={()=>{this.adaugaFeedback('Bun');
    }}>
                <SentimentSatisfiedAlt fontSize="large" style={enlarge.icon3}></SentimentSatisfiedAlt>
            </IconButton>
            <IconButton onClick={()=>{this.adaugaFeedback('FoarteBun'); }}>
                <SentimentVerySatisfied fontSize ="large" style={enlarge.icon4}></SentimentVerySatisfied>
            </IconButton>
           </div>
        </Grid>
        </Paper>
            
        )
    }

   
}
