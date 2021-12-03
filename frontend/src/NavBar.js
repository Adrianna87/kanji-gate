import React from "react"
import { NavLink } from "react-router-dom"

function NavBar() {
  return (
    <nav>
      <NavLink to="/">Homepage</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/dictionary">Dictionary</NavLink>
    </nav>
  )
}

export default NavBar