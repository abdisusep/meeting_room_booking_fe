import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

function Login() {

  const [email, setEmail] = useState('jarakal@dota.com');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const baseUrl = 'http://localhost:3000/api';
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      Swal.fire({
        title: "Required",
        text: "",
        icon: "warning",
      });
      return;
    }
    
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email, password
      });

      if (response.data.success) {
        localStorage.setItem("access_token", response.data.token);
        navigate('/dashboard');
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
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto">
            <div className="card mt-5 border-0 shadow-sm px-4 pt-4">
              <div className="card-header bg-white border-0">
                <h4>Login User</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleLogin}>
                  <div className="mb-3 row">
                    <label className="col-sm-3">Email</label>
                    <div className="col-sm-9">
                      <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3">Password</label>
                    <div className="col-sm-9">
                      <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <div className="col-sm-9 offset-sm-3">
                      <button type="submit" className="btn btn-primary">Login Now</button>
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

export default Login;
