import React, { useState } from "react";
import axios from "axios";

const Dictionary = () => {
  const [kanjiChar, setKanjiChar] = useState(null);
  const [term, setTerm] = useState("");

  async function getKanji() {
    try {
      const res = await axios.get(`https://kanjialive-api.p.rapidapi.com/api/public/search/${term}/`);
      setKanjiChar(res.data[0].kanji);
    } catch (err) {
      alert('Kanji not found.');
    }
  }

  const search = term => {
    console.log(term);
    getKanji();
  };

  const handleChange = evt => {
    setTerm(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    search(term);
    setTerm("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={term} onChange={handleChange} />
        <button>Search!</button>
      </form>
      {kanjiChar ? <h1>Kanji: {kanjiChar.character}</h1> : <h1>Hello</h1>}
    </div>
  )
}

export default Dictionary