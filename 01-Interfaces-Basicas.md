# Nivel 1.1: Interfaces Básicas

## ¿Qué es una Interfaz?

Una interfaz es un contrato que define la estructura de un objeto. Especifica qué propiedades debe tener un objeto y qué tipos de datos deben ser.

### Sintaxis Básica

```typescript
interface Usuario {
  nombre: string;
  edad: number;
  email: string;
}

const usuario: Usuario = {
  nombre: "Juan",
  edad: 25,
  email: "juan@example.com"
};
```

## Propiedades Opcionales

Usa `?` para hacer una propiedad opcional:

```typescript
interface Producto {
  nombre: string;
  precio: number;
  descripcion?: string;  // Opcional
}

const producto1: Producto = {
  nombre: "Laptop",
  precio: 1500
  // descripcion no es obligatoria
};

const producto2: Producto = {
  nombre: "Mouse",
  precio: 25,
  descripcion: "Mouse inalámbrico"
};
```

## Propiedades de Solo Lectura

Usa `readonly` para propiedades que no pueden cambiar:

```typescript
interface Configuracion {
  readonly version: string;
  readonly apiUrl: string;
  theme: string;  // Esta sí puede cambiar
}

const config: Configuracion = {
  version: "1.0.0",
  apiUrl: "https://api.example.com",
  theme: "dark"
};

config.theme = "light";  // ✓ Permitido
// config.version = "2.0.0";  // ✗ Error: No puedes cambiar propiedades readonly
```

## Métodos en Interfaces

Las interfaces pueden definir métodos (funciones) que deben implementar los objetos:

```typescript
interface Vehiculo {
  marca: string;
  año: number;
  acelerar(): void;
  frenar(intensidad: number): string;
}

const miAuto: Vehiculo = {
  marca: "Toyota",
  año: 2023,
  acelerar() {
    console.log("¡Acelerando!");
  },
  frenar(intensidad: number) {
    return `Frenando con intensidad ${intensidad}`;
  }
};

miAuto.acelerar();  // ¡Acelerando!
console.log(miAuto.frenar(80));  // Frenando con intensidad 80
```

## Herencia de Interfaces

Las interfaces pueden extender otras interfaces:

```typescript
interface Animal {
  nombre: string;
  edad: number;
}

interface Perro extends Animal {
  raza: string;
  traerObjeto(): void;
}

const miPerro: Perro = {
  nombre: "Max",
  edad: 3,
  raza: "Golden Retriever",
  traerObjeto() {
    console.log("Trayendo la pelota...");
  }
};
```

## Múltiple Herencia

Una interfaz puede extender múltiples interfaces:

```typescript
interface Volador {
  volar(): void;
}

interface Nadador {
  nadar(): void;
}

interface Pajaro extends Volador, Nadador {
  nombre: string;
}

const pajaro: Pajaro = {
  nombre: "Loro",
  volar() {
    console.log("Volando por el cielo");
  },
  nadar() {
    console.log("Nadando en el agua");
  }
};
```

## Fusión de Interfaces (Declaration Merging)

Si declaras la misma interfaz varias veces, TypeScript las combina:

```typescript
interface Persona {
  nombre: string;
}

interface Persona {
  edad: number;
}

// Ahora Persona tiene nombre Y edad
const persona: Persona = {
  nombre: "Carlos",
  edad: 30
};
```

---

## 💡 Ejercicios Prácticos

### Ejercicio 1: Crear una interfaz de Usuario
Crea una interfaz `Usuario` con:
- `id` (número, readonly)
- `username` (string)
- `email` (string)
- `activo` (booleano, opcional)

### Ejercicio 2: Agregar métodos
Crea una interfaz `CuentaBancaria` con:
- `saldo` (número)
- `titular` (string)
- `depositar(cantidad: number): void`
- `retirar(cantidad: number): boolean`

### Ejercicio 3: Herencia
Extiende la interfaz anterior creando una interfaz `CuentaPremium` que agregue:
- `limiteCredito` (número)
- `solicitarPrestamo(cantidad: number): boolean`

---

## 📌 Puntos Clave

✓ Las interfaces definen contratos de estructura  
✓ Las propiedades pueden ser opcionales con `?`  
✓ Usa `readonly` para propiedades inmutables  
✓ Las interfaces pueden tener métodos  
✓ Soportan herencia simple y múltiple  
✓ Se pueden fusionar si tienen el mismo nombre  

---

**Siguiente:** [02-Enums.md](02-Enums.md)
