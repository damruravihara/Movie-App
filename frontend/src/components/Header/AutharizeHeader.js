import React,{useContext, useEffect,useState} from "react";
import axios from "axios";
import Authentication from "../../Services/Authentication";
import {AuthContext} from '../../Context/AuthContext';
import {useHistory , Link} from 'react-router-dom';
import swal from 'sweetalert';
import logo from '../Assets/logowhite.png'

const Header = props =>{
  const {user,setUser,isAuthenticated,setIsAuthenticated} = useContext(AuthContext);  

  let history = useHistory();
  let path = '/public/login';

  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get('/user/userprofile').then((res)=>{
      setUser(res.data);
      }).catch(()=>{
        history.push(path);
    })
  }
    fetchUser();
  },[]);

  const onClickLogoutHandler = ()=>{
    swal({
      title: "Log Out",
      text: "Are you Sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
    Authentication.logout().then(data=>{
      
      if(data.success){
            setUser(data.user);
            setIsAuthenticated(false);
             history.push(path);
            swal("Success", 
              "Successfully Logout",
              {icon: "success"}
            );
          } 
          // else {
          //   swal("Your Not Logout");}

      })
      }
  })
}


return(
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark" style={{backgroundColor:"#222831"}}>
      <div className="container-fluid">
      <Link to="/user/allfilms" className="navbar-brand"><img src={logo} alt="whitelogo" width="30" height="30"/></Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
      <Link to="/user/allfilms"><li className="nav-item nav-link active">Home</li></Link>
      <Link to="/user/profile"><li className="nav-item nav-link">My Profile</li></Link>
      {
        user.role ==="admin" ? 
        <Link to="/user/alluser"><li className="nav-item nav-link">All Users</li></Link> : null
      }
      <li><button type="button" className="nav-item btn btn-link nav-link" onClick={onClickLogoutHandler}>Logout</button></li>
    </ul>
    </div>
  </div>
</nav>
  )
}

export default Header;