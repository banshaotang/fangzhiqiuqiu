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
var GlobalManager_1 = require("../GlobalManager");
var GuanqiaUnitComponent_1 = __importDefault(require("../logic/GuanqiaUnitComponent"));
var JuzhenManager_1 = require("../wx/JuzhenManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 关卡的UI
 */
var GuanqiaUIComponent = /** @class */ (function (_super) {
    __extends(GuanqiaUIComponent, _super);
    function GuanqiaUIComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guanqiaUnitPrefab = null;
        _this.pageView = null;
        _this.youziZhutuiNode1 = null; //柚子-主推1
        _this.youziZhutuiNode2 = null; //柚子-主推2
        _this.youziZhutuiNode3 = null; //柚子-主推3
        _this.youziZhutuiNode4 = null; //柚子-主推4
        _this.youziZhutuisJuzhenqiang = null; //柚子-矩阵墙
        _this.youziFloatBtnNode = null; //柚子-抽屉按钮
        _this.youziFloatNode = null; //柚子-抽屉按钮
        _this.youziMatrixNode = null; //柚子的-banner
        _this.isFromMenuFlag = true;
        _this.guanqiaNum = 40;
        _this.pageNum = 20;
        _this.pageItemWidth = 600;
        _this.pageItemHeight = 750;
        _this.itemWidth = 110;
        _this.itemHeight = 110;
        _this.offsetX = 40;
        _this.offsetY = 45;
        return _this;
    }
    GuanqiaUIComponent.prototype.show = function (isFromMenuFlag) {
        this.isFromMenuFlag = isFromMenuFlag;
        this.initData();
        this.initYouzi();
    };
    GuanqiaUIComponent.prototype.initData = function () {
        var baseX = -this.pageItemWidth / 2 + this.itemWidth / 2 + 5;
        var baseY = this.pageItemHeight / 2 - this.itemHeight / 2 - 5;
        var count = 0;
        var node = null;
        for (var i = 0; i < this.guanqiaNum; i++) {
            if (count == 0) {
                node = new cc.Node();
                node.width = this.pageItemWidth;
                node.height = this.pageItemHeight;
                this.pageView.addPage(node);
            }
            var unit = cc.instantiate(this.guanqiaUnitPrefab);
            node.addChild(unit);
            var sc = unit.getComponent(GuanqiaUnitComponent_1.default);
            sc.initData(i + 1, this.node, this.isFromMenuFlag);
            unit.x = baseX + (this.itemWidth + this.offsetX) * (i % this.pageNum % 4);
            unit.y = baseY - (this.itemHeight + this.offsetY) * (Math.floor(i % this.pageNum / 4));
            count++;
            if (count == this.pageNum) {
                count = 0;
            }
        }
    };
    GuanqiaUIComponent.prototype.initYouzi = function () {
        /**柚子- 主推类型 推广位 */
        // JuzhenManagerInstance.chuangjianZhuTui(this.youziZhutuiNode, 104, 130);
        JuzhenManager_1.JuzhenManagerInstance.chuangjianZhuTuis([
            this.youziZhutuiNode1,
            this.youziZhutuiNode2,
            this.youziZhutuiNode3,
            this.youziZhutuiNode4,
        ], this.youziZhutuisJuzhenqiang);
        // JuzhenManagerInstance.chuangjianGengduoyouxi(this.youziJuzhenBtnNode, this.youziJuzhenPanelNode,
        //     () => {
        //         // ADManagerInstance.hideBannerAd();
        //     },
        //     () => {
        //         // GlobalManagerInstance.showJuzhenqiangFlag = false;
        //         // ADManagerInstance.showBannerAd(true);
        //     });
        /**柚子-抽屉按钮 */
        JuzhenManager_1.JuzhenManagerInstance.chuangjianFloat(this.youziFloatBtnNode, this.youziFloatNode);
        // GlobalManagerInstance.gameComponent.createYouziMatrix();
        this.createYouziMatrix();
    };
    /**
     * 创建柚子矩阵
     */
    GuanqiaUIComponent.prototype.createYouziMatrix = function () {
        JuzhenManager_1.JuzhenManagerInstance.chuangjianYouziUIMatrix(this.youziMatrixNode);
        var baseY = -550;
        var winSize = cc.winSize;
        baseY = baseY - (winSize.height - 1280) / 2;
        if (GlobalManager_1.GlobalManagerInstance.isIphoneX()) {
            baseY += GlobalManager_1.GlobalManagerInstance.iphoneXOffsetY / 2;
        }
        this.youziMatrixNode.y = baseY;
    };
    GuanqiaUIComponent.prototype.onBack = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        this.node.destroy();
    };
    __decorate([
        property(cc.Prefab)
    ], GuanqiaUIComponent.prototype, "guanqiaUnitPrefab", void 0);
    __decorate([
        property(cc.PageView)
    ], GuanqiaUIComponent.prototype, "pageView", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUIComponent.prototype, "youziZhutuiNode1", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUIComponent.prototype, "youziZhutuiNode2", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUIComponent.prototype, "youziZhutuiNode3", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUIComponent.prototype, "youziZhutuiNode4", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUIComponent.prototype, "youziZhutuisJuzhenqiang", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUIComponent.prototype, "youziFloatBtnNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUIComponent.prototype, "youziFloatNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaUIComponent.prototype, "youziMatrixNode", void 0);
    GuanqiaUIComponent = __decorate([
        ccclass
    ], GuanqiaUIComponent);
    return GuanqiaUIComponent;
}(cc.Component));
exports.default = GuanqiaUIComponent;
