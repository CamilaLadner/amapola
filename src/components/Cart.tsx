"use client";

import { createOrder } from "@/helpers/orders.helpers";
import { IProduct } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CircleX } from "lucide-react";

const CartView = () => {
  const { userData } = useAuth();
  const [cart, setCart] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    let totalCart = 0;

    if (storedCart.length) {
      storedCart.forEach((producto: IProduct) => {
        totalCart += producto.price;
      });
    }

    setTotal(totalCart);
    setCart(storedCart);
  }, [userData]); 

  const handleFinalizarCompra = async () => {
    if (cart && userData?.token) {
      const idProducts = cart.map((product) => product.id);
      await createOrder(idProducts, userData?.token);
      setCart([]);
      setTotal(0);
      localStorage.setItem("cart", "[]");
      setShowSuccess(true);
    }
  };

  const handleRemoveProduct = (id: number) => {
    //le paso un id y filtro los productos que no tengan ese id
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart); //actualizo el estado del carrito
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // actualizo el localStorage

    const newTotal = updatedCart.reduce((acc, curr) => acc + curr.price, 0); // recalculo el total
    setTotal(newTotal);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-yellow-50 to-white px-4 pt-12">
      <div className="w-full max-w-2xl bg-white shadow-[0_4px_20px_rgba(255,215,0,0.3)] rounded-2xl p-6">
        <h1 className="text-3xl text-gray-800 mb-6 text-center">
          Tus productos agregados
        </h1>

        {cart.length ? (
          <div className="space-y-4">
            {cart.map((product: IProduct) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl shadow-sm"
              >
                <div>
                  <p className="text-gray-800 font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>

                <button
                  onClick={() => handleRemoveProduct(product.id)}
                  className="ml-4 text-sm text-red-500 hover:text-red-700 transition"
                >
                  <CircleX />
                </button>
              </div>
            ))}

            <div className="mt-6 flex flex-col items-center gap-4 border-t pt-4">
              <div className="flex justify-between w-full px-2">
                <p className="text-lg font-[var(--font-petrona)] text-gray-700">
                  Total:
                </p>
                <p className="text-lg font-semibold text-yellow-600">
                  ${total}
                </p>
              </div>

              <button
                onClick={handleFinalizarCompra}
                className="bg-black mt-4 px-6 text-white py-2 rounded-full hover:bg-yellow-400 hover:text-gray-800 transition font-[var(--font-manrope)]"
              >
                Finalizar compra
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="mb-4">No tienes productos agregados aún.</p>
            <Link
              href="/products"
              className="px-5 py-1 rounded-full text-sm text-shadow-amber-800 bg-black transition hover:bg-yellow-400 inline-block"
            >
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-transparent bg-clip-text transition-all duration-500">
                Ver Productos
              </span>
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          >
            <div className="bg-white rounded-xl shadow-xl p-6 text-center max-w-sm w-full font-[var(--font-manrope)]">
              <h2 className="text-2xl mb-4 text-yellow-600">
                ¡Gracias por tu compra!
              </h2>
              <p className="text-gray-700">Tu orden fue realizada con éxito.</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="mt-4 px-4 py-2 bg-black text-white rounded-full hover:bg-yellow-400 hover:text-gray-800 transition"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartView;
