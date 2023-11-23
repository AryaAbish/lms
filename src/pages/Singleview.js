import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {  addtocartapi, addtowhishlist, singlebook } from '../service/allapi'
import Table from 'react-bootstrap/Table';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { cartcontext, whishcontext } from '../components/ContextShare';
import { addToWhishlist } from '../redux/whishlistSlice';

function Singleview() {

    const dispatch=useDispatch()
    // const {cartdata,setcartdata}=useContext(cartcontext)
    const uname = localStorage.getItem("username")
    const {cartdata,setcartdata}=useContext(cartcontext)
    const {whishdata,setwhishdata} = useContext(whishcontext)
    
    const { id } = useParams()
    // console.log(id);
    const [singleBook, setSingleBook] = useState({})
    const single = async () => {
        const { data } = await singlebook(id)
        setSingleBook(data)
    }
    useEffect(() => {
        single()
    }, [])
    // console.log(singleBook);
    const handleaddtocart=async (singleBook)=>{
        if(!(localStorage.getItem("username"))){
            dispatch(addToCart(singleBook))
            toast.success("Added to cart")
            // localStorage.setItem('cartItems',JSON.stringify(state.map(item=>item)))
            }
            else{
                // state.push(action.payload)
                const id=localStorage.getItem("id")
                // const {name,price,img,isbn}=action.payload
                const body={
                    id,name:singleBook.name,price:singleBook.price,img:singleBook.img,isbn:singleBook.isbn
                }
                const result = await addtocartapi(id,body)
                // console.log(result);
                if(result.status>=200 && result.status<300){
                    setcartdata(result.data)
                    toast.success("Added to cart")
                }
                else{
                    toast.warning("Something Went Wrong")
                }
            } 
    }

    const handleaddtowhishlist=async(singleBook)=>{
        if(!(localStorage.getItem("username"))){
            dispatch(addToWhishlist(singleBook))
            toast.success("Added to Whishlist")
            }
            else{
                const id=localStorage.getItem("id")
                const body={
                    id,name:singleBook.name,price:singleBook.price,img:singleBook.img,isbn:singleBook.isbn
                }
                const result=await addtowhishlist(id,body)
                if(result.status>=200 && result.status<300){
                    setwhishdata(result.data.whishlist.length)
                    toast.success("Added to Whishlist")
                }
                else{
                    toast.warning("Already in Whishlist")
                }
            }
    }

    return (
        <div>
            <Row className='mx-5 py-4'>
                <Col>
                    <img src={singleBook.img} alt="" style={{height:'500px'}} />
                    <div className='my-4 text-center'>
                    <button onClick={()=>{handleaddtowhishlist(singleBook)}} className='btn m-2' style={{backgroundColor:'#ff0066'}}>Add to Whishlist</button>
                    <button onClick={()=>{handleaddtocart(singleBook)}} className='btn ms-4' style={{backgroundColor:'#ff0066'}}>Add to cart</button>
                    </div>
                
                        {/* <div className='text-center'>
                        <button className='btn m-2' style={{backgroundColor:'#ff0066'}}>Edit</button>
                        <button className='btn m-2' style={{backgroundColor:'#ff0066'}}>Delete</button>
                        </div> */}
                </Col>
                <Col>
                    <h1>{singleBook.name}</h1>
                    <h4><i>by {singleBook.author}</i></h4>
                    <p className='bg-warning'><b>#1 best seller</b></p>
                    <h6>{singleBook.category}</h6>
                    <hr />
                    <Table>
                        <thead>
                            <tr>
                                <td style={{border:'none'}}>Language</td>
                                <td style={{border:'none'}}>ISBN</td>
                                <td style={{border:'none'}}>Publisher</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th style={{border:'none'}}>{singleBook.language}</th>
                                <th style={{border:'none'}}>{singleBook.isbn}</th>
                                <th style={{border:'none'}}>{singleBook.publisher}</th>
                            </tr>
                        </tbody>
                    </Table>
                    <hr />
                    <h1>₹ {singleBook.price}</h1>
                </Col>
            </Row>
            <ToastContainer />
        </div>
    )
}

export default Singleview