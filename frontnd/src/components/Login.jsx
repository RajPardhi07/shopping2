// src/pages/Login.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLaoding] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLaoding(false)
    dispatch(loginUser(formData)).then(() => {
      setLaoding(false)
      if (authStatus === 'succeeded') {
        navigate('/')
      }
    });
  };

  return (
    <div className="w-full h-[90vh] flex items-center justify-center bg-emerald-400">

      <div className="max-w-md mx-auto rounded-md bg-sky-500">


        <h2 className="text-center text-3xl font-semibold text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
          className="p-4 w-[24vw] m-4 ml-10 rounded-md"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
          className="p-4 w-[24vw] m-4 ml-10 rounded-md"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button disabled={loading}
           className="p-4 w-[24vw] m-4 ml-10 text-2xl hover:bg-rose-700 rounded-md
            bg-rose-500 text-white" type="submit">
              {loading ? "Loading..." : "Login "}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
