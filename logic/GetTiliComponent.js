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
var JuzhenManager_1 = require("../wx/JuzhenManager");
var GlobalManager_1 = require("../GlobalManager");
var ADManager_1 = require("../wx/ADManager");
var GameDataManager_1 = require("../GameDataManager");
var GameConstant_1 = __importDefault(require("../GameConstant"));
var WxSdk_1 = __importDefault(require("../wx/lib/WxSdk"));
var GlogManager_1 = require("../glog/GlogManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 获得体力的UI
 */
var GetTiliComponent = /** @class */ (function (_super) {
    __extends(GetTiliComponent, _super);
    function GetTiliComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.youziFloatBtnNode = null; //柚子-抽屉按钮
        _this.youziFloatNode = null; //柚子-抽屉按钮
        _this.youziSmallMatrixWallNode = null; //柚子-小矩阵墙类型
        _this.youziMatrixNode = null; //柚子-底部大banner
        _this.youziZhutuiNode1 = null; //柚子-主推1
        _this.youziZhutuiNode2 = null; //柚子-主推2
        _this.youziZhutuiNode3 = null; //柚子-主推3
        _this.youziZhutuiNode4 = null; //柚子-主推4
        _this.youziZhutuisJuzhenqiang = null; //柚子-矩阵墙
        _this.fromMenuFlag = false; //是否从menu页过来的
        return _this;
    }
    GetTiliComponent.prototype.show = function (fromMenuFlag) {
        this.fromMenuFlag = fromMenuFlag;
        if (fromMenuFlag) {
            ADManager_1.ADManagerInstance.createWXBanner3(0);
        }
        this.initYouzi();
    };
    GetTiliComponent.prototype.initYouzi = function () {
        /**柚子-抽屉按钮 */
        JuzhenManager_1.JuzhenManagerInstance.chuangjianFloat(this.youziFloatBtnNode, this.youziFloatNode);
        // GlobalManagerInstance.gameComponent.createYouziMatrix();
        // JuzhenManagerInstance.chuangjianYouziSmallMatrixWall(this.youziSmallMatrixWallNode);
        this.createYouziMatrix();
        /**柚子- 主推类型 推广位 */
        // JuzhenManagerInstance.chuangjianZhuTui(this.youziZhutuiNode, 104, 130);
        JuzhenManager_1.JuzhenManagerInstance.chuangjianZhuTuis([
            this.youziZhutuiNode1,
            this.youziZhutuiNode2,
            this.youziZhutuiNode3,
            this.youziZhutuiNode4,
        ], this.youziZhutuisJuzhenqiang);
    };
    /**
     * 创建柚子矩阵
     */
    GetTiliComponent.prototype.createYouziMatrix = function () {
        JuzhenManager_1.JuzhenManagerInstance.chuangjianYouziUIMatrix(this.youziMatrixNode);
        var baseY = -550;
        var winSize = cc.winSize;
        baseY = baseY - (winSize.height - 1280) / 2;
        // if (GlobalManagerInstance.isIphoneX()) {
        //     baseY += GlobalManagerInstance.iphoneXOffsetY / 2;
        // }
        //下边显示微信bannerl，上边显示矩阵banner
        // baseY += 250;
        baseY += 205;
        if (GlobalManager_1.GlobalManagerInstance.isIphoneX()) {
            baseY += 25;
        }
        this.youziMatrixNode.y = baseY;
    };
    GetTiliComponent.prototype.onClose = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        if (this.fromMenuFlag) {
            ADManager_1.ADManagerInstance.hideBannerAd();
        }
        this.node.destroy();
    };
    GetTiliComponent.prototype.onGetTili = function () {
        var _this = this;
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        //视频获得
        ADManager_1.ADManagerInstance.showRewardedVideoAd(function (isOk, isShare) {
            if (isOk) {
                if (!cc.isValid(_this.node)) {
                    return;
                }
                // GlogManagererInstance.sendActionLog(ActionLogType.成功获得免费门票弹窗给的门票, 0);
                GameDataManager_1.GameDataManagerInstance.tiliNum = GameConstant_1.default.tiliVideoPrize;
                GameDataManager_1.GameDataManagerInstance.tiliTime = 0;
                GameDataManager_1.GameDataManagerInstance.saveGameData();
                GlobalManager_1.GlobalManagerInstance.gameComponent.menuUI.setCurTiliInfo();
                if (GlobalManager_1.GlobalManagerInstance.gameComponent.gameUI) {
                    GlobalManager_1.GlobalManagerInstance.gameComponent.gameUI.tiliNode.active = false;
                }
                if (_this.fromMenuFlag) {
                    ADManager_1.ADManagerInstance.hideBannerAd();
                }
                _this.node.destroy();
            }
            else {
                //分享
                if (isShare) {
                    WxSdk_1.default.showToast('获取视频失败');
                }
            }
        }, GlogManager_1.AdVideoLogType.getTili);
    };
    __decorate([
        property(cc.Node)
    ], GetTiliComponent.prototype, "youziFloatBtnNode", void 0);
    __decorate([
        property(cc.Node)
    ], GetTiliComponent.prototype, "youziFloatNode", void 0);
    __decorate([
        property(cc.Node)
    ], GetTiliComponent.prototype, "youziSmallMatrixWallNode", void 0);
    __decorate([
        property(cc.Node)
    ], GetTiliComponent.prototype, "youziMatrixNode", void 0);
    __decorate([
        property(cc.Node)
    ], GetTiliComponent.prototype, "youziZhutuiNode1", void 0);
    __decorate([
        property(cc.Node)
    ], GetTiliComponent.prototype, "youziZhutuiNode2", void 0);
    __decorate([
        property(cc.Node)
    ], GetTiliComponent.prototype, "youziZhutuiNode3", void 0);
    __decorate([
        property(cc.Node)
    ], GetTiliComponent.prototype, "youziZhutuiNode4", void 0);
    __decorate([
        property(cc.Node)
    ], GetTiliComponent.prototype, "youziZhutuisJuzhenqiang", void 0);
    GetTiliComponent = __decorate([
        ccclass
    ], GetTiliComponent);
    return GetTiliComponent;
}(cc.Component));
exports.default = GetTiliComponent;
