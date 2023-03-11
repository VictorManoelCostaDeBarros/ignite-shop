import Image from "next/image";
import Head from "next/head";
import Stripe from 'stripe'
import { GetStaticProps } from "next";
import { useKeenSlider } from 'keen-slider/react';
import { Handbag } from "@phosphor-icons/react";

import { stripe } from '../lib/stripe'
import { HomeContainer, Product } from "../styles/pages/home";

import 'keen-slider/keen-slider.min.css';
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    defaultPriceId: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const { addItem } = useShoppingCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>  
      <HomeContainer ref={sliderRef} className="keen-slider">
        
        {
          products.map(product => {
            return (
              <Product key={product.id}  className="keen-slider__slide">
                <Link
                  href={`product/${product.id}`}
                  prefetch={false}
                >
                  <Image src={product.imageUrl} width={520} height={480} alt="" />
                </Link>

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <button onClick={() => addItem({...product, currency: 'BRL', description: '', sku: product.id, price: parseFloat(product.price.replace('R$', '')) * 100, price_id: product.defaultPriceId })}>
                    <Handbag size={32} color="#FFF" />
                  </button>
                </footer>
              </Product>
            )
          })
        }

      
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
      defaultPriceId: price.id
    }
  })
  
  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
