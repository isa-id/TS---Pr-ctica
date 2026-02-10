# 💪 Ejercicios Propuestos - TypeScript

## Nivel 1: Fundamentos (Interfaces y Enums)

### 1.1 Sistema de Estudiantes
**Objetivo:** Practicar interfaces

Crea una interfaz `Estudiante` con:
- `id: number` (readonly)
- `nombre: string`
- `apellido: string`
- `calificaciones: number[]`
- `activo?: boolean`

Métodos:
- `obtenerPromedio(): number`
- `agregarCalificacion(nota: number): void`
- `obtenerNombreCompleto(): string`

```typescript
// Solución esperada
const est: Estudiante = {
  id: 1,
  nombre: "Juan",
  apellido: "Pérez",
  calificaciones: [85, 90, 78],
  obtenerPromedio() {
    return this.calificaciones.reduce((a, b) => a + b) / this.calificaciones.length;
  },
  agregarCalificacion(nota: number) {
    this.calificaciones.push(nota);
  },
  obtenerNombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }
};
```

---

### 1.2 Estados de Pedidos
**Objetivo:** Practicar enums

Crea un enum `EstadoPedido` con estados:
- PENDIENTE
- PAGADO
- EN_ENVÍO
- ENTREGADO
- CANCELADO

Crea una interfaz `Pedido`:
- `id: number`
- `cliente: string`
- `estado: EstadoPedido`
- `monto: number`

```typescript
// Bonus: Crea una función que cambie el estado
function transicionarEstado(
  estadoActual: EstadoPedido,
  nuevoEstado: EstadoPedido
): boolean {
  // Valida que la transición sea válida
  // PENDIENTE -> PAGADO -> EN_ENVÍO -> ENTREGADO
  // PENDIENTE -> CANCELADO (en cualquier momento)
}
```

---

### 1.3 Sistema de Notificaciones
**Objetivo:** Practicar union types

Crea tipos para:
- `TipoNotificacion = "email" | "sms" | "push"`
- `Notificacion` con tipo, mensaje y destino

```typescript
type TipoNotificacion = "email" | "sms" | "push";

interface Notificacion {
  tipo: TipoNotificacion;
  mensaje: string;
  destino: string;
  fecha: Date;
}

// Bonus: Crea una función que valide el formato según el tipo
function validarNotificacion(notif: Notificacion): boolean {
  // Si es email: destino debe tener @
  // Si es sms: destino debe ser un número
  // Si es push: destino debe ser un ID válido
}
```

---

## Nivel 2: Intermedio (Clases y Genéricos)

### 2.1 Biblioteca Digital
**Objetivo:** Practicar clases y herencia

Crea una clase base `Libro`:
- Propiedades: `id`, `titulo`, `autor`, `año`, `disponible`
- Métodos: `prestar()`, `devolver()`

Extiende con:
- `LibroFisico`: adiciona `ubicacion` y `cantidad`
- `LibroDigital`: adiciona `url` y `formato`

```typescript
class Biblioteca {
  private libros: Libro[] = [];

  agregarLibro(libro: Libro): void {
    this.libros.push(libro);
  }

  buscarPorAutor(autor: string): Libro[] {
    return this.libros.filter(l => l.autor === autor);
  }

  prestarLibro(id: number): boolean {
    const libro = this.libros.find(l => l.id === id);
    if (libro?.disponible) {
      libro.prestar();
      return true;
    }
    return false;
  }
}
```

---

### 2.2 Almacén Genérico
**Objetivo:** Practicar genéricos

Crea una clase `Almacen<T>` que implemente:
- `agregar(item: T): void`
- `obtener(indice: number): T | undefined`
- `obtenerTodos(): T[]`
- `eliminar(indice: number): T | undefined`
- `filtrar(predicado: (item: T) => boolean): T[]`
- `buscar(predicado: (item: T) => boolean): T | undefined`

```typescript
// Uso esperado
const almacenProductos = new Almacen<Producto>();
almacenProductos.agregar({ id: 1, nombre: "Laptop", precio: 1500 });

const almacenEmpleados = new Almacen<Empleado>();
almacenEmpleados.agregar({ id: 1, nombre: "Juan", salario: 2000 });
```

---

### 2.3 Validador Genérico
**Objetivo:** Practicar type guards

Crea funciones genéricas:
- `esNumero(valor: unknown): valor is number`
- `esString(valor: unknown): valor is string`
- `esArray(valor: unknown): valor is any[]`
- `esObjeto(valor: unknown): valor is object`

```typescript
function procesarDatos(datos: unknown[]): void {
  for (const dato of datos) {
    if (esNumero(dato)) {
      console.log(`Número: ${dato}`);
    } else if (esString(dato)) {
      console.log(`String: ${dato}`);
    } else if (esArray(dato)) {
      console.log(`Array con ${dato.length} elementos`);
    } else if (esObjeto(dato)) {
      console.log(`Objeto: ${JSON.stringify(dato)}`);
    }
  }
}
```

---

## Nivel 3: Avanzado (Utility Types)

### 3.1 Formulario Dinámico
**Objetivo:** Practicar utility types

Dada una interfaz `Usuario`:
```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  edad: number;
}
```

Crea tipos para:
- `DatosPublicos` (Pick): Solo nombre y email
- `DatosActualizables` (Omit): Sin id
- `FormularioRegistro` (Partial): Todo opcional

---

### 3.2 Configuración Tipada
**Objetivo:** Practicar mapped types y record

```typescript
interface ConfiguracionApp {
  puerto: number;
  ambiente: "dev" | "prod";
  debug: boolean;
  timeout: number;
}

// Crea tipos para:
// 1. Un Record de validadores
type Validadores<T> = {
  [K in keyof T]: (valor: T[K]) => boolean;
};

// 2. Un tipo para getters
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// 3. Un tipo para setters
type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (valor: T[K]) => void;
};

// Implementa una clase que combine los tres
class ConfiguracionBuilder implements Getters<ConfiguracionApp> & Setters<ConfiguracionApp> {
  // ... implementación
}
```

---

### 3.3 API REST Tipada
**Objetivo:** Practicar union types y utility types

```typescript
interface ResponseExito<T> {
  status: 200;
  data: T;
}

interface ResponseError {
  status: 400 | 401 | 404 | 500;
  error: string;
}

type ApiResponse<T> = ResponseExito<T> | ResponseError;

// Crea funciones tipadas para:
// 1. GET /usuarios
// 2. POST /usuarios
// 3. PUT /usuarios/:id
// 4. DELETE /usuarios/:id
```

---

## Nivel 4: Experto (Patrones Avanzados)

### 4.1 Sistema de Permisos
**Objetivo:** Practicar condicionales y mapped types

```typescript
// Define roles y sus permisos
type Rol = "admin" | "editor" | "viewer";
type Permiso = "crear" | "leer" | "editar" | "eliminar";

// Crea un tipo que mapee roles a permisos
type PermisosRol = Record<Rol, Permiso[]>;

// Crea un tipo que verifique si un rol tiene un permiso
type TienePermiso<R extends Rol, P extends Permiso> = 
  P extends PermisosRol[R][number] ? true : false;

// Crea una clase que valide permisos de forma tipada
class SistemaPermisos {
  verificar<R extends Rol, P extends Permiso>(
    rol: R,
    permiso: P
  ): TienePermiso<R, P> {
    // ...
  }
}
```

---

### 4.2 Builder Type-Safe
**Objetivo:** Practicar conditional types

Crea un constructor que solo permita completar los campos requeridos en orden:

```typescript
// Solución esperada: uso en cadena solo si faltan campos
const usuario = new ConstructorUsuario()
  .nombre("Juan")
  .email("juan@example.com")
  .construir(); // ✓

const incompleto = new ConstructorUsuario()
  .nombre("Juan")
  .construir(); // ✗ Error: falta email

// Hint: Usa conditional types para asegurar esto
```

---

### 4.3 Sistema de Eventos Tipado
**Objetivo:** Practicar template literals y mapped types

```typescript
type EventoMap = {
  "usuario:creado": { id: number; nombre: string };
  "usuario:actualizado": { id: number; cambios: Record<string, any> };
  "usuario:eliminado": { id: number };
  "pedido:enviado": { id: number; fecha: Date };
};

// Crea un Event Bus tipado
class EventBus {
  on<K extends keyof EventoMap>(
    evento: K,
    callback: (datos: EventoMap[K]) => void
  ): void;

  emit<K extends keyof EventoMap>(
    evento: K,
    datos: EventoMap[K]
  ): void;
}

// Uso esperado
const bus = new EventBus();
bus.on("usuario:creado", (datos) => {
  // TypeScript sabe que datos es { id: number; nombre: string }
  console.log(datos.id, datos.nombre);
});

bus.emit("usuario:creado", { id: 1, nombre: "Juan" });
// bus.emit("usuario:creado", { id: 1 }); // ✗ Error: falta nombre
```

---

## Desafío Final: Aplicación Completa

Crea una aplicación de gestión de tareas con:

1. **Modelo:** Interfaz `Tarea` con id, titulo, descripcion, estado, prioridad
2. **Enums:** Estados (TODO, IN_PROGRESS, DONE) y Prioridades (BAJA, MEDIA, ALTA)
3. **Clase:** `GestorTareas` con métodos para CRUD
4. **Genéricos:** `Almacen<T>` para almacenar tareas
5. **Utility Types:** Tipos para actualización parcial
6. **Patrones:** Observer para notificaciones de cambios
7. **Type Safety:** Validaciones tipadas y type guards

**Requisitos:**
- TypeScript en modo strict
- Sin usar `any`
- Tests unitarios (opcional)
- Código documentado

---

## Recursos para Practicar

- **TypeScript Playground:** https://www.typescriptlang.org/play
- **LeetCode TypeScript:** Problemas de algoritmos en TypeScript
- **Exercism:** Ejercicios de TypeScript
- **HackerRank:** Retos de programación

---

**Recuerda:** La mejor forma de aprender TypeScript es practicando constantemente. Empieza con los niveles básicos e incrementa la dificultad gradualmente.

¡Buena suerte! 💪
