# Libros Service

API CRUD de libros construida con NestJS, Prisma, PostgreSQL y Redis. Sigue el mismo patrón usado en `tasks-service`, pero adaptado al dominio de libros.

## Requisitos

- Node.js 20+
- pnpm
- PostgreSQL
- Redis

## Variables de entorno

El proyecto usa estas variables en [`.env`](.env):

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5435/libros_db?schema=public"
REDIS_URL="redis://localhost:6380"
PORT=3002
```

## Levantar dependencias

Si quieres usar Docker, arranca PostgreSQL y Redis con:

```bash
docker compose up -d
```

## Instalación

```bash
pnpm install
```

## Base de datos

El esquema de Prisma está en [prisma/schema.prisma](prisma/schema.prisma). Si haces cambios al modelo, genera y aplica migraciones con:

```bash
pnpm prisma generate
pnpm prisma migrate dev
```

## Ejecutar el proyecto

```bash
pnpm start:dev
```

El servicio queda disponible en:

- API: `http://localhost:3002`
- Swagger: `http://localhost:3002/api`
- Scalar docs: `http://localhost:3002/docs`
- Health check: `http://localhost:3002/health`

## CRUD de libros

Base path: `/libros`

Campos del recurso:

- `titulo`
- `sinopsis`
- `autor`
- `anioPublicacion`
- `genero`
- `editorial`

### Endpoints

- `POST /libros` crear libro
- `GET /libros` listar libros
- `GET /libros/:id` obtener un libro
- `PATCH /libros/:id` actualizar un libro
- `DELETE /libros/:id` eliminar un libro

## Notas

- El listado usa caché en Redis y se invalida cuando se crea, actualiza o elimina un libro.
- La entidad en Prisma se llama `Libro`.
