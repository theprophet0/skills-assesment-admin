import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import ViewHistorical from './pages/ViewHistorical'
import AdminPage from './pages/AdminPage'
import RegisterPage from './pages/RegisterPage'
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AdminPage}></Route>
        <Route exact path="/register" component={RegisterPage}></Route>
        <Route exact path="/home" component={HomePage}></Route>
        <Route exact path="/historical" component={ViewHistorical}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}

export default App
