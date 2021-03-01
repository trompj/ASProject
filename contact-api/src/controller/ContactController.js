"use strict";
// ContactController
// Justin Tromp
// Controller of contact entity endpoints and db access
// TODO: - Consider refactoring code into separate repositories in addition to controller methods to account for scaling
//       - Implement more comprehensive error checking and look into global error catches instead of try/catch blocks
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
var routing_controllers_1 = require("routing-controllers");
var typeorm_1 = require("typeorm");
var Contact_1 = require("../entity/Contact");
var ContactController = /** @class */ (function () {
    function ContactController() {
        this.entityManager = typeorm_1.getConnection().manager;
        this.connection = typeorm_1.getConnection();
    }
    // Get all
    ContactController.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entityManager.find(Contact_1.Contact)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Get one by id
    ContactController.prototype.getOne = function (id, res) {
        return __awaiter(this, void 0, void 0, function () {
            var contact;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entityManager.findOne(Contact_1.Contact, id)];
                    case 1:
                        contact = _a.sent();
                        // If no entity is found to update, send 404
                        if (contact == undefined) {
                            return [2 /*return*/, res.status(404).send(JSON.stringify({ Error: 'Entity not found' }))];
                        }
                        return [2 /*return*/, res.status(200).send(contact)];
                }
            });
        });
    };
    // Add one
    ContactController.prototype.post = function (contact, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connection.getRepository(Contact_1.Contact).create(contact).save()];
            });
        });
    };
    // Update one by id
    ContactController.prototype.put = function (id, contact, res) {
        return __awaiter(this, void 0, void 0, function () {
            var dbContact, updatedContact, result, newContact;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.entityManager.findOne(Contact_1.Contact, id)];
                    case 1:
                        dbContact = _a.sent();
                        // If no entity is found to update, send 404
                        if (dbContact == undefined) {
                            return [2 /*return*/, res.status(404).send(JSON.stringify({ Error: 'Entity not found' }))];
                        }
                        return [4 /*yield*/, this.connection.getRepository(Contact_1.Contact).merge(dbContact, contact)];
                    case 2:
                        updatedContact = _a.sent();
                        return [4 /*yield*/, this.entityManager.update(Contact_1.Contact, id, updatedContact)];
                    case 3:
                        result = _a.sent();
                        if (!(result.affected == 1)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.entityManager.findOne(Contact_1.Contact, id)];
                    case 4:
                        newContact = _a.sent();
                        return [2 /*return*/, res.status(200).send(newContact)];
                    case 5: return [2 /*return*/, res.status(400).send(JSON.stringify({ Error: 'Entity not updated' }))];
                }
            });
        });
    };
    // Delete one by id
    ContactController.prototype.remove = function (id, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.entityManager.delete(Contact_1.Contact, id)];
                    case 1:
                        result = _a.sent();
                        // If no entity is deleted, send 404
                        if (result.affected == 0) {
                            return [2 /*return*/, res.status(404).send(JSON.stringify({ Error: 'Entity not found' }))];
                        }
                        return [2 /*return*/, res.status(204).send];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(400).send(JSON.stringify({ Error: '' }))];
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        routing_controllers_1.Get("/contacts"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], ContactController.prototype, "getAll", null);
    __decorate([
        routing_controllers_1.Get("/contacts/:id"),
        __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], ContactController.prototype, "getOne", null);
    __decorate([
        routing_controllers_1.Post("/contacts"),
        __param(0, routing_controllers_1.Body()), __param(1, routing_controllers_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Contact_1.Contact, Object]),
        __metadata("design:returntype", Promise)
    ], ContactController.prototype, "post", null);
    __decorate([
        routing_controllers_1.Put("/contacts/:id"),
        __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()), __param(2, routing_controllers_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object, Object]),
        __metadata("design:returntype", Promise)
    ], ContactController.prototype, "put", null);
    __decorate([
        routing_controllers_1.Delete("/contacts/:id"),
        __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Res()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], ContactController.prototype, "remove", null);
    ContactController = __decorate([
        routing_controllers_1.JsonController()
    ], ContactController);
    return ContactController;
}());
exports.ContactController = ContactController;
