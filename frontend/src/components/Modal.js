import React, { Component,useState,useEffect } from "react";
import './Modal.css'
import axios from "axios";
function Modal(props){
  const [list,setlists] = useState([]);
  useEffect(() => {
      axios
      .get("/api/form/")
      .then((res) => setlists( res.data ))
      .catch((err) => console.log(err));
     },[]);

 console.log(list,"aaa");
  return(
    <>
    <div className = "container mt-5 py-4">
     <div className = "row">
      <div className = "col text-center">
       <h2>All Submitted Forms</h2>
      </div>
     </div>
    </div>
    <div className = "container">
     <div className = "row">
     {list.map(lists => (
       <div key = {lists.id} className = "col-5  mx-auto info_div mt-3 py-4 rounded">
         <span key = {lists.id}><span key = {lists.id} className = "name_info">Name : </span> {lists.name}</span><br/>
         <span key = {lists.id}><span key = {lists.id} className = "email_info">Email : </span> {lists.email}</span><br/>
         <span key = {lists.id}><span key = {lists.id} className = "dob_info">DOB : </span> {lists.dob}</span><br/>
         <span key = {lists.id}><span key = {lists.id} className = "number_info">Phone Number : </span> {lists.number}</span><br/>
       </div>
      ))}
      </div>
     </div>
     </>
    )
}
export default Modal;