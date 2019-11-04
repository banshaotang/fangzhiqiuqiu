"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 常量
 */
var GameConstant = /** @class */ (function () {
    function GameConstant() {
    }
    //体力
    GameConstant.tiliBaseNum = 10; //体力的初始数量 1031修改为10
    GameConstant.tiliVideoPrize = 10; //体力-看视频获得次数
    GameConstant.tiliHuifuTime = 600; //体力恢复一点的时间 600秒
    /**
     * 各个关卡icon的颜色
     */
    GameConstant.guanqiaBgColors = [
        3, 2, 0, 1,
        2, 1, 3, 0,
        0, 3, 1, 2,
        3, 2, 0, 1,
        2, 1, 3, 0,
        0, 3, 1, 2,
        3, 2, 0, 1,
        2, 1, 3, 0,
        0, 3, 1, 2,
        3, 2, 0, 1
    ];
    GameConstant = __decorate([
        ccclass
    ], GameConstant);
    return GameConstant;
}());
exports.default = GameConstant;
