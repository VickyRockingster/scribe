import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'

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
      .catch(console.log)
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
      .catch(console.log)
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
      .catch(() => this.setState({
        entry: { title: '', text: '' },
        message: 'We could not update this entry. Please try again.'
      }))
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
      <form onSubmit={this.handleSubmit} id="show-entry">
        <input name="title" type="text" value={this.state.entry.title} onChange={this.handleChange}
          id="edit-entry-title" required/>
        <textarea name="text" type="text" value={this.state.entry.text} onChange={this.handleChange}
          id="edit-entry-text" required></textarea>
        <button type="button" onClick={this.handleDelete}>Delete</button>
        <button type="submit">Edit</button>
      </form>
    )
  }
}
// <button onClick={this.handleDelete}>Delete</button>
// <button onClick={this.handleEdit}>Edit</button>
// <Link to={this.props.match.url + '/edit'}><button>Edit</button></Link>

export default withRouter(EntryEdit)
