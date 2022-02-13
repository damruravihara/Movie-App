import React,{useContext} from "react";
import Authentication from "../../Services/Authentication";
import {AuthContext} from '../../Context/AuthContext';
import {useHistory , Link} from 'react-router-dom';
import swal from 'sweetalert';
import './header.css'
import logo from '../Assets/logowhite.png'

const Header = props =>{

return(
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark" style={{backgroundColor:"#222831"}}>
      <div className="container-fluid">
      <Link to="/public/login" className="navbar-brand"><img src={logo} alt="whitelogo" width="50" height="50"/></Link>
  <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mr-auto">
      <Link to="/public/login"><li className="nav-link nav-item">Login</li></Link>
      <Link to="/public/register"><li className="nav-link nav-item">Register</li></Link>
    </ul>
    </div>
  </div>
</nav>
  )
}

export default Header;