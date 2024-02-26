import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('access_token');
        navigate('/');
      }
    });
  }

  return (
    <>
      <ul className="list-group">
        <li className="list-group-item fw-bold">MENU</li>
        <Link to="/dashboard" className="list-group-item">Dashboard</Link>
        <Link to="/client" className="list-group-item">Client</Link>
        <Link to="/room" className="list-group-item">Room</Link>
        <Link to="/room_usage" className="list-group-item">Room Usage</Link>
        <li className="list-group-item text-danger logout" onClick={handleLogout}>Logout</li>
      </ul>
    </>
  )
}

export default Sidebar;
