import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/user/userSlice";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);

const dispatch = useDispatch();
const navigate = useNavigate();

const userStatus = useSelector((state) => state.auth.status)

console.log("userStatus", userStatus)

  const SubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true)

    const formData = {name, email, password, gender, address}
    console.log("formData",formData)
    dispatch(registerUser(formData)).then(() => {
      setLoading(false)
      if(userStatus == 'succeeded'){
        navigate('/login')
      }
    })



  }
  return (

    <div className="w-full h-[90vh] flex items-center justify-center bg-orange-500">
      <div className="max-w-md mx-auto rounded-md bg-lime-400">
        <h2 className="text-center text-3xl font-semibold text-white">Register</h2>
           <form onSubmit={SubmitHandler}>
            <input className="p-4 w-[24vw] m-4 ml-10 rounded-md"
             type="text" placeholder="Name" name="name" value={name}
            onChange={(e) => setName(e.target.value)} />
            <input className="p-4 w-[24vw] m-4 ml-10 rounded-md"
            type="email" placeholder="Email" name="email" value={email}
            onChange={(e) => setEmail(e.target.value)} />
            <input className="p-4 w-[24vw] m-4 ml-10 rounded-md"
             type="password" placeholder="Password" name="password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <input className="p-4 w-[24vw] m-4 ml-10 rounded-md"
              type="text" placeholder="Gender" name="gender" value={gender}
            onChange={(e) => setGender(e.target.value)} />
            <input className="p-4 w-[24vw] m-4 ml-10 rounded-md"
             type="text" placeholder="address" name="address" value={address}
            onChange={(e) => setAddress(e.target.value)} />

            <button className="p-4 w-[24vw] m-4 ml-10 text-2xl hover:bg-slate-700 rounded-md bg-slate-900 text-white"
             disabled={loading}
             type="submit">{loading ? "Loading..." : "Sign Up"}</button>
           </form>









      </div>
    </div>
  )
}

export default Register