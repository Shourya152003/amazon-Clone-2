import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from './firebase';
import Product from './Product';
import './Electronics.css'


function HomendKitchen() {

    const [homendKitItems , sethomendKitItems] = useState([]);

    useEffect(() => {
        db.collection("homendKit").orderBy("dubTime", "asc").onSnapshot(snapshot => {
            sethomendKitItems(snapshot.docs.map(doc => ({id : doc.id , homendKitItem : doc.data()})));
        })
    }, [])
    
  return (
    <div className='electronics'>
        <div className="electronicsSort">
            {
                homendKitItems.map(({id , homendKitItem})=>(
                <Product key = {id} image = {homendKitItem.image} title = {homendKitItem.title} rating={homendKitItem.rating} price = {homendKitItem.price}
                />
                ))
            }
        </div>
    </div>
  )
}

export default HomendKitchen