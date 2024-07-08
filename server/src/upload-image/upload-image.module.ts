import { Module } from '@nestjs/common';
import { UploadImageService } from './services';
import { ConfigModule } from '@nestjs/config';

// Modulo utilizado para subir imágenes de perfil
@Module({
  imports: [ConfigModule],
  providers: [UploadImageService],
  exports: [UploadImageService],
})
export class UploadImageModule {}
