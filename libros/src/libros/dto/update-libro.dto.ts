import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class UpdateLibroDto {
  @ApiPropertyOptional({ example: 'Cien a\u00f1os de soledad' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  titulo?: string;

  @ApiPropertyOptional({ example: 'Una saga familiar marcada por el realismo magico.' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  sinopsis?: string;

  @ApiPropertyOptional({ example: 'Gabriel Garcia Marquez' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  autor?: string;

  @ApiPropertyOptional({ example: 1967 })
  @IsOptional()
  @IsInt()
  @Min(1)
  anioPublicacion?: number;

  @ApiPropertyOptional({ example: 'Novela' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  genero?: string;

  @ApiPropertyOptional({ example: 'Editorial Sudamericana' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  editorial?: string;
}
