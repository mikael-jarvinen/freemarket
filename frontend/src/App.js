import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import ControlBar from './components/ControlBar'
import Footer from './components/footer'
import AccountPage from './components/AccountPage'
import DialogView from './components/DialogView'

const App = () => {
  return (
    <Router>
      <ControlBar/>
      <DialogView/>
      <Switch>
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
