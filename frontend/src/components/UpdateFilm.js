import React,{useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import './register.css'
import { Link , useParams } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function UpdateFim(){

  let history = useHistory();
  let path = '/public/login';
  const {id} = useParams();
  const { register, handleSubmit, formState: { errors }} = useForm();


  const [user,setUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescriptin] = useState("");
  const [trailer, setTrailer] = useState("");
  const [filmimage, setFilmImage] = useState("");
  const [genres, setGenres] = useState("");
  const [filmyear, setFilmYear] = useState("");
  const [image, setImage] = useState("");
  const [film, setFilm] = useState([]);
  const [state,setState] = useState("");
  const [duration,setDuration] = useState("");

  const postDetails = async e=>{
    const files = e.target.files
    const data = new FormData()
    data.append("file",files[0])
    // data.append("file",image)
    data.append("upload_preset","movie-app")
    data.append("cloud_name","padfoot")
    data.append("folder","filmposters")
    const res = await
    fetch("https://api.cloudinary.com/v1_1/padfoot/image/upload",{
      method:"post",
      body:data 
    })
    .then(res=>res.json())
    .then(data=>{
      setFilmImage(data.url)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    axios.get(`/film/getfilm/${id}`).then((res)=>{
      setFilm(res.data.film)
      setUserId(res.data.film.userId)
      setUserName(res.data.film.userName)
      setName(res.data.film.name)
      setDescriptin(res.data.film.description)
      setTrailer(res.data.film.trailer)
      setFilmImage(res.data.film.filmimage)
      setFilmYear(res.data.film.filmyear)
      setGenres(res.data.film.genres)
      setState(res.data.film.state)
      setDuration(res.data.film.duration)
    }).catch((e)=>{
      history.push(path);
      swal({title: "unauthorized",
      text: "Please Login First ",
      icon: "warning"} ); 
  })
}, [])

function updateData(e) {
  // e.preventDefault();
  const filmupdate ={
    userId,
    userName,
    name,
    genres,
    description,
    trailer,
    filmimage,
    state,
    duration,
    filmyear
  }

axios.put(`/film/filmupdate/${id}`,filmupdate).then(()=>{

  swal({          
title: "Success!",
text: "Film Successfully Updated",
icon: "success",
button: "Ok",
});history.push('/user/viewfilm/' +film._id);
  }).catch((e)=>{
     swal("Please fill Form correctly ");
    })

};

  return(
    <>
     <br/>
    <div className="container">
    <br/>
    <center><h1 style={{letterSpacing:"5px", fontSize:"30px" , fontWeight:"600"}}>UPDATE FILM</h1></center>
<div className="register">
<div className="registerin" style={{margin:"40px"}}>
      <form className="needs-validation" noValidate>
      <center> <div className="col-md-6">
         <label for="floatingInput" style={{marginBottom:"10px", fontSize:"18px"}}>Film Poster</label><br/>
          <label for="poster" style={{marginBottom:"20px"}}>
            <div className="card poster">
            
              {filmimage === ""?<center><h4>Preview</h4></center>:<center><img src={filmimage} className="posterimg" style={{width: "150px"}}/></center>}  
                     
           </div> 
           </label> 
           <br/>
                    <input type="file" className="form-control logininput" id="poster" placeholder="Film Poster"
                      onChange={postDetails} required/>
 
          </div></center>
          <br/>
      <div className="row g-2">
      <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" id="username" defaultValue={film.name} placeholder="Film Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      } } required/>
                      <label for="floatingInput">Film Name</label>
                  </div>

          <div className="col-md-6 form-floating">
          <input type="text" className="form-control logininput" id="year" defaultValue={film.filmyear} placeholder="Film Year"
              onChange={(e) => {setFilmYear(e.target.value);
              }} required/>
              <label for="floatingInput">Film Year</label>
                  </div>
        </div>
        <br/>

        <div className="row g-2">
          <div className="col-md-6 form-floating">
          <input type="text" className="form-control logininput" id="url" defaultValue={film.genres} placeholder="Genres"
                      onChange={(e) => {
                        setGenres(e.target.value);
                      } } required/>
                      <label for="floatingInput">Genres</label>
              
          </div>

          <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" id="url" defaultValue={film.trailer} placeholder="Trailer Url"
                      onChange={(e) => {
                        setTrailer(e.target.value);
                      } } required/>
                      <label for="floatingInput">Trailer Url</label>
                  </div>
        </div>
        <br/>

<div className="row g-2">
  <div className="col-md-6 form-floating">
  <input type="text" className="form-control logininput" {...register("duration",{ pattern:/^[0-9]+h [0-9]+m+$/i})} id="duration" defaultValue={film.duration} placeholder="Duration"
              onChange={(e) => {
                setDuration(e.target.value);
              } } required/>
              <label for="floatingInput">Duration</label>
              <p style={{ color:"red"}}>*Please Use duration pattern 00h 00m</p>
              {errors.duration && (<p style={{ color:"red"}}>*Please use correct pattern</p> )}
      
  </div>

  <div className="col-md-6">
            <select type="text" className="form-control logininput" id="url" defaultValue={film.state} placeholder="State"
              onChange={(e) => {
                setState(e.target.value);
              } } required>      
              <option selected>{film.state}</option>
             {film.state === "Watched"? <option>To Be Watched</option> : <option>Watched</option>}
             </select>
          </div>
</div>

        <br/>
<div className="col-md-6">
                      &nbsp;&nbsp;<label for="floatingInput">Film Description</label> 
                      <textarea rows="3" className="form-control logininput" id="discription" defaultValue={film.description} placeholder="discription"
              onChange={(e) => {setDescriptin(e.target.value);
              }} required/>
                                 
             
          </div>
          <br/>   
      <button type="submit" className="btnregister" onClick={handleSubmit(updateData)} id="regsubmit">Submit</button>&nbsp;&nbsp;
      <Link to={"/user/viewfilm/" +film._id}><button className="btnreset" id="cancel">Cancel</button></Link>

      </form>
      </div>
      </div>
      <br/>
    </div>
    <br/>
    </>
  )
}