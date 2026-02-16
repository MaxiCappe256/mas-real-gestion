import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'La categoria es obligatoria' })
  @IsString()
  name: string;
}
