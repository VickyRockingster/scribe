import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'

import TextField from '@material-ui/core/TextField'
// import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'

// import PropTypes from 'prop-types'
// import Input from '@material-ui/core/Input'
// import InputBase from '@material-ui/core/InputBase'
// import InputLabel from '@material-ui/core/InputLabel'
// import FormControl from '@material-ui/core/FormControl'
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import { theme } from '@material-ui/system'
// // import purple from '@material-ui/core/colors/purple'
// import brown from '@material-ui/core/colors/brown'

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

  // styles = theme => ({
  //   root: {
  //     display: 'flex',
  //     flexWrap: 'wrap'
  //   },
  //   margin: {
  //     margin: theme.spacing.unit
  //   },
  //   cssLabel: {
  //     '&$cssFocused': {
  //       color: purple[500]
  //     }
  //   },
  //   cssFocused: {},
  //   cssUnderline: {
  //     '&:after': {
  //       borderBottomColor: purple[800]
  //     }
  //   },
  //   cssOutlinedInput: {
  //     '&$cssFocused $notchedOutline': {
  //       borderColor: purple[500]
  //     }
  //   },
  //   notchedOutline: {},
  //   bootstrapRoot: {
  //     'label + &': {
  //       marginTop: theme.spacing.unit * 3
  //     }
  //   },
  //   bootstrapInput: {
  //     borderRadius: 4,
  //     position: 'relative',
  //     backgroundColor: theme.palette.common.white,
  //     border: '1px solid #ced4da',
  //     fontSize: 16,
  //     width: 'auto',
  //     padding: '10px 12px',
  //     transition: theme.transitions.create(['border-color', 'box-shadow']),
  //     // Use the system font instead of the default Roboto font.
  //     fontFamily: [
  //       '-apple-system',
  //       'BlinkMacSystemFont',
  //       '"Segoe UI"',
  //       'Roboto',
  //       '"Helvetica Neue"',
  //       'Arial',
  //       'sans-serif',
  //       '"Apple Color Emoji"',
  //       '"Segoe UI Emoji"',
  //       '"Segoe UI Symbol"'
  //     ].join(','),
  //     '&:focus': {
  //       borderRadius: 4,
  //       borderColor: '#80bdff',
  //       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
  //     }
  //   },
  //   bootstrapFormLabel: {
  //     fontSize: 18
  //   }
  // })
  // theme = createMuiTheme({
  //   palette: {
  //     primary: brown
  //   },
  //   spacing: 2,
  //   typography: { useNextVariants: true }
  // })

  render () {
    const { email, password } = this.state

    return (
      <form className='auth-form'>
        <h3>Sign In</h3>
        <TextField
          autofocus
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
          autofocus
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
        <Fab variant="extended"
          component='button'
          onClick={this.onSignIn}
          size="medium"
          color="primary">
        Sign In
        </Fab>
      </form>
    )
  }
}

// <MuiThemeProvider theme={theme}>
//   <TextField
//     label="MuiThemeProvider"
//     variant="outlined"
//     id="mui-theme-provider-outlined-input"
//   />
// </MuiThemeProvider>

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
