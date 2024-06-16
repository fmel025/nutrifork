import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Error404 from './pages/error404/Error404'
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
        <Route path='/404' Component={ Error404 }></Route>
      </Routes>
    </Router>
  )
}

export default App
