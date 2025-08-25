import { IsNumber, IsString } from 'class-validator';

export class CreateCategoriyDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  imageUrl: string;
}
