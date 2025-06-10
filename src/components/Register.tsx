"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateRegisterForm } from "@/helpers/validates";
import { motion } from "framer-motion";
import { register } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterView = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md mt-8"
      >
        <h1 className="text-2xl text-center mb-6 text-gray-800">
          Bienvenido a AMAPOLA
        </h1>

        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
            address: "",
            phone: "",
          }}
          validate={validateRegisterForm}
          onSubmit={async (values) => {
            try {
              await register(values);
              toast.success("Registro exitoso 🎉");
              setTimeout(() => router.push("/login"), 1500);
            } catch (err) {
              toast.error("Ups! Ocurrió un error.");
            }
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="*****"
                  className="mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Mía Thermopolis"
                  className="mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Dirección
                </label>
                <Field
                  type="text"
                  name="address"
                  placeholder="Calle Siempreviva 123"
                  className="mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <Field
                  type="text"
                  name="phone"
                  placeholder="1138385252"
                  className="mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || Object.values(errors).some(Boolean)}
                className="w-full bg-black text-white font-medium py-2 rounded-full hover:bg-yellow-400 hover:text-gray-800 transition disabled:opacity-50"
              >
                Registrarme
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default RegisterView;
