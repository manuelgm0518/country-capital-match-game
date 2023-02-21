enum MatchCardState {
  SELECTED = "selected",
  MISSED = "missed",
  MATCHED = "matched",
  DEFAULT = "default",
}

interface MatchCardProps {
  name: string;
  state: MatchCardState;
  onClick: () => void;
}

function MatchCard({ name, state, onClick }: MatchCardProps) {
  return (
    <div className={"match-card " + state} onClick={() => (state !== MatchCardState.MATCHED ? onClick() : null)}>
      {name}
    </div>
  );
}

export { MatchCard, MatchCardState };
