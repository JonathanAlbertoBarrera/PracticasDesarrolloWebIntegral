import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    const target = process.env.TASK_SERVICE_URL ?? 'http://localhost:3001';
    return {
      service: 'api-gateway',
      description: 'Punto unico de entrada. Reenvia el trafico a los microservicios.',
      routes: {
        '/tasks': `${target}/tasks (task-service)`,
        '/docs': `${target}/docs (Scalar del task-service)`,
        '/api-json': `${target}/api-json (OpenAPI del task-service)`,
        '/health': 'estado del propio gateway',
      },
    };
  }

  @Get('health')
  health() {
    return { status: 'ok', service: 'api-gateway' };
  }
}