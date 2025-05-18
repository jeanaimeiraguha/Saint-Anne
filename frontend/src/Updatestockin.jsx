import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Updatestockin = () => {
  const { pid } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitprice, setUnitprice] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/selectupdstockin/${pid}`)
      .then((res) => {
        setDate(res.data.date || '');
        setQuantity(res.data.quantity || '');
        setUnitprice(res.data.unitprice || '');
      })
      .catch((err) => {
        console.error("Failed to fetch product:", err);
      });
  }, [pid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/updatestockin/${pid}`, { date, quantity, unitprice })
      .then(() => {
        alert("Stockin Product updated successfully");
        navigate('/selectstockin');
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  return (
    <div className="container d-flex justify-content-center my-5">
      <form 
        onSubmit={handleSubmit} 
        className="p-4 rounded shadow-sm bg-light" 
        style={{ width: '400px' }}
      >
        <h2 className="mb-4 text-center">Update Stock In</h2>

        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className="form-control"
            min="1"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Unit Price:</label>
          <input
            type="number"
            value={unitprice}
            onChange={e => setUnitprice(e.target.value)}
            className="form-control"
            min="0"
            step="0.01"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Update</button>
      </form>
    </div>
  );
};

export default Updatestockin;
