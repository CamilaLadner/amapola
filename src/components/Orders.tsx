"use client";
import { IOrder } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getOrders } from "@/helpers/orders.helpers";
import Link from "next/link";
import { CircleCheckBig } from "lucide-react";

const OrdersView = () => {
  const { userData } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);

  const loadOrders = async () => {
    if (userData?.token) {
      const response = await getOrders(userData.token);
      setOrders(response);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start bg-gradient-to-b from-yellow-50 to-white p-auto pt-12 pb-12">
      <div className="w-full max-w-2xl bg-white shadow-[0_4px_20px_rgba(255,215,0,0.3)] rounded-2xl pt-4">
        <h1 className="text-3xl text-gray-800 text-center mt-2 mb-2">
          Historial de pedidos
        </h1>

        {orders?.length ? (
          <div className="p-4">
            {orders?.map((order: IOrder) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 m-2 border border-gray-100 rounded-xl shadow-sm"
              >
                <div>
                  <p className="text-gray-800 font-medium">
                    {new Date(order.date)?.toLocaleDateString()}
                  </p>
                  {order.products.map((products) => {
                    return <div key={products.id}>{products.name}</div>;
                  })}
                  <p className="text-sm text-gray-600">
                    {order.status.toLocaleUpperCase()}
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <span>Entregado</span>
                  <CircleCheckBig className="w-5 h-5" />
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-4 mb-2">
              <Link
                href="/dashboard"
                className="px-6 py-2 rounded-full text-sm bg-black transition hover:bg-yellow-400 inline-block"
              >
                <span className=" bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-transparent bg-clip-text transition-all duration-500">
                  Volver
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="mb-4">No tienes productos agregados aún.</p>
            <Link
              href="/products"
              className="px-6 py-2 rounded-full text-sm bg-black transition hover:bg-yellow-400 inline-block"
            >
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-transparent bg-clip-text transition-all duration-500">
                Ver Productos
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersView;
