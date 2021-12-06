import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import About from "./About";
// import Login from "./Login";
// import Signup from "./Signup";
import Profile from "./Profile";
// import Dictionary from "./Dictionary"
import Scratch from "./scratchpad"
import Kanji from "./Kanji"
import Test from "./Test"

function NavRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="about" element={<About />} />
      <Route path="learn" element={<Profile />} />
      <Route path="kanji" element={<Kanji />} />
      <Route path="test" element={<Test />} />
      <Route path="scratch" element={<Scratch />} />
    </Routes>

  )
}
export default NavRoutes