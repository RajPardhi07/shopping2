import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/user/userSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  console.log("authstatus", authStatus)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, email, password, gender, address };
    dispatch(registerUser(formData)).then(() => {
      if (authStatus === 'succeeded') {
        navigate('/login');
      }
    });
  };

  return (
    <div className="w-full h-[90vh] flex items-center justify-center bg-orange-500">
      <div className="max-w-md mx-auto rounded-md bg-lime-400">
        <h2 className="text-center text-3xl font-semibold text-white">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="p-4 w-[24vw] m-4 ml-10 rounded-md"
            type="text"
            name="name"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="p-4 w-[24vw] m-4 ml-10 rounded-md"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="p-4 w-[24vw] m-4 ml-10 rounded-md"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            className="p-4 w-[24vw] m-4 ml-10 rounded-md"
            name="gender"
            placeholder="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <input
            type="text"
            className="p-4 w-[24vw] m-4 ml-10 rounded-md"
            name="address"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            className="p-4 w-[24vw] m-4 ml-10 text-2xl hover:bg-slate-700 rounded-md bg-slate-900 text-white"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
