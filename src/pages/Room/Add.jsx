import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

function Add() {
  const handleSubmit = () => {
    
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
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Cost Per Hour</label>
                    <div className="col-sm-10">
                      <input type="number" className="form-control"/>
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