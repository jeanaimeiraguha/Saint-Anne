import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/create', { name, password })
      .then((res) => {
        alert(`Account created successfully, ${name}`);
        navigate('/login');
      })
      .catch((err) => {
        alert("Failed to create account");
      });
  };

  return (
    <div className="container d-flex justify-content-center my-5">
      <form onSubmit={handleSubmit} className="was-validated rounded shadow-sm p-4 bg-light" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Create Account</h2>

        <div className="mb-3">
          <label className="form-label">User Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="form-control" 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="form-control" 
            required 
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
};

export default Create;
