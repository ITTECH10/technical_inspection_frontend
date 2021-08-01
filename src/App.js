import React, { useState } from 'react'
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import theme from './utils/theme'

import Navbar from './components/UI/Navbar';
import Home from './screens/Home'
import Login from './screens/Login'

function App() {
  const [authenticated, setAuthenticated] = useState(true)

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

  return (
    <ThemeProvider theme={theme}>
      <div style={authenticated ? navbarFix : null} className="App">
        {authenticated && <Navbar />}
        <RouterCmp />
      </div>
    </ThemeProvider>
  );
}

export default App;
