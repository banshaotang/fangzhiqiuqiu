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
 * 按钮缩放效果
 */
var BtnScaleComponent = /** @class */ (function (_super) {
    __extends(BtnScaleComponent, _super);
    function BtnScaleComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bigTime = 0.15; //初始到最大的时间
        _this.bigScale = 1.1; //最大缩放值
        _this.smallTime = 0.15; //最大到最小的时间
        _this.smallScale = 1; //最小缩放值
        _this.delayTime = 0.4; //到最小状态后的延迟时间
        return _this;
    }
    BtnScaleComponent.prototype.onLoad = function () {
    };
    BtnScaleComponent.prototype.start = function () {
        this.node.runAction(cc.sequence(cc.scaleTo(this.bigTime, this.bigScale), //小变大
        cc.scaleTo(this.smallTime, this.smallScale), //大变小
        cc.delayTime(this.delayTime)).repeatForever());
    };
    BtnScaleComponent = __decorate([
        ccclass
    ], BtnScaleComponent);
    return BtnScaleComponent;
}(cc.Component));
exports.default = BtnScaleComponent;
