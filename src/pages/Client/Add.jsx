import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

import Sidebar from '../../components/Sidebar';

function Add() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [credit, setCredit] = useState('');

  const navigate = useNavigate();

  const baseUrl = 'http://localhost:3000/api';
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === '' || email === '' || phone === '' || credit === '') {
      Swal.fire({
        title: "Input required!",
        text: "",
        icon: "warning",
      });
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/clients`, {
        name, email, phone, credit
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        Swal.fire({
          title: "Successfull",
          text: "",
          icon: "success",
        });
        navigate('/client');
      }
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: error.message,
        icon: "warning",
      });
    }
  }

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-3">
            <Sidebar/>
          </div>
          <div className="col-lg-9">
            <div className="card">
              <div className="card-header">
                <h5 className="m-0">Add Client</h5>
              </div>
              <div className="card-body">
                <Link to="/client" className="btn btn-warning btn-sm mb-3">Back</Link>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Name</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Email</label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Phone</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Credit</label>
                    <div className="col-sm-10">
                      <input type="number" className="form-control" value={credit} onChange={(e) => setCredit(e.target.value)}/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <div className="col-sm-10 offset-sm-2">
                      <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Add;
