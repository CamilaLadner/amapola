'use client';

import { useAuth } from "@/context/AuthContext";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


const LogoutButton = () => {
    const router = useRouter();
    const {setUserData} = useAuth();

    const handleLogout = () => {
    setUserData(null); //seteo en null el contexto
    localStorage.removeItem('cart');
    localStorage.removeItem('userSession');
    Cookies.remove("userSession");
    router.push('/');
    };

  return (
    <button onClick={handleLogout} 
    className= "hover:text-yellow-400 hover:scale-110 transition">
        <LogOutIcon className="h-5 w-5"/></button>
  )
}

export default LogoutButton