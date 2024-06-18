import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Settings from './pages/settings/Settings'
import Error404 from './pages/error404/Error404'
import ProtectedRoute from './components/utils/ProtectedRoute'
import AuthRedirectRoute from './components/utils/AuthRedirectRoute'
import { useEffect, useState } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setLoggedIn(!!storedToken);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route element={<AuthRedirectRoute isAuthenticated={loggedIn} />}>
          <Route path='/iniciar-sesion' element={<Login />} />
        </Route>
        <Route path='/' element={<Home loggedIn={loggedIn} />} />
        <Route element={<ProtectedRoute canActivate={loggedIn} />}>
          <Route path='/ajustes' element={<Settings />} />
        </Route>
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default App
