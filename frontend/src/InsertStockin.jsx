

// insert import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Insertstockin = () => {
     const navigate=useNavigate()
     const [pid,setPid]=useState("")
     const[date,setDate]=useState("")
     const[quantity,setQuantity]=useState("")
     const[unitprice,setUnitprice]=useState("")
     const handleSubmit=(e)=>{
e.preventDefault()

axios.post('http://localhost:3000/addstockin',{pid,date,quantity,unitprice})
.then((res)=>{
alert("Product added succefully")
navigate('/selectstockin')
})
.catch((err)=>{
     console.log("Failed")
})

// pid				
// 	2	date	date			
// 	3	quantity	int(255)			
// 	4	unit price	int(255)			
// 	5	total price

     }
  return (
    <div>

<form onSubmit={handleSubmit}>

Product Id:<input type="text"  value={pid} onChange={e=>setPid(e.target.value)}/> <br />
Date:<input type="date"  value={date} onChange={e=>setDate(e.target.value)}/> <br />
quantity:<input type="text"  value={quantity} onChange={e=>setQuantity(e.target.value)}/> <br />
Unit Price:<input type="text"  value={unitprice} onChange={e=>setUnitprice(e.target.value)}/> <br />
<button type='submit'>Add </button>

</form>
    </div>
  )
}

export default Insertstockin


///////////////////////////////////////
