import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageCarrossel, ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  products: {
    imageUrl: string;
  }[];
  productCount: number;
}

export default function Success({ customerName, products, productCount }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>  
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageCarrossel>
          {
            products.map(product => (
              <ImageContainer  key={product.imageUrl}>
                <Image src={product.imageUrl} width={120} height={110} alt="" />
              </ImageContainer>
            ))
          }
        </ImageCarrossel>

        <p>
          Uhuuul <strong>{customerName}</strong>, sua compra de {productCount} camisetas já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details!.name;
  // const products = session.line_items.data[0].price.product  as Stripe.Product

  const products = session.line_items!.data.map(item => { return { imageUrl: item.price?.product.images[0] } })

  return {
    props: {
      customerName,
      products: products,
      productCount: session.line_items!.data.length
    }
  }
}