// ============================================
// ARCHIVO CENTRAL DE TIPOS E INTERFACES
// Importa esto en otros archivos para evitar duplicados
// ============================================

// NIVEL 1: INTERFACES BÁSICAS

export interface Usuario {
    readonly id: number,
    username: string,
    email: string,
    activo?: boolean
}

export interface CuentaBancaria { 
    saldo: number,
    titular: string,
    depositar(cantidad: number): void,
    retirar(cantidad: number): boolean
}

export interface CuentaPremium extends CuentaBancaria {
    limiteCredito: number,
    solicitarPrestamo(cantidad: number): boolean
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
}

// NIVEL 1: ENUMS
export enum EstadoUsuario {
  Activo = "ACTIVO",
  Inactivo = "INACTIVO",
  Suspendido = "SUSPENDIDO",
}

// TIPOS AVANZADOS
export type Resultado = string | number | boolean;

export type ActualizarProducto = Partial<Producto>;
export type ProductoBasico = Pick<Producto, "nombre" | "precio">;
export type ProductoSinID = Omit<Producto, "id">;

export type Permiso = "leer" | "escribir" | "eliminar";
export type Rol = "admin" | "editor" | "viewer";
export type PermisosPorRol = Record<Rol, Permiso[]>;

export type Evento = "click" | "hover" | "focus";
export type EventoHandler = `on${Capitalize<Evento>}`;

// TIPOS PARA RESPUESTAS DE API
export interface RespuestaExito<T> {
  tipo: "exito";
  datos: T;
  codigo: 200;
}

export interface RespuestaError {
  tipo: "error";
  codigo: number;
  mensaje: string;
}

export type RespuestaAPI<T> = RespuestaExito<T> | RespuestaError;

// VALIDADORES
export type Validador<T> = {
  [K in keyof T]: (valor: T[K]) => boolean;
};

export interface ConfiguracionApp {
  puerto: number;
  ambiente: string;
  debug: boolean;
}
