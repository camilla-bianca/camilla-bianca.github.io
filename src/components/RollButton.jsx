import { ROLL_BY_LETTER } from '../utils/roll'
import RollText from './RollText'

// Button with the roll effect. Use as="a" or as={Link} for links;
// children (e.g. an icon) are rendered after the text.
function RollButton({
  as: Tag = 'button',
  variant = 'secondary',
  label,
  className = '',
  children,
  ...props
}) {
  const classes = [`btn-${variant}`, className].filter(Boolean).join(' ')

  return (
    <Tag className={classes} aria-label={label} {...props}>
      <RollText letters={ROLL_BY_LETTER}>{label}</RollText>
      {children}
    </Tag>
  )
}

export default RollButton
