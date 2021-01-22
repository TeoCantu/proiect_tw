import React, {Component} from 'react';
import {profesorRoute, studentRoute} from '../ApiRoutes';
import {get} from '../Calls';
import {Button, ButtonGroup, IconButton, TextField, Grid} from '@material-ui/core';
import swal from 'sweetalert'


//Componenta pentru pagina principala 

export default class PaginaPrincipala extends Component{
    constructor (props){
        super(props);

        this.state = {
            studenti:[],
            profesori: [],
            nume: null,
            prenume: null
        }
    }


    async componentDidMount(){
        let data1 = await get(studentRoute);
        let data2 = await get(profesorRoute);
        
        if(data1.hasErrors){
            alert(data1.message);
            return;
        }
        if(data2.hasErrors){
            alert(data2.message);
            return;
        }

        this.setState({studenti: data1});
        this.setState({profesori: data2});
    }
    // Functie pentru preluare nume
    handleChangeNume(e){
        this.setState({nume: e.target.value});
    }
    //Functie pentru preluare prenume
    handleChangePrenume(e){
        this.setState({prenume: e.target.value});
    }

    render(){
        return(
            <Grid container
            direction="column"
            justify="center"
            alignItems="center"
            style = {{minHeight: "100vh"}}>
                <TextField
                    id = "tfNume"
                    label="Nume"
                    variant="filled"
                    required
                    onChange = {e => this.handleChangeNume(e)}></TextField>
                <br/>
                <TextField id = "tfPrenume"
                    label="Prenume"
                    variant="filled"
                    required
                    onChange = {e => this.handleChangePrenume(e)}></TextField>
                <br/>
                
                <ButtonGroup variant = "text">
                    <Button 
                    color="primary"
                    onClick={() => {
                        var nume = this.state.nume;
                        var prenume = this.state.prenume;
                        
                        var student = this.state.studenti.find(x => x.StudentNume === nume && x.StudentPrenume===prenume);
                        if(student){
                        this.props.history.push({pathname: "/student", data: student});
                        }
                        else{
                            swal('Ooops...','Utilizatorul nu exista!','error');
                        }
                    }}>Student</Button>
                    <Button 
                    color="primary"
                    onClick={() => {
                        var nume = this.state.nume;
                        var prenume = this.state.prenume;
                       
                        var profesor = this.state.profesori.find(x => x.ProfesorNume === nume && x.ProfesorPrenume===prenume);
                        if(profesor){
                            this.props.history.push({pathname: "/profesor", data: profesor});
                        }
                        else{
                            swal('Ooops...','Utilizatorul nu exista!','error');
                        }   
                    }}>Profesor</Button>

                </ButtonGroup>
            
            </Grid>
        )
    }

    

}