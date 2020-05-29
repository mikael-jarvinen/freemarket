import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import LoginDialog from './components/dialogs/LoginDialog'
import RegisterDialog from './components/dialogs/RegisterDialog'
import ControlBar from './components/ControlBar'
import Footer from './components/footer'
import AccountPage from './components/AccountPage'

const App = () => {
  return (
    <Router>
      <ControlBar/>
      <Switch>
        <Route path='/login'>
          <LoginDialog/>
        </Route>
        <Route path='/register'>
          <RegisterDialog/>
        </Route>
        <Route path='/account'>
          <AccountPage/>
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
