import React, { useEffect, useState } from 'react';
import { Authcontext } from './Authcontext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    const singInWithgoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const creatUser = (email, password) =>
    {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singinUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe()
        }

    },[])

    const AuthInfo = {
        creatUser,
        singinUser,
        singInWithgoogle,
        logout,
        user,
        loading

    }
    return (
        <Authcontext value={AuthInfo}>
            {
                children
            }
        </Authcontext>
    );
};

export default AuthProvider;