import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment';

import Sidebar from '../../components/Sidebar';

function Add() {
  const [clients, setClients] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [clientId, setClientId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [startTime, setStartTime] = useState(moment().format('HH:mm'));
  const [endTime, setEndTime] = useState(moment().format('HH:mm'));
  const [bookingDate, setBookingDate] = useState(moment().format('YYYY-MM-DD'));
  const [quotaUsed, setQuotaUsed] = useState(0);

  const navigate = useNavigate();

  const baseUrl = 'http://localhost:3000/api';
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetchData('clients', setClients);
    fetchData('rooms', setRooms);
  }, []);

  const fetchData = async (endpoint, setter) => {
    try {
      const response = await axios.get(`${baseUrl}/${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setter(response.data);
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: error.message,
        icon: "warning",
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (clientId === '' || roomId === '' || startTime === '' || endTime === '' || bookingDate === '' || quotaUsed === '') {
      Swal.fire({
        title: "Required",
        text: "",
        icon: "warning",
      });
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/room_usages`, {
        clientId, roomId, startTime, endTime, bookingDate, quotaUsed
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
        navigate('/room_usage');
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
                <h5 className="m-0">Add Room Usage</h5>
              </div>
              <div className="card-body">
                <Link to="/room_usage" className="btn btn-warning btn-sm mb-3">Back</Link>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Client</label>
                    <div className="col-sm-10">
                      <select className="form-control" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                        <option value="">Select Client</option>
                        {clients.map(client => (
                          <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Room</label>
                    <div className="col-sm-10">
                      <select className="form-control" value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                        <option value="">Select Room</option>
                        {rooms.map(room => (
                          <option key={room.id} value={room.id}>{room.roomName}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Time Start</label>
                    <div className="col-sm-10">
                      <input type="time" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">End Start</label>
                    <div className="col-sm-10">
                      <input type="time" className="form-control" value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Date Booking</label>
                    <div className="col-sm-10">
                      <input type="date" className="form-control" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)}/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Quota</label>
                    <div className="col-sm-10">
                      <input type="number" className="form-control" value={quotaUsed} onChange={(e) => setQuotaUsed(e.target.value)}/>
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
