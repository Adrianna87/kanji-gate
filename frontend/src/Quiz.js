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

  const getRandomKanji = () => {
    let res = [];
    let test = [];
    for (let i = 0; i < 20; i++) {
      let randomKanji = random(grade);
      res.push(randomKanji);
      test.push(randomKanji);
    };
    setKanji(res);
    setQuizApi(test.map(k => {
      let qobj = {};
      qobj["kanji"] = k.kanji.character;
      qobj["answers"] = [
        { text: k.kanji.meaning.english, correct: true },
        { text: "wrong1", correct: false },
        { text: "wrong2", correct: false }
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

  return (
    <div>
      {kanji === null ?
        <button onClick={getRandomKanji}>All Random Kanji</button> :
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
                key={quizApi[currentQuestion].reference}
                char={quizApi[currentQuestion].kanji} /></div>
            </div>
            <div className='answer-section'>
              {quizApi[currentQuestion].answers.map((answerOption) => (
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