import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  imageUrl: string;
}
