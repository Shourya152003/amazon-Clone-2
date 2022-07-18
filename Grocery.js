import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from './firebase';
import Product from './Product';
import './Electronics.css'


function Grocery() {

    const [groceryItems , setgroceryItems] = useState([]);

    useEffect(() => {
        db.collection("grocery").orderBy("dubTime", "asc").onSnapshot(snapshot => {
            setgroceryItems(snapshot.docs.map(doc => ({id : doc.id , groceryItem : doc.data()})));
        })
    }, [])

  return (
    <div className='electronics'>
        <div className="electronicsSort">
            {
                groceryItems.map(({id , groceryItem})=>(
                <Product key = {id} image = {groceryItem.image} title = {groceryItem.title} rating={groceryItem.rating} price = {groceryItem.price}
                />
                ))
            }
        </div>
    </div>
  )
}

export default Grocery