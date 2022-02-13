import React, {useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Updateprofile(){

  let history = useHistory();
  let path = '/public/login';
  let path2 = '/user/profile';
  const{ id } = useParams();


  const { register, handleSubmit, formState: { errors }} = useForm();

  const [user, setUser] = useState([]);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [profilepic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");



  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get('/user/userprofile').then((res)=>{
      setUser(res.data)
      setFirstName(res.data.firstname)
      setLastName(res.data.lastname)
      setProfilePic(res.data.profilepic)
      setEmail(res.data.email)
      }).catch(()=>{
        history.push(path);
        swal({title: "unauthorized",
        text: "Please Login First",
        icon: "warning"} ); 
    })
  }
    fetchUser();
  },[]);
  const postDetails = async e=>{
    const files = e.target.files
    const data = new FormData()
    data.append("file",files[0])
    // data.append("file",image)
    data.append("upload_preset","movie-app")
    data.append("cloud_name","padfoot")
    data.append("folder","users")
    const res = await
    fetch("https://api.cloudinary.com/v1_1/padfoot/image/upload",{
      method:"post",
      body:data 
    })
    .then(res=>res.json())
    .then(data=>{
      setProfilePic(data.url)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  function updateData(e) {
    // e.preventDefault();
    const userupdate = {
      firstname,
      lastname,
      profilepic,
      email}

  axios.put(`/user/userupdate/${id}`,userupdate).then(()=>{


    swal({          
  title: "Success!",
  text: "Profile Successfully Updated",
  icon: "success",
  button: "Ok",
});history.push(path2);
    }).catch((e)=>{
       swal("Please fill Form correctly " +e);
      })

};

  return(
    <>
    <br/>
<div className="container">
<br/>
<center><h1 style={{letterSpacing:"5px", fontSize:"30px" , fontWeight:"600"}}>UPDATE PROFILE</h1></center>
<div className="register">
<div className="registerin" style={{margin:"40px"}}>


<form className="needs-validation" noValidate>
<center><div className="col-md-6">
<label for="floatingInput" style={{marginBottom:"10px", fontSize:"18px"}}>Profile Picture</label><br/>
                      <label for="profilepic" style={{marginBottom:"20px"}}>
                      <div className="card border-dark mb-3 regposter">
                      {profilepic === ""?<center><h4 style={{marginTop:"50px"}}> Profile Picture Preview </h4></center>:<center><img src={profilepic} className="posterimg" style={{marginTop:"3px",width: "222px", height: "222px", borderRadius: "50%"}}/></center>}
                      </div></label>
                      <br/>
                    <input type="file" className="form-control logininput" id="profilepic" placeholder="Profile Picture"
                      onChange={postDetails}/>
                                 
             
          </div></center>
          <br/>
<div className="row g-2">
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="firstname" defaultValue={user.firstname}
              onChange={(e) => {setFirstName(e.target.value);
              }} required/>
              <label for="floatingInput">First Name</label>
          </div>

          <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" id="lastname" defaultValue={user.lastname}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      } } required/>
                      <label for="floatingInput">Last Name</label>
                  </div>
        </div>

        <br/>
          <div className="col-md-6 form-floating">
          <input type="text" className="form-control logininput" {...register("email",{ pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/})} id="email" defaultValue={user.email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      } } required/>
                      <label for="floatingInput">Email Address</label>
                      {errors.email && (<p>*email format is Incorrect</p> )}
             
          </div>

        <br/>

                    <button type="submit" onClick={handleSubmit((e) =>updateData(e))} className="btnregister" id="regsubmit">Submit</button>&nbsp;&nbsp;
                    <Link to={"/user/profile"}><button className="btnreset" id="cancel">Cancel</button></Link>

      </form>
      </div>
      </div>
      <br/>
      </div>
      <br/>
    </>
  )
}