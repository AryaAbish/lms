import React, { useEffect, useState } from 'react'
import { allorders } from '../service/allapi'
import { Table } from 'react-bootstrap'

function Orders() {

  const [orders,setorders]=useState([])
  const allorder=async()=>{
    const {data} =await allorders()
    // console.log(data);
    setorders(data)
  }

  useEffect(()=>{
    allorder()
  },[])

  return (
    <div>
      <h1 className='text-center' style={{color:'#ff0066'}}>Order Details</h1>
       <Table striped="columns" className='container border my-3'>
      <thead>
        <tr>
          <th style={{color:'#ff0066'}}>User Id</th>
          <th style={{color:'#ff0066'}}>Order Id</th>
          <th style={{color:'#ff0066'}}>Address</th>
          <th style={{color:'#ff0066'}}>Items</th>
          <th style={{color:'#ff0066'}}>Total Amount</th>
          <th style={{color:'#ff0066'}}>Payment Type</th>
          <th style={{color:'#ff0066'}}>Order Status</th>
        </tr>
      </thead>
      <tbody>
       { orders.length>0 ? orders.map(i=>(
        <tr>
        <td>{i.user}</td>
        <td>{i._id}</td>
        <td>{i.address}</td>
        <td>{i.cart.map(j=><img src={j.img}  style={{height:'50px',width:'100px'}} className='m-3'/>)}</td>
        <td>{i.ttlamnt}</td>
        <td>{i.pay}</td>
        <td>{i.orderStatus}</td>
      </tr>
       )):
        <h1>No Orders Yet</h1>
        }
      </tbody>
    </Table>
    </div>
  )
}

export default Orders