import React, { useContext } from 'react'
import { Badge, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Heart, ShoppingCart } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cartcontext, whishcontext } from './ContextShare';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { changepswd, deleteuser } from '../service/allapi';
import { ToastContainer, toast } from 'react-toastify';

function Header() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  const [pswd, setpswd] = useState({
    psw: "", newpsw: ""
  })

  const cartArray = useSelector(state => state.cart)
  const wishListArray = useSelector(state => state.wishList)

  // console.log(cartArray);
  const uname = localStorage.getItem("username")
  const id = localStorage.getItem("id")
  //context
  const { cartdata, setcartdata } = useContext(cartcontext)
  const {whishdata,setwhishdata} = useContext(whishcontext)

  const navigate = useNavigate()

  const logOut = (e) => {
    localStorage.removeItem("username")
    localStorage.removeItem("id")
    // setlogindata("")
    navigate('/')
    // dispatch(reset())
  }

  const setpsw = (e) => {
    const { value, name } = e.target
    setpswd({ ...pswd, [name]: value })
  }

  const changepass = async (e) => {
    e.preventDefault()
    const { psw, newpsw } = pswd
    if (psw == "") {
      toast.warn("Invalid Form")
    }
    else if (newpsw == "") {
      toast.warn("Invalid Form")
    }
    else {
      const body = {
        id, psw, newpsw
      }
      const result = await changepswd(body)
      if (result.status >= 200 && result.status < 300) {
        toast.success(result.data)
        setShow(false);
      }
      else {
        toast.error(result.response.data)
      }
    }
  }

  const deleteusr = async () => {
    const result = await deleteuser(id)
    // console.log(result);
    if (result.status >= 200 && result.status < 300) {
      alert("Account deleted")
      logOut()
    }
    else {
      alert("User not found")
    }
  }

  return (
    <div>
      <Navbar style={{ backgroundColor: "#ff0066" }}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/8683/8683819.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}
            <Link to={'/'} style={{ textDecoration: 'none' }}><span className='font text-black'>The Book Store</span></Link>
          </Navbar.Brand>
          <Nav>
            {uname ? <NavDropdown title={uname} id="nav-dropdown">
              <NavDropdown.Item onClick={(() => navigate('/myorders'))} eventKey="4.1">My Orders</NavDropdown.Item>
              <NavDropdown.Item onClick={handleShow} eventKey="4.2">Change password</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.3" onClick={() => deleteusr()}>Delete Account</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={(e) => logOut(e)} eventKey="4.4">LogOut</NavDropdown.Item>
            </NavDropdown> : <Nav.Link href="/login"><b>Login</b></Nav.Link>
            }
            {
              uname ? (<Link to={'/whishlistlog'}><button className='btn'><Heart /><Badge>{whishdata}</Badge></button></Link>) :
                <Link to={'/whishlist'}><button className='btn'><Heart /><Badge>{wishListArray.length}</Badge></button></Link>
            }
            {
              uname ? (<Link to={'/cartlog'}><button className='btn'><ShoppingCart /><Badge>{cartdata}</Badge></button></Link>) :
                (<Link to={'/cart'}><button className='btn'><ShoppingCart /><Badge>{cartArray.length}</Badge></button></Link>)
            }
          </Nav>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Old Password</Form.Label>
              <Form.Control onChange={(e) => setpsw(e)} name="psw"
                type="password"
                placeholder="****"
                autoFocus
              /></Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Enter New Password</Form.Label>
              <Form.Control onChange={(e) => setpsw(e)} name="newpsw"
                type="password"
                placeholder="****"
              /></Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={(e) => changepass(e)}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default Header