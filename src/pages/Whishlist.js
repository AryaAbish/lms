import React from 'react'
import Table from 'react-bootstrap/Table';
import { ShoppingCart, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWhishlist } from '../redux/whishlistSlice';
import { addToCart } from '../redux/cartSlice';

function Whishlist() {

  const wishListArray=useSelector(state=>state.wishList)
  // console.log(wishListArray);
  const dispatch=useDispatch()

  const handlesubmit=(id,item)=>{
      dispatch(addToCart(item))
      dispatch(removeFromWhishlist(id))
  }

  return (
    <div>
      <h2 className='ms-5 mt-5'>My Whishlist ({wishListArray.length})</h2>
      <Table striped bordered hover className='container shadow text-center'>
      <thead>
      </thead>
      <tbody>
          {
            wishListArray.length>0?wishListArray.map(i=>(
              <tr>
              <td className='bg-light' style={{border:'none'}}><img src={i.img} alt="" style={{height:'100px'}} /></td>
            <td className='bg-light' style={{border:'none'}}>{i.name}</td>
            <td className='bg-light' style={{border:'none'}}><b>₹ {i.price}</b></td>
            <td className='bg-light' style={{border:'none'}}>
              <ShoppingCart onClick={()=>handlesubmit(i?._id,i)} className='me-5'></ShoppingCart>
              <Trash onClick={()=>dispatch(removeFromWhishlist(i._id))}></Trash>
            </td>
          </tr>
            )):<h1 className='text-center'>No Items in Wishlist</h1>
          }
      </tbody>
    </Table>
    </div>
  )
}

export default Whishlist