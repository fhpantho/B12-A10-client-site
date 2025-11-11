import React, { useEffect, useState } from 'react';
import { Authcontext } from './Authcontext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    const singInWithgoogle = () =>
    const creatUser = (email, password) =>
    {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singinUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => {
            unsubscribe()
        }

    },[])

    const AuthInfo = {
        creatUser,
        singinUser,
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