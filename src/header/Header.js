import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ChangePasswordFormDialog from '../auth/components/ChangePasswordFormDialog'
import './Header.scss'

// const authenticatedOptions = (
//   <Fragment>
//     <FormDialog/>
//     <Link to="/sign-out">Sign Out</Link>
//   </Fragment>
// )

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
      { user && <span>Welcome, {user.first_name}</span>}
      { user ? (<ChangePasswordFormDialog user={user} />)
        : unauthenticatedOptions }
    </nav>
  </header>
)

export default Header
// { alwaysOptions }
