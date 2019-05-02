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
    const { alerts } = this.state
    this.setState({ alerts: [...alerts, { message, type }] })
    setTimeout(() => {
      this.setState({ alerts: [] })
    }, 2000)
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} style={{ }}/>
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container background">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/entries-create' render={() => (
            <Fragment>
              <EntriesIndex alert={this.alert} user={user} />
              <EntryCreate alert={this.alert} user={user} />
            </Fragment>
          )} />
          <AuthenticatedRoute user={user} path='/entries/:id/show' render={() => (
            <EntryShow alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/entries/:id/edit' render={() => (
            <Fragment>
              <EntriesIndex alert={this.alert} user={user} />
              <EntryEdit alert={this.alert} user={user} />
            </Fragment>
          )} />
        </main>
      </Fragment>
    )
  }
}

// <Route exact path='/sign-in' render={() => (
//   <SignIn alert={this.alert} setUser={this.setUser} />
// )} />
export default App
