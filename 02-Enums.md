# Nivel 1.2: Enums (Tipos Enumerados)

## ¿Qué es un Enum?

Un enum es un tipo que permite definir un conjunto de constantes con nombres significativos. Es útil cuando una variable puede tener solo un número limitado de valores.

### Enum Numérico

Por defecto, los enums son numéricos comenzando desde 0:

```typescript
enum Direccion {
  Arriba,      // 0
  Abajo,       // 1
  Izquierda,   // 2
  Derecha      // 3
}

let movimiento: Direccion = Direccion.Arriba;
console.log(movimiento);  // 0
```

### Enum con Valores Personalizados

```typescript
enum Rol {
  Admin = 1,
  Usuario = 2,
  Invitado = 3
}

const miRol: Rol = Rol.Admin;
console.log(miRol);  // 1
```

### Enum de Strings

Son más legibles y mejores para debugging:

```typescript
enum Estado {
  Activo = "ACTIVO",
  Inactivo = "INACTIVO",
  Suspendido = "SUSPENDIDO"
}

let miEstado: Estado = Estado.Activo;
console.log(miEstado);  // "ACTIVO"
```

## Enum Heterogéneo

Puedes mezclar strings y números (no es recomendado):

```typescript
enum Respuesta {
  No = 0,
  Si = "SI",
  Tal_vez = 2
}
```

## Enums Calculados

Algunos valores pueden ser calculados:

```typescript
enum Calculo {
  X = 1,
  Y = X * 2,  // 2
  Z = Y + 1   // 3
}
```

## Enum Const

Los enums const se compilan de manera más eficiente:

```typescript
const enum Colores {
  Rojo = "ROJO",
  Verde = "VERDE",
  Azul = "AZUL"
}

// Se reemplaza directamente con el valor en el código compilado
let color: Colores = Colores.Rojo;
```

## Acceso Inverso (Reverse Mapping)

En enums numéricos puedes acceder al nombre usando el número:

```typescript
enum Numeros {
  Cero = 0,
  Uno = 1,
  Dos = 2
}

let numero: number = 1;
let nombre: string = Numeros[numero];
console.log(nombre);  // "Uno"
```

---

## Caso Práctico: Sistema de Estados

```typescript
enum EstadoPedido {
  Pendiente = "PENDIENTE",
  Confirmado = "CONFIRMADO",
  EnProceso = "EN_PROCESO",
  Enviado = "ENVIADO",
  Entregado = "ENTREGADO",
  Cancelado = "CANCELADO"
}

interface Pedido {
  id: number;
  producto: string;
  estado: EstadoPedido;
  cambiarEstado(nuevoEstado: EstadoPedido): void;
}

const miPedido: Pedido = {
  id: 1,
  producto: "Laptop",
  estado: EstadoPedido.Pendiente,
  cambiarEstado(nuevoEstado: EstadoPedido) {
    console.log(`Cambiando de ${this.estado} a ${nuevoEstado}`);
    this.estado = nuevoEstado;
  }
};

miPedido.cambiarEstado(EstadoPedido.Confirmado);
// Cambiando de PENDIENTE a CONFIRMADO
```

---

## Comparación: Enum vs Type con Union

### Usando Enum
```typescript
enum Tamaño {
  Pequeño = "S",
  Mediano = "M",
  Grande = "L",
  ExtraGrande = "XL"
}

function obtenerPrecio(tamaño: Tamaño): number {
  switch(tamaño) {
    case Tamaño.Pequeño: return 10;
    case Tamaño.Mediano: return 15;
    case Tamaño.Grande: return 20;
    case Tamaño.ExtraGrande: return 25;
  }
}
```

### Usando Type Union
```typescript
type Tamaño = "S" | "M" | "L" | "XL";

function obtenerPrecio(tamaño: Tamaño): number {
  switch(tamaño) {
    case "S": return 10;
    case "M": return 15;
    case "L": return 20;
    case "XL": return 25;
  }
}
```

> **Tip:** Usa Enums cuando necesites un conjunto discreto y bien definido. Usa Type Unions para casos más simples.

---

## 💡 Ejercicios Prácticos

### Ejercicio 1: Enum de Días
Crea un enum llamado `DiaSemana` con los días de la semana como strings.

### Ejercicio 2: Sistema de Permisos
Crea un enum `Permiso` con valores: Leer, Escribir, Eliminar, Ejecutar

### Ejercicio 3: Aplicación completa
Combina una interfaz `Usuario` con un enum `Rol`:
- El usuario debe tener un `rol` del tipo `Rol`
- Crea un array de usuarios con diferentes roles

### Ejercicio 4: Estados de un Videojuego
Crea un enum `EstadoJuego` con estados: Menu, Cargando, Jugando, Pausado, GameOver

---

## 📌 Puntos Clave

✓ Los enums crean un conjunto de constantes nombradas  
✓ Pueden ser numéricos o de strings  
✓ Los strings son más legibles que los números  
✓ Usa `const enum` para mejor rendimiento  
✓ Los enums numéricos permiten reverse mapping  
✓ Perfecto para valores limitados y bien definidos  

---

**Anterior:** [01-Interfaces-Basicas.md](01-Interfaces-Basicas.md)  
**Siguiente:** [03-Union-Types.md](03-Union-Types.md)
