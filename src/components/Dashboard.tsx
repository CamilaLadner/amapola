"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";

const DashboardView = () => {
  const { userData } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-white px-4 py-10">
      <h1 className="text-4xl  text-gray-900 mb-8">
        Tu perfil de <span className="text-yellow-500">AMAPOLA</span>
      </h1>

      {userData ? (
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(255,215,0,0.4)] p-8 w-full max-w-lg space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 border-yellow-200">
            {userData.user.name}
          </h2>
          <div className="text-gray-700 space-y-2">
            <p>
              <span className="font-medium text-gray-900">📧 Email:</span>{" "}
              {userData.user.email}
            </p>
            <p>
              <span className="font-medium text-gray-900">📦 Dirección de entrega:</span>{" "}
              {userData.user.address}
            </p>
            <p>
              <span className="font-medium text-gray-900">📱 Teléfono de contacto:</span>{" "}
              {userData.user.phone}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-lg">
          Por favor, inicia sesión para ver tu información.
        </p>
      )}

      <Link href="/dashboard/orders" className="mt-4 px-6 py-2 rounded-full bg-black text-white hover:bg-yellow-400 hover:text-gray-800 transition">Tus compras</Link>
      
    </div>
  );
};

export default DashboardView;
