import * as cloud from 'cloudinary';
export declare class FileUploadService {
    private cloudinary;
    onModuleInit(): Promise<void>;
    getCloudinary(): typeof cloud.v2;
    uploadFiles(files: any[], folder: string): Promise<{
        url: string;
        id: string;
    }[]>;
    destroyFiles(ids: string[]): void;
}
