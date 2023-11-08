import { __decorate } from "tslib";
import { Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUND = 10;
export let BcryptService = class BcryptService {
    encrypt(plain) {
        return new Promise((resolve) => {
            bcrypt.genSalt(BCRYPT_SALT_ROUND, function (_, salt) {
                bcrypt.hash(plain, salt, function (_, hash) {
                    resolve(hash);
                });
            });
        });
    }
    verify(plain, hash) {
        return new Promise((resolve) => {
            bcrypt.compare(plain, hash, (_, flag) => resolve(flag));
        });
    }
};
BcryptService = __decorate([
    Injectable()
], BcryptService);
//# sourceMappingURL=bcrypt.service.js.map