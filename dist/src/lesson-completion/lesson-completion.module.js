"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonCompletionModule = void 0;
const common_1 = require("@nestjs/common");
const lesson_completion_controller_1 = require("./lesson-completion.controller");
const lesson_completion_service_1 = require("./lesson-completion.service");
const lesson_completion_repository_1 = require("./lesson-completion.repository");
const gamification_module_1 = require("../gamification/gamification.module");
let LessonCompletionModule = class LessonCompletionModule {
};
exports.LessonCompletionModule = LessonCompletionModule;
exports.LessonCompletionModule = LessonCompletionModule = __decorate([
    (0, common_1.Module)({
        imports: [gamification_module_1.GamificationModule],
        controllers: [lesson_completion_controller_1.LessonCompletionController],
        providers: [lesson_completion_service_1.LessonCompletionService, lesson_completion_repository_1.LessonCompletionRepository],
    })
], LessonCompletionModule);
//# sourceMappingURL=lesson-completion.module.js.map