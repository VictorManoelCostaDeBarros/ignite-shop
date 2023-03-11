import { globalStyles } from '../styles/global'
import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'

import {  Container } from '../styles/pages/app'

import Header from '../components/header'
import SideCheckout from '../components/sideCheckout'

globalStyles()
function App({ Component, pageProps }: AppProps) {
  
  return (
    <CartProvider
      shouldPersist
      cartMode="checkout-session"
      stripe={process.env.STRIPE_PUBLIC_KEY as string}
      currency="BRL"
      // successUrl={`${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`}
      // cancelUrl={`${process.env.NEXT_URL}/`}
      // allowedCountries={['BRL']}
      // billingAddressCollection={true}
    >
      <Container>
        <Header />
        <Component {...pageProps} />
        <SideCheckout />
      </Container>
    </CartProvider>
  )
}

export default App
