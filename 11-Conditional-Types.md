# Nivel 4.2: Conditional Types

## ¿Qué son Conditional Types?

Son tipos que eligen entre dos opciones basándose en una condición, similar a un operador ternario para tipos.

Sintaxis: `T extends U ? X : Y`

---

## Condicionales Básicas

```typescript
// Si T es string, retorna number. Si no, retorna string
type EsString<T> = T extends string ? number : string;

type A = EsString<string>;      // number
type B = EsString<boolean>;     // string
```

---

## Condicionales con Uniones

```typescript
type TipoFlattened<T> = T extends Array<infer U> ? U : T;

type A = TipoFlattened<number[]>;     // number (extrae de array)
type B = TipoFlattened<string>;       // string (no es array)
type C = TipoFlattened<boolean[]>;    // boolean

// Con unions
type Flatten<T> = T extends Array<infer U> ? U : T;

type D = Flatten<number | string[]>;  // number | string (ambos casos)
```

---

## infer: Extrayendo Tipos

`infer` permite capturar tipos en condicionales:

```typescript
// Extrae el tipo de retorno de una función
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function sumar(a: number, b: number): number {
  return a + b;
}

type TipoRetorno = ReturnType<typeof sumar>;  // number

// Extrae los parámetros de una función
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

type ParamsSumar = Parameters<typeof sumar>;  // [a: number, b: number]
```

---

## Distribución en Unions

Los condicionales se distribuyen sobre unions:

```typescript
type ToArray<T> = T extends any ? T[] : never;

type Result = ToArray<string | number>;
// Equivalente a:
// (string extends any ? string[] : never) | 
// (number extends any ? number[] : never)
// Resultado: string[] | number[]

// Para evitar la distribución, usa []
type ToArrayNoDistribute<T> = [T] extends any ? T[] : never;
type Result2 = ToArrayNoDistribute<string | number>;  // (string | number)[]
```

---

## Casos Prácticos Útiles

### Extractor de Array

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type A = Flatten<string[]>;           // string
type B = Flatten<number[][]>;         // number
type C = Flatten<string[][][]>;       // string

// Extrae todos los valores de un array anidado
const valor: Flatten<[1, [2, [3, 4]]]> = 1;
```

### Promesa Anidada

```typescript
type Awaited<T> = T extends Promise<infer U>
  ? U extends Promise<any>
    ? Awaited<U>
    : U
  : T;

type A = Awaited<Promise<string>>;              // string
type B = Awaited<Promise<Promise<number>>>;     // number
type C = Awaited<string>;                       // string
```

### Extractor de Llaves

```typescript
type FunctionProperty<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface Usuario {
  nombre: string;
  edad: number;
  saludar(): void;
  despedirse(): void;
}

type MetodosUsuario = FunctionProperty<Usuario>;
// "saludar" | "despedirse"
```

---

## Condicionales Anidadas

```typescript
type Tipo<T> = 
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends Array<infer U> ? "array" :
  T extends object ? "object" :
  "unknown";

type A = Tipo<string>;        // "string"
type B = Tipo<number>;        // "number"
type C = Tipo<string[]>;      // "array"
type D = Tipo<{ a: 1 }>;      // "object"
```

---

## Condicionales Recursivos

```typescript
type JsonValue = 
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type DeepReadonly<T> = T extends object ? {
  readonly [K in keyof T]: DeepReadonly<T[K]>;
} : T;

interface Usuario {
  nombre: string;
  contacto: {
    email: string;
    telefono: string;
  };
}

type UsuarioSeguro = DeepReadonly<Usuario>;
// {
//   readonly nombre: string;
//   readonly contacto: {
//     readonly email: string;
//     readonly telefono: string;
//   };
// }
```

---

## Condicionales Avanzadas

### Discriminando Tipos

```typescript
type IsString<T> = T extends string ? true : false;
type IsNumber<T> = T extends number ? true : false;

type A = IsString<"hola">;      // true
type B = IsString<123>;         // false
type C = IsNumber<123>;         // true
```

### Extrayendo de Tuples

```typescript
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;
type Rest<T extends any[]> = T extends [any, ...infer R] ? R : never;

type A = First<[1, 2, 3]>;      // 1
type B = Last<[1, 2, 3]>;       // 3
type C = Rest<[1, 2, 3]>;       // [2, 3]
```

### Extrayendo Propiedades Específicas

```typescript
// Solo propiedades de lectura
type ReadonlyProperties<T> = {
  [K in keyof T]-?: T[K] extends Readonly<any> ? K : never;
}[keyof T];

// Propiedades opcionales
type OptionalProperties<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
```

---

## 💡 Ejercicios Prácticos

### Ejercicio 1: Tipo Simple
Crea `IsArray<T>` que retorna true si T es un array, false si no

### Ejercicio 2: Extraer Tipos
Crea `ReturnTypeCustom<T>` que extraiga el tipo de retorno de una función

### Ejercicio 3: Aplanar
Crea `FlattenDeep<T>` que aplane cualquier profundidad de arrays anidados

### Ejercicio 4: DeepPartial
Crea `DeepPartial<T>` que haga todas las propiedades opcionales recursivamente

### Ejercicio 5: Extractor de Métodos
Crea un tipo que extraiga los nombres de los métodos de una interfaz

---

## 📌 Puntos Clave

✓ Condicionales usan `extends` para evaluar tipos  
✓ `infer` captura tipos dentro de condicionales  
✓ La distribución ocurre automáticamente en unions  
✓ Los condicionales pueden ser recursivos  
✓ Muy poderosos para metaprogramación  

---

**Anterior:** [10-Advanced-Patterns.md](10-Advanced-Patterns.md)  
**Siguiente:** [12-Template-Literal-Types.md](12-Template-Literal-Types.md)
