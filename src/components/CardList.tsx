"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProductsDB } from "../helpers/products.helpers";
import Card from "./Card";
import { IProduct } from "@/interfaces";
import Link from "next/link";

const CardList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsDB();
        setProducts(response);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="py-8 px-4 flex flex-wrap items-center justify-center">
      <div className="flex flex-wrap justify-center gap-6">
        <AnimatePresence>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link key={product.id} href={`/products/${product.id}`}>
              <Card {...product} />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default CardList;
