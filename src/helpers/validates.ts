import { ILoginErrors, ILoginProps, IRegisterErrors, IRegisterProps } from "@/interfaces";

export function validateLoginForm(values: ILoginProps): ILoginErrors {
  const errors: ILoginErrors = {};

  if (!values.email) {
    errors.email = "Email requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Email inválido";
  }

  if (!values.password) {
    errors.password = "Contraseña requerida";
  }

  return errors;
}

export function validateRegisterForm(values: IRegisterProps): IRegisterErrors {
  const errors: IRegisterErrors = {};

  if (!values.email) {
    errors.email = "Email requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Email inválido";
  }

  if (!values.password) {
    errors.password = "Contraseña requerida";
  }

  if (!values.name) {
    errors.name = "Nombre requerido";
  }

  if (!values.address) {
    errors.address = "Dirección requerida";
  }

  if (!values.phone) {
    errors.phone = "Teléfono requerido";
  } else if (!/^[0-9]+$/.test(values.phone)) {
    errors.phone = "Solo se permiten números";
  }

  return errors;
}
