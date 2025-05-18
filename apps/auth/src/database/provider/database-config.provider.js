"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfigProvider = void 0;
var typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
var TypeOrmConfigProvider = /** @class */ (function () {
    function TypeOrmConfigProvider() {
    }
    TypeOrmConfigProvider.forRoot = function () {
        return {
            type: 'mongodb',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: String(process.env.DATABASE_PASSWORD),
            database: process.env.DATABASE_NAME,
            logging: true,
            autoLoadEntities: true,
            synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
            namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
        };
    };
    return TypeOrmConfigProvider;
}());
exports.TypeOrmConfigProvider = TypeOrmConfigProvider;
