import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import messages from './messages'

// import { Link } from 'react-router-dom'

class EntryEdit extends Component {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
    // this.handleDelete = this.handleDelete.bind(this)
    // this.handleEdit = this.handleEdit.bind(this)

    this.state = {
      entry: null,
      updated: false,
      deleted: false,
      message: ''
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    return axios({
      url: `${apiUrl}/entries/${id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { entry: this.state.entry }
    })
      .then(response => this.setState({ entry: response.data.entry }))
      .catch(error => {
        console.error(error)
        this.props.alert(messages.getEntryFailure, 'danger')
      })
  }

  handleDelete = () => {
    const id = this.props.match.params.id
    return axios({
      url: `${apiUrl}/entries/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({
        deleted: true
      }))
      .catch(error => {
        console.error(error)
        this.props.alert(messages.deleteEntryFailure, 'danger')
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const id = this.props.match.params.id

    return axios({
      url: `${apiUrl}/entries/${id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { entry: this.state.entry }
    })
      .then(response => this.setState({
        entry: response.data.entry,
        updated: true
      }))
      .catch(error => {
        console.error(error)
        this.props.alert(messages.updateEntryFailure, 'danger')
      })
  }

  handleChange = (event) => {
    this.setState({
      entry: { ...this.state.entry, [event.target.name]: event.target.value }
    })
  }

  render () {
    const id = this.props.match.params.id

    if (!this.state.entry) {
      return <p>loading...</p>
    }
    if (this.state.updated) {
      return <Redirect to={{ pathname: `/entries/${id}/show` }} />
    }

    if (this.state.deleted) {
      return <Redirect to={{ pathname: '/entries-create' }} />
    }
    // const { director, title, year } = this.state.movie

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
          value={this.state.entry.title}
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
          value={this.state.entry.text}
          onChange={this.handleChange}
        />
        <Button variant="contained" color="primary" onClick={this.handleDelete}>
          Delete
        </Button>
        <Button variant="contained" onClick={this.handleSubmit} color="primary">
          Edit Entry
        </Button>
      </form>
    )
  }
}
// <form onSubmit={this.handleSubmit} id="show-entry">
// <input name="title" type="text" value={this.state.entry.title} onChange={this.handleChange}
// id="edit-entry-title" required/>
// <textarea name="text" type="text" value={this.state.entry.text} onChange={this.handleChange}
// id="edit-entry-text" required></textarea>
// <button type="button" onClick={this.handleDelete}>Delete</button>
// <button type="submit">Edit</button>
// </form>
// <button onClick={this.handleDelete}>Delete</button>
// <button onClick={this.handleEdit}>Edit</button>
// <Link to={this.props.match.url + '/edit'}><button>Edit</button></Link>

export default withRouter(EntryEdit)
