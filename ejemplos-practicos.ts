// EJEMPLOS PRÁCTICOS DE TYPESCRIPT
// Este archivo contiene ejemplos que puedes copiar y ejecutar

// ============================================
// IMPORTAR TIPOS DESDE tipos.ts
// ============================================
import {
  Usuario,
  EstadoUsuario,
  Producto,
  Resultado,
  RespuestaAPI,
  ActualizarProducto,
  ProductoBasico,
  ProductoSinID,
  PermisosPorRol,
  Validador,
  ConfiguracionApp,
} from "./tipos";

// ============================================
// NIVEL 1: INTERFACES Y ENUMS
// ============================================

// Ejemplo 1: Interfaz básica
const usuario: Usuario = {
  id: 1,
  username: "Juan",
  email: "juan@example.com",
  activo: true,
};

// Ejemplo 2: Enum
interface UsuarioConEstado extends Usuario {
  readonly id: number;
  readonly estado: EstadoUsuario;
}

// Ejemplo 3: Union types
function procesar(valor: Resultado): void {
  if (typeof valor === "string") {
    console.log(valor.toUpperCase());
  } else if (typeof valor === "number") {
    console.log(valor * 2);
  } else {
    console.log(valor ? "verdadero" : "falso");
  }
}

// ============================================
// NIVEL 2: CLASES Y GENÉRICOS
// ============================================

// Ejemplo 4: Clase con modificadores de acceso
class CuentaBancaria {
  private saldo: number;
  readonly titular: string;

  constructor(titular: string, saldoInicial: number) {
    this.titular = titular;
    this.saldo = saldoInicial;
  }

  public depositar(cantidad: number): void {
    this.saldo += cantidad;
  }

  public obtenerSaldo(): number {
    return this.saldo;
  }
}

// Ejemplo 5: Genéricos
class Almacen<T> {
  private items: T[] = [];

  agregar(item: T): void {
    this.items.push(item);
  }

  obtener(indice: number): T {
    return this.items[indice];
  }

  obtenerTodos(): T[] {
    return this.items;
  }
}

const almacenTexto = new Almacen<string>();
almacenTexto.agregar("Hola");
almacenTexto.agregar("Mundo");

// Ejemplo 6: Type guards
function procesar2(valor: string | number): void {
  if (typeof valor === "string") {
    console.log(`String: ${valor.toUpperCase()}`);
  } else {
    console.log(`Número: ${valor.toFixed(2)}`);
  }
}

// ============================================
// NIVEL 3: TIPOS AVANZADOS
// ============================================

// Ejemplo 7: Utility types (ya importados de tipos.ts)
// Partial: todas las propiedades opcionales
type PartialProducto = ActualizarProducto;

// Pick: seleccionar propiedades específicas
type BasicoProducto = ProductoBasico;

// Omit: excluir propiedades específicas
type SinIDProducto = ProductoSinID;

// Ejemplo 8: Mapped types
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UsuarioGetters = Getters<Usuario>;
// {
//   getId: () => number;
//   getNombre: () => string;
//   getEmail: () => string;
// }

// Ejemplo 9: Conditional types
type Flatten<T> = T extends Array<infer U> ? U : T;

type A = Flatten<number[]>; // number
type B = Flatten<string>; // string

// Ejemplo 10: Template literal types
type Evento = "click" | "hover" | "focus";
type EventoHandler = `on${Capitalize<Evento>}`;
// "onClick" | "onHover" | "onFocus"

// ============================================
// NIVEL 4: PATRONES AVANZADOS
// ============================================

// Ejemplo 11: Patrón Singleton
class BaseDatos {
  private static instancia: BaseDatos;

  private constructor() {}

  static obtenerInstancia(): BaseDatos {
    if (!BaseDatos.instancia) {
      BaseDatos.instancia = new BaseDatos();
    }
    return BaseDatos.instancia;
  }

  conectar(): void {
    console.log("Conectado a la base de datos");
  }
}

// Ejemplo 12: Patrón Builder
class ConstructorAPI {
  private opciones: {
    baseUrl: string;
    timeout: number;
    headers: Record<string, string>;
  } = {
    baseUrl: "",
    timeout: 5000,
    headers: {},
  };

  baseUrl(url: string): this {
    this.opciones.baseUrl = url;
    return this;
  }

  timeout(ms: number): this {
    this.opciones.timeout = ms;
    return this;
  }

  header(clave: string, valor: string): this {
    this.opciones.headers[clave] = valor;
    return this;
  }

  construir() {
    return this.opciones;
  }
}

const api = new ConstructorAPI()
  .baseUrl("https://api.example.com")
  .timeout(10000)
  .header("Authorization", "Bearer token")
  .construir();

// ============================================
// CASOS DE USO REALES
// ============================================

// Ejemplo 13: API con tipo seguro (usando tipos importados)
function procesarRespuesta<T>(respuesta: RespuestaAPI<T>): void {
  if (respuesta.tipo === "exito") {
    console.log("Éxito:", respuesta.datos);
  } else {
    console.log(`Error ${respuesta.codigo}: ${respuesta.mensaje}`);
  }
}

// Ejemplo 14: Sistema de permisos (usando tipos importados)
const permisos: PermisosPorRol = {
  admin: ["leer", "escribir", "eliminar"],
  editor: ["leer", "escribir"],
  viewer: ["leer"],
};

// Ejemplo 15: Validador genérico (usando tipos importados)
const validadores: Validador<ConfiguracionApp> = {
  puerto: (valor) => valor > 0 && valor < 65535,
  ambiente: (valor) => ["dev", "prod"].includes(valor),
  debug: (valor) => typeof valor === "boolean",
};

console.log("Ejemplos cargados correctamente!");
