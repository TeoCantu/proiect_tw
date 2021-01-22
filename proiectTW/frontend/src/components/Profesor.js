import React, {Component} from 'react';
import {get} from '../Calls';
import { activitateRoute, profesorRoute } from '../ApiRoutes';
import {Button,Paper, ButtonGroup, IconButton, TextField, Grid, Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core'; 


// clasa pentru pagina principala a profesorului
export default class Profesor extends Component{
    constructor(props){
        super(props);

        this.state = {
            profesor: this.props.location.data,
            activitati: []
        }
    }

    async componentDidMount(){
        let data2 = await get(activitateRoute);
        if(data2.hasErrors){
            alert(data2.message);
            return;
        }
        //filtrare activitati dupa id-ul profesorului
        data2 = data2.filter(x=>x.ProfesorId == this.state.profesor.ProfesorId);
        this.setState({activitati: data2});
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
            <ButtonGroup variant = "text">
                <Button 
                color="primary"
                onClick={() => {
                    this.props.history.push({pathname: "/profesor/add", data:this.state.profesor});
                }}>Adauga activitate</Button>
                <Button 
                color="primary"
                onClick={() => {
                    this.props.history.push({pathname: "/profesor/view", data:this.state.profesor});
                }}>Vezi feedback</Button>

                </ButtonGroup>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Cod activitate</TableCell>
                                <TableCell align="right">Activitate</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                this.state.activitati.map((row)=>(
                                    <TableRow key = {row.CodUnicActivitate}>
                                         <TableCell component="th" scope="row">{row.CodUnicActivitate}</TableCell>
                                        <TableCell align="right">{row.Descriere}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
           </Grid>
           </Paper>
        )
    }
}