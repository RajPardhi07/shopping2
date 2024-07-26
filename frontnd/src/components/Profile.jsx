import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from '../reducer/authSlice'


const Profile = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        gender: ''
    })

    console.log("formdata",formData)
    console.log("user",user)

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                address: user.address,
                gender: user.gender
            })
        }
    }, [user])

    const handleforSubmit = async (e) => {
        e.preventDefault();

        if (user && user._id) {
            dispatch(updateUser(user._id, formData))
        }


    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    return (
        <div className="bg-neutral-600 w-full flex items-center justify-center h-[90vh]">

            <div className="w-[25vw] h-[50vh] rounded-lg bg-emerald-500">

                <h2 className="text-center text-3xl text-white">Profile</h2>

                <form onSubmit={handleforSubmit}>

                    <input className="w-[18vw] h-[6vh] mt-3 pl-3 rounded-md ml-14" type="text" placeholder="Name" name="name" value={formData.name}
                        onChange={handleChange} />
                    <input className="w-[18vw] h-[6vh] mt-3 pl-3 rounded-md ml-14" type="text" name="email" placeholder="Email" value={formData.email}
                        onChange={handleChange} />
                    <input className="w-[18vw] h-[6vh] mt-3 pl-3 rounded-md ml-14" type="text" name="address" placeholder="Address" value={formData.address}
                        onChange={handleChange} />
                    <input className="w-[18vw] h-[6vh] mt-3 pl-3 rounded-md ml-14" type="text" name="gender" placeholder="Gender" value={formData.gender}
                        onChange={handleChange} />
                    <button className="w-[18vw] h-[6vh] rounded-lg mt-3  ml-14 bg-blue-700 text-white" type="submit">Update User</button>
                </form>
            </div>



        </div>
    )
}

export default Profile