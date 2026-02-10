# Nivel 2.1: Clases y Herencia

## Estructura Básica de una Clase

```typescript
class Persona {
  nombre: string;
  edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar(): void {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
  }
}

const persona = new Persona("Juan", 25);
persona.saludar();  // Hola, soy Juan y tengo 25 años
```

## Modificadores de Acceso

TypeScript soporta tres niveles de acceso:

### public (por defecto)
```typescript
class Coche {
  public marca: string;  // Accesible desde cualquier lado

  constructor(marca: string) {
    this.marca = marca;
  }
}

const coche = new Coche("Toyota");
console.log(coche.marca);  // ✓ Funciona
```

### private
```typescript
class CuentaBancaria {
  private saldo: number;  // Solo accesible dentro de la clase

  constructor(saldoInicial: number) {
    this.saldo = saldoInicial;
  }

  depositar(cantidad: number): void {
    this.saldo += cantidad;
  }

  obtenerSaldo(): number {
    return this.saldo;
  }
}

const cuenta = new CuentaBancaria(1000);
console.log(cuenta.obtenerSaldo());  // ✓ 1000
// console.log(cuenta.saldo);        // ✗ Error: saldo es privado
```

### protected
```typescript
class Animal {
  protected nombre: string;  // Accesible en la clase y subclases

  constructor(nombre: string) {
    this.nombre = nombre;
  }
}

class Perro extends Animal {
  ladrar(): void {
    // ✓ Puedo acceder a nombre porque es protected
    console.log(`${this.nombre} está ladrando`);
  }
}

const perro = new Perro("Max");
perro.ladrar();  // Max está ladrando
// console.log(perro.nombre);  // ✗ Error: No puedo acceder desde afuera
```

---

## Getters y Setters

Permiten control al acceder/modificar propiedades:

```typescript
class Usuario {
  private _edad: number;

  constructor(edad: number) {
    this._edad = edad;
  }

  // Getter: accede como propiedad
  get edad(): number {
    return this._edad;
  }

  // Setter: asigna como propiedad
  set edad(valor: number) {
    if (valor < 0) {
      console.log("La edad no puede ser negativa");
      return;
    }
    this._edad = valor;
  }
}

const usuario = new Usuario(25);
console.log(usuario.edad);  // 25 (usando getter)
usuario.edad = 30;          // (usando setter)
usuario.edad = -5;          // "La edad no puede ser negativa"
```

---

## Propiedades Estáticas

Pertenecen a la clase, no a las instancias:

```typescript
class Contador {
  static cantidad: number = 0;

  constructor() {
    Contador.cantidad++;
  }

  static obtenerCantidad(): number {
    return Contador.cantidad;
  }
}

const c1 = new Contador();
const c2 = new Contador();
const c3 = new Contador();

console.log(Contador.obtenerCantidad());  // 3
```

---

## Herencia

Una clase puede extender otra:

```typescript
class Animal {
  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  moverse(): void {
    console.log(`${this.nombre} se está moviendo`);
  }
}

class Perro extends Animal {
  raza: string;

  constructor(nombre: string, raza: string) {
    super(nombre);  // Llama al constructor de Animal
    this.raza = raza;
  }

  ladrar(): void {
    console.log(`${this.nombre} ladra: ¡Guau!`);
  }

  // Sobreescribir un método
  moverse(): void {
    console.log(`${this.nombre} (${this.raza}) corre alegremente`);
  }
}

const perro = new Perro("Max", "Golden Retriever");
perro.moverse();  // Max (Golden Retriever) corre alegremente
perro.ladrar();   // Max ladra: ¡Guau!
```

---

## Métodos Abstractos y Clases Abstractas

Las clases abstractas no se pueden instanciar directamente:

```typescript
abstract class Vehiculo {
  marca: string;

  constructor(marca: string) {
    this.marca = marca;
  }

  // Método abstracto: debe ser implementado por subclases
  abstract acelerar(): void;

  // Método concreto
  info(): void {
    console.log(`Vehículo marca: ${this.marca}`);
  }
}

class Coche extends Vehiculo {
  acelerar(): void {
    console.log("El coche está acelerando");
  }
}

// const vehiculo = new Vehiculo("Toyota");  // ✗ Error: No puedes instanciar una clase abstracta

const coche = new Coche("Toyota");
coche.info();      // Vehículo marca: Toyota
coche.acelerar();  // El coche está acelerando
```

---

## Caso Práctico: Sistema de Empleados

```typescript
abstract class Empleado {
  protected nombre: string;
  protected salarioBase: number;

  constructor(nombre: string, salarioBase: number) {
    this.nombre = nombre;
    this.salarioBase = salarioBase;
  }

  abstract calcularBono(): number;

  obtenerSalarioTotal(): number {
    return this.salarioBase + this.calcularBono();
  }

  mostrarInfo(): void {
    console.log(`${this.nombre} - Salario: $${this.obtenerSalarioTotal()}`);
  }
}

class EmpleadoRegular extends Empleado {
  calcularBono(): number {
    return this.salarioBase * 0.1;  // 10% de bono
  }
}

class Gerente extends Empleado {
  private equipo: string[];

  constructor(nombre: string, salarioBase: number, equipo: string[]) {
    super(nombre, salarioBase);
    this.equipo = equipo;
  }

  calcularBono(): number {
    return this.salarioBase * 0.2;  // 20% de bono
  }

  agregarAlEquipo(persona: string): void {
    this.equipo.push(persona);
  }
}

const emp1 = new EmpleadoRegular("Carlos", 2000);
const emp2 = new Gerente("Ana", 3000, ["Carlos", "Juan"]);

emp1.mostrarInfo();  // Carlos - Salario: 2200
emp2.mostrarInfo();  // Ana - Salario: 3600
```

---

## 💡 Ejercicios Prácticos

### Ejercicio 1: Crear una clase
Crea una clase `Estudiante` con:
- Propiedades privadas: nombre, calificaciones (array)
- Método: agregarCalificacion(nota: number)
- Getter: promedioCalificaciones

### Ejercicio 2: Herencia simple
Extiende la clase anterior con una clase `EstudianteAvanzado` que agregue:
- Especialización (string)
- Beca (boolean)

### Ejercicio 3: Clase abstracta
Crea una clase abstracta `Forma` con:
- Método abstracto: calcularArea()
- Métodos concretos: Circulo y Rectangulo

### Ejercicio 4: Sistema completo
Crea un sistema de Biblioteca con clases: Libro, Usuario, Biblioteca

---

## 📌 Puntos Clave

✓ public, private, protected controlan el acceso  
✓ Getters y setters añaden lógica al acceso de propiedades  
✓ Propiedades y métodos estáticos pertenecen a la clase  
✓ Herencia permite reutilizar código  
✓ Clases abstractas definen contratos  
✓ super() accede a la clase padre  

---

**Anterior:** [03-Union-Types.md](03-Union-Types.md)  
**Siguiente:** [05-Generics.md](05-Generics.md)
