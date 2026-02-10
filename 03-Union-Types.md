# Nivel 1.3: Union Types y Tipos Literales

## Union Types (Tipos Unión)

Un union type permite que una variable tenga múltiples tipos posibles. Se denota con el símbolo `|`:

```typescript
// Una variable puede ser string O number
let id: string | number;

id = "ABC123";  // ✓ Válido
id = 123;       // ✓ Válido
// id = true;   // ✗ Error: boolean no está en el union
```

## Union con Interfaces

```typescript
interface Gato {
  ronronea: boolean;
  juega(): void;
}

interface Perro {
  ladra: boolean;
  traer(): void;
}

// Una mascota puede ser un Gato O un Perro
function hacerSonido(mascota: Gato | Perro) {
  if ("ronronea" in mascota) {
    console.log("¡Miau!");
  } else {
    console.log("¡Guau!");
  }
}
```

---

## Literal Types (Tipos Literales)

Un tipo literal restringe una variable a un valor exacto:

```typescript
// Esta variable SOLO puede ser "arriba"
let direccion: "arriba";
direccion = "arriba";    // ✓
// direccion = "abajo";  // ✗ Error

// Union de literales (similar a Enum)
let respuesta: "si" | "no" | "tal_vez";
respuesta = "si";        // ✓
respuesta = "no";        // ✓
// respuesta = "talvez"; // ✗ Error: La palabra es "tal_vez"
```

## Literal Types con Números

```typescript
type Dados = 1 | 2 | 3 | 4 | 5 | 6;

function lanzarDados(): Dados {
  return Math.floor(Math.random() * 6) + 1 as Dados;
}

let resultado: Dados;
resultado = 3;   // ✓
// resultado = 7; // ✗ Error
```

---

## Type Guards (Guardias de Tipo)

Los type guards te ayudan a estrechar el tipo dentro de un bloque de código:

### typeof Guard

```typescript
function procesarValor(valor: string | number) {
  if (typeof valor === "string") {
    // Aquí TypeScript sabe que valor es string
    console.log(valor.toUpperCase());
  } else {
    // Aquí sabe que valor es number
    console.log(valor.toFixed(2));
  }
}
```

### instanceof Guard

```typescript
class Perro {
  ladrar() { console.log("¡Guau!"); }
}

class Gato {
  maullar() { console.log("¡Miau!"); }
}

function hacerSonido(animal: Perro | Gato) {
  if (animal instanceof Perro) {
    animal.ladrar();
  } else {
    animal.maullar();
  }
}
```

### in Guard

```typescript
interface Volador {
  volar(): void;
}

interface Nadador {
  nadar(): void;
}

function mover(ser: Volador | Nadador) {
  if ("volar" in ser) {
    ser.volar();
  } else {
    ser.nadar();
  }
}
```

---

## Caso Práctico: Sistema de Notificaciones

```typescript
type TipoNotificacion = "email" | "sms" | "push";

interface Notificacion {
  tipo: TipoNotificacion;
  mensaje: string;
  destino: string | number;
}

function enviarNotificacion(notificacion: Notificacion) {
  switch(notificacion.tipo) {
    case "email":
      console.log(`Enviando email a ${notificacion.destino}`);
      break;
    case "sms":
      console.log(`Enviando SMS al ${notificacion.destino}`);
      break;
    case "push":
      console.log(`Enviando push al dispositivo ${notificacion.destino}`);
      break;
  }
}

const notif1: Notificacion = {
  tipo: "email",
  mensaje: "Bienvenido",
  destino: "usuario@example.com"
};

const notif2: Notificacion = {
  tipo: "sms",
  mensaje: "Tu código es 1234",
  destino: 3101234567
};
```

---

## Discriminated Unions

Una técnica poderosa que combina unions con un campo discriminador:

```typescript
interface Exito {
  tipo: "exito";
  datos: string;
}

interface Error {
  tipo: "error";
  codigo: number;
  mensaje: string;
}

type Resultado = Exito | Error;

function procesarResultado(resultado: Resultado) {
  if (resultado.tipo === "exito") {
    // TypeScript sabe que tiene 'datos'
    console.log(`Éxito: ${resultado.datos}`);
  } else {
    // TypeScript sabe que tiene 'codigo' y 'mensaje'
    console.log(`Error ${resultado.codigo}: ${resultado.mensaje}`);
  }
}

procesarResultado({ tipo: "exito", datos: "Operación completada" });
procesarResultado({ tipo: "error", codigo: 404, mensaje: "No encontrado" });
```

---

## 💡 Ejercicios Prácticos

### Ejercicio 1: Union Types
Crea una función que acepte un parámetro de tipo `string | number` y:
- Si es string, devuelva su longitud
- Si es number, devuelva su valor multiplicado por 2

### Ejercicio 2: Tipos Literales
Crea un tipo `TamañoFont` con valores: "pequeño" | "mediano" | "grande"

### Ejercicio 3: Type Guard
Implementa una función que reciba `string | number[]` y:
- Si es string, imprima su valor
- Si es array, imprima su longitud

### Ejercicio 4: Discriminated Union
Crea un sistema de respuesta HTTP con tipos:
- Success: { status: 200, data: unknown }
- Error: { status: number (4xx o 5xx), error: string }

---

## 📌 Puntos Clave

✓ Union types permiten múltiples tipos para una variable  
✓ Literal types restringen a valores exactos  
✓ Type guards ayudan a estrechar el tipo  
✓ `typeof`, `instanceof`, e `in` son guardias comunes  
✓ Discriminated unions son poderosos para datos complejos  
✓ Los literals se pueden combinar con enums y unions  

---

**Anterior:** [02-Enums.md](02-Enums.md)  
**Siguiente:** [04-Clases-y-Herencia.md](04-Clases-y-Herencia.md)
