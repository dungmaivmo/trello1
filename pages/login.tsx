import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
    }, [])

    return (
        <div className="login">
            <video className="login__bg" autoPlay muted loop>
                <source src="/static/video.mp4" type="video/mp4" />
                <source src="/static/video.webm" type="video/webm" />
            </video>

            <div className="login__btn">
                <h1>Trello clone</h1>
                <div className="login__btn-google">
                    <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                </div>
            </div>
        </div>
    );
};
export default Login;