import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt/bcrypt.service';
export let CryptoModule = class CryptoModule {
};
CryptoModule = __decorate([
    Module({
        providers: [BcryptService],
        exports: [BcryptService],
    })
], CryptoModule);
//# sourceMappingURL=crypto.module.js.map