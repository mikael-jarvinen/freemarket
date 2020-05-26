import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import LoginDialog from './components/LoginDialog/'
import ControlBar from './components/ControlBar'
import Footer from './components/footer'

const App = () => {
  return (
    <Router>
      <ControlBar/>
      <LoginDialog/>
      <Switch>
        <Route path='/login'>
          This is the login page
        </Route>
        <Route path='/listings'>
          Here you can view listings
        </Route>
        <Route path='/'>
          This is the starting page
        </Route>
      </Switch>
      <Footer/>
    </Router>
  )
}

export default App
