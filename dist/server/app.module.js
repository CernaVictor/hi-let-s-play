"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.apiModuleList = void 0;
const common_1 = require("@nestjs/common");
const view_module_1 = require("./view/view.module");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const users_module_1 = require("./users/users.module");
const sport_fields_module_1 = require("./sport-fields/sport-fields.module");
const active_periods_module_1 = require("./active-periods/active-periods.module");
const events_module_1 = require("./events/events.module");
const search_module_1 = require("./search/search.module");
const sport_centers_module_1 = require("./sport-centers/sport-centers.module");
const config_1 = require("@nestjs/config");
const file_upload_module_1 = require("./file-upload/file-upload.module");
const sports_module_1 = require("./sports/sports.module");
exports.apiModuleList = [
    users_module_1.UsersModule,
    sport_centers_module_1.SportCentersModule,
    sport_fields_module_1.SportFieldsModule,
    active_periods_module_1.ActivePeriodsModule,
    events_module_1.EventsModule,
    search_module_1.SearchModule,
    sports_module_1.SportsModule,
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            ...exports.apiModuleList,
            core_1.RouterModule.register([
                {
                    path: 'api',
                    children: exports.apiModuleList,
                },
            ]),
            view_module_1.ViewModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '123456',
                database: 'hlp_database',
                autoLoadEntities: true,
                synchronize: true,
                migrationsTableName: 'custom_migration_table',
                migrations: ['./server/migrations/*.js'],
                migrationsRun: true,
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env'],
                isGlobal: true,
            }),
            file_upload_module_1.FileUploadModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map