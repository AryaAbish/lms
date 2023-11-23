import React, { useContext, useEffect, useState } from 'react'
import { clearcart, placeorders, removecart, viewcart } from '../service/allapi'
import { Col, Row, Table } from 'react-bootstrap'
import { ArrowRight, Trash } from 'react-feather'
import { ToastContainer, toast } from 'react-toastify'
import { cartcontext } from '../components/ContextShare';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';

function Cartlog() {

  // let timer;
  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); setcard(false); setdetails({address:"",pay:""})}
  const handleShow = () => setShow(true);
  const [card,setcard]=useState(false)

  const {cartdata,setcartdata}=useContext(cartcontext)
  const uname=localStorage.getItem("username")

  const navigate=useNavigate()
  const [details,setdetails]=useState({
    address:"",pay:""
  })

  const [cardinfo,setcardinfo]=useState({
    hname:"",cno:"",exp:"",cvv:""
  })

    const [cart,setCart]=useState([])
    const id=localStorage.getItem("id")
    
    const viewcartitems=async()=>{{
        const {data} =await viewcart(id)
        // console.log(data);
        setCart(data)
    }}

    useEffect(()=>{
        viewcartitems()
        // return()=>clearTimeout(timer)
    },[])

    const removefromcart=async(isbn)=>{
        const body={id,isbn}
        const result = await removecart(body)
        // console.log(result);
        if(result.status>=200 && result.status<300){
            toast("Removed From Cart")
            viewcartitems()
            setcartdata(cartdata-1);
        }
    }
    const setorderdetails=(e)=>{
      const {value,name}=e.target
      setdetails({...details,[name]:value})
    }

    const setcarddetails=(e)=>{
      const {value,name}=e.target
      setcardinfo({...cardinfo,[name]:value})
    }
    // console.log(details);

    const order=async(e)=>{
      e.preventDefault()
      const{address,pay}=details
      const {hname,cno,exp,cvv}=cardinfo
      if(address==""){
        toast.error("Enter Shipping Address")
      }
      else if(pay==""){
        toast.error("Select payment")
      }
      else if(pay=="card"){
        if(hname==""){
          toast.error("Enter Card Holder name")
        }
        else if(cno==""){
          toast.error("Enter Card Number")
        }
        else if(exp==""){
          toast.error("Expiry date")
        }
        else if(cvv==""){
          toast.error("Enter Cvv")
        }
        else{
          //api call to add to order db 
          // const date=new Date()
          const body={
           address,ttlamnt,pay,cart
          }
          const result =  await placeorders(id,body)
          setcartdata(result.data.cart.lenth)
          if(result.status>=200 && result.status<300){
            clearcart(id)
            navigate('/paysuccess')
          }
        }
      }
      else{
        //api call to add to order db 
        //id,ttlmnt,paytype,cart
        const date=new Date()
        const body={
          address,ttlamnt,pay,cart,date
        }
        // console.log(body);
        const results= await placeorders(id,body)
        console.log(results);
        setcartdata(results.data.cart.lenth)
        if(results.status>=200 && results.status<300){
          const result= await clearcart(id)
        // console.log(result);
        // timer= setTimeout(()=>alert('Payment Success'),1000)
        navigate('/paysuccess')
        }
        else {
          alert("Cant place order")
        }
      }
    }

    if(cart.length!=0){
      var total=cart.map(i=>i.total).reduce((n,m)=>n+m)
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

    const placeorder=()=>{
      if(cart.length>0){
        handleShow()
      }
      else{
        toast.warning("Cart is Empty")
      }
    }

  return (
    <div>
        <h2 className='ms-5 mt-5'>My cart ({cart.length})</h2>
       
       <Row className='my-4'>
          <Col className='bg-light ms-5 p-3'>
            <Table className='container text-center'>
          <tbody>
          {
                cart.length>0? cart.map(i=>(
                <tr>
                <td className='bg-light' style={{border:'none'}}><img src={i.img} alt="" style={{height:'100px'}} /></td>
              <td className='bg-light' style={{border:'none'}}>{i.name}</td>
              <td className='bg-light' style={{border:'none'}}>{i.qty} pc.</td>
              <td className='bg-light' style={{border:'none'}}><b>₹ {i.price}</b></td>
              <td className='bg-light' style={{border:'none'}}><b>₹ {i.price*i.qty}</b></td>
              <td className='bg-light' style={{border:'none'}}><Trash onClick={(e)=>removefromcart(i?.isbn)}></Trash></td>
            </tr>
                 )):<div><img src="https://th.bing.com/th/id/OIP.tr-g8hu0-qTz2Wzk8QDAOAHaFX?pid=ImgDet&rs=1" /><br />
                 <Link to={'/mainhome'} className="btn btn-warning m-4">Continue Shopping <ArrowRight /></Link></div>
               }
          </tbody>
        </Table>
          </Col>
          <Col>
          <div className='mx-5 bg-light container w-50 p-5'>
            <h6>Price Details</h6>
            <hr />
            <h6>Price ({cart.length}) items <span className='float-end fs-5'><b>₹ {total}</b></span></h6>
            <h6>Delivery Charges <span className='float-end fs-5'><b>{delcharge}</b></span></h6>
            <h6>Toal Amount <span className='float-end fs-1'><b>{ttlamnt}</b></span></h6>
            
            <button onClick={()=>placeorder()} className='btn mt-5' style={{backgroundColor:'#ff0066'}}>Place Order</button>
          </div>
          </Col>
       </Row>
       
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className='mt-2'>Enter Delivery Address</label>
          <textarea onChange={(e)=>setorderdetails(e)} name="address" className='form-control' type="text" />
          <label className='mt-2'>Select payment method</label>
          <Row>
            <Col>
            <input onChange={(e)=>setorderdetails(e)} onClick={()=>setcard(true)} name="pay" type="radio" value={'card'} id="card" className='form-check-input mx-2' />
            <label>Credit/Debit</label>

            { card? 
              <div class="row gx-3">
                <div class="col-12">
                    <div class="d-flex flex-column">
                        <p class="text mb-1">Card Holder Name</p>
                        <input onChange={(e)=>setcarddetails(e)} name="hname" class="form-control mb-3" type="text" placeholder="Card Holder Name" />
                    </div>
                </div>
                <div class="col-12">
                    <div class="d-flex flex-column">
                        <p class="text mb-1">Card Number</p>
                        <input onChange={(e)=>setcarddetails(e)} name="cno" class="form-control mb-3" type="number" placeholder="1234 5678 435678" />
                    </div>
                </div>
                <div class="col-6">
                    <div class="d-flex flex-column">
                        <p class="text mb-1">Expiry</p>
                        <input onChange={(e)=>setcarddetails(e)} name="exp" class="form-control mb-3" type="text" placeholder="MM/YYYY" />
                    </div>
                </div>
                <div class="col-6">
                    <div class="d-flex flex-column">
                        <p class="text mb-1">CVV/CVC</p>
                        <input onChange={(e)=>setcarddetails(e)} name="cvv" class="form-control mb-3 pt-2 " type="number" placeholder="***" />
                    </div>
                </div>
            </div>: <h1></h1>
            }
            </Col>
            <Col>
            <input onChange={(e)=>setorderdetails(e)} onClick={()=>setcard(false)}  type="radio" name="pay" value={'cod'} id="cod" className='form-check-input mx-2' />
            <label>Cash On Delivery</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
            <Button onClick={(e)=>order(e)} variant="success">
              Pay {ttlamnt} <ArrowRight></ArrowRight>
            </Button>
        </Modal.Footer>
      </Modal>

       <ToastContainer />
    </div>
  )
}

export default Cartlog