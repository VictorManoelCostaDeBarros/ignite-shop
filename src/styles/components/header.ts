import { styled } from ".."

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  button: {
    position: 'relative',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '.75rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    background: '$gray800',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:hover': {
      color: '$gray300',
    }
  }
})

export const Badget = styled('span', {
  position: 'absolute',
  top: -7,
  right: -7,
  background: '$green300',
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '3px solid #121214',
  borderRadius: 1000
})