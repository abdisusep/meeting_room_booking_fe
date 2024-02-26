import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

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
    await axios.get(`${baseUrl}/rooms`, {
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
      title: "Delete Room?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${baseUrl}/rooms/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          fetchData();
          navigate('/room');
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
                <h5 className="m-0">List Room</h5>
              </div>
              <div className="card-body">
                <Link to="/room/add" className="btn btn-primary btn-sm mb-3">Add</Link>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Room Name</th>
                      <th>Cost Per Hour</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index+1}</td>
                      <td>{item.roomName}</td>
                      <td>{item.costPerHour}</td>
                      <td>
                        <Link to={`/room/edit/${item.id}`} className="btn btn-warning btn-sm me-1">Edit</Link>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                      </td>
                    </tr>
                    ))}
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
