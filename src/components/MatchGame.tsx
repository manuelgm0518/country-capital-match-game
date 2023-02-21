import { useState, useEffect } from "react";
import { MatchCard, MatchCardState } from "./MatchCard";

interface MatchGameProps {
  data: {};
}

interface MatchCardData {
  key: string;
  match: string;
  state: MatchCardState;
}

function MatchGame({ data }: MatchGameProps) {
  const [matches, setMatches] = useState<MatchCardData[]>([]);
  const [errors, setErrors] = useState(0);
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    initData();
  }, []);

  function initData() {
    Object.entries(data).forEach((value) => {
      matches.push({
        key: value[0],
        match: String(value[1]),
        state: MatchCardState.DEFAULT,
      });
      matches.push({
        key: String(value[1]),
        match: value[0],
        state: MatchCardState.DEFAULT,
      });
    });
    matches.sort((_a, _b) => 0.5 - Math.random());
    setMatches([...matches]);
    console.log(matches);
  }

  function checkMatch(index: number) {
    const matchIndex = matches.findIndex((value) => value.state === MatchCardState.SELECTED);
    const match = matches[matchIndex];
    if (matchIndex === index) return;
    if (!match) {
      matches.forEach((_, i) => {
        if (matches[i].state !== MatchCardState.MATCHED)
          matches[i].state = i === index ? MatchCardState.SELECTED : MatchCardState.DEFAULT; // Reset errors and select index
      });
    } else if (match.match !== matches[index].key) {
      matches[index].state = MatchCardState.MISSED;
      matches[matchIndex].state = MatchCardState.MISSED;
      setErrors(errors + 1);
    } else {
      matches[index].state = MatchCardState.MATCHED;
      matches[matchIndex].state = MatchCardState.MATCHED;
      const leftMatches = matches.findIndex((value) => value.state === MatchCardState.DEFAULT);
      if (leftMatches === -1) setWinner(true);
    }
    setMatches([...matches]);
  }

  return (
    <div>
      {winner ? (
        <span className="winner">WINNER!</span>
      ) : errors >= 3 ? (
        <span className="lost">YOU LOST</span>
      ) : (
        matches.map((match, index) => {
          return <MatchCard key={match.key} name={match.key} state={match.state} onClick={() => checkMatch(index)} />;
        })
      )}
      <br />
      <span>Errors: {errors}</span>
    </div>
  );
}

export { MatchGame };
