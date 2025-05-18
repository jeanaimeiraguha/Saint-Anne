import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/login', { name, password })
      .then((res) => {
        alert(res.data.message);
        localStorage.setItem('authToken', res.data.token);
        navigate('/'); // redirect to home page
      })
      .catch((err) => {
        alert("Wrong credentials");
      });
  };

  return (
    <div className="container d-flex flex-column align-items-center my-5">
      <h2 className="mb-4 text-center">Login to Saint Anne</h2>
      <form onSubmit={handleSubmit} className="was-validated rounded shadow-sm p-4 bg-light" style={{ width: '400px' }}>
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

        <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
        <Link to="/create" className="btn btn-secondary w-100">Create Account</Link>
      </form>
    </div>
  );
};

export default Login;
