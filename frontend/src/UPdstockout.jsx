import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Updatestockout = () => {
  const { pid } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/selectupdstockout/${pid}`)
      .then((res) => {
        if (res.data) {
          setDate(res.data.date || '');
          setQuantity(res.data.quantity || '');
        } else {
          alert("Stockout product not found.");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch stockout product:", err);
        alert("Error fetching stockout product.");
      });
  }, [pid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/updatestockout/${pid}`, { date, quantity })
      .then(() => {
        alert("Stockout product updated successfully.");
        navigate('/selectstockout');
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Failed to update stockout product.");
      });
  };

  return (
    <div>
      <h2>Update Stockout Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:<br />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <label>
          Quantity:<br />
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            required
            min="1"
          />
        </label>
        <br /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Updatestockout;
