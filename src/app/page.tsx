"use client";
import Link from "next/link";
import React from "react";
import "./globals.css";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        className="flex-grow flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/fondo.jpg')" }}
      >
        <div className="text-center">
          <motion.h1
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-[var(--font-petrona)] mb-4"
          >
            Amapola Store
          </motion.h1>

          <motion.h2
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg font-[var(--font-manrope)] text-gray-800 mb-6"
          >
            Descubre la elegancia y tecnología de Apple en un solo lugar.
            <br />
            <br />
            <Link
              href="/products"
              className="px-6 py-3 rounded-full text-lg bg-black transition hover:bg-yellow-400 inline-block"
            >
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-transparent bg-clip-text transition-all duration-500">
                Ver Productos
              </span>
            </Link>
          </motion.h2>
        </div>
      </section>
    </div>
  );
}
