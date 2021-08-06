import React, { useEffect } from 'react'
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import Loader from './utils/Loader'
import { Switch, Route, useHistory } from 'react-router-dom'
import theme from './utils/theme'

import Navbar from './components/UI/Navbar';
import Home from './screens/Home'
import HomeUser from './screens/HomeUser';
import Login from './screens/Login'
import UserDetails from './screens/UserDetails'
import CarDetailsScreen from './screens/CarDetailsScreen'

import { useData } from './contexts/DataContext';
import jwtDecode from 'jwt-decode'
import axios from 'axios'

function App() {
  const { authenticated, appLoading, setAuthenticated, logout, getUserData, user, getAllUsers } = useData()
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
      getUserData()
    }
  }, [token, logout, setAuthenticated, getUserData, history])

  useEffect(() => {
    if(user && user.role === 'admin') {
      getAllUsers()
    }
  }, [getAllUsers, user])

  const authRoutes = (
    <Switch>
     {user.role === 'admin' ? <Route exact path="/" component={Home} /> : <Route exact path="/" component={HomeUser} />}
     <Route exact path="/user/:id" component={UserDetails} />
     <Route exact path="/cars/:id" component={CarDetailsScreen}/>
    </Switch>
  )

  const routes = (
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  )

  const navbarFix = {
    position: 'relative',
    top: '56px',
    height: 'calc(100vh - 56px)'
  }

  const app = !appLoading ?(
    <div style={authenticated ? navbarFix : null} className="App">
        {authenticated && <Navbar />}
        {authenticated ? authRoutes : routes}
    </div>
  ) : <Loader />

  return (
    <ThemeProvider theme={theme}>
      {app}
    </ThemeProvider>
  );
}

export default App;
