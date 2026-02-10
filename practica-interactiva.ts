// ============================================
// EJERCICIOS DE PRÁCTICA NIVEL 1: INTERFACES
// ============================================
// Importar los tipos desde tipos.ts

// ### Ejercicio 1: Crear una interfaz de Usuario

// Crea una interfaz `Usuario` con:

// - `id` (número, readonly)
// - `username` (string)
// - `email` (string)
// - `activo` (booleano, opcional)

// ### Ejercicio 2: Agregar métodos

// Crea una interfaz `CuentaBancaria` con:

// - `saldo` (número)
// - `titular` (string)
// - `depositar(cantidad: number): void`
// - `retirar(cantidad: number): boolean`

// ### Ejercicio 3: Herencia

// Extiende la interfaz anterior creando una interfaz `CuentaPremium` que agregue:

// - `limiteCredito` (número)
// - `solicitarPrestamo(cantidad: number): boolean`

// ---

// ## 📌 Puntos Clave

// ✓ Las interfaces definen contratos de estructura
// ✓ Las propiedades pueden ser opcionales con `?`
// ✓ Usa `readonly` para propiedades inmutables
// ✓ Las interfaces pueden tener métodos
// ✓ Soportan herencia simple y múltiple
// ✓ Se pueden fusionar si tienen el mismo nombre

// ---

// **Siguiente:** [02-Enums.md](02-Enums.md)

import { Usuario, CuentaBancaria } from "./tipos";

const usuario2: Usuario = {
  id: 2,
  username: "Said",
  email: "said@said.com",
  activo: false,
};

console.log(usuario2.email);

const Cuenta1: CuentaBancaria = {
  saldo: 100000000,
  titular: "said",
  depositar(cantidad: number) {
    this.saldo += cantidad;
    console.log(`Depositando ${cantidad} de dinero su dinero es ${this.saldo}`);
  },
  retirar(cantidad: number) {
    if (cantidad > this.saldo) {
      console.log(
        `No es posible retirar ${cantidad}, su saldo es ${this.saldo}`,
      );
      return false;
    } else {
      this.saldo -= cantidad;
      console.log(
        `Se ha retirado ${cantidad} exitosamente. su nuevo saldo es ${this.saldo}`,
      );
      return true;
    }
  },
};

Cuenta1.depositar(10);
Cuenta1.retirar(10);
