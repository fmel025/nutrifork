import { CloudinaryResponse } from '@UploadImage/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class UploadImageService {
  constructor(private readonly configService: ConfigService) {
    const cloudinaryCloudName = this.configService.get<string>(
      'cloudinaryCloudName',
    );
    const cloudinaryApiKey = this.configService.get<string>('cloudinaryApiKey');
    const cloudinaryApiSecret = this.configService.get<string>(
      'cloudinaryApiSecret',
    );

    cloudinary.config({
      cloud_name: cloudinaryCloudName,
      api_key: cloudinaryApiKey,
      api_secret: cloudinaryApiSecret,
    });
  }

  uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result);
        },
      );

      if (!file || !file.buffer) {
        return reject(new Error('Invalid file data'));
      }

      try {
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      } catch (error) {
        console.error('Streamifier error:', error);
        reject(error);
      }
    });
  }
}
