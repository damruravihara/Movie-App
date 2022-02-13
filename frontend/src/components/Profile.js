import React,{useState,useEffect} from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import profile from "./Assets/profile.png"
import women from "./Assets/woman.png"
import man from "./Assets/man.png"
import './profile.css'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
 


const Profile = props=>{

  let history = useHistory();
  let path = '/public/login';

  const [user, setUser] = useState([]);

  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get('/user/userprofile').then((res)=>{
      setUser(res.data);
      }).catch(()=>{
        history.push(path);
        swal({title: "unauthorized",
        text: "Please Login First",
        icon: "warning"} ); 
    })
  }
    fetchUser();
  },[]);

  const deleteUser=(id) =>{
    swal({
        title: "Are you sure?",
        text: "Your Account Will be permenatly remove from System",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
    axios.delete(`/user/delete/${id}`).then(()=>{
      axios.delete(`/film/deleteall/${id}`).then(()=>{
          
        if (willDelete) {
          swal("The Your has been deleted!", 
          {icon :"success",});  
          setTimeout(function(){
          window.location.reload();
           },1000);
        } else {
          swal("Account Is Not Deleted");}
      })
    });
  }
  })
} 

  return(
    <>
    <br/>
    <div className="container profilecontainer">
      <div className="row">
        <div className="column profileimg">
          <div className="card border-primary mb-3  imgcard1" style={{marginTop:"20px"}}>
          <center><img src={user.profilepic} className="profilepic" style={{marginTop:"20px"}} width="222" height="222"/></center>
          
          <center><p style={{fontSize:"20px", color:"black"}}>#{user.username}</p></center>
          </div>
        </div>
        <div className="column profiledetails">
        <div className="card border-dark mb-3 imgcard" style={{marginTop:"20px"}}>
          <center><h3 style={{marginTop:"20px",fontWeight:"600", letterSpacing:"5px", color:"black"}}>MY PROFILE<Link to={"/user/update/" + user._id}>
      <IconButton aria-label="delete">
                         <EditIcon fontSize="medium" color="primary"/> 
                         </IconButton></Link><IconButton aria-label="delete"  onClick={() =>  deleteUser(user._id)}>
                         <CancelRoundedIcon fontSize="large" color="secondary"/> 
                         </IconButton> </h3></center>
          <hr className="hrclass"/>
          <h4 style={{marginLeft:"10px", fontSize:"24px", color:"black", marginBottom:"5px"}}>Name</h4>
          <h5 style={{marginLeft:"10px", fontSize:"18px", color:"black", marginBottom:"10px"}}>{user.firstname}&nbsp;{user.lastname}</h5>
          <hr className="hrline"/>
          <h4 style={{marginLeft:"10px", fontSize:"24px", color:"black", marginBottom:"5px"}}>Email</h4>
          <h4 style={{marginLeft:"10px", fontSize:"18px", color:"black", marginBottom:"10px"}}>{user.email}</h4>
          </div>
        </div>
      </div>
    </div>
    <br/>
    </>
  )
}

export default Profile;