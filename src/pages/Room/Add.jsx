import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

import Sidebar from '../../components/Sidebar';

function Add() {

  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

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

    if (name === '' || cost === '') {
      Swal.fire({
        title: "Required",
        text: "",
        icon: "warning",
      });
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/rooms`, {
        roomName: name, costPerHour: cost
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        Swal.fire({
          title: "Created",
          text: "",
          icon: "success",
        });
        navigate('/room');
      }
    } catch (error) {
      Swal.fire({
        title: "Failed",
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
                <h5 className="m-0">Add Room</h5>
              </div>
              <div className="card-body">
                <Link to="/room" className="btn btn-warning btn-sm mb-3">Back</Link>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Room Name</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Cost Per Hour</label>
                    <div className="col-sm-10">
                      <input type="number" className="form-control" value={cost} onChange={(e) => setCost(e.target.value)}/>
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