# Nivel 3.1: Utility Types (Tipos Utilidad)

## ¿Qué son los Utility Types?

Son tipos predefinidos que transforman otros tipos. Son herramientas para manipular tipos existentes.

---

## Partial<T>

Hace todas las propiedades opcionales:

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

// Sin Partial, necesitarías propiedades opcionales
type UsuarioOpcional = {
  id?: number;
  nombre?: string;
  email?: string;
};

// Con Partial
type UsuarioParcial = Partial<Usuario>;
// Equivalente a lo anterior

function actualizar(usuario: Partial<Usuario>) {
  // Perfecto para actualizaciones parciales
  return { id: 1, ...usuario };
}

actualizar({ nombre: "Juan" });              // ✓
actualizar({ email: "nuevo@example.com" });  // ✓
actualizar({});                              // ✓
```

---

## Required<T>

Lo opuesto: hace todas las propiedades obligatorias:

```typescript
interface Producto {
  id: number;
  nombre?: string;
  descripcion?: string;
}

type ProductoCompleto = Required<Producto>;
// Ahora nombre y descripcion son obligatorios

const producto: ProductoCompleto = {
  id: 1,
  nombre: "Laptop",
  descripcion: "Una excelente laptop"  // ✓ Obligatorio
};
```

---

## Readonly<T>

Convierte todas las propiedades en solo lectura:

```typescript
interface Configuracion {
  apiUrl: string;
  puerto: number;
  debug: boolean;
}

type ConfiguracionSegura = Readonly<Configuracion>;

const config: ConfiguracionSegura = {
  apiUrl: "https://api.example.com",
  puerto: 3000,
  debug: false
};

// config.debug = true;  // ✗ Error: No puedes cambiar
```

---

## Record<K, T>

Crea un objeto con keys específicas:

```typescript
type Rol = "admin" | "usuario" | "invitado";

// Un objeto con keys admin, usuario, invitado - cada uno es un número
type Permisos = Record<Rol, number>;

const permisos: Permisos = {
  admin: 7,      // 111 en binario (todas las acciones)
  usuario: 5,    // 101 (leer y ejecutar)
  invitado: 1    // 001 (solo leer)
};

// Otra forma: Record con objetos
type Colores = "rojo" | "verde" | "azul";

type PaletaColores = Record<Colores, string>;

const paleta: PaletaColores = {
  rojo: "#FF0000",
  verde: "#00FF00",
  azul: "#0000FF"
};
```

---

## Pick<T, K>

Selecciona solo algunas propiedades:

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  contraseña: string;
  telefono?: string;
}

// Crea un tipo con solo nombre y email
type DatosPublicos = Pick<Usuario, "nombre" | "email">;

const perfil: DatosPublicos = {
  nombre: "Juan",
  email: "juan@example.com"
  // id, contraseña, telefono no se pueden incluir
};
```

---

## Omit<T, K>

Lo opuesto de Pick: excluye algunas propiedades:

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  contraseña: string;
}

// Crea un tipo sin la contraseña
type UsuarioSinContraseña = Omit<Usuario, "contraseña">;

const usuario: UsuarioSinContraseña = {
  id: 1,
  nombre: "Juan",
  email: "juan@example.com"
  // contraseña NO se puede incluir
};

// Omitir múltiples
type UsuarioPublico = Omit<Usuario, "contraseña" | "id">;
```

---

## Exclude<T, U>

Excluye tipos de una unión:

```typescript
type Estado = "pendiente" | "completado" | "error" | "cancelado";

// Estados activos (excluye completado y cancelado)
type EstadoActivo = Exclude<Estado, "completado" | "cancelado">;
// EstadoActivo = "pendiente" | "error"

function procesarActivos(estado: EstadoActivo) {
  // Solo puede recibir "pendiente" o "error"
}

procesarActivos("pendiente");    // ✓
// procesarActivos("completado"); // ✗ Error
```

---

## Extract<T, U>

Lo opuesto: extrae solo los tipos que coinciden:

```typescript
type TiposMixtos = string | number | boolean | (() => void);

// Solo los primitivos
type Primitivos = Extract<TiposMixtos, string | number | boolean>;
// Primitivos = string | number | boolean

// Solo las funciones
type Funciones = Extract<TiposMixtos, Function>;
// Funciones = () => void
```

---

## Awaited<T>

Extrae el tipo de una Promesa:

```typescript
type MiPromesa = Promise<string>;

type Contenido = Awaited<MiPromesa>;  // string

// Con tipos complejos
interface Usuario {
  nombre: string;
}

type PromesaUsuario = Promise<Usuario>;
type Usuario2 = Awaited<PromesaUsuario>;  // Usuario

async function obtener() {
  const resultado: Awaited<Promise<number>> = 42;  // number
}
```

---

## ReturnType<T>

Extrae el tipo de retorno de una función:

```typescript
function sumar(a: number, b: number): number {
  return a + b;
}

type ResultadoSuma = ReturnType<typeof sumar>;  // number

function obtenerUsuario(): { id: number; nombre: string } {
  return { id: 1, nombre: "Juan" };
}

type Usuario3 = ReturnType<typeof obtenerUsuario>;
// Usuario3 = { id: number; nombre: string }
```

---

## Caso Práctico: API Robusta

```typescript
interface APIResponse {
  status: number;
  data: unknown;
  timestamp: Date;
  error?: string;
}

// Respuestas públicas (sin timestamp)
type PublicResponse = Omit<APIResponse, "timestamp">;

// Respuestas exitosas (solo status y data)
type SuccessResponse = Pick<APIResponse, "status" | "data">;

// Posibles estados
type StatusCode = 200 | 201 | 400 | 401 | 404 | 500;

// Códigos de error
type ErrorCodes = Exclude<StatusCode, 200 | 201>;

// Datos parciales para actualización
type UpdateRequest = Partial<{
  nombre: string;
  email: string;
  edad: number;
}>;

function procesarActualización(datos: UpdateRequest) {
  // Solo actualiza los campos proporcionados
  return datos;
}
```

---

## 💡 Ejercicios Prácticos

### Ejercicio 1: Partial
Crea una función `actualizarProducto` que acepte un tipo Partial del producto

### Ejercicio 2: Pick y Omit
Crea tipos para formularios que usen Pick/Omit de una interfaz Usuario

### Ejercicio 3: Record
Crea un Record para mapear días de la semana a horarios de trabajo

### Ejercicio 4: Combinación
Usa varios utility types para crear un sistema de permisos robusto

---

## 📌 Puntos Clave

✓ Partial<T> hace propiedades opcionales  
✓ Required<T> hace propiedades obligatorias  
✓ Readonly<T> previene mutaciones  
✓ Record<K, T> crea objetos con claves específicas  
✓ Pick<T, K> selecciona propiedades  
✓ Omit<T, K> excluye propiedades  
✓ Exclude<T, U> excluye tipos de uniones  
✓ Extract<T, U> extrae tipos coincidentes  

---

**Anterior:** [06-Type-Guards.md](06-Type-Guards.md)  
**Siguiente:** [08-Decorators.md](08-Decorators.md)
