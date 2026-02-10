# Nivel 3.3: Type Inference (Inferencia de Tipos)

## ¿Qué es la Inferencia de Tipos?

La inferencia de tipos es cuando TypeScript determina automáticamente el tipo de una variable sin que lo especifiques explícitamente.

```typescript
// TypeScript infiere que x es number
let x = 10;          // ✓ Inferencia: x es number

// TypeScript infiere que y es string
let y = "Hola";      // ✓ Inferencia: y es string

// Sin inferencia (tipo explícito)
let z: string = "Mundo";  // Tipo explícito
```

---

## Inferencia en Funciones

```typescript
// TypeScript infiere el tipo de retorno
function sumar(a: number, b: number) {
  return a + b;      // Infiere: retorna number
}

const resultado = sumar(5, 3);  // resultado es number

// Con tipos complejos
function crearUsuario(nombre: string, edad: number) {
  return { nombre, edad };  // Infiere: { nombre: string; edad: number }
}

const usuario = crearUsuario("Juan", 25);
// usuario es { nombre: string; edad: number }
```

---

## Inferencia en Arrays

```typescript
const numeros = [1, 2, 3];        // number[]
const strings = ["a", "b", "c"];  // string[]
const mixto = [1, "a", true];     // (number | string | boolean)[]

// Especificar el tipo del elemento
const numeros2: Array<number> = [1, 2, 3];
```

---

## Inferencia en Objetos

```typescript
const persona = {
  nombre: "Juan",      // string
  edad: 25,            // number
  activo: true         // boolean
};

// TypeScript infiere:
// {
//   nombre: string;
//   edad: number;
//   activo: boolean;
// }

// Puedes acceder a propiedades con seguridad de tipos
console.log(persona.nombre);      // ✓ TypeScript sabe que es string
// console.log(persona.salario);  // ✗ Error: la propiedad no existe
```

---

## Inferencia Condicional

```typescript
type Tipo<T> = T extends string ? "string" : T extends number ? "number" : "otro";

type A = Tipo<string>;   // "string"
type B = Tipo<number>;   // "number"
type C = Tipo<boolean>;  // "otro"
```

---

## as const

Especifica que un valor es constante:

```typescript
// Sin as const (TypeScript infiere tipos generales)
const direcciones = ["arriba", "abajo", "izquierda", "derecha"];
// Tipo: string[]

// Con as const (TypeScript infiere tipos literales)
const direcciones2 = ["arriba", "abajo", "izquierda", "derecha"] as const;
// Tipo: readonly ["arriba", "abajo", "izquierda", "derecha"]

// Útil para enums
const ROLES = {
  admin: "admin",
  usuario: "usuario",
  invitado: "invitado"
} as const;

// TypeScript infiere los valores exactos, no solo "string"
type Rol = typeof ROLES[keyof typeof ROLES];  // "admin" | "usuario" | "invitado"
```

---

## typeof para Extraer Tipos

```typescript
const config = {
  apiUrl: "https://api.example.com",
  puerto: 3000,
  debug: false
};

// Extrae el tipo del objeto
type Configuracion = typeof config;
// Equivalente a:
// {
//   apiUrl: string;
//   puerto: number;
//   debug: boolean;
// }

// También funciona con variables simples
const mensaje = "Hola";
type Mensaje = typeof mensaje;  // string

// Y con funciones
function sumar(a: number, b: number) {
  return a + b;
}

type SumarFunc = typeof sumar;  // (a: number, b: number) => number
```

---

## keyof para Obtener Claves

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

// Obtiene todas las claves como unión
type UsuarioKeys = keyof Usuario;  // "id" | "nombre" | "email"

function obtenerPropiedad<T, K extends keyof T>(obj: T, clave: K): T[K] {
  return obj[clave];
}

const usuario: Usuario = {
  id: 1,
  nombre: "Juan",
  email: "juan@example.com"
};

const nombre = obtenerPropiedad(usuario, "nombre");  // ✓ TypeScript sabe que es string
// const error = obtenerPropiedad(usuario, "salario");  // ✗ Error: no existe
```

---

## Mapped Types (Tipos Mapeados)

Crea nuevos tipos basados en otros:

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

// Crear un tipo donde todas las propiedades son opcionales
type UsuarioParcial = {
  [K in keyof Usuario]?: Usuario[K];
};

// Es lo mismo que:
type UsuarioParcial2 = Partial<Usuario>;

// Crear un tipo donde todas las propiedades son readonly
type UsuarioSoloLectura = {
  readonly [K in keyof Usuario]: Usuario[K];
};

// Crear un tipo donde todos los valores son funciones
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UsuarioGetters = Getters<Usuario>;
// {
//   getId: () => number;
//   getNombre: () => string;
//   getEmail: () => string;
// }
```

---

## Caso Práctico: Validador Genérico

```typescript
type Validador<T> = {
  [K in keyof T]: (valor: T[K]) => boolean;
};

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

const validadores: Validador<Producto> = {
  id: (valor) => valor > 0,
  nombre: (valor) => valor.length > 0,
  precio: (valor) => valor > 0
};

function validarProducto(producto: Producto): boolean {
  for (const [clave, validador] of Object.entries(validadores)) {
    if (!validador((producto as any)[clave])) {
      console.log(`${clave} no es válido`);
      return false;
    }
  }
  return true;
}

const prod = { id: 1, nombre: "Laptop", precio: 1500 };
console.log(validarProducto(prod));  // true
```

---

## Condiciones de Tipo Avanzadas

```typescript
// Obtener el tipo de un elemento de un array
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type NumArray = ArrayElement<number[]>;      // number
type StrArray = ArrayElement<string[]>;      // string

// Obtener el tipo de retorno de una función
type ReturnTypeFunc<T> = T extends (...args: any[]) => infer R ? R : never;

type MyReturn = ReturnTypeFunc<() => string>;  // string
```

---

## 💡 Ejercicios Prácticos

### Ejercicio 1: as const
Crea un objeto con permisos usando `as const` y extrae el tipo

### Ejercicio 2: typeof
Define un objeto de configuración y extrae su tipo con `typeof`

### Ejercicio 3: Mapped Types
Crea un tipo que convierta todas las propiedades a getters

### Ejercicio 4: Validador Genérico
Crea un sistema de validación que use Validador<T>

---

## 📌 Puntos Clave

✓ TypeScript infiere tipos automáticamente  
✓ `as const` especifica valores constantes  
✓ `typeof` extrae el tipo de variables  
✓ `keyof` obtiene las claves de un tipo  
✓ Mapped types transforman tipos existentes  
✓ `infer` extrae tipos en condicionales  

---

**Anterior:** [08-Decorators.md](08-Decorators.md)  
**Siguiente:** [10-Advanced-Patterns.md](10-Advanced-Patterns.md)
