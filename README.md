# 📚 Guía Completa de TypeScript - Desde Interfaces y Enums

## � Comienza Aquí

Eres un aprendiz que llegó hasta **Interfaces y Enums**. Esta guía te llevará desde ese punto hasta convertirte en un **experto en TypeScript** en 4 semanas.

### Antes de empezar:
1. Abre [PLAN-ESTUDIO.md](PLAN-ESTUDIO.md) para ver tu roadmap
2. Instala TypeScript: `npm install -g typescript`
3. Configura VS Code con las extensiones en [CONFIGURACION-VSCODE.md](CONFIGURACION-VSCODE.md)
4. Abre [CHEAT-SHEET.md](CHEAT-SHEET.md) para referencia rápida

---

## 📋 Estructura de la Guía

### 📖 Nivel 1: Fundamentos (Interfaces y Enums)
**Duración:** 1 semana | **Requisito previo:** Básicos de JavaScript

- [01-Interfaces-Basicas.md](01-Interfaces-Basicas.md) - Introducción a interfaces
  - Propiedades básicas, opcionales y readonly
  - Métodos en interfaces
  - Herencia de interfaces

- [02-Enums.md](02-Enums.md) - Tipos enumerados
  - Enums numéricos y strings
  - Reverse mapping
  - Casos de uso reales

- [03-Union-Types.md](03-Union-Types.md) - Tipos unión
  - Union types y literal types
  - Type guards básicos
  - Discriminated unions

### 🛠️ Nivel 2: Intermedio (Clases y Genéricos)
**Duración:** 1 semana | **Requisito previo:** Nivel 1 completado

- [04-Clases-y-Herencia.md](04-Clases-y-Herencia.md) - POO en TypeScript
  - Modificadores: public, private, protected
  - Getters y setters
  - Herencia y clases abstractas

- [05-Generics.md](05-Generics.md) - Genéricos
  - Funciones, interfaces y clases genéricas
  - Constraints con extends
  - keyof y tipos dinámicos

- [06-Type-Guards.md](06-Type-Guards.md) - Guardias de tipo
  - Type predicates (is)
  - Narrowing avanzado
  - Never type

### ⚡ Nivel 3: Avanzado (Tipos Avanzados)
**Duración:** 1 semana | **Requisito previo:** Nivel 2 completado

- [07-Utility-Types.md](07-Utility-Types.md) - Tipos utilidad
  - Partial, Required, Readonly, Pick, Omit
  - Record, Exclude, Extract
  - ReturnType, Awaited

- [08-Decorators.md](08-Decorators.md) - Decoradores
  - Decoradores de clase, propiedades, métodos
  - Metaprogramación
  - Casos de uso: ORM, validación

- [09-Type-Inference.md](09-Type-Inference.md) - Inferencia de tipos
  - typeof y keyof
  - Mapped types
  - Conditional types básicos
  - as const

### 🔥 Nivel 4: Experto (Patrones y Tipos Avanzados)
**Duración:** 1 semana | **Requisito previo:** Nivel 3 completado

- [10-Advanced-Patterns.md](10-Advanced-Patterns.md) - Patrones de diseño
  - Singleton, Builder, Factory
  - Observer, Strategy, Decorator
  - Implementación en TypeScript

- [11-Conditional-Types.md](11-Conditional-Types.md) - Tipos condicionales
  - Condicionales con extends
  - infer y extracción de tipos
  - Condicionales recursivos

- [12-Template-Literal-Types.md](12-Template-Literal-Types.md) - Tipos dinámicos
  - Template literal types
  - Validación de strings
  - Generación de tipos
  - URLs y rutas tipadas

---

## � Archivos de Recursos

### 📝 Documentación y Aprendizaje
- **[PLAN-ESTUDIO.md](PLAN-ESTUDIO.md)** - Plan de 4 semanas con hitos diarios
- **[EJERCICIOS.md](EJERCICIOS.md)** - Desafíos progresivos por nivel
- **[CHEAT-SHEET.md](CHEAT-SHEET.md)** - Referencia rápida de sintaxis
- **[ejemplos-practicos.ts](ejemplos-practicos.ts)** - 15 ejemplos listos para ejecutar

### ⚙️ Configuración
- **[tsconfig.json](tsconfig.json)** - Configuración optimizada para aprendizaje
- **[CONFIGURACION-VSCODE.md](CONFIGURACION-VSCODE.md)** - Setup completo de VS Code

---

## �🔧 Extensiones Recomendadas para VS Code

### Esenciales
1. **TypeScript Vue Plugin (Volar)** (`Vue.volar`)
   - Si trabajas con Vue 3 + TypeScript

2. **Prettier - Code formatter** (`esbenp.prettier-vscode`)
   - Formateador de código automático
   - Configuración: `"editor.formatOnSave": true`

3. **ESLint** (`dbaeumer.vscode-eslint`)
   - Linter para encontrar problemas en el código

### Productividad
4. **Thunder Client** o **REST Client** (`humao.rest-client`)
   - Para probar APIs TypeScript

5. **GitLens** (`eamodio.gitlens`)
   - Integración avanzada con Git

6. **Path Intellisense** (`christian-kohler.path-intellisense`)
   - Autocompletado de rutas

### Desarrollo/Debugging
7. **Debugger for Chrome** (`msjsdiag.debugger-for-chrome`)
   - Depurador para navegador

8. **Node Debug 2** (integrado en VS Code)
   - Depurador para Node.js

### Utilidades
9. **Error Lens** (`usernamehw.errorlens`)
   - Muestra errores inline en el editor

10. **TypeScript Error Translator** (`mattpocock.ts-error-translator`)
    - Traduce errores de TypeScript a lenguaje más comprensible

11. **TypeScript Importer** (`stringham.move-ts`)
    - Mejora la importación automática de módulos

---

## 📝 Cómo Usar Esta Guía

1. **Comienza por el Nivel 1** si vienes de las interfaces y enums
2. **Lee la teoría** en cada archivo `.md`
3. **Copia y ejecuta los ejemplos** en los archivos `.ts` correspondientes
4. **Practica los ejercicios** al final de cada sección
5. **Avanza gradualmente** al siguiente nivel

---

## 🚀 Instalación Inicial

```bash
# Instalar TypeScript globalmente (opcional)
npm install -g typescript

# Verificar versión
tsc --version

# Crear un proyecto nuevo
tsc --init
```

---

## 📖 Recursos Externos

- [Documentación oficial de TypeScript](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Playground de TypeScript](https://www.typescriptlang.org/play)

---

**Última actualización:** Febrero 2026
