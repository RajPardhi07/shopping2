import Home from "./components/Home"
import Login from "./components/Login"
import Nav from "./components/Nav"
import Profile from "./components/Profile"
import Register from "./components/Register"
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>

      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App