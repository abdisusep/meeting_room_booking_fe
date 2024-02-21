import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import Sidebar from '../../components/Sidebar';

function List() {

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Client?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/client');
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
                <h5 className="m-0">List Client</h5>
              </div>
              <div className="card-body">
                <Link to="/client/add" className="btn btn-primary btn-sm mb-3">Add</Link>
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Credit</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>PT ABC</td>
                      <td>adhaj@email.com</td>
                      <td>+6123678123</td>
                      <td>10</td>
                      <td>
                        <Link to="/client/edit/1" className="btn btn-warning btn-sm me-1">Edit</Link>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(1)}>Delete</button>
                      </td>
                    </tr>
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
