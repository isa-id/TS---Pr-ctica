# ⚡ TypeScript - Cheat Sheet Rápido

## Interfaces

```typescript
// Básica
interface Usuario {
  id: number;
  nombre: string;
  email?: string;           // Opcional
  readonly activo: boolean; // Solo lectura
}

// Con métodos
interface Vehiculo {
  marca: string;
  acelerar(): void;
  frenar(intensidad: number): string;
}

// Herencia
interface Gerente extends Usuario {
  departamento: string;
}

// Múltiple herencia
interface Trabajador extends Usuario, Empleado {}
```

---

## Enums

```typescript
// String
enum Estado {
  Activo = "ACTIVO",
  Inactivo = "INACTIVO"
}

// Número
enum Rol {
  Admin = 1,
  Usuario = 2
}

// Const (mejor rendimiento)
const enum Color {
  Rojo = "ROJO",
  Verde = "VERDE"
}

// Uso
const estado: Estado = Estado.Activo;
```

---

## Union Types

```typescript
// Union básico
type Resultado = string | number | boolean;

// Union de tipos
type Opciones = Usuario | Producto;

// Literal union (enum moderno)
type Tamaño = "pequeño" | "mediano" | "grande";
```

---

## Type Guards

```typescript
// typeof
if (typeof valor === "string") { }

// instanceof
if (obj instanceof Clase) { }

// in
if ("propiedad" in objeto) { }

// Predicado personalizado
function esUsuario(obj: unknown): obj is Usuario {
  return (obj as Usuario).nombre !== undefined;
}

// Exhaustiveness checking
const _exhaustive: never = valor; // Error si falta case
```

---

## Clases

```typescript
class Persona {
  // Propiedades
  public nombre: string;      // Accesible desde cualquier lado
  private edad: number;       // Solo en la clase
  protected email: string;    // En la clase y subclases
  readonly id: number;        // No se puede cambiar

  // Constructor
  constructor(nombre: string, edad: number, id: number) {
    this.nombre = nombre;
    this.edad = edad;
    this.id = id;
  }

  // Getter
  get edadString(): string {
    return `${this.edad} años`;
  }

  // Setter
  set edadNueva(valor: number) {
    if (valor > 0) this.edad = valor;
  }

  // Método
  saludar(): void {
    console.log(`Hola, soy ${this.nombre}`);
  }

  // Método estático
  static contar = 0;
  static incrementar() {
    Persona.contar++;
  }
}

// Herencia
class Empleado extends Persona {
  constructor(nombre: string, edad: number, id: number, private departamento: string) {
    super(nombre, edad, id);
  }
}

// Clase abstracta
abstract class Animal {
  abstract hacer_sonido(): void;
  mover() { console.log("Moviéndose"); }
}
```

---

## Genéricos

```typescript
// Función
function devolverPrimero<T>(array: T[]): T {
  return array[0];
}

// Interfaz
interface Caja<T> {
  contenido: T;
}

// Clase
class Almacen<T> {
  private items: T[] = [];
  agregar(item: T) { this.items.push(item); }
}

// Constraints
function obtenerPropiedad<T, K extends keyof T>(obj: T, clave: K): T[K] {
  return obj[clave];
}

// Valores por defecto
interface Respuesta<T = string> { }
```

---

## Utility Types

```typescript
// Partial - todo opcional
type Parcial = Partial<Usuario>;

// Required - todo obligatorio
type Completo = Required<Usuario>;

// Readonly - todo solo lectura
type Inmutable = Readonly<Usuario>;

// Pick - selecciona propiedades
type Mini = Pick<Usuario, "id" | "nombre">;

// Omit - excluye propiedades
type Basico = Omit<Usuario, "email">;

// Record - mapea claves a valores
type Permisos = Record<"leer" | "escribir", boolean>;

// Exclude - excluye del union
type NoString = Exclude<string | number, string>; // number

// Extract - extrae del union
type SoloString = Extract<string | number, string>; // string

// ReturnType - tipo de retorno
type ReturnUsuario = ReturnType<() => Usuario>;

// Awaited - tipo de Promise
type Contenido = Awaited<Promise<string>>; // string
```

---

## Mapped Types

```typescript
// Hacer todas las propiedades opcionales
type Parcial<T> = {
  [K in keyof T]?: T[K];
};

// Hacer todas readonly
type SoloLectura<T> = {
  readonly [K in keyof T]: T[K];
};

// Crear getters
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// Crear un tipo de validadores
type Validadores<T> = {
  [K in keyof T]: (value: T[K]) => boolean;
};
```

---

## Conditional Types

```typescript
// Básico
type EsString<T> = T extends string ? "sí" : "no";

// Con infer
type RetornoFunc<T> = T extends (...args: any[]) => infer R ? R : never;

// Distribución
type Flatten<T> = T extends Array<infer U> ? U : T;
type A = Flatten<number[]>;      // number
type B = Flatten<string | number[]>; // string | number

// Recursivo
type Deep<T> = T extends object
  ? { [K in keyof T]: Deep<T[K]> }
  : T;
```

---

## Template Literal Types

```typescript
// Básico
type Evento = "click" | "hover";
type EventoHandler = `on${Capitalize<Evento>}`;
// "onClick" | "onHover"

// Extraer partes
type ExtractRuta<T extends string> = T extends `${infer P}/:id` ? P : never;
type Ruta = ExtractRuta<"/usuarios/:id">; // "/usuarios"

// Validación
type Email<T extends string> = T extends `${string}@${string}` ? T : never;
```

---

## Decoradores

```typescript
// Require en tsconfig.json: "experimentalDecorators": true

// Clase
function Sellado<T extends { new (...args: any[]): {} }>(constructor: T) {
  Object.seal(constructor.prototype);
}

@Sellado
class MiClase {}

// Propiedad
function Validar(min: number, max: number) {
  return function (target: any, propertyKey: string) {
    // ...
  };
}

// Método
function Medir(target: any, key: string, desc: PropertyDescriptor) {
  const original = desc.value;
  desc.value = function (...args: any[]) {
    console.time(key);
    const resultado = original.apply(this, args);
    console.timeEnd(key);
    return resultado;
  };
}
```

---

## Patrones Comunes

### Singleton
```typescript
class BaseDatos {
  static instancia = new BaseDatos();
  private constructor() {}
  static obtener() { return BaseDatos.instancia; }
}
```

### Builder
```typescript
class Constructor<T> {
  private datos: Partial<T> = {};
  set<K extends keyof T>(clave: K, valor: T[K]): this {
    this.datos[clave] = valor;
    return this;
  }
  construir(): T { return this.datos as T; }
}
```

### Factory
```typescript
class Fabrica {
  static crear(tipo: "A" | "B") {
    if (tipo === "A") return new A();
    return new B();
  }
}
```

### Observer
```typescript
class Sujeto {
  private observadores: ((datos: any) => void)[] = [];
  suscribir(fn: (datos: any) => void) { this.observadores.push(fn); }
  notificar(datos: any) { this.observadores.forEach(fn => fn(datos)); }
}
```

---

## Keywords Importantes

| Palabra | Uso |
|---------|-----|
| `interface` | Define contratos |
| `type` | Define aliases de tipo |
| `enum` | Valores constantes nombrados |
| `class` | Clases con POO |
| `extends` | Herencia / constraints |
| `implements` | Implementar interfaz |
| `generic` | `<T>` para tipos genéricos |
| `keyof` | Obtener claves de tipo |
| `typeof` | Obtener tipo en runtime |
| `as` | Type casting |
| `is` | Type predicate |
| `infer` | Inferir tipo en condicional |
| `readonly` | Solo lectura |
| `public` | Acceso público |
| `private` | Acceso privado |
| `protected` | Acceso en subclases |
| `abstract` | Clase/método abstracto |
| `static` | Pertenece a la clase |
| `async/await` | Operaciones asincrónicas |
| `Promise<T>` | Promesa tipada |
| `unknown` | Tipo desconocido (seguro) |
| `never` | Nunca ocurre |
| `any` | ⚠️ EVITA USAR |

---

## Configuración tsconfig.json Mínima

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

## Errores Comunes y Soluciones

```typescript
// ❌ Evita any
let x: any = 5;

// ✅ Usa tipos específicos
let x: number = 5;

// ❌ No usessuperfluo casting
const x = y as any as string;

// ✅ Sé explícito
const x = y as string;

// ❌ Type guard incierto
if (obj.propiedad) { } // ¿Existe?

// ✅ Type guard seguro
if ("propiedad" in obj) { }

// ❌ Union sin narrowing
function fn(x: string | number) {
  return x.toUpperCase(); // Error
}

// ✅ Con type guard
function fn(x: string | number) {
  if (typeof x === "string") return x.toUpperCase();
}
```

---

## Compilar y Ejecutar

```bash
# Compilar a JavaScript
tsc archivo.ts

# Compilar en modo watch
tsc --watch

# Compilar con tsconfig.json
tsc

# Ejecutar directamente (con ts-node)
npx ts-node archivo.ts
```

---

**¡Imprime o marca este archivo para referencia rápida!** 📋
