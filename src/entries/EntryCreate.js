import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../apiConfig'
// import { Redirect } from 'react-router'
// import { Link } from 'react-router-dom'

class EntryCreate extends Component {
  constructor () {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)

    this.state = {
      entry: {
        title: '',
        text: ''
      },
      created: false,
      message: '',
      redirectToShow: false
    }
  }

  handleCreate = () => {
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
          redirectToShow: true,
          created: true
        })
      })
      .catch(console.log)
  }

  handleChange = (event) => {
    this.setState({
      entry: { ...this.state.entry, [event.target.name]: event.target.value }
    })
  }

  render () {
    // if (this.state.redirectToShow) {
    // const id = this.props.match.params.id
    //   return <Redirect to={{ pathname: `/entries/${id}/show` }} />
    // }

    return (
      <main handleChange={this.handleChange} id="create-entry">
        <h4>{this.state.entry.title}</h4>
        <div>{this.state.entry.text}</div>
        <button onClick={this.handleCreate}>Add</button>
      </main>
    )
  }
}
// <Link to={this.props.match.url + '/edit'}><button>Edit</button></Link>

export default withRouter(EntryCreate)
