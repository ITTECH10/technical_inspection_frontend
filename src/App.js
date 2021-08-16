import React, { useEffect } from 'react'
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import Loader from './utils/Loader'
import { Switch, Route, useHistory } from 'react-router-dom'
import theme from './utils/theme'

import Navbar from './components/UI/Navbar';
import Login from './screens/Login'
import CarDetailsScreen from './screens/CarDetailsScreen'
import CustomersScreen from './screens/CustomersScreen';

import { useData } from './contexts/DataContext';
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import SelectedUserDetailed from './components/UI/Users/SelectedUserDetailed';
import CarScreen from './screens/CarScreen';
import InsuranceScreen from './screens/InsuranceScreen';
import BankScreen from './screens/BankScreen';
import Profile from './screens/Profile';

function App() {
  const { authenticated, appLoading, setAuthenticated, setSelectedCar, setSelectedUser, selectedUser, getSelectedUser, getUserVehicles, logout, getUserData, user, getAllUsers, getInsurances, getBanks, setUser } = useData()
  const history = useHistory()
  const matches = useMediaQuery('(min-width:600px)');

  let token = localStorage.token
  let storageUser = JSON.parse(localStorage.user)
  let storageSelectedUser = JSON.parse(localStorage.selectedUser)

  useEffect(() => {
    if (storageUser) {
      setUser(storageUser)
    }

    if (storageSelectedUser) {
      setSelectedUser(storageSelectedUser)
    }
  }, [])

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
    if (user && user.role === 'admin') {
      getAllUsers()
      getInsurances()
      getBanks()
    }
  }, [getAllUsers, user, getInsurances, getBanks])

  let userId = user._id
  if (user && user.role === 'admin' && selectedUser) {
    userId = selectedUser._id
  }

  useEffect(() => {
    if (userId) {
      getSelectedUser(userId)
      getUserVehicles(userId)
    }
  }, [getSelectedUser, getUserVehicles, userId])

  const authRoutes = (
    user.role === 'admin' ?
      <Switch>
        {/* {user.role === 'admin' ? <Route exact path="/" component={Home} /> : <Route exact path="/" component={HomeUser} />} */}
        {/* <Route exact path="/" component={HomeUser} /> */}
        <Route exact path="/" component={CustomersScreen} />
        <Route exact path="/user/:id" component={SelectedUserDetailed} />
        <Route exact path="/cars" component={CarScreen} />
        <Route exact path="/cars/:id" component={CarDetailsScreen} />
        <Route exact path="/insurances" component={InsuranceScreen} />
        <Route exact path="/banks" component={BankScreen} />
        <Route exact path="/profile" component={Profile} />
      </Switch> :
      <Switch>
        <Route exact path="/" component={CarScreen} />
        <Route exact path="/cars/:id" component={CarDetailsScreen} />
      </Switch>
  )

  const routes = (
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  )

  const navbarFix = {
    position: 'relative',
    top: '64px',
    height: 'calc(100vh - 64px)',
    marginLeft: matches && 240,
  }

  const app = !appLoading ? (
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
