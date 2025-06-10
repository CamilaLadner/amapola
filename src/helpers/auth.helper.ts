import { ILoginProps, IRegisterProps } from "@/interfaces";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register(userData: IRegisterProps) {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      cache: "no-cache",
    });
    if (response.ok) {
      return response.json();
    } else {
          throw new Error("Error al registrar el usuario. Por favor, intente nuevamente.");
    }

  } catch (error: any) {
      throw new Error(error.message || "Error al registrar el usuario.");
  }
}


export async function login(userData: ILoginProps) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      cache: "no-cache",
    });
    if (response.ok) {
      return response.json();
    } else {
          throw new Error("Error al ingresar el usuario. Por favor, intente nuevamente.");
    }

  } catch (error: any) {
      throw new Error(error.message || "Error al ingresar el usuario.");
  }
}