import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { auth, db } from './firebase';
import firebase from 'firebase';
import './Return.css'
import { Link } from 'react-router-dom';

function Return() {

    const [yourMessage, setYourMessage] = useState('');
    const [user , setUser] = useState(null);

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if(authUser){
            // user has logged in...
            // console.log("auth user is", authUser);

            var docRef = db.collection("users").doc(`${authUser.uid}`);
            docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data");
                //console.log(authUser.firstName)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

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

    const sendMessage = ({ docId }) =>{

        try{
            // eslint-disable-next-line
                db.collection("complaints").doc(user.uid).set({
                    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                    uid: user.uid,
                    message : yourMessage
                });
            
        }catch (err) {
          console.error(err);
        //   alert(err.message);
        }
    }

  return (

    <div className='returnorders'>

        <div className="returnorders__box">
            <div>
                <textarea type="text" id="name" name="name" rows={10} cols={100}
                    value = {yourMessage}
                    placeholder="Enter your Message"
                    onChange = {(event) => setYourMessage(event.target.value)}
                    required
                />
            </div>

            <div className='returnorders__box__inside'>
                <Link to='/'>
                    <button onClick={sendMessage}>Submit</button>
                </Link>
            </div>
        </div>
        
    </div>
  )
}

export default Return