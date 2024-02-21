import Sidebar from '../components/Sidebar';

function Dashboard() {

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
                <h5 className="m-0">Dashboard</h5>
              </div>
              <div className="card-body">
                <h6>Welcome</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
