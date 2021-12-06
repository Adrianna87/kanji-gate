import React from "react";

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>Known issues:
        <ul>
          <li>Test may repeat kanji</li>
          <li>Answer buttons may contain duplicate answers</li>
          <li>Test lacks feedback on incorrect answers</li>
          <li>Flash cards may disappear when switching between grades</li>
        </ul>
      </p>
      <p>
        Additional features in development:
        <ul>
          <li>User signup and login</li>
          <li>Tracking user progress</li>
          <li>Middle school, high school and JLPT level 1 kanji</li>
          <li>Style and UX enhancements</li>
        </ul>
      </p>
    </div>
  )
}

export default About