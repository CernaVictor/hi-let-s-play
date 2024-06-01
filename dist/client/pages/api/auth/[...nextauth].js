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
exports.authOptions = void 0;
const axios_1 = require("axios");
const next_auth_1 = require("next-auth");
const credentials_1 = require("next-auth/providers/credentials");
exports.authOptions = {
    providers: [
        (0, credentials_1.default)({
            name: 'hlpCredentials',
            credentials: {
                username: {
                    label: 'Username',
                },
                isNewUser: {
                    label: 'isNewUser',
                    type: 'checkbox',
                },
                isSportsCenterOwner: {
                    label: 'sportsCenterUser',
                    type: 'checkbox',
                },
                password: { label: 'Password', type: 'password' },
                confirmPassword: { label: 'Password', type: 'password' },
                email: { label: 'Email', type: 'email' },
                name: { label: 'Name' },
            },
            authorize(credentials) {
                return __awaiter(this, void 0, void 0, function* () {
                    if ((credentials === null || credentials === void 0 ? void 0 : credentials.isNewUser) != 'false') {
                        try {
                            const user = yield axios_1.default.post('http://localhost:3000/api/users/registerWithUsernameAndPassword', credentials);
                            return user.data;
                        }
                        catch (error) {
                            return null;
                        }
                    }
                    else {
                        try {
                            const user = yield axios_1.default.post('http://localhost:3000/api/users/loginWithUsernameAndPassword', credentials);
                            return user.data;
                        }
                        catch (error) {
                            return null;
                        }
                    }
                });
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            return __awaiter(this, void 0, void 0, function* () {
                if (user) {
                    return Object.assign(Object.assign({}, token), { isSportsCenterOwner: user.isSportsCenterOwner });
                }
                return token;
            });
        },
        session({ session, token, user }) {
            return __awaiter(this, void 0, void 0, function* () {
                if (user) {
                    session.user.isSportsCenterOwner = user.isSportsCenterOwner;
                }
                return Object.assign(Object.assign({}, session), { user: Object.assign(Object.assign({}, session.user), { isSportsCenterOwner: token.isSportsCenterOwner }) });
            });
        },
    },
};
exports.default = (0, next_auth_1.default)(exports.authOptions);
//# sourceMappingURL=%5B...nextauth%5D.js.map