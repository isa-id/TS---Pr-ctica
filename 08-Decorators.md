# Nivel 3.2: Decoradores

## ¿Qué son los Decoradores?

Los decoradores son funciones especiales que modifican clases, métodos, propiedades o parámetros. Necesitan activarse en `tsconfig.json`.

### Configuración Necesaria

En tu `tsconfig.json`:
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

---

## Decoradores de Clase

Modifican o mejoran la clase:

```typescript
// Un decorador es una función que recibe la clase
function Sellado<T extends { new (...args: any[]): {} }>(constructor: T) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
  return constructor;
}

@Sellado
class Usuario {
  nombre: string = "Juan";
  
  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
}

const usuario = new Usuario();
// usuario.edad = 30;  // ✗ Error: No puedes agregar propiedades
```

### Decorador Paramétrico

```typescript
function DocString(descripcion: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    constructor.prototype.__doc__ = descripcion;
    return constructor;
  };
}

@DocString("Clase que representa un estudiante")
class Estudiante {
  nombre: string = "Ana";
}

console.log((Estudiante.prototype as any).__doc__);
// "Clase que representa un estudiante"
```

---

## Decoradores de Propiedades

Modifican el comportamiento de una propiedad:

```typescript
function Validar(min: number, max: number) {
  return function (target: any, propertyKey: string) {
    let valor = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      get() {
        return valor;
      },
      set(nuevoValor: number) {
        if (nuevoValor < min || nuevoValor > max) {
          throw new Error(`${propertyKey} debe estar entre ${min} y ${max}`);
        }
        valor = nuevoValor;
      },
      enumerable: true,
      configurable: true
    });
  };
}

class Persona {
  nombre: string = "Juan";
  
  @Validar(0, 150)
  edad: number = 25;
}

const persona = new Persona();
console.log(persona.edad);  // 25
persona.edad = 30;          // ✓
// persona.edad = 200;      // ✗ Error: debe estar entre 0 y 150
```

---

## Decoradores de Métodos

Modifican o envuelven métodos:

```typescript
function Medir(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const metodoOriginal = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const inicio = performance.now();
    const resultado = metodoOriginal.apply(this, args);
    const fin = performance.now();
    
    console.log(`${propertyKey} tardó ${fin - inicio}ms`);
    return resultado;
  };

  return descriptor;
}

class Calculadora {
  @Medir
  sumarLista(numeros: number[]): number {
    return numeros.reduce((a, b) => a + b, 0);
  }

  @Medir
  multimplicar(a: number, b: number): number {
    return a * b;
  }
}

const calc = new Calculadora();
calc.sumarLista([1, 2, 3, 4, 5]);  // sumarLista tardó Xms
calc.multimplicar(10, 20);          // multimplicar tardó Xms
```

---

## Decoradores de Parámetros

Modifican parámetros de métodos:

```typescript
function Validado(target: any, propertyKey: string, parameterIndex: number) {
  const metodoOriginal = target[propertyKey];

  target[propertyKey] = function (...args: any[]) {
    if (typeof args[parameterIndex] !== "string" || args[parameterIndex].length === 0) {
      throw new Error(`Parámetro en posición ${parameterIndex} debe ser un string no vacío`);
    }
    return metodoOriginal.apply(this, args);
  };
}

class Saludador {
  saludar(@Validado nombre: string) {
    return `Hola, ${nombre}`;
  }
}

const saludador = new Saludador();
console.log(saludador.saludar("Juan"));  // "Hola, Juan"
// saludador.saludar("");                // ✗ Error
```

---

## Caso Práctico: Sistema ORM Simplificado

```typescript
const metadatos = new Map<any, Map<string, any>>();

function Entidad(nombreTabla: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    metadatos.set(constructor, new Map([["tabla", nombreTabla]]));
    return constructor;
  };
}

function Columna(opciones: { tipo: string; longitud?: number } = { tipo: "VARCHAR" }) {
  return function (target: any, propertyKey: string) {
    const meta = metadatos.get(target.constructor) || new Map();
    const columnas = meta.get("columnas") || [];
    
    columnas.push({
      nombre: propertyKey,
      ...opciones
    });
    
    meta.set("columnas", columnas);
    metadatos.set(target.constructor, meta);
  };
}

@Entidad("usuarios")
class Usuario {
  @Columna({ tipo: "INT", longitud: 11 })
  id!: number;

  @Columna({ tipo: "VARCHAR", longitud: 100 })
  nombre!: string;

  @Columna({ tipo: "VARCHAR", longitud: 255 })
  email!: string;
}

const metaUsuario = metadatos.get(Usuario);
console.log(metaUsuario?.get("tabla"));      // "usuarios"
console.log(metaUsuario?.get("columnas"));   // Array de columnas
```

---

## Composición de Decoradores

Puedes aplicar múltiples decoradores:

```typescript
function Primero(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log("Primero");
  return descriptor;
}

function Segundo(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log("Segundo");
  return descriptor;
}

class Ejemplo {
  @Primero   // Se ejecuta segundo
  @Segundo   // Se ejecuta primero
  metodo() {
    console.log("Método");
  }
}

// Salida:
// Segundo
// Primero
// Método
```

---

## 💡 Ejercicios Prácticos

### Ejercicio 1: Decorador Simple
Crea un decorador que registre (log) cuando se crea una instancia de la clase

### Ejercicio 2: Decorador de Validación
Crea un decorador para métodos que mida y registre cuántas veces se ejecuta

### Ejercicio 3: Decorador de Propiedad
Crea un decorador que haga una propiedad inmutable después de la asignación inicial

### Ejercicio 4: Combinación
Crea un sistema de validación usando decoradores en clase, propiedades y métodos

---

## 📌 Puntos Clave

✓ Necesitan `experimentalDecorators: true` en tsconfig.json  
✓ Son funciones que modifican clases/métodos/propiedades  
✓ Se aplican con `@NombreDecorador`  
✓ Los decoradores de parámetros se ejecutan últimos  
✓ Potentes para metaprogramación y frameworks  

---

**Anterior:** [07-Utility-Types.md](07-Utility-Types.md)  
**Siguiente:** [09-Type-Inference.md](09-Type-Inference.md)
