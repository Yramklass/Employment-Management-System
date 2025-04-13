import React, { createElement, useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { spread } from 'axios'

const EmployeeComponent = () => {

  const [fname, setFirstName] = useState('')
  const [sname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const navigator =  useNavigate();
  const {id} = useParams();

  useEffect(()=>{  
    if (id){
        getEmployee(id).then((response)=> {
        setFirstName(response.data.fname);
        setLastName(response.data.sname);
        setEmail(response.data.email);
      }
      ).catch((error) => {console.error(error);})
    }
  }, [id]);
  

  const [errors, setErrors] = useState({
    fname:'',
    sname:'',
    email:''

  });

  function validateForm(){
    let valid = true;

    const errorsCopy = {... errors}

    if (fname.trim()){
      errorsCopy.fname = '';
    }
    else {
      errorsCopy.fname = 'First name is required.';
      valid = false;
    }

    if (sname.trim()){
      errorsCopy.sname = '';
    }
    else{
      errorsCopy.sname = 'Last name is required.'
      valid = false;
    }

    if (email.trim()){
      errorsCopy.email = '';
    }
    else{
      errorsCopy.email = 'Email is required.'
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;

  }

  function handleFirstName(e){          //cont handleFirstName = (e) => setFirstName(e.target.value);
    setFirstName(e.target.value); 
  }

  function handleLastName(e){
    setLastName(e.target.value);
  }

  function handleEmail(e){
    setEmail(e.target.value);
  }

  function saveOrUpdateEmployee(e){
    e.preventDefault();

    if (validateForm()){
      const employee = {fname,sname,email};
      if(id){
        updateEmployee(id,employee).then((response) => {
          console.log(response.data);
          navigator("/employees")
        }).catch((error) =>{
          console.error(error)
        })
      }
      else{
      createEmployee(employee).then((response) => {
      console.log(response.data);
      navigator('/employees');
    }).catch((error) => {console.error(error)})
  }
    }
    else {
      
    }



  }

  function pageTitle(){

    if (id){
      return <h2 className='text-center'>Update Employee</h2>
    }
    else{
      return <h2 className='text-center'>Add Employee</h2>
    }
  }

  return (
    <div className='container'>
      <br></br>
      <br></br>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {pageTitle()}
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name:</label>
                <input
                type = 'text'
                placeholder='Enter Employee First Name'
                name='firstname'
                value={fname}
                className= {`form-control ${ errors.fname ? 'is-invalid':''}`}
                onChange={handleFirstName}
                >
                </input>
                {errors.fname && <div className='invalid-feedback'>{errors.fname}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Last Name:</label>
                <input
                type = 'text'
                placeholder='Enter Employee Last Name'
                name='lastname'
                value={sname}
                className= {`form-control ${ errors.sname ? 'is-invalid':''}`}
                onChange={handleLastName}
                >
                </input>
                {errors.sname && <div className='invalid-feedback'>{errors.sname}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Email:</label>
                <input
                type = 'text'
                placeholder='Enter Employee Email'
                name='email'
                value={email}
                className= {`form-control ${ errors.email ? 'is-invalid':''}`}
                onChange={handleEmail}
                >
                </input>
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>

              <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
            </form>
          </div>

        </div>

      </div>
        

    </div>
  )
}

export default EmployeeComponent