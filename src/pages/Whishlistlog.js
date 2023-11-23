import React, { useContext, useEffect, useState } from 'react'
import { Col, Table } from 'react-bootstrap'
import {  ArrowRight, ShoppingCart, Trash } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify'
import { addtocartapi, removewhishlist, viewwhishlist } from '../service/allapi'
import { Link } from 'react-router-dom'
import { cartcontext, whishcontext } from '../components/ContextShare'

function Whishlistlog() {

    const id=localStorage.getItem("id")
    const [whishlist,setwhishlist]=useState([])
    const {whishdata,setwhishdata} = useContext(whishcontext)
    const uname=localStorage.getItem("username")
    const {cartdata,setcartdata}=useContext(cartcontext)

    const viewwhishlistitems=async()=>{
        const {data}=await viewwhishlist(id)
        setwhishlist(data)
    }

    useEffect(()=>{
        viewwhishlistitems()
    },[])

    const removefromwhishlist=async(isbn)=>{
        const body={id,isbn}
        const result=await removewhishlist(body)
        // console.log(result);
        if(result.status>=200 && result.status<300){
            toast("Removed From Whishlist")
            setwhishdata(whishdata-1)
            viewwhishlistitems()
        }
    }

    const handlesubmit=async(id,item)=>{
      if((localStorage.getItem("username"))){
        const id=localStorage.getItem("id")
        const body={
          id,name:item.name,price:item.price,img:item.img,isbn:item.isbn
      }
        const result = await addtocartapi(id,body)
        setcartdata(result.data)
        await removefromwhishlist(item.isbn)
      }
    }

  return (
    <div>
        <div className='my-4 container'>
          <Col className='bg-light ms-5 p-3'>
            <Table className='container text-center'>
          <tbody>
          {
                whishlist.length>0? whishlist.map(i=>(
                <tr>
                <td className='bg-light' style={{border:'none'}}><img src={i.img} alt="" style={{height:'100px'}} /></td>
              <td className='bg-light' style={{border:'none'}}>{i.name}</td>
              <td className='bg-light' style={{border:'none'}}><b>₹ {i.price}</b></td>
              
              <td className='bg-light' style={{border:'none'}}>
              <ShoppingCart onClick={()=>handlesubmit(i?._id,i)}  className='me-5'></ShoppingCart>
              <Trash onClick={(e)=>removefromwhishlist(i?.isbn)}></Trash></td>
            </tr>
                 )):<div><img src="https://th.bing.com/th/id/OIP.tr-g8hu0-qTz2Wzk8QDAOAHaFX?pid=ImgDet&rs=1" /><br />
                 <Link to={'/mainhome'} className="btn btn-warning m-4">Continue Shopping <ArrowRight /></Link></div>
               }
          </tbody>
        </Table>
          </Col>
       </div>
               <ToastContainer />
    </div>
  )
}

export default Whishlistlog