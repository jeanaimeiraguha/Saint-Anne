// import React, { useState } from 'react'
// import { useEffect, useState } from 'react'
// import axios from 'axios'

import { useEffect, useState } from 'react'
import axios from 'axios'

const Report = () => {
  const [report, setReport] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/report')
      .then((res) => {
        setReport(res.data)
      })
      .catch((err) => {
        console.log("Failed", err)
      })
  }, [])

  return (
    <div className='container'>
      <table border={2} className='table table-bordered table-striped mt-4 '>
        <thead className='table-dark'>
          <tr>
            <th>Product Name</th>
            <th>Stockinquantity</th>
            <th>Stockout Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {report.map((data) =>
            <tr key={data.pid}>
              <td>{data.pname}</td>
              <td>{data.stockinquantity}</td>
              <td>{data.stockoutquantity}</td>
              <td>{data.totalprice}</td>
              <td>{data.status || 'N/A'}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className='btn btn-success' onClick={()=>window.print()}>Print Report</button>
    </div>
  )
}

export default Report
