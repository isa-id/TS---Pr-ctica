# Nivel 2.3: Type Guards y Narrowing

## ¿Qué es Type Narrowing?

Type narrowing es el proceso de refinar un tipo a uno más específico dentro de un bloque de código.

```typescript
function procesar(x: string | number) {
  // Aquí x puede ser string O number
  
  if (typeof x === "string") {
    // Aquí TypeScript SABE que x es string
    console.log(x.toUpperCase());
  } else {
    // Aquí TypeScript SABE que x es number
    console.log(x.toFixed(2));
  }
}
```

---

## typeof Guard

El guard más simple, pero potente:

```typescript
function procesarValor(valor: string | number | boolean) {
  if (typeof valor === "string") {
    // valor es string
    return valor.length;
  } else if (typeof valor === "number") {
    // valor es number
    return valor * 2;
  } else {
    // valor es boolean
    return valor ? "verdadero" : "falso";
  }
}

procesarValor("hola");      // 5
procesarValor(10);          // 20
procesarValor(true);        // "verdadero"
```

---

## instanceof Guard

Verifica si un objeto es instancia de una clase:

```typescript
class Perro {
  ladrar() {
    console.log("¡Guau!");
  }
}

class Gato {
  maullar() {
    console.log("¡Miau!");
  }
}

function hacerSonido(animal: Perro | Gato) {
  if (animal instanceof Perro) {
    animal.ladrar();      // ✓ TypeScript sabe que tiene ladrar()
  } else {
    animal.maullar();     // ✓ TypeScript sabe que tiene maullar()
  }
}

hacerSonido(new Perro());  // ¡Guau!
hacerSonido(new Gato());   // ¡Miau!
```

---

## in Guard

Verifica si una propiedad existe en un objeto:

```typescript
interface Pajaro {
  volar(): void;
  posarse(): void;
}

interface Pez {
  nadar(): void;
  respirar(): void;
}

function mover(ser: Pajaro | Pez) {
  if ("volar" in ser) {
    // TypeScript sabe que es Pajaro
    ser.volar();
    ser.posarse();
  } else {
    // TypeScript sabe que es Pez
    ser.nadar();
    ser.respirar();
  }
}
```

---

## Predicados Personalizados (Type Predicates)

Crea tus propias funciones de narrowing:

```typescript
interface Gato {
  tipo: "gato";
  maullar(): void;
}

interface Perro {
  tipo: "perro";
  ladrar(): void;
}

// Esta función "predica" que el argumento es un Gato
function esGato(animal: Gato | Perro): animal is Gato {
  return animal.tipo === "gato";
}

function hacerSonido(animal: Gato | Perro) {
  if (esGato(animal)) {
    animal.maullar();     // ✓ TypeScript sabe que es Gato
  } else {
    animal.ladrar();      // ✓ TypeScript sabe que es Perro
  }
}
```

### Con Genéricos

```typescript
function esString(valor: unknown): valor is string {
  return typeof valor === "string";
}

function esNumero(valor: unknown): valor is number {
  return typeof valor === "number";
}

function procesarDatos(datos: unknown[]) {
  for (const dato of datos) {
    if (esString(dato)) {
      console.log(`String: ${dato.toUpperCase()}`);
    } else if (esNumero(dato)) {
      console.log(`Número: ${dato.toFixed(2)}`);
    } else {
      console.log("Tipo desconocido");
    }
  }
}

procesarDatos(["hola", 42, true, "mundo", 3.14]);
```

---

## Truthiness Guard

```typescript
function mostrarLongitud(str: string | null) {
  if (str) {
    // Si llegamos aquí, str no es null
    console.log(`La longitud es ${str.length}`);
  } else {
    console.log("El string es null o undefined");
  }
}

function verificarArray(arr: string[] | undefined) {
  if (!arr) {
    console.log("Array no definido");
    return;
  }
  // Aquí arr definitivamente es string[]
  console.log(`Array con ${arr.length} elementos`);
}
```

---

## Never Type (Agotamiento)

TypeScript detecta cuando has manejado todos los casos:

```typescript
type Estado = "pendiente" | "completado" | "error";

function procesarEstado(estado: Estado) {
  switch(estado) {
    case "pendiente":
      console.log("Esperando...");
      break;
    case "completado":
      console.log("¡Completado!");
      break;
    case "error":
      console.log("Error encontrado");
      break;
    // Si quitas uno de los casos, TypeScript marca un error
  }
}

// Si agregas un nuevo estado pero olvidas manejarlo:
type EstadoNuevo = "pendiente" | "completado" | "error" | "cancelado";

function procesarEstadoNuevo(estado: EstadoNuevo) {
  switch(estado) {
    case "pendiente":
      console.log("Esperando...");
      break;
    case "completado":
      console.log("¡Completado!");
      break;
    case "error":
      console.log("Error encontrado");
      break;
    // ✗ Error: Falta manejar "cancelado"
    default:
      const _never: never = estado;  // Esto fuerza a manejar todos los casos
  }
}
```

---

## Caso Práctico: Sistema Robusto de Respuestas

```typescript
type Success<T> = {
  tipo: "success";
  datos: T;
};

type Failure = {
  tipo: "error";
  codigo: number;
  mensaje: string;
};

type Resultado<T> = Success<T> | Failure;

function esExito<T>(resultado: Resultado<T>): resultado is Success<T> {
  return resultado.tipo === "success";
}

function procesarRespuesta<T>(resultado: Resultado<T>) {
  if (esExito(resultado)) {
    console.log("Datos:", resultado.datos);
  } else {
    console.log(`Error ${resultado.codigo}: ${resultado.mensaje}`);
  }
}

// Uso
const resp1: Resultado<{ nombre: string }> = {
  tipo: "success",
  datos: { nombre: "Juan" }
};

const resp2: Resultado<string> = {
  tipo: "error",
  codigo: 404,
  mensaje: "No encontrado"
};

procesarRespuesta(resp1);  // Datos: { nombre: "Juan" }
procesarRespuesta(resp2);  // Error 404: No encontrado
```

---

## 💡 Ejercicios Prácticos

### Ejercicio 1: typeof Guard
Crea una función que acepte `string | number | boolean` y:
- Si es string, devuelva su longitud
- Si es number, devuelva su valor al cuadrado
- Si es boolean, devuelva "sí" o "no"

### Ejercicio 2: instanceof Guard
Crea clases `Gato`, `Perro`, `Pajaro` y una función que haga el sonido correcto

### Ejercicio 3: Type Predicate
Crea una función `esArray` que verifique si algo es un array, usando un predicado

### Ejercicio 4: Sistema HTTP
Crea tipos para respuestas HTTP (Success, BadRequest, NotFound) con predicados correspondientes

---

## 📌 Puntos Clave

✓ Narrowing refina tipos a más específicos  
✓ typeof, instanceof, e in son guards comunes  
✓ Predicados personalizados con `is` son poderosos  
✓ Truthiness verifica null/undefined  
✓ Never type detecta casos no manejados  
✓ Los guards mejoran la seguridad de tipos  

---

**Anterior:** [05-Generics.md](05-Generics.md)  
**Siguiente:** [07-Utility-Types.md](07-Utility-Types.md)
