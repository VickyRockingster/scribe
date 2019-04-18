import React, { Component, Fragment } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
// import ChangePassword from './auth/components/ChangePassword'

import EntriesIndex from './entries/EntriesIndex.js'
import EntryShow from './entries/EntryShow.js'
import EntryCreate from './entries/EntryCreate.js'
import EntryEdit from './entries/EntryEdit.js'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/entries-create' render={() => (
            <Fragment>
              <EntriesIndex user={user} />
              <EntryCreate user={user} />
            </Fragment>
          )} />
          <AuthenticatedRoute user={user} path='/entries/:id/show' render={() => (
            <Fragment>
              <EntriesIndex user={user} />
              <EntryShow user={user} />
            </Fragment>
          )} />
          <AuthenticatedRoute user={user} path='/entries/:id/edit' render={() => (
            <Fragment>
              <EntriesIndex user={user} />
              <EntryEdit user={user} />
            </Fragment>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
