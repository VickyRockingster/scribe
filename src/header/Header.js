import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ChangePasswordFormDialog from '../auth/components/ChangePasswordFormDialog'
import Button from '@material-ui/core/Button'

import './Header.scss'

const authenticatedOptions = (
  <Button variant="outlined"><Link to="/sign-out">Sign Out</Link></Button>
)

const unauthenticatedOptions = (
  <Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </Fragment>
)

// const alwaysOptions = (
//   <Fragment>
//     <Link to="/">Home</Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <header className="main-header">
    <h1>Scribe</h1>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      <span>{ user ? <ChangePasswordFormDialog user={user} /> : '' }</span>
      <span>{ user ? authenticatedOptions : unauthenticatedOptions }</span>
    </nav>
  </header>
)

export default Header
// { alwaysOptions }
