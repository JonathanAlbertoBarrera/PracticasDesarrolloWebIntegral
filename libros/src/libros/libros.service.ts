import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

const LIST_CACHE_KEY = 'libros:list';

@Injectable()
export class LibrosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async create(dto: CreateLibroDto) {
    const libro = await this.prisma.libro.create({ data: dto });
    await this.redis.del(LIST_CACHE_KEY);
    return libro;
  }

  async findAll() {
    const cached = await this.redis.get<unknown[]>(LIST_CACHE_KEY);
    if (cached) return cached;

    const libros = await this.prisma.libro.findMany({
      orderBy: { createdAt: 'desc' },
    });

    await this.redis.set(LIST_CACHE_KEY, libros, 30);
    return libros;
  }

  async findOne(id: string) {
    const libro = await this.prisma.libro.findUnique({ where: { id } });
    if (!libro) throw new NotFoundException(`Libro ${id} no existe`);
    return libro;
  }

  async update(id: string, dto: UpdateLibroDto) {
    await this.findOne(id);
    const libro = await this.prisma.libro.update({ where: { id }, data: dto });
    await this.redis.del(LIST_CACHE_KEY);
    return libro;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.libro.delete({ where: { id } });
    await this.redis.del(LIST_CACHE_KEY);
    return { deleted: true };
  }
}
