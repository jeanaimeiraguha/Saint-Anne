import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Selectstockout = () => {
  const { pid } = useParams();
  const [products, setProducts] = useState([]);

  // Fetch products on component mount
  useEffect(() => {
    axios.get('http://localhost:3000/selectstockout')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("Failed to fetch products:", err);
      });
  }, []);

  // Handle product deletion
  const handleDelete = (pid) => {
    axios.delete(`http://localhost:3000/deletestockout/${pid}`)
      .then(() => {
        alert("Product deleted successfully");
        setProducts(products.filter(product => product.pid !== pid)); // Update state after deletion
      })
      .catch((err) => {
        console.log("Failed to delete product:", err);
      });
  };

  return (
    <div className="container my-5">
      <Link to="/insstockout" className="btn btn-primary mb-3">Add New Stock Out</Link>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Product ID</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.pid}>
              <td>{product.pid}</td>
              <td>{product.date}</td>
              <td>{product.quantity}</td>
              <td>
                <Link to={`/updatestockout/${product.pid}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button 
                  onClick={() => handleDelete(product.pid)} 
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Selectstockout;
