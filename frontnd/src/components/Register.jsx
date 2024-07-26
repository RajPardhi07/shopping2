import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { registerFailure, registerStart, registerSuccess } from "../reducer/authSlice";

const Register = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [address, setAddress] = useState();
    const [gender, setGender] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, error} = useSelector((state) => state.auth)

    const SubmitHandler = async (e) => {
        e.preventDefault();

        dispatch(registerStart());

        try {
            const response = await axios.post('http://localhost:3000/auth/register', {
                name,
                email,
                password,
                address,
                gender
            })
            console.log("dattta",response)
            if(response && response.data){
                dispatch(registerSuccess(response.data));
                toast.success("Registration Successfully please login")
                navigate('/login')

            }else{
                dispatch(registerFailure(response.data.message))
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            dispatch(registerFailure(error.message))

        }

    }

    return (
        <div className="w-full h-[80vh] flex items-center justify-center bg-lime-200">
            <div className="w-[25vw] h-[65vh] rounded-lg bg-emerald-400">
            <h1 className="text-center text-3xl text-white">Register</h1>

            {loading && <p>Loading...</p>}
            {error && <p style={{color:'red'}}>{error}</p>}

            <form onSubmit={SubmitHandler}>

                <input className="w-72 pl-3 h-14 mt-2 ml-[6vh] rounded-md" type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input className="w-72 pl-3 h-14 mt-2 ml-[6vh] rounded-md" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input className="w-72 pl-3 h-14 mt-2 ml-[6vh] rounded-md" type="text" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input className="w-72 pl-3 h-14 mt-2 ml-[6vh] rounded-md" type="text" onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                <input className="w-72 pl-3 h-14 mt-2 ml-[6vh] rounded-md" type="text" onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
                <button className="w-72 pl-3 h-14 mt-2 ml-[6vh] rounded-md bg-fuchsia-500 text-white" type="submit">Sign Up</button>
            </form>

            </div>
        </div>
    )
}

export default Register