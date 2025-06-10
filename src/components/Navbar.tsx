"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, User} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { userData } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);

  const routes = [
    { href: "/", label: "Inicio" },
    { href: "/products", label: "Productos" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 items-center h-16 max-w-7xl">
        
        {/* Logo */}
        <div className="flex items-center text-xl font-light tracking-wide overflow-hidden">
          <img
            src="/AmapolaLogo.png"
            alt="Logo"
            className="h-8 w-8 mr-2 mix-blend-multiply bg-transparent mask mask-circle"
          />
          AMAPOLA Store
        </div>

        {/* Navigation */}
        <nav className="flex justify-center items-center space-x-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-sm hover:text-yellow-400 hover:scale-110 transition"
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Icons / Register */}
        {userData?.token ? (
          <div className="flex items-center justify-end space-x-4">
            <Link href="/dashboard" className="hover:text-yellow-400 hover:scale-110 transition">
              <User className="h-5 w-5" />
            </Link>

            <Link href="/cart" className="relative hover:text-yellow-400 hover:scale-110 transition">
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black text-[10px] font-medium text-white flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Carrito</span>
            </Link>

            <LogoutButton/>
          </div>
        ) : (
          <div className="flex justify-end">
            <Link
              href="/login"
              className="flex items-center text-sm hover:text-yellow-400 hover:scale-110 transition space-x-1"
            >
              <span>💫</span>
              <span>Iniciar sesión</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
