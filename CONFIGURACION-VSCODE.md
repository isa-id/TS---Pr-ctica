# 🔧 Configuración Óptima de VS Code para TypeScript

## Archivo: .vscode/settings.json

Crea este archivo en la raíz de tu proyecto para optimizar la experiencia:

```json
{
  // Editor de código
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },

  // TypeScript
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "typescript.preferences.importModuleSpecifierMode": "auto",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",

  // Autoguardado
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,

  // Excluir archivos
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true
  },

  // Búsqueda
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true
  }
}
```

## Extensiones Esenciales

### 1️⃣ **Prettier - Code formatter**
```
ID: esbenp.prettier-vscode
```
- Formatea código automáticamente
- Compatible con TypeScript
- Configurable con `.prettierrc`

### 2️⃣ **ESLint**
```
ID: dbaeumer.vscode-eslint
```
- Encuentra problemas en el código
- Integración directa en el editor
- Muestra errores en tiempo real

### 3️⃣ **TypeScript Vue Plugin (Volar)** *(si usas Vue)*
```
ID: Vue.volar
```
- Soporte completo para Vue 3 + TypeScript
- Mejor que Vetur

### 4️⃣ **Error Lens**
```
ID: usernamehw.errorlens
```
- Muestra errores inline en el editor
- Muy útil para debugging rápido

### 5️⃣ **Thunder Client** o **REST Client**
```
ID: humao.rest-client
```
- Prueba APIs sin dejar el editor
- Soporte para variables

### 6️⃣ **GitLens**
```
ID: eamodio.gitlens
```
- Integración avanzada con Git
- Ver quién cambió cada línea

### 7️⃣ **Path Intellisense**
```
ID: christian-kohler.path-intellisense
```
- Autocompletado de rutas
- Extremadamente útil

### 8️⃣ **Better Comments**
```
ID: aaron-bond.better-comments
```
- Comenta de colores
- Mejor visualización de notas

### 9️⃣ **TypeScript Importer**
```
ID: stringham.move-ts
```
- Mejora la importación automática
- Organiza imports automáticamente

### 🔟 **Debugger for Chrome**
```
ID: msjsdiag.debugger-for-chrome
```
- Depura TypeScript en navegador
- Breakpoints y inspección

---

## Configuración de Prettier (.prettierrc)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "lf"
}
```

---

## Configuración de ESLint (.eslintrc.json)

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-types": "warn"
  }
}
```

---

## Atajos de Teclado Útiles

| Acción | Windows/Linux | Mac |
|--------|---------------|-----|
| Comando de paleta | `Ctrl + Shift + P` | `Cmd + Shift + P` |
| Abrir archivo | `Ctrl + P` | `Cmd + P` |
| Buscar en archivo | `Ctrl + F` | `Cmd + F` |
| Buscar y reemplazar | `Ctrl + H` | `Cmd + H` |
| Ir a definición | `F12` | `F12` |
| Ver referencias | `Shift + F12` | `Shift + F12` |
| Renombrar símbolo | `F2` | `F2` |
| Formato de documento | `Shift + Alt + F` | `Shift + Option + F` |
| Organizar imports | `Shift + Alt + O` | `Shift + Option + O` |
| Ir a línea | `Ctrl + G` | `Cmd + G` |

---

## Debug Configuration (.vscode/launch.json)

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/dist/index.js",
      "preLaunchTask": "tsc: build",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    }
  ]
}
```

---

## Tareas Útiles (.vscode/tasks.json)

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "tsc: build",
      "type": "shell",
      "command": "tsc",
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "label": "tsc: watch",
      "type": "shell",
      "command": "tsc",
      "args": ["--watch"],
      "isBackground": true,
      "problemMatcher": "$tsc-watch"
    }
  ]
}
```

---

## Recomendaciones Finales

1. ✅ Usa `strict: true` en tsconfig.json
2. ✅ Habilita Prettier y ESLint
3. ✅ Configura autoformato en el guardado
4. ✅ Usa Error Lens para ver problemas rápidamente
5. ✅ Mantén las extensiones actualizadas
6. ✅ Aprende los atajos de teclado
7. ✅ Usa el debugger para entender el código

---

**Última actualización:** Febrero 2026
