import { Button, Grid, isWidthDown, Paper, TextField } from '@material-ui/core';
import React, {Component} from 'react';
import { post } from '../Calls';
import {activitateRoute} from '../ApiRoutes'
import swal from 'sweetalert'

//Clasa pentru adaugarea unei activitati

const style = {
    text: {
        marginBottom: 20,
        width : 250
    }
}

export default class ProfesorAdauga extends Component{
    constructor(props){
        super(props);

        this.state = {
            profesor: this.props.location.data,
            activitate: {
                CodUnicActivitate: 0,
                Descriere: "",
                DataActivitate: null,
                Durata: 0,
                ProfesorId: 0,
                FeedbackuriActivitate: []
            }
        }
    }
    //preluare descriere
    onHandleChangeDescriere(e){
        let activitate = this.state.activitate;
        activitate.Descriere = e.target.value;
        this.setState({activitate: activitate});
    }
    //preluare data
    onHandleChangeData(e){
        let data = this.state.activitate;
        data.DataActivitate = e.target.value;
        this.setState({activitate: data});
    }
    //preluare durata
    onHandleChangeDurata(e){
        let durata = this.state.activitate;
        durata.Durata = e.target.value;
        this.setState({activitate: durata});
    }
    //functie de inserare activitate in baza de date
    async adaugaActivitate(){
        let a = this.state.activitate;
        let data = new Date(a.DataActivitate);
        let cod = this.state.profesor.ProfesorId*1000+data.getTime()/10000%1000;
        console.log(cod);
        a.CodUnicActivitate=cod;
        a.ProfesorId=this.state.profesor.ProfesorId;
        this.setState({
            activitate:a
        })
        let aux = await post(activitateRoute,this.state.activitate);
        if(aux.hasErrors){
            alert(aux.message);
            return;
        }
    }

    render(){
        return(
        <Paper>
        <Button variant="text" 
            style={
                {align:"left"}
            }
            onClick={()=>{this.props.history.push({pathname:'/profesor',data:this.state.profesor})}}>
                Inapoi
            </Button>
        <Grid container
        direction="column"
        justify="center"
        alignItems="center"
        style = {{minHeight: "100vh"}}>
            <TextField
            id="descriere"
            label="Descriere"
            style={style.text}
            required
            onChange = { e => {
                this.onHandleChangeDescriere(e);
                console.log(e.target.value);
            }}></TextField>
            <TextField
            id="data"
            required
            style={style.text}
            type="datetime-local"
            onChange = { e => {
                this.onHandleChangeData(e);
                console.log(e.target.value);
            }}></TextField>
            <TextField
            id="durata"
            style={style.text}
            label="Durata (min)"
            required
            type="number"
            onChange = { e => {
                this.onHandleChangeDurata(e);
                console.log(e.target.value);
            }}></TextField>
            <Button
            variant="outlined"
            onClick={()=>{
            
            this.adaugaActivitate();
            swal('Felicitari!','Activitatea a fost adaugata','success');
            this.props.history.push({pathname:'/profesor',data:this.state.profesor});   
            }}>Adauga activitate</Button>
        </Grid>

        </Paper>
        )
    }
}