import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div>
      <h1>Learn Kanji</h1>
      <h2><Link to="/kanji">Study</Link> | <Link to="/test">Test</Link></h2>
    </div>
  )
}

export default Profile