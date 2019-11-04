"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 引导的小手
 */
var PalecUIComponent = /** @class */ (function (_super) {
    __extends(PalecUIComponent, _super);
    function PalecUIComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.beginV2 = null;
        _this.engY = 0;
        return _this;
    }
    PalecUIComponent.prototype.onLoad = function () {
        var _this = this;
        this.node.scale = 0;
        this.scheduleOnce(function () {
            _this.node.scale = 1;
            var beginX = _this.beginV2.x;
            var beginY = _this.beginV2.y;
            _this.node.position = cc.v2(beginX, beginY);
            _this.node.runAction(cc.sequence(cc.moveTo(1.1, cc.v2(beginX, _this.engY)), cc.delayTime(0.2), cc.moveTo(0.1, cc.v2(beginX, beginY)), cc.delayTime(0.2)).repeatForever());
        }, 1.2);
    };
    __decorate([
        property(cc.Vec2)
    ], PalecUIComponent.prototype, "beginV2", void 0);
    __decorate([
        property
    ], PalecUIComponent.prototype, "engY", void 0);
    PalecUIComponent = __decorate([
        ccclass
    ], PalecUIComponent);
    return PalecUIComponent;
}(cc.Component));
exports.default = PalecUIComponent;
