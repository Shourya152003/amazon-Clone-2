import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import RoomIcon from '@material-ui/icons/Room';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from './StateProvider';
import { auth, db } from './firebase';
import firebase from 'firebase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@material-ui/core';


const stylelogin = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    overflow:'scroll',
    display:'block',
    bgcolor: 'background.paper',
    border: '1px solid #f5f6f9',
    boxShadow: 1,
    borderRadius: 1,
    p: 2,
};

function Header() {

    const [{basket}] = useStateValue();
    const [user , setUser] = useState(null);
    const [loginModal, setLoginModal] = useState(false);

    const [displayfirstName, setDisplayfirstName] = useState('');
    const [fname , setFname] = useState('First Name');
    const [lname , setLname] = useState('Last Name');
    const [add, setAdd] = useState('Address');
    const [phoneNumber, setPhoneNumber] = useState('Phone Number');

    const handleloginModalClose = () => {
        setLoginModal(false);
    }

    const handleSignOut = () => {
        auth.signOut();
    }

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
                console.log(doc.data().firstName);
                setDisplayfirstName(doc.data().firstName);
                // setDisplaylastName(doc.data().lastName);
                //setDisplayemail(doc.data().email);
                //setDisplaybadge(doc.data().badge);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

            setUser(authUser);
            setLoginModal(false);
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

      const handleUpload = ({emailg ,fname,lname,add, docId, uid }) =>{

        try{
            // eslint-disable-next-line
                db.collection("users").doc(uid).set({
                    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                    uid: uid,
                    authProvider: "google",
                    email: emailg,
                    firstName : fname,
                    lastName : lname,
                    address : add
                    // mobileNum : mobileNum,
                    // username : username,
                    // email : emailg
                });
            
        }catch (err) {
          console.error(err);
        //   alert(err.message);
        }
    }


    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const signUpWithGoogle = async () => {
        try {
          const res = await auth.signInWithPopup(googleProvider);
          const user = res.user;
          const emailg = user.email;
          const docId = res.id;
          const uid = user.uid;
          const query = await db
            .collection("users")
            .where("uid", "==", user.uid)
            .get();
          if (query.docs.length === 0) {
            handleUpload({emailg ,fname,lname,add, docId, uid });
          }
        } catch (err) {
          console.error(err);
        //   alert(err.message);
        }
      };

     

    return (
        <div className = "header">


            <div className="header2">

            <Modal
                open={loginModal}
                onClose={handleloginModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={stylelogin}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <h3 className='signinheading'>Sign in and let's begin</h3> 
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <input type="text" id="name" name="name" className='input__forsignIn'
                            value = {fname}
                            placeholder="Enter your First name"
                            onChange = {(event) => setFname(event.target.value)}
                            required
                        />
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <input type="text" id="lname" name="lname" className='input__forsignIn'
                            value = {lname}
                            placeholder="Enter your Last name"
                            onChange = {(event) => setLname(event.target.value)}
                            required
                        />
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <input type="number" id="num" name="num" className='input__forsignIn'
                            value = {phoneNumber}
                            placeholder="Enter your phone no."
                            onChange = {(event) => setPhoneNumber(event.target.value)}
                            required
                        />
                    </Typography>


                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <input type="text" id="add" name="add" className='input__forsignIn'
                            value = {add}
                            placeholder="Enter your Address"
                            onChange = {(event) => setAdd(event.target.value)}
                            required
                        />
                    </Typography>
                    
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <button className = "loginInfo__signUp" onClick = {signUpWithGoogle} >Continue with Google</button> 
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <p className='termscondipara'>By signing up you agree to amazon's <a href="/termsandCond">  <u>Terms of Service</u> </a> and <a href="/"> <u>Privacy Policy</u> </a>  </p>
                    </Typography>
                </Box>
            
            </Modal>

                <Link to = "/">
                    <img className = "header__logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
                </Link>

                <Link to = "/login" className = "header__link">
                        <small className = "header__deliverto">Deliver to</small>
                        <div className = "header__delivery__address">
                        <RoomIcon/>
                        <strong>India</strong>
                        </div>
                </Link>


                <div className = "header__search">
                    <input type="text" className = "header__searchInput" />
                    <SearchIcon className = "searchIcon" />
                </div>

                <div className = "header__option">
                    <Link to = "#" className = "header__link__option">
                        <div className = "header__link__each__options">
                        <span className = "header__link__each__options__text1">Hello</span>
                        

                        {user?
                        (
                            <span className = "header__link__each__options__text2" onClick={handleSignOut}>{displayfirstName}</span>
                        )
                        :
                        (
                            <span className = "header__link__each__options__text2" onClick={() => setLoginModal(true)}>Sign In</span>
                        )
                        }
                        </div>
                    </Link>

                    <Link to = "/returnOrder" className = "header__link__option">
                        <div className = "header__link__each__options">
                        
                            <span className = "header__link__each__options__text1">Return</span>
                            <span className = "header__link__each__options__text2">Order</span>
                        
                        </div>
                    </Link>

                    <Link to = "/login" className = "header__link__option">
                    <div className = "header__link__each__options">
                        <span className = "header__link__each__options__text1">Your</span>
                        <span className = "header__link__each__options__text2">Prime</span>
                        </div>
                    </Link>

                    <Link to = "/checkout" className = "header__link__option">
                    <div className = "header__link__each__options">
                            <div className = "shopping__basket">
                                <ShoppingBasketIcon className = "header__link__each__options header__basket"/>
                                <span className = "header__link__each__options__text2">{basket?.length}</span>
                            </div>
                        </div>
                    </Link>
                </div>

            </div>

            <div className="header3">

                <Link to ="/electronics">
                    <p>Electronics</p>
                </Link>

                <Link to ="/grocery">
                    <p>Grocery</p>
                </Link>

                <Link to="/clothes">
                    <p>Clothes</p>
                </Link>

                <Link to ="/handkit">
                    <p>Home & Kitchen</p>
                </Link>

            </div>
        </div>
        
    )
}

export default Header
