import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginuser } from '../service/allapi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { cartcontext, whishcontext } from '../components/ContextShare';
import { Col, Row } from 'react-bootstrap';

function Login() {

    //to store inputs
    const [input,setInput]=useState({
        email:"",
        psw:""
    })

    const [emailvalid,setemailvalid]= useState(true)
    const [usernamevalid,setusernamevalid]=useState(true)

    const navigate=useNavigate()
    const {cartdata,setcartdata}=useContext(cartcontext)
    const {whishdata,setwhishdata} = useContext(whishcontext)


    const setLogin=(e)=>{
        const {value,name}=e.target
        // console.log(e.target.name);
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
                setusernamevalid(true)
                setInput({...input,[name]:value})
            }
            else{
                setusernamevalid(false)
            }
        }
    }
    const login=async(e)=>{
        e.preventDefault()
        const {email,psw}=input
        if(email==""){
           alert("Enter Email") 
        }
        else if(psw==""){
            alert("Enter psw")
        }
        else{
            const result=await loginuser(input)
            // console.log(result);
            if(result.status>=200 && result.status<300){
                localStorage.setItem("username",result.data.uname)
                localStorage.setItem("id",result.data.id)
                localStorage.setItem("email",result.data.email)
                setcartdata(result.data.cartlen)
                setwhishdata(result.data.whishlen)
                alert("Login Success")
                if(result.data.email==="one@gmail.com"){
                    navigate('/adminheader')
                }
                else{
                    navigate('/mainHome')
                }
            }
            else{
                toast.error(result.response.data)
            }
        }
    }

    return (
        <div style={{backgroundImage:'url("https://images6.alphacoders.com/330/330109.jpg")'}} className='p-5'>
            <Row className='p-5'>
                <Col></Col>
                <Col className='p-5'>
                <div className='container p-5'>
                <h1 className='text-center font'>Login</h1>
                <input onChange={(e)=>setLogin(e)} className='form-control' name="email" type="text" placeholder='Enter email' /><br></br>
                { !emailvalid && <div><p className='text-danger'>* Enter Valid Email Id !</p></div>}
                <input onChange={(e)=>setLogin(e)} className='form-control' name="psw" type="psw" placeholder='Enter Pswd' /><br></br>
                { !usernamevalid && <div><p className='text-danger'>* Accepts Characters and Numbers Only !</p></div>}
                <button onClick={(e)=>login(e)} className='btn float-end' style={{backgroundColor:'#ff0066'}}>Login</button>
                <p>Have no account? <Link to={'/register'} style={{textDecoration:'none', color:'#ff0066'}}>Register Here!</Link></p>
            </div>
                </Col>
            </Row>
            
            <ToastContainer/>
        </div>
    )
}

export default Login