import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Home from './containers/home/Home.js'
import Settings from './containers/settings/Settings.js'

import classes from './App.module.scss'

function App () {
  return (
    <>
      <Switch>
        <Route path='/settings' component={Settings} />
        <Route path='/' exact component={Home} />
        <Redirect to='/' />
      </Switch>
    </>
  )
}

export default App
