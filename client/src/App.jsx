import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Settings from './pages/settings/Settings'
import Error404 from './pages/error404/Error404'
import { 
  Route, 
  BrowserRouter as Router, 
  Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/iniciar-sesion' Component={ Login }></Route>
        <Route path='/' Component={ Home }></Route>
        <Route path='/ajustes' Component={ Settings }></Route>
        <Route path='/404' Component={ Error404 }></Route>
      </Routes>
    </Router>
  )
}

export default App
