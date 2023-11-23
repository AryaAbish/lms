import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table';
import { ArrowRight, Trash } from 'react-feather';
import { removeCart, reset } from '../redux/cartSlice';
import { Col, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import {  Link } from 'react-router-dom';

function Cart() {

  const dispatch=useDispatch()

  const [details,setdetails]=useState({
    address:"",pay:""
  })

  const [card,setcard]=useState(false)
  const cartArray=useSelector(state=>state.cart)
    // console.log(cartArray);
    if(cartArray.length!=0){
      var total=cartArray.map(i=>i.price).reduce((n,m)=>n+m)
    }
    else{
      var total=0
      var delcharge=0
      var ttlamnt=0
    }

    if(total>500){
      var delcharge="FREE"
      var ttlamnt=total
    }
    else if(total<500 && total>0){
      var delcharge=50
      var ttlamnt=total+delcharge
    }
    
  const handleremovecart=(id)=>{
    dispatch(removeCart(id))
    toast.success("Removed from cart")
  }

  const setorderdetails=(e)=>{
    const {value,name}=e.target
    // console.log((e.target.name));
    // console.log((e.target.value));
    setdetails({...details,[name]:value})
  }
  // console.log(details);

  const placeorder=()=>{
    toast.warn("Please Login to continue")
  }

  return (
    <div>
      <h2 className='ms-5 mt-5'>My cart ({cartArray.length})</h2>
     
          <Row className='my-4'>
          <Col className='bg-light ms-5 p-3'>
            <Table className='container text-center'>
          <tbody>
          {
        cartArray.length>0? cartArray.map(i=>(
                <tr>
                <td className='bg-light' style={{border:'none'}}><img src={i.img} alt="" style={{height:'100px'}} /></td>
              <td className='bg-light' style={{border:'none'}}>{i.name}</td>
              <td className='bg-light' style={{border:'none'}}><b>₹ {i.price}</b></td>
              <td className='bg-light' style={{border:'none'}}><Trash onClick={()=>handleremovecart(i?._id)}></Trash></td>
            </tr>
             )):<div className=''><img src="https://th.bing.com/th/id/OIP.tr-g8hu0-qTz2Wzk8QDAOAHaFX?pid=ImgDet&rs=1" /><br />
             <Link to={'/'} className="btn btn-warning m-4">Continue Shopping <ArrowRight /></Link></div>
           }
          </tbody>
        </Table>
          </Col>
          <Col>
          <div className='mx-5 bg-light container w-50 p-5'>
            <h6>Price Details</h6>
            <hr />
            <h6>Price ({cartArray.length}) items <span className='float-end'><b>₹ {total}</b></span></h6>
            <h6>Delivery Charges <span className='float-end'><b>{delcharge}</b></span></h6>
            <h6>Toal Amount <span className='float-end fs-1'><b>{ttlamnt}</b></span></h6>
            <button onClick={()=>placeorder()} className='btn mt-5' style={{backgroundColor:'#ff0066'}}>Place Order</button>
          </div>
          </Col>
       </Row>
       <ToastContainer />
    </div>
  )
}

export default Cart