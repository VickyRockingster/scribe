import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import messages from './messages'

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
      redirectToEdit: false,
      redirectToCreate: false
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
      .then(() => this.setState({ redirectToCreate: true }))
      .catch(error => {
        console.error(error)
        this.props.alert(messages.deleteEntryFailure, 'danger')
      })
  }

  handleEdit = () => {
    this.setState({ redirectToEdit: true })
  }

  handleRedirectToCreate = () => {
    this.setState({ redirectToCreate: true })
  }

  render () {
    const id = this.props.match.params.id

    if (!this.state.entry) {
      return <p>loading...</p>
    }
    if (this.state.redirectToEdit) {
      return <Redirect to={{ pathname: `/entries/${id}/edit` }} />
    }

    if (this.state.redirectToCreate) {
      return <Redirect to={{ pathname: '/entries-create' }} />
    }
    // const { director, title, year } = this.state.movie
    return (
      <main id="show-entry" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }}>
        <h4>{this.state.entry.title}</h4>
        <div>{this.state.entry.text}</div>
        <Button variant="contained" onClick={this.handleRedirectToCreate}
          color="primary">
          Create New Entry
        </Button>
        <Button variant="contained" onClick={this.handleDelete} color="primary">
          Delete
        </Button>
        <Button variant="contained" onClick={this.handleEdit} color="primary">
          Edit
        </Button>
      </main>
    )
  }
}
// <button type="button" onClick={this.handleDelete}>Delete</button>
// <button type="button" onClick={this.handleEdit}>Edit</button>
// return (<form style={{
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-evenly',
//   alignItems: 'center'
// }}>
// <TextField
// autoFocus
// variant="filled"
// type="text"
// label="Title"
// value={this.state.entry.title}
// />
// <TextField
// autoFocus
// multiline={true}
// rows={10}
// rowsMax={1000}
// variant="filled"
// type="text"
// label="Text"
// value={this.state.entry.text}
// />
// <Button variant="contained" onClick={this.handleDelete} color="primary">
// Delete</Button>
// <Button variant="contained" onClick={this.handleEdit} color="primary">
// Edit</Button>
// </form>
// <Link to={this.props.match.url + '/edit'}><button>Edit</button></Link>

export default withRouter(EntryShow)
