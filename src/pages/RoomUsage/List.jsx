import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment';

import Sidebar from '../../components/Sidebar';

function List() {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const baseUrl = 'http://localhost:3000/api';
  const token   = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get(`${baseUrl}/room_usages`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Room Usage?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${baseUrl}/room_usages/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          fetchData();
          navigate('/room_usage');
        })
        .catch(error => {
          console.error(`Error deleting item with ID ${id}: `, error);
        });
      }
    });
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
                <h5 className="m-0">List Room Usage</h5>
              </div>
              <div className="card-body">
                <Link to="/room_usage/add" className="btn btn-primary btn-sm mb-3">Add</Link>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Client</th>
                      <th>Room</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Date Booking</th>
                      <th>Quota</th>
                      <th>Cost</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      const startMoment = moment(item.startTime, 'HH:mm');
                      const endMoment = moment(item.endTime, 'HH:mm');
                      const duration = moment.duration(endMoment.diff(startMoment));
                      const hours = duration.asMinutes() / 60;
                      const cost = item.Room.costPerHour * hours;

                      return (
                        <tr key={item.id}>
                        <td>{index+1}</td>
                        <td>{item.Client.name}</td>
                        <td>{item.Room.roomName}</td>
                        <td>{item.startTime}</td>
                        <td>{item.endTime}</td>
                        <td>{item.bookingDate}</td>
                        <td>{item.quotaUsed}</td>
                        <td>{cost}</td>
                        <td>
                          <Link to={`/room_usage/edit/${item.id}`} className="btn btn-warning btn-sm me-1">Edit</Link>
                          <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default List;
