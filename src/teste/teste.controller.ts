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
    const { filename, path} = file;
    console.log(file);
    const image = await this.testeService.create(filename, path);
    return { message: 'Imagem salva com sucesso no MySQL!', imageUrl: `http://192.168.0.201:3001/images/${file.filename}`, image };
  }

  @Get('all')
  async getImage( @Res() res: Response) {
    return await this.testeService.findAll();
    //const filePath = join(process.cwd(), 'uploads/', imgs[0].data);
    //return res.sendFile(imgs[0].data);
  }

  @Post('up')
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<any>{
    console.log(file);
    const {originalname, buffer} = file;
    return await this.testeService.createImage(originalname, buffer);
    //return {mensagem: 'Imagemm salvado com sucesso', image}
  }


}
