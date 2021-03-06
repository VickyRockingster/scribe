import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router'
// import { Link } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import messages from './messages'

class EntryCreate extends Component {
  constructor () {
    super()
    this.state = {
      entry: null,
      created: false,
      message: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    return axios({
      url: `${apiUrl}/entries`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { entry: this.state.entry }
    })
      .then(res => {
        this.setState({
          created: true,
          entry: res.data.entry
        })
      })
      .catch(error => {
        console.error(error)
        this.props.alert(messages.createEntryFailure, 'danger')
      })
  }

  handleChange = (event) => {
    this.setState({
      entry: { ...this.state.entry, [event.target.name]: event.target.value }
    })
  }

  render () {
    if (this.state.created) {
      const id = this.state.entry.id
      return <Redirect to={{ pathname: `/entries/${id}/show` }} />
    }

    return (
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }}>
        <TextField
          autoFocus
          variant="outlined"
          type="text"
          name="title"
          label="Title"
          onChange={this.handleChange}
        />
        <TextField
          autoFocus
          multiline={true}
          rows={10}
          rowsMax={1000}
          variant="outlined"
          type="text"
          name="text"
          label="Text"
          onChange={this.handleChange}
        />
        <Button variant="contained" onClick={this.handleSubmit} color="primary">
          Add
        </Button>
      </form>
    )
  }
  // <form onSubmit={this.handleSubmit} id="create-entry">
  // <input name="title" type="text" placeholder="Title" onChange={this.handleChange}
  // id="create-entry-title" required/>
  // <textarea name="text" type="text" placeholder="Text" onChange={this.handleChange}
  // id="create-entry-text" required></textarea>
  // <button type="submit" >Add</button>
  // </form>
}
// <Link to={this.props.match.url + '/edit'}><button>Edit</button></Link>

export default withRouter(EntryCreate)
