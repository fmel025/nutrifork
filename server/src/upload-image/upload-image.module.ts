import { Module } from '@nestjs/common';
import { UploadImageService } from './services';

@Module({
  providers: [UploadImageService],
})
export class UploadImageModule {}
