import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import theme from './utils/theme'

import Home from './screens/Home'

function App() {

  const routes = (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  )

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {routes}
      </div>
    </ThemeProvider>
  );
}

export default App;
