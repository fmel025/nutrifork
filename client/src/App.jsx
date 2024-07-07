import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Settings from './pages/settings/Settings'
import Profile from './pages/profile/Profile'
import Error404 from './pages/error404/Error404'
import ProtectedRoute from './components/utils/ProtectedRoute'
import AuthRedirectRoute from './components/utils/AuthRedirectRoute'
import Preferences from './pages/prefences/Preferences'
import Recipes from './pages/recipes/Recipes'
import PromoPage from './pages/promoPage/PromoPage'
import { useEffect, useState } from 'react'
import { AuthProvider } from './components/utils/AuthContext'
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
    <AuthProvider>
      <Router>
        <Routes>
          {/* AuthRedirectRoute allows users to enter these routes only when they're NOT logged in */}
          <Route element={<AuthRedirectRoute isAuthenticated={loggedIn} />}>
            <Route path='/iniciar-sesion' element={<Login />} />
            <Route path='/registrarse' element={<Register />} />
            <Route path='/nutrifork' element={<PromoPage />} />
          </Route>

          {/* ProtectedRoute allows users to enter only when they're logged in */}
          <Route element={<ProtectedRoute canActivate={loggedIn} />}>
            <Route path='/ajustes' element={<Settings />} />
            <Route path='/perfil' element={<Profile />} />
          </Route>

          <Route path='/' element={<Home />} />
          <Route path='/preferencias' element={<Preferences />} />
          <Route path='/receta/:id' element={<Recipes />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
