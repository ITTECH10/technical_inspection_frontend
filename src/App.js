import React, { useEffect } from 'react'
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import Loader from './utils/Loader'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import theme from './utils/theme'

import Navbar from './components/UI/Navbar';
import Home from './screens/Home'
// import HomeUser from './screens/HomeUser';
import Login from './screens/Login'
import { useData } from './contexts/DataContext';
import jwtDecode from 'jwt-decode'
import axios from 'axios'

function App() {
  const { authenticated, loading, setAuthenticated, logout } = useData()
  const history = useHistory()

  let token = localStorage.token

  useEffect(() => {
    if (token) {
      // 1) If there is a token, decode it
      const decodedToken = jwtDecode(token)

      // 2) Check if the token is expired
      if (new Date(decodedToken.exp * 1000) < new Date()) {
        logout(history)
      }

      setAuthenticated(true)
      axios.defaults.headers.common['Authorization'] = token
    }
  }, [token, logout, history, setAuthenticated])

  const authRoutes = (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  )

  const routes = (
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  )

  const RouterCmp = () => (
    <Router>
      {authenticated ? authRoutes : routes}
    </Router>
  )

  const navbarFix = {
    position: 'relative',
    top: '64px'
  }

  const app = !loading ? (
    <div style={authenticated ? navbarFix : null} className="App">
      {authenticated && <Navbar />}
      <RouterCmp />
    </div>
  ) : <Loader />

  return (
    <ThemeProvider theme={theme}>
      {app}
    </ThemeProvider>
  );
}

export default App;
