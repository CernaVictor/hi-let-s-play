import { Injectable } from '@nestjs/common';
import * as cloud from 'cloudinary';

@Injectable()
export class FileUploadService {
  private cloudinary = cloud.v2;

  async onModuleInit(): Promise<void> {
    try {
      this.cloudinary.config({
        cloud_name: 'drunwrvyv',
        api_key: process.env.CLOUDINARY_APY_KEY,
        api_secret: process.env.CLOUDINARY_APY_SECRET,
      });
    } catch (error) {
      console.log(error);
    }
  }

  getCloudinary(): typeof cloud.v2 {
    return this.cloudinary;
  }

  async uploadFiles(files: any[], folder: string) {
    const uploadPromises = files.map((file, index) => {
      return this.cloudinary.uploader.upload(
        'data:image/svg+xml;base64,' + file.buffer.toString('base64'),
        {
          phash: true,
          sign_url: true,
          public_id: `${folder}_${index}_${+new Date()}`,
          folder: folder,
          resource_type: 'image',
        },
      );
    });

    return (await Promise.all(uploadPromises)).map((result) => ({
      url: result.url,
      id: result.public_id,
    }));
  }

  destroyFiles(ids: string[]) {
    ids.forEach((id) => this.cloudinary.uploader.destroy(id));
  }
}
