import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Updateprofile from './components/Updateprofile';
import Allusers from './components/Allusers';
import AutharizeHeader from './components/Header/AutharizeHeader';
import AddFilms from './components/AddFilms';
import ViewFilm from './components/ViewFilm';
import AllFilms from './components/FilmPage';
import UpdateFim from './components/UpdateFilm';


function App() {

  return (
    <Router>
      <div>
        <Route path="/public" component={Header}/>
        <Route path="/user" component={AutharizeHeader}/>
        <Route path="/public/login" component={Login}/>
        <Route path="/public/register" component={Register}/>
        <Route path="/user/profile" component={Profile}/>
        <Route path="/user/update/:id" component={Updateprofile}/>
        <Route path="/user/alluser" component={Allusers}/>
        <Route path="/user/addfilm" exact component={AddFilms}/>
        <Route path="/user/viewfilm/:id" exact component={ViewFilm}/>
        <Route path="/user/allfilms" exact component={AllFilms}/>
        <Route path="/user/updatefilm/:id" exact component={UpdateFim}/>
      </div>
    </Router>
    
  );
}

export default App;
