"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerRequestModule = void 0;
const common_1 = require("@nestjs/common");
const trainer_request_controller_1 = require("./trainer-request.controller");
const trainer_request_service_1 = require("./trainer-request.service");
const trainer_request_repository_1 = require("./trainer-request.repository");
const user_module_1 = require("../user/user.module");
let TrainerRequestModule = class TrainerRequestModule {
};
exports.TrainerRequestModule = TrainerRequestModule;
exports.TrainerRequestModule = TrainerRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule],
        controllers: [trainer_request_controller_1.TrainerRequestController],
        providers: [trainer_request_service_1.TrainerRequestService, trainer_request_repository_1.TrainerRequestRepository],
    })
], TrainerRequestModule);
//# sourceMappingURL=trainer-request.module.js.map