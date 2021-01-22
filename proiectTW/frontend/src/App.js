import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import ProfesorAdauga from './components/ProfesorAdauga';
import ProfesorVede from './components/ProfesorVede';
import Student from './components/Student';
import Profesor from './components/Profesor';
import PaginaPrincipala from './components/PaginaPrincipala';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Clasa principala a aplicatiei

class App extends Component{
  render(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path = '/' exact strict component = {PaginaPrincipala}/>
        <Route path = '/student' exact strict component = {Student}/>
        <Route path = '/profesor' exact strict component = {Profesor}/>
        <Route path = '/profesor/add' exact strict component = {ProfesorAdauga}/>
        <Route path = '/profesor/view' exact strict component = {ProfesorVede}/>
      </Switch>

    </BrowserRouter>
    
  );
}}

export default App;
