"use client";

import { useAuth } from "@/context/AuthContext";
import { IProduct } from "@/interfaces";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetail: React.FC<IProduct> = ({
  id,
  name,
  price,
  image,
  description,
  stock,
  categoryId,
}) => {
  const { userData } = useAuth();
  const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    if (userData?.token) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]"); // tomo lo que tiene el storage
      cart.push({ name, price, id, image, description, stock, categoryId }); // le pusheo el nuevo producto
      localStorage.setItem("cart", JSON.stringify(cart)); // muestro nuevamente lo que tiene

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500); // lo oculta después de 2.5 seg
    } else {
      alert("Por favor, inicia sesión para añadir productos al carrito.");
      router.push("/login");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 bg-white rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 shadow-[0_4px_20px_rgba(255,215,0,0.4)]">
      {/* Carta de producto */}
      {/* Imagen */}
      <div className="flex-1">
        <img
          src={image}
          alt={name}
          className="rounded-xl w-full max-w-md object-contain"
        />
      </div>

      {/* Detalles */}
      <div className="flex-1 space-y-4 font-[var(--font-manrope)]">
        <h1 className="text-3xl font-[var(--font-petrona)] text-gray-900">
          {name}
        </h1>
        <p className="text-gray-600">{description}</p>
        <p className="text-xl font-semibold text-yellow-600">
          Precio: ${price}
        </p>
        <p className="text-gray-500">{stock} disponibles</p>

        <button
          onClick={handleAddToCart}
          className="mt-4 px-6 py-2 rounded-full bg-black text-white hover:bg-yellow-400 hover:text-gray-800 transition"
        >
          Añadir al carrito
        </button>
      </div>

      {/* Pop up producto añadido */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(255,215,0,0.4)] px-8 py-6 text-center max-w-sm mx-auto"
            >
              <img
                src="/AmapolaLogo.png"
                alt="Logo Amapola"
                className="mx-auto mb-3 w-10 h-10 mix-blend-multiply"
              />
              <h2 className="text-lg font-[var(--font-petrona)] text-gray-800">
                ¡Producto añadido!
              </h2>
              <p className="text-sm font-[var(--font-manrope)] text-gray-600 mt-1">
                Podés seguir navegando o ir al carrito cuando quieras.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
