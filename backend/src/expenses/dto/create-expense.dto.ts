import { IsNumber, IsString, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  description: string;

  @IsString()
  provider: string;

  @IsNumber()
  @Min(0)
  amount: number;
}
