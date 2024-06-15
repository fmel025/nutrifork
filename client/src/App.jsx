import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { 
  Route, 
  BrowserRouter as Router, 
  Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' Component={ Login }></Route>
        <Route path='/' Component={ Home }></Route>
      </Routes>
    </Router>
  )
}

export default App
