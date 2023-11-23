import { base_url } from "./base_url";
import { commonRequest } from "./commonStructure";

//register
export const registeruser=async(body)=>{
    return await commonRequest('POST',`${base_url}/user-register`,body)
}
//login
export const loginuser=async(body)=>{
    return await commonRequest('POST',`${base_url}/user-login`,body)
}

//add books
export const addbooks=async(body)=>{
    return await commonRequest('POST',`${base_url}/admin/addbooks`,body)
}

//view users
export const viewusers=async()=>{
    return await commonRequest('GET',`${base_url}/admin/viewusers`,{})
}

//get all books
export const allbooks=async(sdata)=>{
    return await commonRequest('GET',`${base_url}/getallbooks?search=${sdata}`,{})
}

//get single book
export const singlebook=async(id)=>{
    return await commonRequest('GET',`${base_url}/getbook/${id}`,{})
}

//add to cart
export const addtocartapi=async(id,body)=>{
    return await commonRequest('POST',`${base_url}/user/addtocart/${id}`,body)
}

//view cart
export const viewcart=async(id)=>{
    return await commonRequest('GET',`${base_url}/user/viewcart/${id}`,{})
}

//remove cart
export const removecart=async(body)=>{
    return await commonRequest('PUT',`${base_url}/user/removecart`,body)
}

//clear cart
export const clearcart=async(id)=>{
    return await commonRequest('PUT',`${base_url}/user/clearcart/${id}`,{})
}

//filter books
export const filterstatuss=async(data)=>{
    return await commonRequest('GET',`${base_url}/allbooks/filter?filterData=${data}`,{})
}

//place order
export const placeorders=async(id,body)=>{
    return await commonRequest('POST',`${base_url}/user/placeorder/${id}`,body)
}

//change password
export const changepswd=async(body)=>{
    return await commonRequest('PUT',`${base_url}/user/changepsw`,body)
}

//my orders
export const myorders=async(id)=>{
    return await commonRequest('GET',`${base_url}/user/myorders/${id}`,{})
}

//all orders
export const  allorders=async()=>{
    return await commonRequest('GET',`${base_url}/admin/allorders`,{})
}

//delete user
export const deleteuser=async(id)=>{
    return await commonRequest('DELETE',`${base_url}/userdelete/${id}`,{})
}

//add to whishlist
export const addtowhishlist=async(id,body)=>{
    return await commonRequest('POST',`${base_url}/user/addtowhishlist/${id}`,body)
}

//view whishlist
export const viewwhishlist=async(id)=>{
    return await commonRequest('GET',`${base_url}/user/viewwhishlist/${id}`,{})
}

//remove whishlist
export const removewhishlist=async(body)=>{
    return await commonRequest('PUT',`${base_url}/user/removewhishlist`,body)
}