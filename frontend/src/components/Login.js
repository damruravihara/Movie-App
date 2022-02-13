import React,{useState,useContext} from "react";
import Authentication from "../Services/Authentication";
import { AuthContext } from "../Context/AuthContext";
import swal from 'sweetalert';
import './Login.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'
import { Link } from "react-router-dom";
import logo from './Assets/MovieShelf.png'
const eye = <FontAwesomeIcon icon={faEye} />;

const Login = props=>{
  const [user,setUser] = useState({username: "", password: "", role: ""});
  const {isAuthenticated,setIsAuthenticated} = useContext(AuthContext);
  // const [message,setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onChange = e=>{
    setUser({...user,[e.target.name] : e.target.value});
  }

  const onSubmit = e =>{
    e.preventDefault();
    Authentication.login(user).then(data=>{
      
      if(isAuthenticated){
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push('/user/allfilms');
      }
      else{
        swal({title: "Login Failed",
        text: "Incorrect Username Or Password",
        icon: "warning"} );
      }
    });
  }

  // function capLock(e){
  //   var kc = e.keyCode ? e.keyCode : e.which;
  //   var sk = e.shiftKey ? e.shiftKey : kc === 16;
  //   var visibility = ((kc >= 65 && kc <= 90) && !sk) || 
  //       ((kc >= 97 && kc <= 122) && sk) ? 'visible' : 'hidden';
  //   document.getElementById('divMayus').style.visibility = visibility
  // }

  return(

    <>
    <div className="logincard">
    <div className="container">
      <br/>
      <center><a href="/public/login"><img src={logo} alt="whitelogo" width="130" height="130"/></a></center><br/>
      <center><h1 className="animate-charcter" style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>Welcome Back</h1></center>
      <hr/>
    <form onSubmit={onSubmit} className="frm" noValidate>
      <div className="mb-3">
        <label htmlFor="username" className="form-label" style={{fontFamily:"Arial,Helvetica,sans-serif" , fontSize:"18px"}}>Username</label>
        <input 
          type="text" 
          name="username" 
          className="form-control logininput"
          placeholder="Username" 
          onChange={onChange} required/>
          <br/>


            
            <label htmlfor="password" className="form-label" style={{fontFamily:"Arial,Helvetica,sans-serif" , fontSize:"18px"}}>Password</label>
            <div className="input-group md-9">
            <input type={passwordShown ? "text" : "password"} 
                   name="password" 
                   className="form-control logininput" 
                   id="log" 
                   placeholder="Enter Password"
                  //  onKeyPress={capLock}
                   onChange={onChange}required/>
                    <span class="input-group-text" id="basic-addon2"><i className="eye" onClick={togglePasswordVisiblity}>{eye}</i></span>
                    {/* <div id="divMayus" style="visibility:hidden">Caps Lock is on.</div> */}

          </div>
          
          </div>
          <ReactIsCapsLockActive>
                      {active => <span style={{ color:"red"}}> {active ? '*Caps Lock is on.' : null}</span>}
                    </ReactIsCapsLockActive>

          <center><button type="submit" 
                  className="button-18" role="button" id="dloginbtn">Login</button></center>

    </form>
    <h6 style={{padding:"10px"}}>Don't have an Account <Link to="/public/register">Register</Link></h6>
    <br/>
    </div>
    </div>
    <br/>
    </>
  )
}
export default Login;