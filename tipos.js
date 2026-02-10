"use strict";
// ============================================
// ARCHIVO CENTRAL DE TIPOS E INTERFACES
// Importa esto en otros archivos para evitar duplicados
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoUsuario = void 0;
// NIVEL 1: ENUMS
var EstadoUsuario;
(function (EstadoUsuario) {
    EstadoUsuario["Activo"] = "ACTIVO";
    EstadoUsuario["Inactivo"] = "INACTIVO";
    EstadoUsuario["Suspendido"] = "SUSPENDIDO";
})(EstadoUsuario || (exports.EstadoUsuario = EstadoUsuario = {}));
