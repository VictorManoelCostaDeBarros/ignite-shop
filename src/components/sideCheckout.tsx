import { X } from "@phosphor-icons/react";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useShoppingCart,  } from "use-shopping-cart";
import { Footer, ImageContainer, Product, SideCheckoutContainer, SideCheckoutHeader } from "../styles/components/sideCheckout";

export default function SideCheckout() {
  const { cartCount, cartDetails, removeItem,shouldDisplayCart, handleCloseCart, clearCart } = useShoppingCart()

  const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession ] = useState(false)

  if(!shouldDisplayCart) {
    return null
  }

  async function handleBuyProduct() {
    try {
      if (!cartDetails) {
        return
      }

      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        products: Object.values(cartDetails).map(product => {
          return {
            price: product.defaultPriceId,
            quantity: product.quantity
          }
        })
      })
      const { checkoutUrl } = response.data
      clearCart();
      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      setIsCreatingCheckoutSession(false)
    
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <SideCheckoutContainer>
      <div>
        <SideCheckoutHeader>
          <button onClick={handleCloseCart}>
            <X size={22} color="#F5F5F5" />
          </button>
        </SideCheckoutHeader>

        <h3>Sacola de compras</h3>

        {
          cartDetails && Object.values(cartDetails).map(item => (
            <Product
              key={item.id}
            >
              <ImageContainer>
                <Image src={item.imageUrl} width={95} height={95} alt="" />
              </ImageContainer>

              <div>
                <p>{item.name}</p>
                <strong>{item.formattedValue}</strong>

                <button onClick={() => removeItem(item.id)}>Remover</button>
              </div>
            </Product>
          ))
        }
      </div>

      <Footer>
        <div>
          <span>Quantidade</span>
          <span>{cartCount} itens</span>
        </div>

        <div>
          <strong>Valor total</strong>
          <strong>{cartDetails ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Object.values(cartDetails).reduce((prev, currentValue) => prev += currentValue.price,0) / 100) : 'R$ 0,00'}</strong>
        </div>
        
        <button disabled={isCreatingCheckoutSession || !cartDetails} onClick={handleBuyProduct}>
          Finalizar a compra
        </button>
      </Footer>
    </SideCheckoutContainer>
  )
}