import { useState, useEffect } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import firebase from 'firebase';
import Link from 'next/link';

export const Navbar = () => {
    const [userName, setUseName] = useState<string>('');
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // user logs out, handle something here
                setUseName(user.displayName)
                return;
            }
        })
    })

    return (
        <div className="navbar">
            <Link href="/" >
                <HomeIcon className="navbar__icon" />
            </Link>

            <Link href="/">
                <div className="navbar__icon">
                    <img src={'/static/trello.png'} />
                </div>
            </Link>

            <div className="navbar__info">
                <div>{userName}</div>
                <ExitToAppIcon
                    onClick={() => {
                        firebase.auth().signOut().then(() => {
                            // Sign-out successful.
                        }).catch((error) => {
                            console.log(error)
                        });
                    }}
                    className="navbar__icon" />
            </div>
        </div>
    );
};
