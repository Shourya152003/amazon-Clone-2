import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from './firebase';
import Product from './Product';
import './Electronics.css'

function Electronics() {

    const [electronicItems , setelectronicItems] = useState([]);

    useEffect(() => {
        db.collection("electronics").orderBy("dubTime", "asc").onSnapshot(snapshot => {
            setelectronicItems(snapshot.docs.map(doc => ({id : doc.id , electronicItem : doc.data()})));
        })
    }, [])

  return (
    <div className='electronics'>

        <div className="electronicsSort">
            {
                electronicItems.map(({id , electronicItem})=>(
                <Product key = {id} image = {electronicItem.image} title = {electronicItem.title} rating={electronicItem.rating} price = {electronicItem.price}
                />
                ))
            }
        </div>
        
    </div>
  )
}

export default Electronics