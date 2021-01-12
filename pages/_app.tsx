import '../styles/styles.scss'
import { Provider } from 'react-redux'
import store from '../store/index'

import React, { useState, useEffect } from 'react';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import initFirebase from '../services/firebase';

initFirebase()
function MyApp({ Component, pageProps }) {
  // Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {

        // user logs out, handle something here
        console.log('User is not logged in');
        return;
      }
      console.log("login in user:", user.displayName);
      // const token: string = await user.getIdToken();
      // console.log("logged in user token:", token);

      const db: any = firebase.firestore();

        const docRef:any = db.collection("board");

        docRef.get().then((snapshot:any) => {
          // console.log("index", snapshot.docs.doc.data())
          snapshot.docs.forEach(doc=>{
            // console.log( doc.data());
          })
            // if (doc.exists) {

            //      console.log("Document data:", doc.data());
                 
            // } else {
            //      console.log("No such document!");
            // }
        }).catch(function(error:any) {
           console.log("Error getting document:", error);
                });
    });

    return () => unregisterAuthObserver();
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
