import { styled } from "..";

export const SideCheckoutContainer = styled('div', {
  width: 480,
  height: '100vh',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  background: '$gray800',
  zIndex: 999,
  padding: 48,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  h3: {
    fontWeight: 'bold',
    fontSize: '$xl',
    color: '$gray100',
    marginBottom: '2rem'
  }
})

export const SideCheckoutHeader = styled('div', {
  width: '100%',

  display: 'flex',
  justifyContent: 'flex-end',

  button: {
    cursor: 'pointer',
    background: 'transparent',
    border: 0
  }
})

export const Product = styled('div', {
  display: 'flex',
  gap: '1.25rem',
  flexDirection: 'row',
  marginBottom: '1.5rem',

  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    p: {
      fontSize: '$md',
      color: '$gray300',
    },

    strong: {
      fontWeight: 'bold',
      fontSize: '$md',
      color: '$gray100',
    },

    button: {
      cursor: 'pointer',
      background: 'transparent',
      border: 0,
      color: '$green500',
      fontSize: '1rem',
      fontWeight: 'bold',

      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
      },
  
      '&:not(:disabled):hover': {
        backgroundColor: '$green300'
      }
    }
  }
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 95,
  height: 95,

  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',  
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  }
})

export const Footer = styled('footer', {
  width: '100%',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  span: {
    fontSize: '$md',
    color: '$gray100',
    marginBottom: 7
  },

  strong: {
    fontSize: '$lg',
    fontWeight: 'bold',
    color: '$gray100',
  },

  button: {
    width: '100%',
    marginTop: '3rem',
    background: '$green500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.25rem 2rem',
    border: 0,
    cursor: 'pointer',
    borderRadius: 8,
    color: '$white',
    fontSize: '$md',
    fontWeight: 'bold',

    '&:hover': {
      backgroundColor: '$green300',
    }
  }
})