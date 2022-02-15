import React, { useEffect, useState} from "react";
import axios from "axios";
import { useHistory, Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import jspdf from 'jspdf'
import "jspdf-autotable"
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import './filmpage.css'
import logo from './Assets/MovieShelf.png'
import duration from './Assets/duration.png'
import genres from './Assets/genres.png'
import tobe from './Assets/warning.png'
import watched from './Assets/watched.png'

export default function AllFilms(){

  let history = useHistory();
  let path = '/public/login';
  const [searchTerm, setsearchTerm] = useState("");
  const [user, setUser] = useState([]);

  const [film, setFilm] = useState([]);

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

  useEffect(()=>{
    const getfilm = async()=>{
     const res = await axios.get('/film/allfilms').then((res)=>{
      setFilm(res.data);
      })
    }
    getfilm();
  }, []);


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
          setTimeout(function(){
          window.location.reload();
           },1000);
        } else {
          swal("Film Is Not Deleted");}
      })
    }});
  }

  return(
    <>
    <br/>
    <div className="container filmpage">
      <br/>
    <input className="search" type="text" placeholder="Search" aria-label="Search"  
      onChange={(e) => {
          setsearchTerm(e.target.value)
      }}/>

&nbsp;&nbsp;<Link to="/user/addfilm"><button type="submit" className="btnregister" id="regsubmit">Add New Film</button></Link>
{film.length === 0?<> 

  <div className="card border-dark mb-3 emptycard">
                      <div className="row g-3">
                        <div className="column filmpage-imagecol">
                          <div className="filmimage">
                          <center><img src={logo} className="filmimg2"/> </center>
                          </div>
                          </div>
                       <div className="column filmpage-namecol">
                          <h3 style={{margin:"20px", fontWeight:"700"}}>Get Started By adding your favourite Movie!</h3>
                          <center><p><Link to="/user/addfilm"><button type="submit" className="button-28" role="button" id="regsubmit">Add New Film</button></Link></p></center>

                    
                    </div>
                    <div className="column filmpage-iconcol">
                    <div className="filmicon">
                         </div>
                    </div>
                    </div>
                    </div>
                    <br/>
                   </>:
      
                
                
        <div className="filmcard">
 <br/>
            {film.filter((val) => {
                  if (searchTerm === "") {
                    return val
                  } else if (
                    val.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    val.filmyear
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return val
                  }
                }).map(function (f) {
                  return (
                    <div className="card border-dark mb-3 filmcard">
                      <div className="row g-3">
                        <div className="column filmpage-imagecol">
                          <div className="filmimage">
                          <center><img src={f.filmimage} className="filmimg" /> </center>
                          </div>
                          </div>
                       <div className="column filmpage-namecol">
                       <Link to={"/user/viewfilm/" +f._id}><h5 style={{marginTop:"20px",marginRight:"80px"}} className="filmpage-nameh5" >{f.name} ({f.filmyear})</h5></Link>
                          <h6 style={{ marginTop:"20px"}}><img src={genres} style={{width: "25px"}}/> {f.genres}</h6>
                          
                          <h6><img src={duration} style={{width: "25px", marginBottom:"5px"}}/> {f.duration}</h6>
                          <h6>{f.state === "Watched"?<img src={watched} style={{width: "25px", marginBottom:"5px"}}/>:<img src={tobe} style={{width: "25px",  marginBottom:"5px"}}/>} {f.state}</h6>
   
                    
                    </div>
                    <div className="column filmpage-iconcol">
                    <div className="filmicon">
                    <Link to={"/user/updatefilm/" + f._id}>
      <IconButton aria-label="delete">
                         <EditIcon fontSize="medium" color="primary"/> 
                         </IconButton></Link>
                    <IconButton aria-label="delete"  onClick={() =>  deleteFilm(f._id)}>
                         <CancelRoundedIcon fontSize="large" color="secondary"/> 
                         </IconButton> 

                         </div>
                    </div>
                    </div>
                    </div>



         )
                })}
       </div>}
       <br/>
    </div>
    </>
  )
}