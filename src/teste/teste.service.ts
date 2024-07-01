import { Injectable } from '@nestjs/common';
import { CreateTesteDto } from './dto/create-teste.dto';
import { UpdateTesteDto } from './dto/update-teste.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TesteService {

  constructor(private readonly prisma : PrismaService){}

  async createImage(name: string, path: string, data: Buffer): Promise<any> {
    return this.prisma.fototext.create({
      data: {
        name,
        url: path,
        data: data,
      },
    });
  }

  findAll() {
    return `This action returns all teste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teste`;
  }

  update(id: number, updateTesteDto: UpdateTesteDto) {
    return `This action updates a #${id} teste`;
  }

  remove(id: number) {
    return `This action removes a #${id} teste`;
  }
}
