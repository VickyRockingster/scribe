import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router'
// import { Link } from 'react-router-dom'

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
        console.log(res)
        this.setState({
          created: true,
          entry: res.data.entry
        })
      })
      .then(() => (console.log(this.state.entry)))
      .catch(console.log)
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
      <form onSubmit={this.handleSubmit} id="create-entry">
        <input name="title" type="text" placeholder="Title" onChange={this.handleChange}
          id="create-entry-title" required/>
        <textarea name="text" type="text" placeholder="Text" onChange={this.handleChange}
          id="create-entry-text" required></textarea>
        <button type="submit" >Add</button>
      </form>
    )
  }
}
// <Link to={this.props.match.url + '/edit'}><button>Edit</button></Link>

export default withRouter(EntryCreate)
