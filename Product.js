import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'

function Product({image , id , title , price , rating}) {
    const [{basket} , dispatch] = useStateValue();

    const addToBasket = () =>{
        
        dispatch({
            type : 'ADD_TO_BASKET',
            item : {
                id : id,
                title : title,
                image : image,
                price : price,
                rating : rating
            }
        })
    };

    return (
        <div className="product">
            <span className = "product__title">{title}</span>
            <div className="product__price__rating">
                <span className = "product__price">₹{price}</span>
                <div className = "product__rating">
                    {
                        Array(rating)
                        .fill()
                        .map((_) =>(
                            <p>⭐</p>
                        ))
                    }
                </div>
            </div>
            
            <div className='product__image__container'>
                <img className = "product__image"
                src={image} alt="" />
            </div>

            <button className = "product__button" onClick = {addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
