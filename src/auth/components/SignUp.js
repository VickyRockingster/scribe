import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { signUp, signIn } from '../api'
import messages from '../messages'

import Fab from '@material-ui/core/Fab'
// import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/entries-create'))
      .catch(error => {
        console.error(error)
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirmation: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { firstName, lastName, email, password, passwordConfirmation } = this.state

    return (
      <form className='auth-form'>
        <h3>Sign Up</h3>
        <TextField
          autoFocus
          fullWidth
          required
          margin='normal'
          variant="outlined"
          type="text"
          name="lastName"
          label="Last Name"
          value={lastName}
          onChange={this.handleChange}
        />
        <TextField
          autoFocus
          fullWidth
          required
          margin='normal'
          variant="outlined"
          type="text"
          name="firstName"
          label="First Name"
          value={firstName}
          onChange={this.handleChange}
        />
        <TextField
          autoFocus
          fullWidth
          required
          margin='normal'
          variant="outlined"
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
          margin='normal'
          variant="outlined"
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={this.handleChange}
        />
        <TextField
          autoFocus
          fullWidth
          required
          margin='normal'
          variant="outlined"
          type="password"
          name="passwordConfirmation"
          label="Password Confirmation"
          value={passwordConfirmation}
          onChange={this.handleChange}
        />
        <div style={{ display: 'flex', flexFlow: 'row, nowrap', justifyContent: 'flex-end' }}>
          <Fab variant="extended"
            margin='normal'
            component='button'
            onClick={this.onSignIn}
            size="medium"
            color="primary">
            <Link to={'/'}>
              Back to Sign In
            </Link>
          </Fab>
          <Fab variant="extended"
            margin='normal'
            component='button'
            onClick={this.onSignUp}
            size="medium"
            color="primary">
          Sign Up
          </Fab>
        </div>
      </form>
    )
  }
}

// <Button variant="contained" color="primary" onClick={this.onSignUp}>
//   Sign Up
// </Button>
// <Button variant="contained"><Link to={'/'}>
//   Back to Sign In</Link></Button>
export default withRouter(SignUp)
