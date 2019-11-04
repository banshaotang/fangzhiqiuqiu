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
var JuzhenManager_1 = require("../wx/JuzhenManager");
var GlobalManager_1 = require("../GlobalManager");
var ADManager_1 = require("../wx/ADManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 自定义矩阵墙的UI
 */
var BannerPanelComponent = /** @class */ (function (_super) {
    __extends(BannerPanelComponent, _super);
    function BannerPanelComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.youziFloatBtnNode = null; //柚子-抽屉按钮
        _this.youziFloatNode = null; //柚子-抽屉按钮
        _this.youziSmallMatrixWallNode = null; //柚子-小矩阵墙类型
        _this.youziMatrixNode = null; //柚子-底部大banner
        return _this;
    }
    BannerPanelComponent.prototype.show = function () {
        this.initYouzi();
    };
    BannerPanelComponent.prototype.initYouzi = function () {
        /**柚子-抽屉按钮 */
        JuzhenManager_1.JuzhenManagerInstance.chuangjianFloat(this.youziFloatBtnNode, this.youziFloatNode);
        // GlobalManagerInstance.gameComponent.createYouziMatrix();
        JuzhenManager_1.JuzhenManagerInstance.chuangjianYouziSmallMatrixWall(this.youziSmallMatrixWallNode);
        this.createYouziMatrix();
        ADManager_1.ADManagerInstance.createWXBanner3(250);
    };
    /**
     * 创建柚子矩阵
     */
    BannerPanelComponent.prototype.createYouziMatrix = function () {
        JuzhenManager_1.JuzhenManagerInstance.chuangjianYouziUIMatrix(this.youziMatrixNode);
        var baseY = -550;
        var winSize = cc.winSize;
        baseY = baseY - (winSize.height - 1280) / 2;
        if (GlobalManager_1.GlobalManagerInstance.isIphoneX()) {
            baseY += GlobalManager_1.GlobalManagerInstance.iphoneXOffsetY / 2;
        }
        this.youziMatrixNode.y = baseY;
    };
    BannerPanelComponent.prototype.onClose = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        ADManager_1.ADManagerInstance.hideBannerAd();
        ADManager_1.ADManagerInstance.createWXBanner3(0);
        this.node.destroy();
    };
    __decorate([
        property(cc.Node)
    ], BannerPanelComponent.prototype, "youziFloatBtnNode", void 0);
    __decorate([
        property(cc.Node)
    ], BannerPanelComponent.prototype, "youziFloatNode", void 0);
    __decorate([
        property(cc.Node)
    ], BannerPanelComponent.prototype, "youziSmallMatrixWallNode", void 0);
    __decorate([
        property(cc.Node)
    ], BannerPanelComponent.prototype, "youziMatrixNode", void 0);
    BannerPanelComponent = __decorate([
        ccclass
    ], BannerPanelComponent);
    return BannerPanelComponent;
}(cc.Component));
exports.default = BannerPanelComponent;
