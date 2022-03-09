import React, { useEffect } from 'react'
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import Loader from './utils/Loader'
import { Switch, Route, useHistory } from 'react-router-dom'
import theme from './utils/theme'
import { makeStyles } from '@material-ui/core/styles';

import { useData } from './contexts/DataContext';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import MenuCliped from './components/UI/MenuCliped'
import i18n from './i18n'
import ErrorBoundary from './utils/ErrorBoundary';
import ScrollToTopButton from './components/UI/ScrollToTopButton';
import ChangeGeneratedPasswordScreen from './screens/ChangeGeneratedPasswordScreen';
import GuardedRoute from './utils/GuardedRoute'

// LAZY LOADING 
const DashboardScreen = React.lazy(() => import('./screens/DashboardScreen'))
const UserDashboardScreen = React.lazy(() => import('./screens/UserDashboardScreen'))
const CustomersScreen = React.lazy(() => import('./screens/CustomersScreen'))
const CarScreen = React.lazy(() => import('./screens/CarScreen'))
const CarDetailsScreen = React.lazy(() => import('./screens/CarDetailsScreen'))
// const InsuranceScreen = React.lazy(() => import('./screens/InsuranceScreen'))
// const BankScreen = React.lazy(() => import('./screens/BankScreen'))
const PrivacyPolicyScreen = React.lazy(() => import('./screens/PrivacyPolicyScreen'))
const Login = React.lazy(() => import('./screens/NewLogin'))
const AccountScreen = React.lazy(() => import('./screens/AccountScreen'))

function App() {
  const useStyles = makeStyles(theme => ({
    navbarFix: {
      position: 'relative',
      top: !loading && 64,
      height: 'calc(100vh - 64px)',
      marginLeft: !loading && 70,
      marginRight: 'calc(70px - 56px)',
      [theme.breakpoints.up('sm')]: {
        marginLeft: !loading && 75,
        marginRight: 0
      }
    }
  }))

  const { authenticated, getAllVehicles, appLoading, loading, setAuthenticated, setSelectedUser, selectedUser, getUserVehicles, getUserData, user, getAllUsers, setUser } = useData()
  const classes = useStyles()
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
  }, [setUser, setSelectedUser, storageSelectedUserRef, storageUser, storageLanguage])

  useEffect(() => {
    if (authenticated) {
      getUserData()
    }
  }, [getUserData, authenticated])

  useEffect(() => {
    if (storageUser && user && user.role === 'user') {
      setAuthenticated(true)
    }
  }, [user, storageUser, setAuthenticated])

  useEffect(() => {
    if (storageUser && user && user.role === 'admin') {
      setAuthenticated(true)
      getAllUsers()
      getAllVehicles()
      // getInsurances()
      // getBanks()
    }
  }, [getAllUsers, user, getAllVehicles, storageUser, setAuthenticated])

  let userId = user._id
  if (user && user.role === 'admin' && selectedUser) {
    userId = selectedUser._id
  }

  useEffect(() => {
    if (userId && user.role === 'user') {
      getUserVehicles(userId)
    }
  }, [getUserVehicles, userId, user.role])

  const authRoutes = (
    <ErrorBoundary>
      <React.Suspense fallback={<Loader />}>
        {user.role === 'admin' ?
          <Switch>
            <Route exact path="/" component={DashboardScreen} />
            <Route exact path="/customers" component={CustomersScreen} />
            <Route exact path="/cars" component={CarScreen} />
            <Route exact path="/cars/:id" component={CarDetailsScreen} />
            {/* <Route exact path="/insurances" component={InsuranceScreen} /> */}
            {/* <Route exact path="/banks" component={BankScreen} /> */}
          </Switch> :
          <Switch>
            <Route exact path="/" component={UserDashboardScreen} />
            <Route exact path="/cars" component={CarScreen} />
            <Route exact path="/account" component={AccountScreen} />
            <GuardedRoute exact path="/changePassword" component={ChangeGeneratedPasswordScreen} condition={user.firstLogIn} />
            <Route exact path="/cars/:id" component={CarDetailsScreen} />
            <Route exact path="/privacyPolicy" component={PrivacyPolicyScreen} />
          </Switch>}
      </React.Suspense>
    </ErrorBoundary>
  )

  const routes = (
    <React.Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/resetPassword/:tokenId" component={ResetPasswordScreen} />
      </Switch>
    </React.Suspense>
  )

  // OLD CODE
  // const navbarFix = {
  //   position: 'relative',
  //   top: !loading && 64,
  //   height: 'calc(100vh - 64px)',
  //   marginLeft: !loading && 70
  // }

  const app = !appLoading ? (
    <div className={authenticated && history.location.pathname !== '/privacyPolicy' && history.location.pathname !== '/changePassword' ? classes.navbarFix : null}>
      {authenticated && history.location.pathname !== '/privacyPolicy' && history.location.pathname !== '/changePassword' && !loading && <MenuCliped open={open} setOpen={setOpen} />}
      {authenticated && history.location.pathname !== '/privacyPolicy' && history.location.pathname !== '/changePassword' && !loading && <ScrollToTopButton />}
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
