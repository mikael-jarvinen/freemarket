import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import ControlBar from './components/ControlBar'
import Footer from './components/footer'
import DialogView from './components/DialogView'
import ListingsPage from './components/ListingsPage'
import { history } from './store'

const App = () => {
  return (
    <ConnectedRouter history={history}>
      <ControlBar/>
      <DialogView/>
      <Switch>
        <Route path='/listings'>
          <ListingsPage/>
        </Route>
        <Route path='/'>
          This is the starting page
        </Route>
      </Switch>
      <Footer/>
    </ConnectedRouter>
  )
}

export default App
