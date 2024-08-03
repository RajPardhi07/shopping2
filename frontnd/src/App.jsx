import { useSelector } from "react-redux"
import Home from "./components/Home"
import Login from "./components/Login"
import Nav from "./components/Nav"
import Profile from "./components/Profile"
import Register from "./components/Register"
import { Routes, Route,Navigate } from 'react-router-dom'
import QRgenerator from "./components/QRgenerator"
import Edit from "./components/Edit"

const App = () => {
  const isAuth = useSelector((state) => state.auth.token);

  return (
    <div>

      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login" />} />
      
         <Route path='/edit/:id' element={<Edit />} />
         <Route path='/qrcode' element={<QRgenerator />} />
         <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App