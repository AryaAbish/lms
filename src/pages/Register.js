import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registeruser } from '../service/allapi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Col, Row } from 'react-bootstrap';

function Register() {

    //to store inputs
    const [input,setInput]=useState({
        name:"",
        email:"",
        psw:""
    })

    const [namevalid,setnamevalid]=useState(true)
    const [emailvalid,setemailvalid]=useState(true)
    const [password,setpasswordvalid]=useState(true)

    const navigate=useNavigate()
    const setRegister=(e)=>{
        const {value,name}=e.target
        // console.log(e.target.name);
        if(name=='name'){
            if(value.match(/^[a-zA-Z0-9]+$/)){
                setnamevalid(true)
                setInput({...input,[name]:value})
            }
            else{
                setnamevalid(false)
            }
        }
        if(name=='email'){
            if(value.match((/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))){
                setemailvalid(true)
                setInput({...input,[name]:value})
            }
            else{
                setemailvalid(false)
            }
        }
        if(name=='psw'){
            if(value.match(/^[a-zA-Z0-9]+$/)){
                setpasswordvalid(true)
                setInput({...input,[name]:value})
            }
            else{
                setpasswordvalid(false)
            }
        }
    }

    const register=async(e)=>{
        e.preventDefault()
        const {name,email,psw}=input
        if(name==""){
            alert("Enter UserName")
        }
        else if(email==""){
            alert("Enter email")
        }
        else if(psw==""){
            alert("Enter psw")
        }
        else{
            const result= await registeruser(input)
            console.log(result); 
            if(result.status>=200 && result.status<300){
                setInput({...input,
                name:"",
                email:"",
                psw:""
            })
            toast(result.data+" "+ "Registered Successfully")
            navigate('/login')
            }
            else{
                setInput({...input,
                    name:"",
                    email:"",
                    psw:""
                })
                alert(result.response.data)
            }
        }
    }

  return (
    <div style={{backgroundImage:'url("https://i.pinimg.com/originals/2a/6f/f3/2a6ff37f2d7be496117a2e22aeac67fc.jpg")'}}>
        <Row className='p-5'>
            <Col className='p-3'>
            <div className='container p-5 my-5'>
            <h1 className='text-center font'>SignUp</h1>
            <input onChange={(e)=>setRegister(e)} className='form-control' name="name" type="text" placeholder='Enter User Name' /><br></br>
            {!namevalid && <div><p className='text-danger'>* Accepts Characters and Numbers Only </p></div>}
            <input onChange={(e)=>setRegister(e)} className='form-control' name="email" type="text" placeholder='Enter email' /><br></br>
            {!emailvalid && <div><p className='text-danger'>* Enter valid Email Id </p></div>}
            <input onChange={(e)=>setRegister(e)} className='form-control' name="psw" type="psw" placeholder='Enter Pswd' /><br></br>
            {!password && <div><p className='text-danger'>* Accepts Characters and Numbers Only </p></div>}
            <button onClick={(e)=>register(e)} className='btn float-end' style={{backgroundColor:'#ff0066'}}>Register</button>
            <p>Already have account? <Link to={'/login'} style={{textDecoration:'none', color:'#ff0066'}}>Login</Link></p>
        </div>
            </Col>
            <Col></Col>
        </Row>
         
        <ToastContainer />
    </div>
  )
}

export default Register