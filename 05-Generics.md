# Nivel 2.2: Generics (Genéricos)

## ¿Qué son los Genéricos?

Los genéricos permiten escribir código reutilizable que funciona con múltiples tipos. Son como "variables de tipo":

```typescript
// Sin genéricos, necesitarías hacer esto:
function devolverString(valor: string): string {
  return valor;
}

function devolverNumber(valor: number): number {
  return valor;
}

// Con genéricos, uno solo sirve para todos:
function devolver<T>(valor: T): T {
  return valor;
}

console.log(devolver("Hola"));      // "Hola"
console.log(devolver(42));          // 42
console.log(devolver(true));        // true
```

---

## Genéricos Básicos

### Funciones Genéricas

```typescript
// T es un "tipo variable" que se reemplaza cuando llamas la función
function primero<T>(array: T[]): T {
  return array[0];
}

console.log(primero([1, 2, 3]));              // 1 (T es number)
console.log(primero(["a", "b", "c"]));        // "a" (T es string)
console.log(primero([true, false]));          // true (T es boolean)
```

### Interfaces Genéricas

```typescript
interface Caja<T> {
  contenido: T;
  obtener(): T;
  guardar(valor: T): void;
}

const cajaNumeros: Caja<number> = {
  contenido: 42,
  obtener() {
    return this.contenido;
  },
  guardar(valor: number) {
    this.contenido = valor;
  }
};

const cajaTexto: Caja<string> = {
  contenido: "Hola",
  obtener() {
    return this.contenido;
  },
  guardar(valor: string) {
    this.contenido = valor;
  }
};
```

### Clases Genéricas

```typescript
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

const almacenLibros = new Almacen<string>();
almacenLibros.agregar("El Quijote");
almacenLibros.agregar("1984");
console.log(almacenLibros.obtenerTodos());  // ["El Quijote", "1984"]

const almacenNumeros = new Almacen<number>();
almacenNumeros.agregar(100);
almacenNumeros.agregar(200);
console.log(almacenNumeros.obtenerTodos());  // [100, 200]
```

---

## Múltiples Parámetros de Tipo

```typescript
function intercambiar<T, U>(primero: T, segundo: U): [U, T] {
  return [segundo, primero];
}

const resultado = intercambiar("Hola", 42);
// resultado es [number, string] = [42, "Hola"]
console.log(resultado);
```

---

## Constraints (Restricciones)

A veces quieres limitar qué tipos pueden ser usados:

### Extends

```typescript
// T solo puede ser string o number
function duplicar<T extends string | number>(valor: T): T {
  // El código funciona porque sabemos que T es string o number
  return valor;
}

duplicar("Hola");    // ✓
duplicar(42);        // ✓
// duplicar(true);   // ✗ Error
```

### Constraint con Interfaz

```typescript
interface TieneID {
  id: number;
}

function mostrarID<T extends TieneID>(objeto: T): number {
  return objeto.id;
}

mostrarID({ id: 1, nombre: "Juan" });        // ✓
// mostrarID({ nombre: "Juan" });            // ✗ Error: No tiene id
```

### Constraint con Propiedad

```typescript
function obtenerPropiedad<T, K extends keyof T>(objeto: T, clave: K) {
  return objeto[clave];
}

const persona = { nombre: "Ana", edad: 30 };
console.log(obtenerPropiedad(persona, "nombre"));  // "Ana"
// obtenerPropiedad(persona, "email");             // ✗ Error
```

---

## Tipo por Defecto

```typescript
interface Respuesta<T = string> {
  codigo: number;
  datos: T;
}

const resp1: Respuesta = {
  codigo: 200,
  datos: "Éxito"  // T es string por defecto
};

const resp2: Respuesta<number> = {
  codigo: 200,
  datos: 12345  // T es number
};
```

---

## Caso Práctico: API Genérica

```typescript
interface ApiRespuesta<T> {
  exito: boolean;
  datos?: T;
  error?: string;
}

class ClienteAPI {
  async obtener<T>(url: string): Promise<ApiRespuesta<T>> {
    try {
      const response = await fetch(url);
      const datos = await response.json();
      return { exito: true, datos };
    } catch (error) {
      return { 
        exito: false, 
        error: error instanceof Error ? error.message : "Error desconocido" 
      };
    }
  }
}

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const cliente = new ClienteAPI();

// TypeScript sabe que respuesta.datos es Usuario | undefined
const respuesta = await cliente.obtener<Usuario>("/api/usuarios/1");

if (respuesta.exito && respuesta.datos) {
  console.log(respuesta.datos.nombre);  // ✓ TypeScript sabe que existe
}
```

---

## Genéricos Avanzados

### Tipo Condicional Genérico

```typescript
// Si T es string, devuelve number. Si no, devuelve string.
type Procesar<T> = T extends string ? number : string;

type R1 = Procesar<string>;   // number
type R2 = Procesar<number>;   // string
```

### Infer (Inferir Tipos)

```typescript
// Extrae el tipo del array
type ElementoArray<T> = T extends (infer U)[] ? U : T;

type A = ElementoArray<number[]>;    // number
type B = ElementoArray<string[]>;    // string
type C = ElementoArray<string>;      // string
```

---

## 💡 Ejercicios Prácticos

### Ejercicio 1: Función genérica
Crea una función `longitud<T>` que devuelva la longitud de un array de cualquier tipo.

### Ejercicio 2: Clase genérica
Crea una clase `Cola<T>` con métodos:
- `encolar(item: T): void`
- `desencolar(): T | undefined`

### Ejercicio 3: Constraint
Crea una función `obtenerLlave<T>` que acepte objetos con propiedad `id` y devuelva su id.

### Ejercicio 4: API de Datos
Crea una clase `RepositorioGenerico<T>` con métodos para:
- Obtener todos los elementos
- Obtener por ID
- Crear nuevo elemento
- Actualizar elemento

---

## 📌 Puntos Clave

✓ Los genéricos hacen el código reutilizable  
✓ `T` es la convención para variables de tipo  
✓ Múltiples parámetros con `<T, U, V>`  
✓ `extends` limita los tipos permitidos  
✓ `keyof` obtiene las propiedades de un tipo  
✓ Los genéricos funcionan con funciones, interfaces y clases  

---

**Anterior:** [04-Clases-y-Herencia.md](04-Clases-y-Herencia.md)  
**Siguiente:** [06-Type-Guards.md](06-Type-Guards.md)
