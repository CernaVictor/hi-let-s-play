"use strict";
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
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Hlp api')
            .setDescription('The hlp API description')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config, {
            include: app_module_1.apiModuleList,
            deepScanRoutes: true,
            operationIdFactory: (_controllerKey, methodKey) => methodKey,
        });
        swagger_1.SwaggerModule.setup('api-docs', app, document);
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
        }));
        app.use(cookieParser());
        yield app.listen(3000);
        console.log(`Application is running on: http://localhost:3000/`);
        console.log(`API docs: http://localhost:3000/api-docs`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map