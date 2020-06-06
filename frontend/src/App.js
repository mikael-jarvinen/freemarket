import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import { Box } from '@material-ui/core'
import { ConnectedRouter } from 'connected-react-router'
import ControlBar from './components/ControlBar'
import DialogView from './components/DialogView'
import ListingsPage from './components/ListingsPage'
import Drawer from './components/Drawer'
import { history } from './store'

const App = () => {
  const drawerWidth = '13vw' // see Drawer.js to determine width

  return (
    <ConnectedRouter history={history}>
      <ControlBar/>
      <Drawer/>
      <DialogView/>
      <Box marginLeft={drawerWidth}>
        <Switch>
          <Route path='/listings'>
            <ListingsPage/>
          </Route>
          <Route path='/'>
          This is the starting page
          </Route>
        </Switch>
      </Box>
    </ConnectedRouter>
  )
}

export default App
