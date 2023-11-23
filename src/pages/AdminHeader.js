import React, { useEffect } from 'react'
import Main from './Main'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { addbooks, allbooks } from '../service/allapi';

function AdminHeader() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [input,setInput]=useState({
    name:"",
    category:"",
    price:"",
    author:"",
    language:"",
    publisher:"",
    isbn:"",
    img:""
  })

  const setBook=(e)=>{
    e.preventDefault()
    const {value,name}=e.target
    // console.log(e.target.name);
    setInput({...input,[name]:value})
  }

  const add=async(e)=>{
    e.preventDefault()
    const {name,category,price,author,language,publisher,isbn,img}=input
    if(name==""){
      alert("Enter Book Name")
    }
    else if(category==""){
      alert("Enter Category")
    }
    else if(price==""){
      alert("Enter Price")
    }
    else if(author==""){
      alert("Enter Author")
    }
    else if(language==""){
      alert("Enter Language")
    }
    else if(publisher==""){
      alert("Enter Publisher")
    }
    else if(isbn==""){
      alert("Enter ISBN")
    }
    else if(img==""){
      alert("Enter Image Link")
    }
    else{
      const result=await addbooks(input)
      console.log(result);
      if(result.status>=200 && result.status<300){
        setShow(false);
        allbooks()
        alert(result.data +" " + "Added Successfully")
      }
      else{
        alert(result.response.data)
        setShow(false);
      }
    }
  }

  return (
    <div>
      <div className='text-center'>
        <Button className='btn m-5' onClick={handleShow} style={{backgroundColor:'#ff0066'}}>Add Books</Button>
        <Link to={'/users'}><Button className='btn m-5' style={{backgroundColor:'#ff0066'}}>View Users</Button></Link>
        <Link to={'/orders'}><Button className='btn m-5' style={{backgroundColor:'#ff0066'}}>View Orders</Button></Link>
      </div>
      
      <Main></Main>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:'#ff0066'}}>Add Books</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
      <input onChange={(e)=>setBook(e)} name="name" type="text" placeholder='Book Name' className='form-control m-2' />
      {/* <input onChange={(e)=>setBook(e)} name="category" type="text" placeholder='Category' className='form-control m-2' /> */}
      <select onChange={(e)=>setBook(e)} name="category" className='form-select'>
        <option value="select" disabled selected>-Select Category-</option>
        <option value={"Fiction"} className='form-check-input' >Fiction</option>
        <option value={"Fiction"} className='form-check-input' >Philosaphy</option>
        <option value={"Nonfiction"} className='form-check-input' >Non-Fiction</option>
        <option value={"Children"} className='form-check-input' >Children</option>
      </select>
      <input onChange={(e)=>setBook(e)} name="price" type="number" placeholder='Price' className='form-control m-2' />
      <input onChange={(e)=>setBook(e)} name="author" type="text" placeholder='Author' className='form-control m-2' />
      <input onChange={(e)=>setBook(e)} name="language" type="text" placeholder='Language' className='form-control m-2' />
      <input onChange={(e)=>setBook(e)} name="publisher" type="text" placeholder='Publisher' className='form-control m-2' />
      <input onChange={(e)=>setBook(e)} name="isbn" type="number" placeholder='ISBN' className='form-control m-2' />
      <input onChange={(e)=>setBook(e)} name="img" type="text" placeholder='Image' className='form-control m-2' />

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e)=>add(e)} style={{backgroundColor:'#ff0066'}}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/> */}
    </div>
  )
}

export default AdminHeader