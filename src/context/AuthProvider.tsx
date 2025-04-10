import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import auth from '@/firebas/firebase.init';
import AuthContext from './AuthContext';


const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const createUser = (email: string, password: string) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('User state changed:', currentUser); setLoading(false);
        })

        return () => {
            unsubscribe();
        };

    }, [])
    

const authInfo = {
    user,
    loading,
    createUser,
};

return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
);
};

export default AuthProvider;
