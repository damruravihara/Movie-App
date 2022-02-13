import React,{useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import './register.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const eye = <FontAwesomeIcon icon={faEye} />;

export default function Register(){

  const [passwordShown, setPasswordShown] = useState(false);

  let history = useHistory();
  let path = '/public/login';

  const { register, handleSubmit, formState: { errors }} = useForm();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [user, setUser] = useState([]);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [profilepic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  // const [role, setRole] = useState("");

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

    // const newUser ={

    //   firstname,
    //   lastname,
    //   profilepic,
    //   email,
    //   username,
    //   password,
    //   // role="user"
    // }

    // axios.post("http://localhost:8070/user/Tregister",newUser).then(()=>{
    //  // refresh()
    //   swal({
    //   title: "Success!",
    //   text: "Supplier Successfully registered",
    //   icon: "success",
    //   button: "Ok",
    // });history.push(path);
    // }).catch((err)=>{
    //   swal("Please fill Form correctly" +err);
    // })
  }
  function sendData(e){
   
    // const data = new FormData()
    // data.append("file",image)
    // data.append("upload_preset","movie-app")
    // data.append("cloud_name","padfoot")
    // fetch("https://api.cloudinary.com/v1_1/padfoot/image/upload",{
    //   method:"post",
    //   body:data 
    // })
    // .then(res=>res.json())
    // .then(data=>{
    //   setProfilePic(data.url)
    // })
    // .catch(err=>{
    //   console.log(err)
    // })
    // e.preventDefault();
    
    const newUser ={

      firstname,
      lastname,
      profilepic,
      email,
      username,
      password,
      // role="user"
    }

    axios.post("http://localhost:8070/user/Tregister",newUser).then(()=>{
     // refresh()
      swal({
      title: "Success!",
      text: "Supplier Successfully registered",
      icon: "success",
      button: "Ok",
    });history.push(path);
    }).catch(()=>{
      swal("Please fill Form correctly");
    })


  };
  

  return(
    <>
    <br/>
    <div className="container">
    <h6 style={{padding:"10px", fontSize:"18px"}}>Already Have an Account <Link to="/public/login">Login</Link></h6>
    <hr/>
      <center><h1 style={{letterSpacing:"5px", fontSize:"30px" , fontWeight:"600"}}>REGISTER</h1></center>
      <div className="register">
      <div className="registerin" style={{margin:"20px"}}>

      <form onSubmit={handleSubmit(sendData)}  className="needs-validation" noValidate>
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
            <input type="text" className="form-control logininput" id="firstname" placeholder="First Name"
              onChange={(e) => {setFirstName(e.target.value);
              }} required/>
              <label for="floatingInput">First Name</label>
          </div>

          <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" id="lastname" placeholder="Last Name"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      } } required/>
                      <label for="floatingInput">Last Name</label>
                  </div>
        </div>

        <br/>
        <div className="row g-2">
          <div className="col-md-6 form-floating">
          <input type="text" className="form-control logininput" {...register("username", { minLength: 6, maxLength: 15 })} id="username" placeholder="Username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      } } required/>
                      <label for="floatingInput">Username</label>
                      {/* {errors.username && (<p>*Username must be minimum 6 letters and maximum 15 letters </p>)} */}
                      {errors?.username?.type=== "minLength" && (<p style={{ color:"red"}}>*Username must be minimum 6 letters</p>)}
                      {errors?.username?.type=== "maxLength" && (<p style={{ color:"red"}}>*Username must be maximum 15 letters</p>)}
             
          </div>

          <div className="col-md-6 form-floating">
          <input type="text" className="form-control logininput" {...register("email",{ pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/})} id="email" placeholder="Email Address"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      } } required/>
                      <label for="floatingInput">Email Address</label>
                      {errors.email && (<p style={{ color:"red"}}>*email format is Incorrect</p> )}
                  </div>
        </div>
        <br/>
          <div className="input-group col-md-6 form-floating">
          <input type={passwordShown ? "text" : "password"} {...register("password", { minLength: 8})} className="form-control logininput" id="password" placeholder="Enter Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      } } required />
                      
                      <span class="input-group-text" id="basic-addon2"><i className="eye1" onClick={togglePasswordVisiblity}>{eye}</i></span>
                      <label for="floatingInput">Password</label>
                      {/* <button class="btn bg-white text-muted"> <span class="far fa-eye-slash"></span> </button> */}
                      {errors?.password?.type === "minLength" && (<p style={{ color:"red"}}>*Password must contain minimum 8 characters </p> )}
             
          </div>



                    <br/>
                    <button type="submit" className="btnregister" id="regsubmit">Submit</button>&nbsp;&nbsp;
                <button type="reset" className="btnreset" id="regreset">Reset</button>

      </form>
      </div>
      </div>
      <br/>
          

    </div>
    <br/>
    </>
  )
}