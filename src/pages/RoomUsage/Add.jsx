import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

function Add() {
  const [clientId, setClientId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [quotaUsed, setQuotaUsed] = useState('');

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
        title: "Input required!",
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
          title: "Successfull",
          text: "",
          icon: "success",
        });
        navigate('/room');
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
                <h5 className="m-0">Add Room Usage</h5>
              </div>
              <div className="card-body">
                <Link to="/room_usage" className="btn btn-warning btn-sm mb-3">Back</Link>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Client</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Room</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Time Start</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">End Start</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Date Booking</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control"/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2">Quota</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control"/>
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
