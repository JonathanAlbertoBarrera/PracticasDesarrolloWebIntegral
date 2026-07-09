# Como levantar el proyecto

## Requisitos
- Node.js 18 o superior
- npm 9 o superior
- Estar ubicado en la raiz del workspace:

```powershell
C:\Users\jona\Documents\UNI\9no\DesarrolloWebIntegral\practicas\Busqueda del tesoro parte 2\02-buildtime-workspaces
```

## 1. Instalar dependencias
Si tu entorno ya tiene `node_modules`, puedes saltarte este paso.

```powershell
cmd /c npm install
```

## 2. Levantar el servidor de desarrollo
Desde la raiz del proyecto:

```powershell
cmd /c npm run dev
```

Esto ejecuta el `webshell`, que es la app host del workspace.

## 3. Abrir en el navegador
La aplicacion queda disponible en:

```text
http://localhost:4000
```

## Scripts utiles

### Desarrollo
```powershell
cmd /c npm run dev
```

### Build de produccion
```powershell
cmd /c npm run build
```

### Preview del build
```powershell
cmd /c npm run preview
```

## Estructura rapida
- `apps/webshell`: host principal con Vite
- `apps/pets-front`: modulo de mascotas
- `commons`: componentes, tema, tipos y store compartido

## Flujo esperado
1. Abres `http://localhost:4000`
2. Entras al modulo `Mascotas`
3. Puedes crear, editar, eliminar y buscar mascotas

## Troubleshooting

### PowerShell bloquea `npm.ps1`
Si PowerShell muestra un error de execution policy, usa `cmd /c`:

```powershell
cmd /c npm run dev
```

### `vite` no se reconoce
Normalmente significa que faltan dependencias o que `node_modules` quedo incompleto.

Prueba:

```powershell
cmd /c npm install
```

### El puerto 4000 ya esta ocupado
Cierra el proceso que lo este usando o cambia el puerto en:

`apps/webshell/vite.config.ts`

## Nota
Los scripts raiz del proyecto delegan todo al workspace `@nimbus/webshell`, asi que siempre puedes levantarlo desde la carpeta raiz sin entrar manualmente a `apps/webshell`.
