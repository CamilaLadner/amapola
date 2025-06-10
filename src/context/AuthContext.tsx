// Contexto: Componente que puede tener variables, funciones y estados y compartirselas a toda la app. Proveedor

'use client'
import { IUserSession } from '@/interfaces';
import {useState, useEffect, createContext, useContext} from 'react';
import Cookies from 'js-cookie';

interface IAuthContextProps {
    userData: IUserSession | null;
    setUserData: (userData: IUserSession | null) => void;
}

// inicializamos el contexto
export const AuthContext = createContext<IAuthContextProps>({
    userData: null,
    setUserData: () => {}
});

interface IAuthProviderProps {
    children: React.ReactNode;
}

// Proveedor del contexto
export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
    const [userData, setUserData] = useState<IUserSession | null>(null);

    useEffect(() => { // Guardamos los datos del usuario en localStorage y cookies
        if(userData) {
            localStorage.setItem('userSession', JSON.stringify({token: userData.token, user: userData.user}))
            Cookies.set('userSession', JSON.stringify({token: userData.token, user: userData.user}))
        }
    }, [userData])

     useEffect(() => { // Recuperamos los datos al recargar la página
       const userData = JSON.parse(localStorage.getItem("userSession")!);
       setUserData(userData);
    }, [])

    return (
        <AuthContext.Provider value={{userData, setUserData}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);