// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/user/userSlice';

const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className='w-full h-20 bg-slate-600 text-white text-3xl'>

      {!isAuth && (
        <div className='flex items-center justify-between p-5'>

          <div>

            <Link to="/">Home</Link>
          </div>

          <div className='flex gap-5'>

            <Link to="/register">Register</Link>


            <Link to="/login">Login</Link>

          </div>

        </div>
      )}
      {isAuth && (
        <div className='flex items-center justify-between'>

          <div>
            <Link to='/'>
            <img className='w-[9vw] ml-8 h-[5.2vw] rounded-full object-cover' src="https://st2.depositphotos.com/4035913/6124/i/450/depositphotos_61243733-stock-illustration-business-company-logo.jpg" alt="" />
            </Link>
          </div>

             <Link to='/qrcode'>QR Generator</Link>
          <div className='flex items-center gap-5 mr-5'>
             

            <Link to="/profile">
            <img className='w-[5vw]' src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png" alt="" />
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </div>

        </div>



      )}

    </nav>
  );
};

export default Navbar;
