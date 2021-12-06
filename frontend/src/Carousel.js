import React, { useState, useEffect } from "react";
import axios from "axios";
import KanjiCard from "./KanjiCard"
import ReactCardFlip from 'react-card-flip'

function Carousel() {
  const [cardIdx, setCardIdx] = useState(0);
  const [kanji, setKanji] = useState([]);
  const [allKanji, setAllKanji] = useState([])
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    async function loadAllKanji() {
      const res = await axios.get(`http://localhost:3001/kanji`);
      setKanji(res.data);
      setAllKanji(res.data)
    };
    loadAllKanji();
  }, []);


  const filterKanji = (grade) => {
    const res = allKanji.filter(k => k.references.grade === grade)
    setKanji(res)
  };

  const goForward = () => {
    setCardIdx(cardIdx === kanji.length - 1 ? 0 : cardIdx + 1)
  };
  const goBack = () => {
    setCardIdx(cardIdx === 0 ? kanji.length - 1 : cardIdx - 1)
  };

  const handleClick = evt => {
    evt.preventDefault();
    setIsFlipped(!isFlipped);
  };

  // All kanji present on page load. Fix this later.
  return (
    <div className="Carousel">
      <button onClick={() => { filterKanji(1) }}>Grade 1</button>
      <button onClick={() => { filterKanji(2) }}>Grade 2</button>
      <button onClick={() => { filterKanji(3) }}>Grade 3</button>
      <button onClick={() => { filterKanji(4) }}>Grade 4</button>
      <button onClick={() => { filterKanji(5) }}>Grade 5</button>
      <button onClick={() => { filterKanji(6) }}>Grade 6</button>
      <button onClick={() => { filterKanji(null) }}>JLPT 2</button>


      <button onClick={goBack}>Back</button>

      {kanji
        .map((k, idx) => {
          return (
            <div className={idx === cardIdx ? 'card-active' : 'card'} key={idx}>
              {idx === cardIdx && (
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                  <div onClick={handleClick}>
                    <KanjiCard
                      key={k.references.classic_nelson}
                      char={k.kanji.character} />
                  </div>
                  <div onClick={handleClick}>
                    <KanjiCard
                      key={k.references.classic_nelson}
                      meaning={k.kanji.meaning.english} />
                  </div>
                </ReactCardFlip>
              )}
            </div>
          )
        })
      }
      <button onClick={goForward}>Forward</button>
    </div>
  );
};

export default Carousel;

// code for carousel adapted from
// https://www.youtube.com/watch?v=l1MYfu5YWHc
// code for card flip adapted from
// https://iuliia-proskurnina.medium.com/how-to-integrate-flip-cards-into-react-app-eab089c4df34