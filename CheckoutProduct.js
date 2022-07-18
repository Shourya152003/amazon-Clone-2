import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider'
function CheckoutProduct({id , title , image , price , rating}) {

    const [{basket} , dispatch] = useStateValue();
    
    const removeFromBasket = () => {
        dispatch({
            type : "REMOVE_FROM_BASKET",
            id : id,
        });
    };

    return (

        <div className = "checkoutproduct">
            <img className = "checkoutproduct__image" src={image} alt="" />
            <div className="checkoutproduct__description">
                <span className = "checkoutproduct__title">{title}</span>
                <span className = "checkoutproduct__price">₹{price}</span>
                <div className = "checkoutproduct__rating">
                    {
                        Array(rating)
                        .fill()
                        .map((_) =>(
                            <p>⭐</p>
                        ))
                    }
                </div>
                <button className = "checkoutproduct__button" onClick = {removeFromBasket}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
