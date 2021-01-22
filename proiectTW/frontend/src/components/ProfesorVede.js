import { Button, Grid,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField } from '@material-ui/core';
import React, {Component} from 'react';
import { activitateRoute, feedbackRoute } from '../ApiRoutes';
import {get} from '../Calls';
import swal from 'sweetalert';

//clasa pentru a vizualizare feedback pentru o activitate
export default class ProfesorVede extends Component{
    constructor(props){
        super(props);
        this.state={
            codAct:null,
            profesor:this.props.location.data,
            listaActivitati:[],
            feedbackList:[]
        }
    }

    async componentDidMount(){
        let data = await get(activitateRoute);
        if(data.hasErrors){
            alert(data.message);
            return;
        }
        data = data.filter(x => x.ProfesorId ===this.state.profesor.ProfesorId)
        this.setState({listaActivitati: data});
    }

    //preluare cod activitate
    onHandleChange(e){
        this.setState({codAct:e.target.value});
    }

    //verificare activitate si preluare lista feedback
    async verificaActivitate(){
        let act = this.state.listaActivitati.find(x=>x.CodUnicActivitate == this.state.codAct);
        if(act){
            let data = await get(feedbackRoute);
            if(data.hasErrors){
                alert(data.message);
                return;
            }
            data = data.filter(x=>x.CodUnicActivitate==act.CodUnicActivitate)

            for(let i=0;i<data.length;i++){
                data[i].Timp = new Date(data[i].Timp).toLocaleString();
            }
           console.log(data)
            this.setState({
                feedbackList: data
            })
        }
        else{
            swal('Oops...','Activitatea nu exista','error');
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
            style = {{minHeight: "40vh"}}>
                
                <div>
                
                <TextField 
                id="codAct"
                label="Cod activitate"
                type="number"
                required
                onChange={(e)=>{
                    this.onHandleChange(e);
                }}
                ></TextField>
               
                <Button variant="outlined"
                
                onClick={
                    ()=>{
                        this.verificaActivitate()
                    }
                }>Vezi feedback</Button>

                <Button variant="outlined"
                
                onClick={
                    ()=>{
                        this.verificaActivitate()
                    }
                }>Actualizeaza</Button>
                </div>
                
                


            </Grid>
            <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tip feedback</TableCell>
                                <TableCell align="right">Data</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                this.state.feedbackList.map((row)=>(
                                    <TableRow key = {row.FeedbackId}>
                                         <TableCell component="th" scope="row">{row.FeedbackTip}</TableCell>
                                        <TableCell align="right">{row.Timp}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }
}