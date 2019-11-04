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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameDataManager_1 = require("../GameDataManager");
var GlobalManager_1 = require("../GlobalManager");
var GameConstant_1 = __importDefault(require("../GameConstant"));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 关卡单元
 */
var GuanqiaUnitComponent = /** @class */ (function (_super) {
    __extends(GuanqiaUnitComponent, _super);
    function GuanqiaUnitComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numLabel = null;
        _this.passBgNode = null; //通过关卡的背景
        _this.passBgNodes = []; //不同的背景 0~3 红0，黄1，紫2，绿3
        _this.nextGuanqiaNode = null; //新解锁的关卡
        _this.lockGuanqiaNode = null; //被锁的关卡
        _this.lockIconNode = null; //锁的icon
        _this.signIconNode = null; //对勾的icon
        _this.guanqiaId = 1;
        _this.parentNode = null;
        _this.canEnterGameFlag = false; //是否可以进入游戏
        _this.isFromMenuFlag = true;
        return _this;
    }
    GuanqiaUnitComponent.prototype.initData = function (num, parentNode, isFromMenuFlag) {
        this.guanqiaId = num;
        this.parentNode = parentNode;
        this.numLabel.string = "" + num;
        this.isFromMenuFlag = isFromMenuFlag;
        var maxGuanqiaId = GameDataManager_1.GameDataManagerInstance.maxGuaqiaId;
        if (num == maxGuanqiaId) {
            this.passBgNode.active = false;
            this.nextGuanqiaNode.active = true;
            this.lockGuanqiaNode.active = false;
            this.lockIconNode.active = false;
            this.signIconNode.active = false;
            this.canEnterGameFlag = true;
        }
        else if (num > maxGuanqiaId) {
            this.passBgNode.active = false;
            this.nextGuanqiaNode.active = false;
            this.lockGuanqiaNode.active = true;
            this.lockIconNode.active = true;
            this.signIconNode.active = false;
            this.canEnterGameFlag = false;
        }
        else {
            this.passBgNode.active = true;
            this.nextGuanqiaNode.active = false;
            this.lockGuanqiaNode.active = false;
            this.lockIconNode.active = false;
            this.signIconNode.active = true;
            this.canEnterGameFlag = true;
            var colorIndex = GameConstant_1.default.guanqiaBgColors[num - 1];
            for (var i = 0; i < this.passBgNodes.length; i++) {
                if (colorIndex == i) {
                    this.passBgNodes[i].active = true;
                }
                else {
                    this.passBgNodes[i].active = false;
                }
            }
        }
    };
    GuanqiaUnitComponent.prototype.onClick = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        if (this.canEnterGameFlag) {
            if (GameDataManager_1.GameDataManagerInstance.tiliNum <= 0) {
                GlobalManager_1.GlobalManagerInstance.getTiliUIShow(this.parentNode, this.isFromMenuFlag);
                return;
            }
            GameDataManager_1.GameDataManagerInstance.tiliNum--;
            GameDataManager_1.GameDataManagerInstance.saveGameData();
            GameDataManager_1.GameDataManagerInstance.curGuaqiaId = this.guanqiaId;
            if (this.isFromMenuFlag) {
                GlobalManager_1.GlobalManagerInstance.gameComponent.menuUI.toStartGame();
            }
            else {
                GlobalManager_1.GlobalManagerInstance.gameComponent.gameUI.guanqiaToStart();
            }
            this.parentNode.destroy();
        }
    };
    __decorate([
        property(cc.Label)
    ], GuanqiaUnitComponent.prototype, "numLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUnitComponent.prototype, "passBgNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUnitComponent.prototype, "passBgNodes", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUnitComponent.prototype, "nextGuanqiaNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUnitComponent.prototype, "lockGuanqiaNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUnitComponent.prototype, "lockIconNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUnitComponent.prototype, "signIconNode", void 0);
    GuanqiaUnitComponent = __decorate([
        ccclass
    ], GuanqiaUnitComponent);
    return GuanqiaUnitComponent;
}(cc.Component));
exports.default = GuanqiaUnitComponent;
