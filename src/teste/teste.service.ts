import { Injectable } from '@nestjs/common';
import { CreateTesteDto } from './dto/create-teste.dto';
import { UpdateTesteDto } from './dto/update-teste.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Image } from '@prisma/client';

@Injectable()
export class TesteService {

  constructor(private readonly prisma : PrismaService){}

  async createImage(name: string, data: Buffer): Promise<any> {
    return this.prisma.fototext.create({
      data: {
        name,
        data: data,
      },
    });
  }

  async create(name: string, path: string): Promise<any> {
    return this.prisma.image.create({data:{
      nome: name,
      path: path
    }})
  }

  async findAll(): Promise<any> {
    return await this.prisma.fototext.findFirst();
  }

}
