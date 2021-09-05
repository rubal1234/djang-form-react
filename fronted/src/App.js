import React, { useState,useEffect } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import validator from 'validator';
import './App.css';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken"; 
function App () {
  

  const [name,setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const [name_tf,setNameTF] = useState(false);

  const [email,setEmail] = useState("");
  const [email_tf,setEmailTF] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

const convert = (str) => {
  var mnths = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    },
    date = str.split(" ");
  return [date[3], mnths[date[2]], date[1]].join("-");
}

const [dob,setDOB] = useState();
var date = new Date();
var new_date = date.toUTCString();
var new_date2 = convert(new_date);

const handleBirth = (e) => {
  setDOB(e.target.value);
}
const[dobtf,setDOBTF] = useState(false);
const [number,setNumber] = useState(null);
const handleNumber = (e) => {
  setNumber(e.target.value);
}
const [toggle,setToggle] = useState(true);
const[numbertf,setNumberTF] = useState(false);

  const handleSubmit = (e) => {
    if(name.trim() === ""){
        setNameTF(true);
    }else{
       setNameTF(false);
    }

    if(!validator.isEmail(email)){
      setEmailTF(true);
    }else{
      setEmailTF(false);
    }
    if(dob === undefined){
      setDOBTF(true);
    }else{
       var mydate = dob.split('-');
       var today = new_date2;
       var today_date = today.split('-');
       if((today_date[0]-mydate[0]) >= 18){
         setDOBTF(false);
       }else{
         setDOBTF(true);
       }
      }  
    
    if(number === null || number.length !== 10){
     setNumberTF(true);
    }else{
      setNumberTF(false);
    }
    if(name.trim() !== "" && email.trim() !== "" && dob !== undefined && number !== null){
       var mydate = dob.split('-');
       var today = new_date2;
       var today_date = today.split('-');
      if((today_date[0]-mydate[0]) >= 18 && number.length === 10){
      axios ({
        method : 'post',
        url : 'api/form/',
        data : {
          name : name,
          dob : dob,
          email : email,
          number : number,
        }
       });
       setToggle(false);
      }else{
      setToggle(true);  
      }
      
    }
  }
 

    return (
    <React.Fragment>
    {toggle ? (

    <main className="container">
      <div className="row">
        <div className = "col-12 mt-5 p-4 form-div">
          <h4 className = "text-center py-2">User Form</h4>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" onChange = {handleNameChange} value = {name} placeholder = "Enter Your name..."/>
            </div>
            {name_tf ? (
             <div className="alert alert-danger alert-dismissible fade show">
               <span>Invalid Name</span> 
              </div>
              ) : (
                null
              )}


            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" className="form-control" onChange = {handleBirth} value = {dob} />
            </div>
            {dobtf ? (
                <div className="alert alert-danger alert-dismissible fade show">
                  <span>Age must be greater or equal to 18</span> 
                </div>
              ) : (
                 null
              )}

            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" onChange = {handleEmailChange} value = {email} placeholder = "Enter Your email..." />
            </div>

            {email_tf ? (
             <div className="alert alert-danger alert-dismissible fade show">
               <span>Invalid Email</span> 
              </div>
              ) : (
                null
              )}

            <div className="form-group">
              <label>Phone Number</label>
              <input type="number" className="form-control"  onChange = {handleNumber} value = {number} placeholder = "Enter Your number..."  />
            </div>
            {numbertf ? (
               <div className="alert alert-danger alert-dismissible fade show">
               <span>Number must be of 10 digits</span> 
              </div>
              ) : (
                null
              )}
          </form>
            <div className = "text-center">
              <button type="submit" className="btn btn-primary" onClick = {handleSubmit}>Submit</button>
            </div>
        </div>
      </div>
    </main>
     ) : (
      <Modal/>
     )}
    </React.Fragment>
    );
}

export default App;
