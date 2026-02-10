"use strict";
// ============================================
// EJERCICIOS DE PRÁCTICA NIVEL 1: INTERFACES
// ============================================
// Importar los tipos desde tipos.ts
Object.defineProperty(exports, "__esModule", { value: true });
var usuario2 = {
    id: 2,
    username: "Said",
    email: "said@said.com",
    activo: false,
};
console.log(usuario2.email);
var Cuenta1 = {
    saldo: 100000000,
    titular: "said",
    depositar: function (cantidad) {
        this.saldo += cantidad;
        console.log("Depositando ".concat(cantidad, " de dinero su dinero es ").concat(this.saldo));
    },
    retirar: function (cantidad) {
        if (cantidad > this.saldo) {
            console.log("No es posible retirar ".concat(cantidad, ", su saldo es ").concat(this.saldo));
            return false;
        }
        else {
            this.saldo -= cantidad;
            console.log("Se ha retirado ".concat(cantidad, " exitosamente. su nuevo saldo es ").concat(this.saldo));
            return true;
        }
    },
};
Cuenta1.depositar(10);
Cuenta1.retirar(10);
