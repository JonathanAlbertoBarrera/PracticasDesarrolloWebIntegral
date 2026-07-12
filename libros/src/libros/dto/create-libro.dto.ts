import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateLibroDto {
  @ApiProperty({ example: 'Cien a\u00f1os de soledad' })
  @IsString()
  @MinLength(1)
  titulo!: string;

  @ApiProperty({ example: 'Una saga familiar marcada por el realismo magico.' })
  @IsString()
  @MinLength(1)
  sinopsis!: string;

  @ApiProperty({ example: 'Gabriel Garcia Marquez' })
  @IsString()
  @MinLength(1)
  autor!: string;

  @ApiProperty({ example: 1967 })
  @IsInt()
  @Min(1)
  anioPublicacion!: number;

  @ApiProperty({ example: 'Novela' })
  @IsString()
  @MinLength(1)
  genero!: string;

  @ApiProperty({ example: 'Editorial Sudamericana' })
  @IsString()
  @MinLength(1)
  editorial!: string;
}
