import { Controller, Get, Query } from '@nestjs/common';
import { ResumenService } from './resumen.service';

@Controller('summary')
export class ResumenController {
  constructor(
    private readonly resumenService: ResumenService
  ) { }

  @Get()
  getSummary(@Query('saleMonth') saleMonth: string) {
    return this.resumenService.getSummary(saleMonth)
  }
} 
