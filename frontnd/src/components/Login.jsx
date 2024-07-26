import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../reducer/authSlice";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const SubmitHandler = async (e) => {
    e.preventDefault();

    dispatch(loginStart());

    try {
      const res = await axios.post('http://localhost:3000/auth/login', { email, password })
      if (res && res.data) {
        dispatch(loginSuccess(res.data));
        toast.success("Login Successfully")
        navigate('/')

      } else {
        dispatch(loginFailure(res.data.message));
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      dispatch(loginFailure(error.message));
    }

  }

  return (

    <div className="w-full h-[90vh] flex items-center justify-center bg-amber-200">
      <div className="w-[25vw] h-[60vh] rounded-lg bg-blue-400">
        <h1 className="text-center text-3xl text-white">Login Page</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={SubmitHandler}>

          <input className="w-[19vw] h-14 mt-5 rounded-lg ml-12 pl-3" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="w-[19vw] h-14 mt-5 rounded-lg ml-12 pl-3" type="text" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button className="w-[19vw] h-14 mt-5 rounded-lg ml-12 text-white bg-green-400" type="submit">Log In</button>
        </form>
      </div>

    </div>
  )
}

export default Login