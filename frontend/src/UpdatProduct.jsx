import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { pid } = useParams();
  const navigate = useNavigate();

  // State variables for the product fields
  const [pname, setPname] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitprice, setUnitprice] = useState('');

  useEffect(() => {
    // Fetch existing product data by pid
    axios.get(`http://localhost:3000/selectupd/${pid}`)
      .then((res) => {
        const product = res.data;
        setPname(product.pname || '');
        setDate(product.date || '');
        setQuantity(product.quantity || '');
        setUnitprice(product.unitprice || '');
      })
      .catch((err) => {
        console.error("Failed to fetch product:", err);
      });
  }, [pid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare updated data object
    const updatedProduct = {
      pname,
      date,
      quantity,
      unitprice
    };

    axios.put(`http://localhost:3000/updateproducts/${pid}`, updatedProduct)
      .then(() => {
        alert("Product updated successfully");
        navigate('/'); // Or wherever you want to redirect
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Update failed, please try again.");
      });
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label><br />
        <input 
          type="text" 
          value={pname} 
          onChange={e => setPname(e.target.value)} 
          required 
          /><br /><br />

        <label>Date:</label><br />
        <input 
          type="date" 
          value={date} 
          onChange={e => setDate(e.target.value)} 
          required 
          /><br /><br />

        <label>Quantity:</label><br />
        <input 
          type="number" 
          value={quantity} 
          onChange={e => setQuantity(e.target.value)} 
          required 
          min="1"
          /><br /><br />

        <label>Unit Price:</label><br />
        <input 
          type="number" 
          value={unitprice} 
          onChange={e => setUnitprice(e.target.value)} 
          required 
          min="0" 
          step="0.01"
          /><br /><br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
