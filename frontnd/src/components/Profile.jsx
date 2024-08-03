import {  useSelector } from "react-redux";

const Profile = () => {

  // const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user)

  console.log("userprofilepage", user)

  // useEffect(() => {
  //   dispatch(fetchUserDetails());
  // }, [dispatch])

  
  return (

    <div className="flex items-center justify-center">
      <div className="bg-slate-500 mt-4 p-3 w-[30vw] rounded-md">

        <h1 className="text-center text-3xl mb-3 font-semibold text-white ">Welcome to my Profile</h1>
        

        {user ? (

          <div>
            <div className="flex flex-col ">
              <label className="text-white">Email</label>
              <input value={user.user.email} className="p-4 w-[27vw]   rounded-md"
                type="text" />

            </div>
            <div className="flex flex-col mt-3">
              <label className="text-white">Name</label>
              <input value={user.user.name} className="p-4 w-[27vw]    rounded-md"
                type="text" />

            </div>
            
            <div className="flex flex-col mt-3">
              <label className="text-white">Gender</label>
              <input value={user.user.gender} className="p-4 w-[27vw]    rounded-md"
                type="text" />

            </div>
            <div className="flex flex-col mt-3">
              <label className="text-white">Address</label>
              <input value={user.user.address} className="p-4 w-[27vw]    rounded-md"
                type="text" />

            </div>
          </div>
        ) :  <div>Loading...</div>}

        <button className="p-4 w-[27vw]  mt-3 text-white text-2xl font-semibold  rounded-md bg-green-500">Update Profile</button>


      </div>
    </div>
  )
}

export default Profile