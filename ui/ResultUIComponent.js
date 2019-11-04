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
var WxGameSdkManager_1 = require("../wx/WxGameSdkManager");
var GlogManager_1 = require("../glog/GlogManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 结算
 */
var ResultUIComponent = /** @class */ (function (_super) {
    __extends(ResultUIComponent, _super);
    function ResultUIComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.youziFloatBtnNode = null; //柚子-抽屉按钮
        _this.youziFloatNode = null; //柚子-抽屉按钮
        _this.youziSmallMatrixWallNode = null; //柚子-小矩阵墙类型
        _this.youziZhutuiNode1 = null; //柚子-主推1
        _this.youziZhutuiNode2 = null; //柚子-主推2
        _this.youziZhutuisJuzhenqiang = null; //柚子-矩阵墙
        return _this;
    }
    ResultUIComponent.prototype.show = function () {
        // ADManagerInstance.createWXBanner2(true);
        this.initYouzi();
    };
    ResultUIComponent.prototype.initYouzi = function () {
        /**柚子- 主推类型 推广位 */
        // JuzhenManagerInstance.chuangjianZhuTui(this.youziZhutuiNode, 104, 130);
        JuzhenManager_1.JuzhenManagerInstance.chuangjianZhuTuis([
            this.youziZhutuiNode1,
            this.youziZhutuiNode2,
        ], this.youziZhutuisJuzhenqiang);
        /**柚子-抽屉按钮 */
        JuzhenManager_1.JuzhenManagerInstance.chuangjianFloat(this.youziFloatBtnNode, this.youziFloatNode);
        // GlobalManagerInstance.gameComponent.createYouziMatrix();
        JuzhenManager_1.JuzhenManagerInstance.chuangjianYouziSmallMatrixWall(this.youziSmallMatrixWallNode);
    };
    ResultUIComponent.prototype.onNext = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        // GlobalManagerInstance.gameComponent.gameUI.playGuanqia(GameDataManagerInstance.curGuaqiaId);
        // ADManagerInstance.hideBannerAd();
        this.node.destroy();
    };
    /**
     * 分享
     */
    ResultUIComponent.prototype.onShare = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        // ADManagerInstance.hideBannerAd();
        WxGameSdkManager_1.WxGameSdkManagerInstance.shareAppMessage(null, GlogManager_1.ShareLogType.result);
        // this.scheduleOnce(() => {
        //     ADManagerInstance.showBannerAd(true);
        // }, 0.5);
    };
    ResultUIComponent.prototype.onHome = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        // cc.director.loadScene('game');
        // GameDataManagerInstance.curGuaqiaId = GameDataManagerInstance.maxGuaqiaId;
        // GameDataManagerInstance.saveGameData();
        // ADManagerInstance.hideBannerAd();
        // this.node.destroy();
        // GlobalManagerInstance.gameComponent.gameToMenu();
        GlobalManager_1.GlobalManagerInstance.guanqiaUIShow(this.node, false);
    };
    __decorate([
        property(cc.Node)
    ], ResultUIComponent.prototype, "youziFloatBtnNode", void 0);
    __decorate([
        property(cc.Node)
    ], ResultUIComponent.prototype, "youziFloatNode", void 0);
    __decorate([
        property(cc.Node)
    ], ResultUIComponent.prototype, "youziSmallMatrixWallNode", void 0);
    __decorate([
        property(cc.Node)
    ], ResultUIComponent.prototype, "youziZhutuiNode1", void 0);
    __decorate([
        property(cc.Node)
    ], ResultUIComponent.prototype, "youziZhutuiNode2", void 0);
    __decorate([
        property(cc.Node)
    ], ResultUIComponent.prototype, "youziZhutuisJuzhenqiang", void 0);
    ResultUIComponent = __decorate([
        ccclass
    ], ResultUIComponent);
    return ResultUIComponent;
}(cc.Component));
exports.default = ResultUIComponent;
