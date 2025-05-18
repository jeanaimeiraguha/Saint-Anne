import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

const SelectPro = () => {
  const { pid } = useParams()

  const handleDelete = (pid) => {
    axios.delete(`http://localhost:3000/deleteproducts/${pid}`)
      .then(() => {
        alert("Product deleted successfully")
        // Optional: Refresh the list after delete
        setProducts(products.filter(product => product.pid !== pid))
      })
      .catch((err) => {
        console.log("Failed", err)
      })
  }

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/selectproducts')
      .then((res) => {
        setProducts(res.data)
      })
      .catch(() => {
        console.log("Failed")
      })
  }, [])

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products List</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) =>
            <tr key={product.pid}>
              <td>{product.pid}</td>
              <td>{product.pname}</td>
              <td>
                <Link to={`/updatproduct/${product.pid}`} className="btn btn-sm btn-primary me-2">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.pid)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SelectPro
