import { NestFactory } from '@nestjs/core';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { AppModule } from './app.module';

async function bootstrap() {
  // bodyParser: false → el gateway no lee el body; lo deja pasar intacto al micro.
  // Si Nest parsea el body, los POST/PATCH proxiados se cuelgan.
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  const port = process.env.PORT ?? 3000;
  const target = process.env.TASK_SERVICE_URL ?? 'http://localhost:3001';

  // El navegador habla con el gateway, no con el micro.
  app.enableCors({ origin: '*' });

  // Reverse proxy: se monta en la raiz con pathFilter para conservar la ruta
  // completa (ej. /tasks/123 llega igual al micro). Las rutas que no cumplen el
  // filtro (/, /health) pasan de largo (next) y las atiende Nest.
  const PROXIED_PREFIXES = ['/tasks', '/docs', '/api-json'];
  app.use(
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathFilter: (pathname) =>
        PROXIED_PREFIXES.some(
          (p) => pathname === p || pathname.startsWith(`${p}/`),
        ),
    }),
  );

  await app.listen(port);
  console.log(`api-gateway escuchando en http://localhost:${port}`);
  console.log(`Reenviando /tasks, /docs y /api-json →${target}`);
}
bootstrap();