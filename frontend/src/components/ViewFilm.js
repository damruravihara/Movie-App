import React,{useState,useEffect} from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import './viewfilm.css'
import duration from './Assets/duration.png'
import genres from './Assets/genres.png'
import tobe from './Assets/warning.png'
import watched from './Assets/watched.png'
import customize from './Assets/customize.png'
import Popup from 'reactjs-popup';

const ViewFilm = props =>{

  let history = useHistory();
  let path = '/public/login';
  let path2 = '/user/allfilms'
  const [film, setFilm] = useState([]);
  const {id} = useParams();

  useEffect(()=>{
    axios.get(`/film/getfilm/${id}`).then((res)=>{
      setFilm(res.data.film)
    }).catch((e)=>{
      history.push(path);
      swal({title: "unauthorized",
      text: "Please Login First " +e,
      icon: "warning"} ); 
  })
}, [])

const deleteFilm=(id) =>{
  swal({
      title: "Are you sure?",
      text: "Film Will be permenatly remove from System",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
  axios.delete(`/film/deletefilm/${id}`).then(()=>{
        
      if (willDelete) {
        swal("The Film has been deleted!", 
        {icon :"success",});
        history.push(path2);  
      } else {
        swal("Film Is Not Deleted");}
    })
  }});
}

  return(
    <>
    <br/>
    <div className="container">
      <br/>
      <div className="row g-2">
        <div className="column viewfilm-namecol">
        <h1 style={{fontWeight:"600"}}>{film.name} ({film.filmyear})</h1>
        </div>
        <div className="column viewfilm-iconcol">
        <Link to={"/user/updatefilm/" + film._id}>
      <IconButton aria-label="delete">
                         <EditIcon fontSize="medium" color="primary"/> 
                         </IconButton></Link>
                    <IconButton aria-label="delete"  onClick={() =>  deleteFilm(film._id)}>
                         <CancelRoundedIcon fontSize="large" color="secondary"/> 
                         </IconButton>
        </div>
      </div>
      <div style={{clear: "both"}}>
       <h5 style={{float: "left"}}><img src={genres} style={{width: "25px", marginBottom:"5px"}}/>&nbsp;&nbsp;{film.genres}&nbsp;&nbsp;&nbsp;</h5>
     </div>
      
      <h5 style={{marginRight:"200px"}}><img src={duration} style={{width: "25px", marginBottom:"5px"}}/>&nbsp;&nbsp;{film.duration}&nbsp;&nbsp;&nbsp;</h5>
      <h5>{film.state === "Watched"?<img src={watched} style={{width: "25px", marginBottom:"5px"}}/>:<img src={tobe} style={{width: "25px", marginBottom:"5px"}}/>}&nbsp;&nbsp;{film.state}</h5>
      <hr/>
      <center><img src={film.filmimage} style={{width:"300px"}}/></center>
      <h3 style={{margin:"20px"}}>Description</h3>
      <hr/>
      <p style={{margin:"20px"}}>{film.description}</p>
      <br/>
      <center><a href={film.trailer} target="_blank"><button className="button-71" role="button">Watch Trailer</button></a></center>
      <br/>
    </div>
    <br/>
    </>
  )
}

export default ViewFilm;