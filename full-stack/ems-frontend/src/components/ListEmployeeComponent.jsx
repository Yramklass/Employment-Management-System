import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

function ListEmployeeComponent() {

    //Connecting backend to frontend
    const [employees,setEmployees] = useState([])
    const navigator = useNavigate();
    
    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees(){
        listEmployees().then((response) => {    //listEmployees sends a GET message to backend (EmployeeService.js function)
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
   

    function addNewEmployee() {
        navigator("/add-employee")

    }

    function updateEmployee(id){
        navigator(`/update-employee/${id}`)

    }

    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then((response) => {
            getAllEmployees();
            
        }).catch((error)=> {
            console.error(error);
        });

    }

  return (
    <div className='container'>
        <br></br>
        <br></br>
        <h2 className='text-center'>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Surname</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                employees.map(employee => 
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.fname}</td>
                        <td>{employee.sname}</td>
                        <td>{employee.email}</td>
                        <td><button className='btn btn-info' onClick= {() => updateEmployee(employee.id)}>Update</button>
                        <button className='btn btn-dangerq' onClick={() => removeEmployee(employee.id)} style= {{marginLeft: '10px'}}>
                            Delete</button>  
                        </td>
                    </tr>
                    )
                }

                
            </tbody>
        </table>    
    </div>
  )
}

export default ListEmployeeComponent