import { ROLL_LETTER_STEP_MS } from '../utils/roll'

// Column with two identical copies: the first one exits upwards,
// the second one rises from below and takes its place.
function RollColumn({ text, delay = 0 }) {
  return (
    <span className="roll-col" style={{ '--roll-delay': `${delay}ms` }}>
      <span>{text}</span>
      <span>{text}</span>
    </span>
  )
}

function RollText({ children, letters = false }) {
  const text = String(children)

  return (
    <span className="roll-text" aria-hidden="true">
      {letters
        ? [...text].map((ch, i) => (
            <RollColumn key={i} text={ch} delay={i * ROLL_LETTER_STEP_MS} />
          ))
        : <RollColumn text={text} />}
    </span>
  )
}

export default RollText
