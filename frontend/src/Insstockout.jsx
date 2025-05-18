import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Insertstockout = () => {
  const navigate = useNavigate();
  const [pid, setPid] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/addstockout', { pid, date, quantity })
      .then(() => {
        alert("Stockout Product added successfully");
        navigate('/selectstockout');
      })
      .catch(() => {
        console.log("Failed");
      });
  };

  return (
    <div className="container d-flex justify-content-center my-5">
      <form 
        onSubmit={handleSubmit} 
        className="p-4 rounded shadow-sm bg-light" 
        style={{ width: '400px' }}
      >
        <h2 className="mb-4 text-center">Add Stock Out</h2>

        <div className="mb-3">
          <label className="form-label">Product Id:</label>
          <input
            type="text"
            value={pid}
            onChange={e => setPid(e.target.value)}
            className="form-control"
            required
          />
        </div>

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

        <button type="submit" className="btn btn-primary w-100">Add</button>
      </form>
    </div>
  );
};

export default Insertstockout;
