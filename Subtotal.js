import React, { useEffect } from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { auth } from './firebase';

function Subtotal() {
// eslint-disable-next-line
    const [{basket} , dispatch] = useStateValue();
    console.log("here it is " , basket)

    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [user , setUser] = useState(null);

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if(authUser){
            // user has logged in...
            // console.log("auth user is", authUser);
            setUser(authUser);
          }
          else{
            //  user has logged out...
            setUser(null);
          }
        })
    
        return () => {
          unsubscribe();
        }
    } ,[user]);

    return (
        <div className = "subtotal">
            <CurrencyFormat
                renderText = {(value) => (
                    <>
                        <p>
                            Subtotal ({basket?.length} items): 
                            <strong> {value} </strong>
                        </p>
                        <small className = "subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}

                decimalScale = {0}
                value = {getBasketTotal(basket)}
                displayType = {"text"}
                thousandSeparator = {true}
                prefix = {'₹'}
            />
            
            {user?
            (
                <a href = "razorpayPaymentPageLink" className='subtotallink'>
                    <button> Proceed to checkout </button>
                </a>
                
            )
            :
            (
                <button >Sign in to proceed</button>
            )
            }
            
        </div>
    )
}

export default Subtotal
