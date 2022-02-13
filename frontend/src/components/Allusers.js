import React,{useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import jspdf from 'jspdf'
import "jspdf-autotable"

export default function Allusers(){

  let history = useHistory();
  let path = '/user/profile';
  const [searchTerm, setsearchTerm] = useState("");
  const [user, setUser] = useState([]);

  const deleteUser=(id) =>{
    swal({
        title: "Are you sure?",
        text: "The User Will be removed from System",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
    axios.delete(`/user/delete/${id}`).then(()=>{
      axios.delete(`/film/deleteall/${id}`).then(()=>{
          
        if (willDelete) {
          swal("The User has been deleted!", 
          {icon :"success",});  
          setTimeout(function(){
          window.location.reload();
           },1000);
        } else {
          swal("User Is Not Deleted");}
      })
    });
  }
  })
} 

function myRefresh(){
  window.location.reload();
}

useEffect(()=>{
  const getUser = async()=>{
   const res = await axios.get('/user/alluser').then((res)=>{
      setUser(res.data);
    }).catch(()=>{
      history.push(path);
      swal({title: "Unauthorized",
      text: "Your not an admin",
      icon: "warning"} ); 
  })
  }
  getUser();
}, [])

const generatePDF = tickets => {

  const doc = new jspdf();
  const tableColumn = ["First name","Last name", "email", "Username", "Role"];
  const tableRows = [];
  

  tickets.map(ticket => {
      const ticketData = [
          ticket.firstname,
          ticket.lastname,
          ticket.email,
          ticket.username,
          ticket.role        
      ];
      tableRows.push(ticketData);
  })
  doc.text("All Users Report", 14, 15).setFontSize(12);
  const date = Date().split(" ");
  const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    


  // right down width height
  // doc.addImage(img, 'JPEG', 170, 8, 25, 15);
  doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
  doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
  doc.save(`allusers_report_.pdf`);
  
};

  return(
    <>
    <br/>
    <div className="container">
    <br/>
      <center><h1 style={{letterSpacing:"5px", fontSize:"30px" , fontWeight:"600"}}>ALL USERS</h1></center>
      <br/>
    <input className="search" type="text" placeholder="Search" aria-label="Search"  
      onChange={(e) => {
          setsearchTerm(e.target.value)
      }}/>
      <div className="reportbtn" style={{padding:"10px"}}>
      <button type="button" className="btnregister" onClick={() => generatePDF(user)}>GenerateReport</button>
        </div>
        <br/><br/>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>username</th>
                  <th>Role</th>
            </tr>
          </thead>
          <tbody>
          {user.filter(val=>{
                          if (searchTerm === ''){
                              return val;
                          } else if(
                              val.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              val.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              val.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              val.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              val.role.toLowerCase().includes(searchTerm.toLowerCase())
                          ){
                              return val;
                          }
                      }).map((user,key)=>(
                        <tr key={key}>
                            <td className="damfont">{user.firstname} {user.lastname}</td>
                            <td className="damfont">{user.email}</td>
                            <td className="damfont">{user.username}</td>
                            <td className="damfont">{user.role}</td>

                            <td><IconButton aria-label="delete"  onClick={() =>  deleteUser(user._id)}>
                         <DeleteForeverIcon fontSize="medium" color="secondary"/> 
                         </IconButton></td>
                        </tr>
                      ))}
          </tbody>
        </table>
    </div>
    </>
  )
}