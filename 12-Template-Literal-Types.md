# Nivel 4.3: Template Literal Types

## ¿Qué son Template Literal Types?

Son tipos que usan strings de plantilla para crear tipos basados en otros tipos. Combina el poder de los string literales con la interpolación.

---

## Básico

```typescript
// Un simple type literal
type Evento = "click" | "hover" | "focus";

// Con template literal, puedes generar variantes
type EventoOn = `on${Capitalize<Evento>}`;
// Resultado: "onClick" | "onHover" | "onFocus"

// Más potente
type Operacion = "add" | "remove" | "update";
type CrudAPI<T extends string> = `${Lowercase<T>}-${Operacion}`;

type UsuarioAPI = CrudAPI<"Usuario">;
// "usuario-add" | "usuario-remove" | "usuario-update"
```

---

## Modificadores de String

```typescript
// Capitalize: Primera letra mayúscula
type Capitalize<S extends string> = S extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : S;

type A = Capitalize<"hola">;  // "Hola"

// Uppercase: Todo mayúscula
type B = Uppercase<"hola">;   // "HOLA"

// Lowercase: Todo minúscula
type C = Lowercase<"HOLA">;   // "hola"

// Uncapitalize: Primera letra minúscula
type D = Uncapitalize<"Hola">;  // "hola"
```

---

## Generando Tipos de Eventos

```typescript
type Evento = "click" | "scroll" | "resize" | "load";

type EventoHandler<T extends string> = `on${Capitalize<T>}`;

type EventoHandlers = {
  [K in Evento as EventoHandler<K>]: (e: Event) => void;
};

// Resultado:
// {
//   onClick: (e: Event) => void;
//   onScroll: (e: Event) => void;
//   onResize: (e: Event) => void;
//   onLoad: (e: Event) => void;
// }

const handlers: EventoHandlers = {
  onClick: (e) => console.log("Click"),
  onScroll: (e) => console.log("Scroll"),
  onResize: (e) => console.log("Resize"),
  onLoad: (e) => console.log("Load")
};
```

---

## Extrayendo de Template Literals

```typescript
// Extrae partes de un string
type ExtractPath<T extends string> = T extends `${infer Path}/:id`
  ? Path
  : never;

type A = ExtractPath<"/usuarios/:id">;  // "/usuarios"
type B = ExtractPath<"/posts/:id">;     // "/posts"

// Con más partes
type ExtractMethod<T extends string> = T extends `${infer M} ${infer Rest}`
  ? M
  : never;

type C = ExtractMethod<"GET /usuarios">;      // "GET"
type D = ExtractMethod<"POST /productos">;    // "POST"
```

---

## Validación de Rutas

```typescript
type Ruta = 
  | "/usuarios"
  | "/usuarios/:id"
  | "/usuarios/:id/posts"
  | "/posts"
  | "/posts/:id";

// Extrae parámetros de una ruta
type ExtraerParams<T extends string> = T extends `${infer _}/:id${infer Rest}`
  ? ["id", ...ExtraerParams<Rest>]
  : [];

type ParamUsuarios = ExtraerParams<"/usuarios/:id/posts">;
// ["id", "id"]

// Validar que solo rutas válidas se puedan usar
function navegar(ruta: Ruta) {
  console.log(`Navegando a ${ruta}`);
}

navegar("/usuarios/:id");       // ✓
// navegar("/invalido");        // ✗ Error
```

---

## Generador de Getters y Setters

```typescript
type Property = "nombre" | "edad" | "email";

type Getter<T extends string> = `get${Capitalize<T>}`;
type Setter<T extends string> = `set${Capitalize<T>}`;

type Accessores<T extends string> = {
  [K in T as Getter<K>]: () => any;
} & {
  [K in T as Setter<K>]: (value: any) => void;
};

type MisAccessores = Accessores<Property>;
// {
//   getNombre: () => any;
//   setNombre: (value: any) => void;
//   getEdad: () => any;
//   setEdad: (value: any) => void;
//   getEmail: () => any;
//   setEmail: (value: any) => void;
// }
```

---

## URLs y APIs

```typescript
type Dominio = "api.example.com" | "cdn.example.com" | "auth.example.com";
type Protocolo = "http" | "https";
type Puerto = 80 | 443 | 3000;

type URL<D extends string, P extends string, Pt extends number> = 
  `${P}://${D}:${Pt}`;

type DevURL = URL<"api.example.com", "https", 443>;
// "https://api.example.com:443"

type ApiEndpoint<T extends string> = `https://api.example.com${T}`;

type UsuariosEndpoint = ApiEndpoint<"/usuarios">;       // "https://api.example.com/usuarios"
type ProductosEndpoint = ApiEndpoint<"/productos/:id">; // "https://api.example.com/productos/:id"
```

---

## Validador de Formato

```typescript
// Valida que un string tenga un formato específico
type Email<T extends string> = T extends `${string}@${string}.${string}`
  ? T
  : "Formato de email inválido";

type A = Email<"usuario@example.com">;  // "usuario@example.com"
type B = Email<"invalido">;             // "Formato de email inválido"

// Validar números de teléfono
type PhoneNumber<T extends string> = T extends `${number}-${number}-${number}`
  ? T
  : "Formato de teléfono inválido";

type C = PhoneNumber<"123-456-7890">;   // "123-456-7890"
type D = PhoneNumber<"1234567890">;     // "Formato de teléfono inválido"
```

---

## Caso Práctico: Sistema de Rutas Tipadas

```typescript
type Route = 
  | "/"
  | "/usuarios"
  | "/usuarios/:id"
  | "/usuarios/:id/posts"
  | "/posts"
  | "/posts/:id";

// Extrae los parámetros de una ruta
type RouteParams<R extends Route> = 
  R extends `${infer _}/:id${infer _}` ? { id: string } : Record<string, never>;

type UsuariosConIdParams = RouteParams<"/usuarios/:id">;  // { id: string }
type UsuariosParams = RouteParams<"/usuarios">;           // {}

// Función que valida la ruta y parámetros
function navigate<R extends Route>(ruta: R, params?: RouteParams<R>): void {
  console.log(`Navegando a ${ruta}`, params);
}

navigate("/usuarios/:id", { id: "123" });    // ✓
navigate("/usuarios");                       // ✓
navigate("/usuarios", { id: "123" });       // ✗ Parámetros no esperados
```

---

## 💡 Ejercicios Prácticos

### Ejercicio 1: Capitalizar
Crea `CapitalizeAll<T>` que capitalice todas las palabras en una unión de strings

### Ejercicio 2: Prefijo
Crea `WithPrefix<T, P>` que agregue un prefijo a todos los strings en una unión

### Ejercicio 3: Rutas
Crea un tipo que valide y extraiga parámetros de rutas REST

### Ejercicio 4: Validador Email
Crea un tipo que valide que un string tenga formato de email

### Ejercicio 5: API Tipada
Crea un sistema de URLs tipadas para diferentes endpoints

---

## 📌 Puntos Clave

✓ Template literal types crean tipos dinámicamente  
✓ Capitalize, Uppercase, Lowercase modifican strings  
✓ `infer` extrae partes de template literals  
✓ Útiles para validación y generación de tipos  
✓ Combinan con mapped types para poder total  

---

**Anterior:** [11-Conditional-Types.md](11-Conditional-Types.md)

---

## 🎉 ¡Felicidades!

Has completado la guía completa de TypeScript desde Interfaces y Enums hasta Template Literal Types. Ahora tienes un entendimiento sólido de:

**Nivel 1 (Fundamentos):**
- Interfaces y sus características
- Enums y casos de uso
- Union types y type guards

**Nivel 2 (Intermedio):**
- Clases, herencia y modificadores de acceso
- Genéricos y constraints
- Type guards avanzados

**Nivel 3 (Avanzado):**
- Utility types para manipulación de tipos
- Decoradores y metaprogramación
- Inferencia de tipos avanzada

**Nivel 4 (Experto):**
- Patrones de diseño en TypeScript
- Conditional types y lógica de tipos
- Template literal types para máxima flexibilidad

¡Sigue practicando y construyendo proyectos para dominar completamente TypeScript!
