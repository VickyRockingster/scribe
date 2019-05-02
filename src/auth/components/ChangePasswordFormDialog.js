import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
// import { withRouter } from 'react-router-dom'

import { changePassword } from '../api'
// import messages from '../messages'

export default class ChangePasswordFormDialog extends Component {
  state = {
    open: false,
    passwords: {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = event => this.setState({
    passwords: { ...this.state.passwords, [event.target.name]: event.target.value }
  })

  handleChangePassword = event => {
    event.preventDefault()
    changePassword(this.state.passwords, this.props.user)
      .then(() => this.setState({ open: false }))
      // .then(() => alert(messages.changePasswordSuccess, 'success'))
      // .then(() => history.push('/entries-create'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '' })
        // alert(messages.changePasswordFailure, 'danger')
      })
  }

  render () {
    return (
      <div>
        <Button size="large" variant="outlined" onClick={this.handleClickOpen}>
          Change Password
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.props.user.email}</DialogContentText>
            <form>
              <TextField
                autoFocus
                fullWidth
                margin='normal'
                variant="outlined"
                type="password"
                name="oldPassword"
                label="Old Password"
                value={this.state.oldPassword}
                onChange={this.handleChange}
              />
              <TextField
                autoFocus
                fullWidth
                margin='normal'
                variant="outlined"
                type="password"
                name="newPassword"
                label="New Password"
                value={this.state.newPassword}
                onChange={this.handleChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} margin='normal' color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleChangePassword} margin='normal' color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
