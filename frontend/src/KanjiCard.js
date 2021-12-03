import React from "react";
import "./KanjiCard.css";

function KanjiCard({ char, meaning }) {
  return (
    <div className={"card-body"}>
      {char}
      {meaning}
    </div>
  );
}

export default KanjiCard;