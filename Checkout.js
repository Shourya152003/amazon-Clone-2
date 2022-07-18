import React from 'react'
import "./Checkout.css"
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal';
function Checkout() {

    const [{basket}] = useStateValue();

    return (
        <div className = "checkout">
            
            <div className="checkoutBlock1">

                {basket?.length === 0? (
                    <div>
                        <h2>Your Shopping Basket is empty</h2>
                        <p>
                            You have no items in your basket . To buy click on "Add to Basket" button . 
                        </p>
                    </div>
                ):(
                    <div className = "checkout_products">
                        <h1>Your Shopping Basket</h1>

                        {basket?.map(item => (
                            <CheckoutProduct 
                            id = {item.id}
                            title = {item.title}
                            image = {item.image}
                            price = {item.price}
                            rating = {item.rating}/>
                        ))}

                    </div>
                )}

            </div>

                
                                
            <div className="checkoutBlock2">
                <h2>

                <Subtotal/>
                </h2>
            </div>
            
        </div>
    )
}

export default Checkout
