# Nivel 4.1: Patrones Avanzados

## Patrón Singleton

Asegura que una clase tenga solo una instancia:

```typescript
class BaseDatos {
  private static instancia: BaseDatos;
  private conectado: boolean = false;

  private constructor() {}  // Constructor privado

  static obtenerInstancia(): BaseDatos {
    if (!BaseDatos.instancia) {
      BaseDatos.instancia = new BaseDatos();
    }
    return BaseDatos.instancia;
  }

  conectar(): void {
    this.conectado = true;
    console.log("Conectado a la base de datos");
  }
}

const db1 = BaseDatos.obtenerInstancia();
const db2 = BaseDatos.obtenerInstancia();

console.log(db1 === db2);  // true (misma instancia)
```

---

## Patrón Builder

Construye objetos complejos paso a paso:

```typescript
interface Opciones {
  titulo: string;
  contenido: string;
  autor?: string;
  fecha?: Date;
  etiquetas?: string[];
}

class ConstructorArticulo {
  private opciones: Opciones = {
    titulo: "",
    contenido: ""
  };

  titulo(valor: string): this {
    this.opciones.titulo = valor;
    return this;
  }

  contenido(valor: string): this {
    this.opciones.contenido = valor;
    return this;
  }

  autor(valor: string): this {
    this.opciones.autor = valor;
    return this;
  }

  fecha(valor: Date): this {
    this.opciones.fecha = valor;
    return this;
  }

  etiquetas(...valores: string[]): this {
    this.opciones.etiquetas = valores;
    return this;
  }

  construir(): Opciones {
    if (!this.opciones.titulo || !this.opciones.contenido) {
      throw new Error("Título y contenido son obligatorios");
    }
    return this.opciones;
  }
}

const articulo = new ConstructorArticulo()
  .titulo("Mi Primer Artículo")
  .contenido("Este es el contenido del artículo")
  .autor("Juan")
  .etiquetas("typescript", "patrones", "design")
  .construir();

console.log(articulo);
```

---

## Patrón Factory

Crea objetos sin especificar exactamente qué clase usar:

```typescript
interface Animal {
  hacer_sonido(): void;
}

class Perro implements Animal {
  hacer_sonido(): void {
    console.log("¡Guau!");
  }
}

class Gato implements Animal {
  hacer_sonido(): void {
    console.log("¡Miau!");
  }
}

class Pajaro implements Animal {
  hacer_sonido(): void {
    console.log("¡Pío!");
  }
}

class FabricaAnimales {
  static crear(tipo: "perro" | "gato" | "pajaro"): Animal {
    switch(tipo) {
      case "perro":
        return new Perro();
      case "gato":
        return new Gato();
      case "pajaro":
        return new Pajaro();
    }
  }
}

const miAnimal = FabricaAnimales.crear("perro");
miAnimal.hacer_sonido();  // ¡Guau!
```

---

## Patrón Observer

Permite que múltiples objetos se suscriban a cambios:

```typescript
interface Observador {
  actualizar(datos: any): void;
}

class Sujeto {
  private observadores: Observador[] = [];

  suscribir(observador: Observador): void {
    this.observadores.push(observador);
  }

  desuscribir(observador: Observador): void {
    const indice = this.observadores.indexOf(observador);
    if (indice > -1) {
      this.observadores.splice(indice, 1);
    }
  }

  notificar(datos: any): void {
    this.observadores.forEach(obs => obs.actualizar(datos));
  }
}

class TiendaOnline extends Sujeto {
  private precio: number = 100;

  cambiarPrecio(nuevoPrecio: number): void {
    this.precio = nuevoPrecio;
    this.notificar({ precio: this.precio });
  }
}

class NotificadorEmail implements Observador {
  actualizar(datos: any): void {
    console.log(`Email: El precio ahora es $${datos.precio}`);
  }
}

class NotificadorSMS implements Observador {
  actualizar(datos: any): void {
    console.log(`SMS: Nuevo precio: $${datos.precio}`);
  }
}

const tienda = new TiendaOnline();
tienda.suscribir(new NotificadorEmail());
tienda.suscribir(new NotificadorSMS());

tienda.cambiarPrecio(80);
// Email: El precio ahora es $80
// SMS: Nuevo precio: $80
```

---

## Patrón Strategy

Encapsula algoritmos intercambiables:

```typescript
interface EstrategiaOrdenamiento {
  ordenar(datos: number[]): number[];
}

class OrdenamientoBurbuja implements EstrategiaOrdenamiento {
  ordenar(datos: number[]): number[] {
    const copia = [...datos];
    for (let i = 0; i < copia.length; i++) {
      for (let j = 0; j < copia.length - 1; j++) {
        if (copia[j] > copia[j + 1]) {
          [copia[j], copia[j + 1]] = [copia[j + 1], copia[j]];
        }
      }
    }
    return copia;
  }
}

class OrdenamientoRapido implements EstrategiaOrdenamiento {
  ordenar(datos: number[]): number[] {
    if (datos.length <= 1) return datos;
    
    const pivote = datos[0];
    const menores = datos.slice(1).filter(x => x < pivote);
    const mayores = datos.slice(1).filter(x => x >= pivote);
    
    return [...this.ordenar(menores), pivote, ...this.ordenar(mayores)];
  }
}

class Procesador {
  constructor(private estrategia: EstrategiaOrdenamiento) {}

  procesar(datos: number[]): number[] {
    return this.estrategia.ordenar(datos);
  }

  cambiarEstrategia(estrategia: EstrategiaOrdenamiento): void {
    this.estrategia = estrategia;
  }
}

const datos = [5, 2, 8, 1, 9];

const procesador = new Procesador(new OrdenamientoBurbuja());
console.log(procesador.procesar(datos));  // [1, 2, 5, 8, 9]

procesador.cambiarEstrategia(new OrdenamientoRapido());
console.log(procesador.procesar(datos));  // [1, 2, 5, 8, 9]
```

---

## Patrón Decorator

Agrega funcionalidad a objetos dinámicamente:

```typescript
interface Componente {
  obtenerCosto(): number;
  obtenerDescripcion(): string;
}

class Bebida implements Componente {
  obtenerCosto(): number {
    return 5;
  }

  obtenerDescripcion(): string {
    return "Bebida";
  }
}

abstract class DecoradorBebida implements Componente {
  constructor(protected componente: Componente) {}

  abstract obtenerCosto(): number;
  abstract obtenerDescripcion(): string;
}

class Espresso extends DecoradorBebida {
  obtenerCosto(): number {
    return this.componente.obtenerCosto() + 2;
  }

  obtenerDescripcion(): string {
    return `${this.componente.obtenerDescripcion()} + Espresso`;
  }
}

class Leche extends DecoradorBebida {
  obtenerCosto(): number {
    return this.componente.obtenerCosto() + 1.5;
  }

  obtenerDescripcion(): string {
    return `${this.componente.obtenerDescripcion()} + Leche`;
  }
}

let bebida: Componente = new Bebida();
console.log(`${bebida.obtenerDescripcion()}: $${bebida.obtenerCosto()}`);  // Bebida: $5

bebida = new Espresso(bebida);
console.log(`${bebida.obtenerDescripcion()}: $${bebida.obtenerCosto()}`);  // Bebida + Espresso: $7

bebida = new Leche(bebida);
console.log(`${bebida.obtenerDescripcion()}: $${bebida.obtenerCosto()}`);  // Bebida + Espresso + Leche: $8.5
```

---

## 💡 Ejercicios Prácticos

### Ejercicio 1: Singleton
Crea una clase Logger como Singleton

### Ejercicio 2: Builder
Crea un constructor para un objeto Persona complejo

### Ejercicio 3: Factory
Crea una fábrica que genere diferentes tipos de vehículos

### Ejercicio 4: Observer
Implementa un sistema de notificaciones con múltiples observadores

### Ejercicio 5: Strategy + Decorator
Combina múltiples patrones en una aplicación

---

## 📌 Puntos Clave

✓ Singleton asegura una sola instancia  
✓ Builder construye objetos complejos paso a paso  
✓ Factory crea objetos sin especificar la clase  
✓ Observer permite suscribirse a cambios  
✓ Strategy encapsula algoritmos  
✓ Decorator agrega funcionalidad dinámicamente  

---

**Anterior:** [09-Type-Inference.md](09-Type-Inference.md)  
**Siguiente:** [11-Conditional-Types.md](11-Conditional-Types.md)
