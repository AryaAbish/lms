import React, { useEffect, useState } from 'react'
import { myorders } from '../service/allapi'
import Table from 'react-bootstrap/Table';

function Myorders() {

    const [cart,setcart]=useState([])

    const id= localStorage.getItem("id")
    const order=async()=>{
        const {data} = await myorders(id)
        setcart(data)
    }
    // console.log(cart);

    useEffect(()=>{
        order()
    },[])
  return (
    <div>
         <Table striped="columns" className='container border my-3'>
      <thead>
        <tr>
          <th>Order Id</th>
          <th>Address</th>
          {/* <th>Date</th> */}
          <th>Items</th>
          <th>Total Amount</th>
          <th>Payment Type</th>
          <th>Order Status</th>
        </tr>
      </thead>
      <tbody>
       { cart.length>0 ? cart.map(i=>(
        <tr>
        <td>{i._id}</td>
        <td>{i.address}</td>
        {/* <td>{i.date}</td> */}
        <td>{i.cart.map(j=><img src={j.img}  style={{height:'50px',width:'100px'}} className='m-3'/>
          )}</td>
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

export default Myorders