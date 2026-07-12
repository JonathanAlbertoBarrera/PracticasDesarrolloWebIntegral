import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { LibrosService } from './libros.service';

@ApiTags('libros')
@Controller('libros')
export class LibrosController {
  constructor(private readonly libros: LibrosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear libro' })
  create(@Body() dto: CreateLibroDto) {
    return this.libros.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los libros' })
  findAll() {
    return this.libros.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener libro por id' })
  @ApiParam({ name: 'id', example: '550e8400-e29b-41d4-a716-446655440000' })
  findOne(@Param('id') id: string) {
    return this.libros.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar libro' })
  @ApiParam({ name: 'id', example: '550e8400-e29b-41d4-a716-446655440000' })
  update(@Param('id') id: string, @Body() dto: UpdateLibroDto) {
    return this.libros.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar libro' })
  @ApiParam({ name: 'id', example: '550e8400-e29b-41d4-a716-446655440000' })
  remove(@Param('id') id: string) {
    return this.libros.remove(id);
  }
}
