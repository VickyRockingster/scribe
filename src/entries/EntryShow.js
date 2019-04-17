import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
// import { Link } from 'react-router-dom'

class EntryShow extends Component {
  constructor () {
    super()

    // this.handleDelete = this.handleDelete.bind(this)
    // this.handleEdit = this.handleEdit.bind(this)

    this.state = {
      entry: null,
      gotten: false,
      message: '',
      deleted: false,
      redirectToEdit: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    return axios({
      url: `${apiUrl}/entries/${id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => this.setState({
        entry: response.data.entry,
        gotten: true
      }))
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
      .then(() => this.setState({ deleted: true }))
      .catch(console.log)
  }

  handleEdit = () => {
    this.setState({ redirectToEdit: true })
  }

  render () {
    const id = this.props.match.params.id

    if (!this.state.entry) {
      return <p>loading...</p>
    }
    if (this.state.redirectToEdit) {
      return <Redirect to={{ pathname: `/entries/${id}/edit` }} />
    }

    if (this.state.deleted) {
      return <Redirect to={{ pathname: '/entries-create' }} />
    }
    // const { director, title, year } = this.state.movie

    return (
      <main id="show-entry">
        <h4>{this.state.entry.title}</h4>
        <div>{this.state.entry.text}</div>
        <button type="button" onClick={this.handleDelete}>Delete</button>
        <button type="button" onClick={this.handleEdit}>Edit</button>
      </main>
    )
  }
}
// <Link to={this.props.match.url + '/edit'}><button>Edit</button></Link>

export default withRouter(EntryShow)
