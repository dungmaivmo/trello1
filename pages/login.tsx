import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import initFirebase from '../services/firebase';
initFirebase()
const uiConfig: any = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
};
const Login = () => {
    const router = useRouter();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
              await router.push("/")
              return;
            }
      })
    },[])

    return (
        <div>
            login
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        </div>
    );
};
export default Login;