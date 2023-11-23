import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { deleteuser, viewusers } from '../service/allapi';
import { Trash2 } from 'react-feather';

function Users() {

    const [users,setusers]=useState([])
    const uname = localStorage.getItem("username")

    const getusers=async()=>{
        const {data} = await viewusers()
        setusers(data)
    }
    useEffect(()=>{
        getusers()
    },[])
    // console.log(users);

    const deleteusr=async(id)=>{
        const result=await deleteuser(id)
        // console.log(result);
        if(result.status>=200 && result.status<300){
          getusers()
          alert("Account deleted")
        }
        else{
          alert("User not found")
        }
    }
    
  return (
    <div>
        <h1 className='text-center' style={{color:'#ff0066'}}>Users</h1>
        <Table striped bordered hover className='container text-center'>
      <thead>
        <tr>
          <th style={{color:'#ff0066'}}>#</th>
          <th style={{color:'#ff0066'}}>Id</th>
          <th style={{color:'#ff0066'}}>Name</th>
          <th style={{color:'#ff0066'}}>Email</th>
          <th style={{color:'#ff0066'}}>Action</th>
        </tr>
      </thead>
      <tbody>
        { users.map((i,index)=>(
             <tr>
             <td>{index+1}</td>
             <td>{i._id}</td>
             <td>{i.name}</td>
             <td>{i.email}</td>
             <td><button className='btn'><Trash2 onClick={()=>deleteusr(i._id)} className='text-danger'></Trash2></button></td>
           </tr>
        ))
           
        }
      </tbody>
    </Table>
        
    </div>
  )
}

export default Users