import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { allbooks, filterbooks, filterstatuss } from '../service/allapi';
import { Link, useNavigate } from 'react-router-dom';

function Main() {

    const uname = localStorage.getItem("username")
    // console.log(uname);
    const navigate =useNavigate()

    const [searchData,setSearchData]=useState("")
    const [books,setbooks]=useState([])
    const getbooks =async()=>{
        const {data}=await allbooks(searchData)
        setbooks(data)
    }
    useEffect(()=>{
        if(!localStorage.getItem("username"))
        alert("Please Login")
        // setlogindata(uname)
        getbooks()
    },[searchData])
    // console.log(books);
    // console.log(logindata);

    const filterbooks=async(data)=>{
        const result= await filterstatuss(data)
        // console.log(result);
        setbooks(result.data)
        // console.log(books);
    }
    const selectoption=(e)=>{
        const {name,value}=e.target
        if(value=="All"){
            getbooks()
        }
        else if(value=="Fiction"){
            filterbooks('Fiction')
        }
        else if(value=="Philosaphy"){
            filterbooks('Philosaphy')
        }
        else if(value=="Nonfiction"){
            filterbooks('Nonfiction')
        }
        else if(value=="Children"){
            filterbooks('Children')
        }
    }  

    return (
        <div>
            <Row  className='m-5'>
                <Col>
                    <input onChange={(e)=>setSearchData(e.target.value)} className='form-control w-50' type="text" placeholder="Search Books or Authors" style={{boxShadow:'10px 10px'}} />
        
                </Col>
                <Col className='text-end'>
                <select onChange={(e)=>selectoption(e)} name="category" className='form-select w-50' id="category">
                <option value="select" disabled selected>-Select Category-</option>
                <option value={"All"} className='form-check-input'>All</option>
                <option value={"Fiction"} className='form-check-input' >Fiction</option>
                <option value={"Philosaphy"} className='form-check-input'>Philosaphy</option>
                <option value={"Nonfiction"} className='form-check-input'>Non-Fiction</option>
                <option value={"Children"} className='form-check-input'>Children</option>
                </select> 
                </Col>
            </Row>

            <div className='container p-5'>
               <Row>
                    { books.length>0? books.map(i=>(
                        <Col lg={3} md={4} sm={6}>
                        <Card className='m-3' style={{ width: '18rem',height:'510px',border:'none' }}>
                            <Card.Img variant="top" src={i.img} style={{height:'300px'}} />
                            <Card.Body>
                                <Card.Title className='text-center'>{i.name}</Card.Title>
                                <Card.Text>
                                    <ListGroup>
                                        <ListGroup.Item className='text-center'>by {i.author}</ListGroup.Item>
                                        <ListGroup.Item className='text-center'><b>₹ {i.price}</b></ListGroup.Item>
                                    </ListGroup>
                                </Card.Text>
                            </Card.Body>  
                            <Link to={`/single/${i._id}`}><button className='btn w-100' style={{backgroundColor:"#ff0066"}}>View More</button></Link>  
                        </Card>
                    </Col>
                    ))
                        :<h1>No Books Found</h1>}
               </Row>
            </div>
        </div>
    )
}

export default Main