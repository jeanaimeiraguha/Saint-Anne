import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import InsertPro from './InsertPro';
import SelectPro from './SelectPro';
import UpdatProduct from './UpdatProduct';
import Insertstockin from './Insertstockin';
import Selectstockin from './Selectstockin';
import Updatestockin from './Updatestockin';
import Updatestockout from './UPdstockout';
import Insertstockout from './insstockout';
import Selectstockout from './SelStockout';
import Login from './Login';
import Create from './Create';
import Report from './Report';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="container-fluid bg-light min-vh-100">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 shadow-sm mb-5">
          <div className="container">
            <h2 className="navbar-brand mb-0 fw-bold">Saint Anne</h2>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link active">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/selectpro" className="nav-link">Products</Link>
                </li>
                <li className="nav-item">
                  <Link to="/selectstockin" className="nav-link">Stockin</Link>
                </li>
                <li className="nav-item">
                  <Link to="/selectstockout" className="nav-link">Stockout</Link>
                </li>
                 <li className="nav-item">
                  <Link to="/report" className="nav-link">Report</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container text-center">
          <h2 className="display-4 text-primary mb-4 fw-bold" style={{marginTop:"145px"}}>
            Welcome to Saint Anne Stock Management System
          </h2>
          <Routes>
            <Route path='/selectpro' element={<SelectPro />} />
            <Route path='/create' element={<Create />} />
            <Route path='/selectstockin' element={<Selectstockin />} />
            <Route path='/login' element={<Login />} />
            <Route path='/selectstockout' element={<Selectstockout />} />
            <Route path='/insertpro' element={<InsertPro />} />
            <Route path='/insstockout' element={<Insertstockout />} />
            <Route path='/insertstockin' element={<Insertstockin />} />
            <Route path='/updatproduct/:pid' element={<UpdatProduct />} />
            <Route path='/updatestockin/:pid' element={<Updatestockin />} />
            <Route path='/updatestockout/:pid' element={<Updatestockout />} />
            <Route path='/report' element={<Report />} />
          </Routes>
        </main>

        {/* <footer className="bg-dark text-white text-center py-3 px-4 " style={{marginTop:"373px"}}>
          <p className="mb-0" s>© 2025 Saint Anne Stock Management System. All rights reserved.</p>
        </footer> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
