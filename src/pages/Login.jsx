import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    navigate('/dashboard');
    // try {
    //   const response = await axios.post('http://example.com/login', {
    //     email, password
    //   });

    //   // Mengambil token dari respons server
    //   const { token } = response.data;

    //   // Menyimpan token ke localStorage
    //   localStorage.setItem('token', token);

    //   // Redirect atau update UI ke halaman beranda, misalnya
    //   window.location.href = '/home';
    // } catch (error) {
    //   console.error(error);
    // }
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
                      <input type="email" className="form-control"/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-3">Password</label>
                    <div className="col-sm-9">
                      <input type="Password" className="form-control"/>
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
