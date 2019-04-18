import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/entries-create'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <form className='auth-form'>
        <h3>Sign In</h3>
        <TextField
          autoFocus
          fullWidth
          required
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={this.handleChange}
        />
        <TextField
          autoFocus
          fullWidth
          required
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={this.handleChange}
        />
        <Button variant="contained" onClick={this.onSignIn} color="primary">
          Sign In
        </Button>
      </form>
    )
  }
}

// <form className='auth-form' onSubmit={this.onSignIn}>
//   <h3>Sign In</h3>
//   <label htmlFor="email">Email</label>
//   <input
//     required
//     type="email"
//     name="email"
//     value={email}
//     placeholder="Email"
//     onChange={this.handleChange}
//   />
//   <label htmlFor="password">Password</label>
//   <input
//     required
//     name="password"
//     value={password}
//     type="password"
//     placeholder="Password"
//     onChange={this.handleChange}
//   />
//   <button type="submit">Sign In</button>
// </form>

export default withRouter(SignIn)
