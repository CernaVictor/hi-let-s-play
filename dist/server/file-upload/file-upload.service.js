"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const cloud = require("cloudinary");
let FileUploadService = class FileUploadService {
    constructor() {
        this.cloudinary = cloud.v2;
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.cloudinary.config({
                    cloud_name: 'drunwrvyv',
                    api_key: process.env.CLOUDINARY_APY_KEY,
                    api_secret: process.env.CLOUDINARY_APY_SECRET,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getCloudinary() {
        return this.cloudinary;
    }
    uploadFiles(files, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadPromises = files.map((file, index) => {
                return this.cloudinary.uploader.upload('data:image/svg+xml;base64,' + file.buffer.toString('base64'), {
                    phash: true,
                    sign_url: true,
                    public_id: `${folder}_${index}_${+new Date()}`,
                    folder: folder,
                    resource_type: 'image',
                });
            });
            return (yield Promise.all(uploadPromises)).map((result) => ({
                url: result.url,
                id: result.public_id,
            }));
        });
    }
    destroyFiles(ids) {
        ids.forEach((id) => this.cloudinary.uploader.destroy(id));
    }
};
FileUploadService = __decorate([
    (0, common_1.Injectable)()
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=file-upload.service.js.map