import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from './firebase';
import Product from './Product';
import './Home.css'

function Home() {

    const [homeItems , sethomeItems] = useState([]);

    useEffect(() => {
        db.collection("homepageproducts").orderBy("dubTime", "asc").onSnapshot(snapshot => {
            sethomeItems(snapshot.docs.map(doc => ({id : doc.id , homeItem : doc.data()})));
        })
    }, [])

    return (
        <div className = "home">

            <div className = "home__image__div">
                <img className = "home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/31/img18/Fresh/GW/May21/Covid_Slot/29to5June21/3000x1200_PC_Covid_Slot_Pantry._CB667070865_.jpg" alt="" />
            </div>

            <div className = "products__div">
                {
                    homeItems.map(({id , homeItem})=>(
                    <Product key = {id} image = {homeItem.image} title = {homeItem.title} rating={homeItem.rating} price = {homeItem.price}
                    />
                    ))
                }
                
            </div>

        </div>
    )
}

export default Home
