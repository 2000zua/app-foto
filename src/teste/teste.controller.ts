import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { TesteService } from './teste.service';

@Controller('images')
export class TesteController {
  constructor(private readonly testeService: TesteService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split('.').pop();
          cb(null, `${uniqueSuffix}.${ext}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { filename, path, buffer } = file;
    console.log(file);
    //const image = await this.testeService.createImage(filename, path, buffer);
    //return { message: 'Imagem salva com sucesso no MySQL!', imageUrl: `http://localhost:3000/images/${file.filename}`, image };
  }

  @Get(':filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', filename);
    return res.sendFile(filePath);
  }

}
