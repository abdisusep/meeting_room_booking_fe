import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

function Edit() {
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
                <h5 className="m-0">Edit Client</h5>
              </div>
              <div className="card-body">
                <Link to="/client" className="btn btn-warning btn-sm mb-3">Back</Link>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Name</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Email</label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control"/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Phone</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Credit</label>
                    <div className="col-sm-10">
                      <input type="number" className="form-control"/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <div className="col-sm-10 offset-sm-2">
                      <button type="submit" className="btn btn-primary">Update</button>
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

export default Edit;
