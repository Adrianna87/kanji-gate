import React from "react"
import { NavLink } from "react-router-dom"

function NavBar() {
  return (
    <nav>
      <NavLink to="/">| Homepage |</NavLink>
      <NavLink to="/about">| About |</NavLink>
      <NavLink to="/learn">| Learn Kanji |</NavLink>
    </nav>
  )
}

export default NavBar