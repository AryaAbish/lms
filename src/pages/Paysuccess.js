import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'react-feather'
import { Link } from 'react-router-dom'

function Paysuccess() {

  const [loading,setloading] =useState(true)

  useEffect(()=>{
    const timer=setTimeout(()=>{
      setloading(false)
    },3000);      //set loading state to false after 3s
    return()=>clearTimeout(timer);  //clear timer when component unmount
  },[])
  

  return (
   <div>
    {loading &&
      <div className='text-center'><img src="https://icon-library.com/images/loading-gif-icon/loading-gif-icon-24.jpg" alt="" /></div>
    }
    { !loading && <div className='text-center m-2'>
          <img className='m-5' src="https://www.indiaesevakendra.in/wp-content/uploads/2020/08/Paymentsuccessful21.png" alt="" />
          <br />
          <Link to={'/'} className='btn btn-warning mb-5'>Continue Shopping <ArrowRight /></Link>
      </div> }
   </div>
  )
}

export default Paysuccess