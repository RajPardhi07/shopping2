import { Link } from "react-router-dom"


const Nav = () => {
  return (
    <div className="w-full h-[9vh] bg-green-200 text-[1.6vw]  flex justify-between gap-2">
        <Link className="m-2" to='/'>Home</Link>
        <Link className="m-2" to='/profile'>Profile</Link>

        <div className="m-3 gap-6 flex">

        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
        </div>
    </div>
  )
}

export default Nav