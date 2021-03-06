"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrder = void 0;
const typeorm_1 = require("typeorm");
let PurchaseOrder = class PurchaseOrder {
    constructor() {
        this.isDeleted = false;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        length: 256
    }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "poNumber", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "lineItem", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column({ type: 'date' }),
    __metadata("design:type", Date)
], PurchaseOrder.prototype, "date", void 0);
__decorate([
    typeorm_1.Column({
        length: 256
    }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "customerNumber", void 0);
__decorate([
    typeorm_1.Column({
        length: 256
    }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "paymentReference", void 0);
__decorate([
    typeorm_1.Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], PurchaseOrder.prototype, "isDeleted", void 0);
PurchaseOrder = __decorate([
    typeorm_1.Entity()
], PurchaseOrder);
exports.PurchaseOrder = PurchaseOrder;
//# sourceMappingURL=PurchaseOrder.js.map