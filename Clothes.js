import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from './firebase';
import Product from './Product';
import './Electronics.css'


function Clothes() {

    const [clotheItems , setclotheItems] = useState([]);

    useEffect(() => {
        db.collection("clothes").orderBy("dubTime", "asc").onSnapshot(snapshot => {
            setclotheItems(snapshot.docs.map(doc => ({id : doc.id , clotheItem : doc.data()})));
        })
    }, [])

  return (
    <div className='electronics'>
        <div className="electronicsSort">
            {
                clotheItems.map(({id , clotheItem})=>(
                <Product key = {id} image = {clotheItem.image} title = {clotheItem.title} rating={clotheItem.rating} price = {clotheItem.price}
                />
                ))
            }
        </div>
    </div>
  )
}

export default Clothes