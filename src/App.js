import React, { useEffect } from 'react'
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import Loader from './utils/Loader'
import { Switch, Route, useHistory } from 'react-router-dom'
import theme from './utils/theme'

import { useData } from './contexts/DataContext';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import MenuCliped from './components/UI/MenuCliped'
import i18n from './i18n'
import ErrorBoundary from './utils/ErrorBoundary';
import ScrollToTopButton from './components/UI/ScrollToTopButton';

// LAZY LOADING 
const DashboardScreen = React.lazy(() => import('./screens/DashboardScreen'))
const CustomersScreen = React.lazy(() => import('./screens/CustomersScreen'))
const SelectedUserDetailed = React.lazy(() => import('./components/UI/Users/SelectedUserDetailed'))
const CarScreen = React.lazy(() => import('./screens/CarScreen'))
const CarDetailsScreen = React.lazy(() => import('./screens/CarDetailsScreen'))
const InsuranceScreen = React.lazy(() => import('./screens/InsuranceScreen'))
const BankScreen = React.lazy(() => import('./screens/BankScreen'))
const Profile = React.lazy(() => import('./screens/Profile'))
const PrivacyPolicyScreen = React.lazy(() => import('./screens/PrivacyPolicyScreen'))
const Login = React.lazy(() => import('./screens/Login'))

function App() {
  const { authenticated, getAllVehicles, appLoading, loading, setAuthenticated, setSelectedUser, selectedUser, getUserVehicles, getUserData, user, getAllUsers, getInsurances, getBanks, setUser } = useData()
  const history = useHistory()
  const [open, setOpen] = React.useState(false);

  let storageUser = localStorage.user
  let storageSelectedUserRef = React.useRef(localStorage.selectedUser)
  let storageLanguage = localStorage.language

  useEffect(() => {
    if (storageUser) {
      setUser(JSON.parse(storageUser))
    }

    if (storageSelectedUserRef.current) {
      setSelectedUser(JSON.parse(storageSelectedUserRef.current))
    }

    if (storageLanguage) {
      i18n.changeLanguage(storageLanguage)
    }
  }, [setUser, setSelectedUser, storageSelectedUserRef, storageUser])

  useEffect(() => {
    if (authenticated) {
      getUserData()
    }
  }, [getUserData, authenticated])

  useEffect(() => {
    if (storageUser && user && user.role === 'user') {
      setAuthenticated(true)
    }
  }, [user, storageUser])

  useEffect(() => {
    if (storageUser && user && user.role === 'admin') {
      setAuthenticated(true)
      getAllUsers()
      getAllVehicles()
      getInsurances()
      getBanks()
    }
  }, [getAllUsers, user, getInsurances, getBanks, getAllVehicles, storageUser])

  let userId = user._id
  if (user && user.role === 'admin' && selectedUser) {
    userId = selectedUser._id
  }

  useEffect(() => {
    if (userId && user.role === 'user') {
      getUserVehicles(userId)
    }
  }, [getUserVehicles, userId])

  const authRoutes = (
    <ErrorBoundary>
      <React.Suspense fallback={<Loader />}>
        {user.role === 'admin' ?
          <Switch>
            <Route exact path="/" component={DashboardScreen} />
            <Route exact path="/customers" component={CustomersScreen} />
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
            <Route exact path="/privacyPolicy" component={PrivacyPolicyScreen} />
          </Switch>}
      </React.Suspense>
    </ErrorBoundary>
  )

  const routes = (
    <ErrorBoundary>
      <React.Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/resetPassword/:tokenId" component={ResetPasswordScreen} />
        </Switch>
      </React.Suspense>
    </ErrorBoundary>
  )

  const navbarFix = {
    position: 'relative',
    top: !loading && 64,
    height: 'calc(100vh - 64px)',
    // marginLeft: open && matches ? 250 : 75,
    marginLeft: !loading && 75,
    // paddingRight: 17
  }

  const app = !appLoading ? (
    <div style={authenticated && history.location.pathname !== '/privacyPolicy' ? navbarFix : null} className="App">
      {authenticated && history.location.pathname !== '/privacyPolicy' && !loading && <MenuCliped open={open} setOpen={setOpen} />}
      {authenticated && history.location.pathname !== '/privacyPolicy' && !loading && <ScrollToTopButton />}
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
