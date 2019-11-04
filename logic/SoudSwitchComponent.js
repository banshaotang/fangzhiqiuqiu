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
var GameDataManager_1 = require("../GameDataManager");
var GlobalManager_1 = require("../GlobalManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 音效开关
 */
var SoudSwitchComponent = /** @class */ (function (_super) {
    __extends(SoudSwitchComponent, _super);
    function SoudSwitchComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.offNode = null; //关闭状态
        _this.onNode = null; //打开状态
        return _this;
    }
    SoudSwitchComponent.prototype.initSwitchData = function () {
        if (GameDataManager_1.GameDataManagerInstance.audioSwitch == 1) {
            //开
            this.offNode.active = false;
            this.onNode.active = true;
        }
        else {
            this.offNode.active = true;
            this.onNode.active = false;
        }
    };
    SoudSwitchComponent.prototype.onSetSwitch = function () {
        if (GameDataManager_1.GameDataManagerInstance.audioSwitch == 1) {
            GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
            GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.stopAllAudio();
            //开 -> 关
            GameDataManager_1.GameDataManagerInstance.audioSwitch = 0;
            this.offNode.active = true;
            this.onNode.active = false;
        }
        else {
            GameDataManager_1.GameDataManagerInstance.audioSwitch = 1;
            GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playBgAudio();
            this.offNode.active = false;
            this.onNode.active = true;
        }
        GameDataManager_1.GameDataManagerInstance.saveGameData();
    };
    __decorate([
        property(cc.Node)
    ], SoudSwitchComponent.prototype, "offNode", void 0);
    __decorate([
        property(cc.Node)
    ], SoudSwitchComponent.prototype, "onNode", void 0);
    SoudSwitchComponent = __decorate([
        ccclass
    ], SoudSwitchComponent);
    return SoudSwitchComponent;
}(cc.Component));
exports.default = SoudSwitchComponent;
