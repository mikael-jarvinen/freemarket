import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { ConnectedRouter } from 'connected-react-router'
import ControlBar from './components/ControlBar'
import DialogView from './components/DialogView'
import ListingsPage from './components/ListingsPage'
import ListingPage from './components/ListingPage/'
import CategoryDrawer from './components/CategoryDrawer/'
import StartingPage from './components/StartingPage'
import { history } from './store'

const App = () => {
  return (
    <ConnectedRouter history={history}>
      <ControlBar/>
      <DialogView/>
      <Box display='flex'>
        <CategoryDrawer/>
        <Switch>
          <Route path='/listings/:id/'>
            <ListingPage/>
          </Route>
          <Route path='/listings'>
            <ListingsPage/>
          </Route>
          <Route path='/'>
            <StartingPage/>
          </Route>
        </Switch>
      </Box>
    </ConnectedRouter>
  )
}

export default App
