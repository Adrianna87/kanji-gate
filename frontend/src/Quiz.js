import React, { useState, useEffect } from "react";
import KanjiCard from "./KanjiCard";
import axios from "axios";

function Quiz() {
  const [kanji, setKanji] = useState(null);
  const [grade, setGrade] = useState([]);
  const [quizApi, setQuizApi] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function loadGrade() {
      const res = await axios.get(`http://localhost:3001/kanji`);
      setGrade(res.data);
    };
    loadGrade();
  }, []);

  const random = (arr) => {
    const randomKanji = Math.floor(Math.random() * arr.length);
    return arr[randomKanji];
  };

  const getRandomKanji = (num) => {
    let res = [];
    let test = [];

    for (let i = 0; i < 20; i++) {
      let randomKanji = random(grade.filter(k => k.references.grade === num));
      res.push(randomKanji);
      test.push(randomKanji);
    };
    setKanji(res);
    //try a loop or forEach
    //current setup can cause duplicates. Fix this later.
    setQuizApi(test.map(k => {
      let qobj = {};
      qobj["kanji"] = k.kanji.character;
      qobj["answers"] = [
        { text: k.kanji.meaning.english, correct: true },
        { text: random(test.map(k => k.kanji.meaning.english)), correct: false },
        { text: random(test.map(k => k.kanji.meaning.english)), correct: false }
      ];
      qobj["reference"] = k.references.classic_nelson
      return qobj
    }));
  };
  console.log(quizApi)

  const handleAnswerOptionClick = (correct) => {
    if (correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizApi.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  //quiz lacks feedback and reset button
  return (
    <div>
      {kanji === null ?
        <div>
          <button onClick={() => { getRandomKanji(1) }}>Grade 1</button>
          <button onClick={() => { getRandomKanji(2) }}>Grade 2</button>
          <button onClick={() => { getRandomKanji(3) }}>Grade 3</button>
          <button onClick={() => { getRandomKanji(4) }}>Grade 4</button>
          <button onClick={() => { getRandomKanji(5) }}>Grade 5</button>
          <button onClick={() => { getRandomKanji(6) }}>Grade 6</button>
          <button onClick={() => { getRandomKanji(null) }}>JLPT 2</button>
        </div> :
        showScore ? (
          <div className='score-section'>
            You scored {score} out of {quizApi.length}
          </div>
        ) : (
          <>
            <div className='question-section'>
              <div className='question-count'>
                <span>Question {currentQuestion + 1}</span>/{quizApi.length}
              </div>
              <div className='question-text'><KanjiCard
                char={quizApi[currentQuestion].kanji} /></div>
            </div>
            <div className='answer-section'>
              {shuffleArray(quizApi[currentQuestion].answers).map((answerOption) => (
                <button onClick={() => handleAnswerOptionClick(answerOption.correct)}>{answerOption.text}</button>
              ))}
            </div>
          </>
        )}
    </div>
  );
}

export default Quiz;

//code for quiz adapted from 
//https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react/
//code for shuffle from
//https://mitchgavan.com/react-quiz/