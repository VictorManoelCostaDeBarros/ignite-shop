import { Handbag } from '@phosphor-icons/react'
import Image from 'next/image'
import { Badget, Header as HeaderContainer } from '../styles/components/header'

import logoImg from '../assets/logo.svg'
import { useShoppingCart } from 'use-shopping-cart'

export default function Header() {
  const { cartCount, handleCartClick } = useShoppingCart()
  
  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />

      {
        cartCount && cartCount > 0 ? (
          <button onClick={handleCartClick}>
            <Badget>{cartCount}</Badget>
            <Handbag size={32} color="#8D8D99" />
          </button>
        ) : null
      }
    </HeaderContainer>
  )
}
