// insert import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const InsertPro = () => {
     const [pname,setPname]=useState("")
     const navigate=useNavigate()
     const handleSubmit=(e)=>{
e.preventDefault()

axios.post('http://localhost:3000/addproduct',{pname})
.then((res)=>{
alert("Product added succefully")
navigate('/selectpro')
})
.catch((err)=>{
     console.log("Failed")
})
     }
  return (
    <div>

<form onSubmit={handleSubmit}>

Product Name:<input type="text"  value={pname} onChange={e=>setPname(e.target.value)}/> <br />
<button type='submit'>Add </button>

</form>
    </div>
  )
}

export default InsertPro


///////////////////////////////////////
