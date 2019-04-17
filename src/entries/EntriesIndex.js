import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// import Spinner from 'react-bootstrap/Spinner'
import apiUrl from '../apiConfig'
import axios from 'axios'

class EntriesIndex extends Component {
  constructor () {
    super()
    this.state = {
      entries: [],
      gotten: false,
      message: ''
    }
  }

  componentDidMount () {
    console.log('entries component mounted')
    return axios({
      method: 'GET',
      url: `${apiUrl}/entries`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => this.setState({
        entries: response.data.entries,
        gotten: true
      }))
      .catch(() => this.setState({
        entries: [],
        message: 'Failed to get your entries. Please try again.'
      }))
  }

  render () {
    if (!this.state.entries.length) {
      return <p>loading...</p>
    }
    // console.log('entries component rendered')
    return (
      <aside id="get-entries">
        <h4>Entries:</h4>
        <ul>
          {this.state.entries.map(entry => (
            <li key ={entry.id}>
              <Link to={`/entries/${entry.id}/edit`}>{entry.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
    )
  }
}
// <h5>{this.props.location.state ? this.props.location.state.message : ''}</h5>

export default EntriesIndex