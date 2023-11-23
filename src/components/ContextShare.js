import React, { createContext, useState } from 'react'

//context creation
export const cartcontext=createContext()
export const whishcontext=createContext()


function ContextShare({children}) {

    const [cartdata,setcartdata]=useState(0)
    const [whishdata,setwhishdata]=useState(0)

  return (
    <div>
        <cartcontext.Provider value={{cartdata,setcartdata}}>
         <whishcontext.Provider value={{whishdata,setwhishdata}}> {children}</whishcontext.Provider>
        </cartcontext.Provider>
    </div>
  )
}

export default ContextShare