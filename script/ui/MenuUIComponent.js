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
var GameDataManager_1 = require("../GameDataManager");
var JuzhenManager_1 = require("../wx/JuzhenManager");
var SoudSwitchComponent_1 = __importDefault(require("../logic/SoudSwitchComponent"));
var WxGameSdkManager_1 = require("../wx/WxGameSdkManager");
var GlogManager_1 = require("../glog/GlogManager");
var GameConstant_1 = __importDefault(require("../GameConstant"));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * menu的UI
 */
var MenuUIComponent = /** @class */ (function (_super) {
    __extends(MenuUIComponent, _super);
    function MenuUIComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guanqiaLabel = null;
        _this.youziZhutuiNode1 = null; //柚子-主推1
        _this.youziZhutuiNode2 = null; //柚子-主推2
        _this.youziZhutuiNode3 = null; //柚子-主推3
        _this.youziZhutuiNode4 = null; //柚子-主推4
        _this.youziZhutuisJuzhenqiang = null; //柚子-矩阵墙
        _this.youziFloatBtnNode = null; //柚子-抽屉按钮
        _this.youziFloatNode = null; //柚子-抽屉按钮
        _this.soudSwitch = null;
        _this.youziMatrixNode = null; //柚子的-banner
        _this.tiliNumLabel = null;
        _this.tiliTimeLabel = null;
        //======
        //========
        _this.tiliTimeInt = -1;
        return _this;
    }
    MenuUIComponent.prototype.start = function () {
        this.initYouzi();
        this.initMenuData();
        GlogManager_1.GlogManagererInstance.sendAppOnceLog(GlogManager_1.AppOnceActionType.toMenu);
    };
    /**
     * 初始化数据
     */
    MenuUIComponent.prototype.initMenuData = function () {
        this.soudSwitch.initSwitchData();
        this.guanqiaLabel.string = "\u5173\u5361 " + GameDataManager_1.GameDataManagerInstance.maxGuaqiaId;
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playBgAudio();
        this.setCurTiliInfo();
    };
    /**
     * 设置体力信息
     */
    MenuUIComponent.prototype.setCurTiliInfo = function () {
        this.tiliNumLabel.string = "" + GameDataManager_1.GameDataManagerInstance.tiliNum;
        if (GameDataManager_1.GameDataManagerInstance.tiliNum >= GameConstant_1.default.tiliBaseNum) {
            this.tiliTimeLabel.node.active = false;
            this.tiliNumLabel.node.y = 0;
        }
        else {
            this.tiliTimeLabel.node.active = true;
            // this.tiliTimeLabel.string = `${GlobalManagerInstance.secToTime2(GameDataManagerInstance.tiliTime)}`;
            this.tiliNumLabel.node.y = 12;
        }
    };
    MenuUIComponent.prototype.initYouzi = function () {
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
    MenuUIComponent.prototype.createYouziMatrix = function () {
        JuzhenManager_1.JuzhenManagerInstance.chuangjianYouziUIMatrix(this.youziMatrixNode);
        var baseY = -550;
        var winSize = cc.winSize;
        baseY = baseY - (winSize.height - 1280) / 2;
        if (GlobalManager_1.GlobalManagerInstance.isIphoneX()) {
            baseY += GlobalManager_1.GlobalManagerInstance.iphoneXOffsetY / 2;
        }
        this.youziMatrixNode.y = baseY;
    };
    /**
     * 游戏界面回到主界面时设置数据
     */
    MenuUIComponent.prototype.setGameToMenuData = function () {
        this.initMenuData();
    };
    /**
     * 进入游戏
     */
    MenuUIComponent.prototype.toStartGame = function () {
        // GlogManagererInstance.sendAppOnceLog(AppOnceActionType.startGame);
        GlobalManager_1.GlobalManagerInstance.gameComponent.showGameUI();
    };
    //====
    /**
     * 开始游戏
     */
    MenuUIComponent.prototype.onStartGame = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        GlogManager_1.GlogManagererInstance.sendAppOnceLog(GlogManager_1.AppOnceActionType.startGame);
        if (GameDataManager_1.GameDataManagerInstance.tiliNum <= 0) {
            GlobalManager_1.GlobalManagerInstance.getTiliUIShow(this.node, true);
            return;
        }
        GameDataManager_1.GameDataManagerInstance.tiliNum--;
        GameDataManager_1.GameDataManagerInstance.saveGameData();
        this.setCurTiliInfo();
        this.toStartGame();
    };
    /**
     * 设置
     */
    MenuUIComponent.prototype.onSetting = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
    };
    /**
     * 排行
     */
    MenuUIComponent.prototype.onRank = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
    };
    /**
     * 关卡
     */
    MenuUIComponent.prototype.onGuanqia = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        GlobalManager_1.GlobalManagerInstance.guanqiaUIShow(this.node, true);
    };
    /**
     * 分享
     */
    MenuUIComponent.prototype.onShare = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        // ADManagerInstance.hideBannerAd();
        WxGameSdkManager_1.WxGameSdkManagerInstance.shareAppMessage(null, GlogManager_1.ShareLogType.menuShare);
        // this.scheduleOnce(() => {
        //     ADManagerInstance.showBannerAd(true);
        // }, 0.5);
    };
    /**
     * 更多游戏
     */
    MenuUIComponent.prototype.onMoreGame = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        GlobalManager_1.GlobalManagerInstance.bannerPanelUIShow(this.node);
    };
    /**
     * 验证体力恢复
     */
    MenuUIComponent.prototype.checkTiliTime = function (dt) {
        if (GameDataManager_1.GameDataManagerInstance.tiliTime == 0) {
            if (GameDataManager_1.GameDataManagerInstance.tiliNum < GameConstant_1.default.tiliBaseNum) {
                GameDataManager_1.GameDataManagerInstance.tiliTime = new Date().getTime() / 1000;
            }
            return;
        }
        var curTime = new Date().getTime() / 1000;
        var needTime = GameConstant_1.default.tiliHuifuTime;
        var subTime1 = curTime - GameDataManager_1.GameDataManagerInstance.tiliTime;
        var subTime2 = 0; //显示的剩余恢复时间
        if (subTime1 >= needTime) {
            var addNum = Math.floor(subTime1 / needTime);
            GameDataManager_1.GameDataManagerInstance.tiliNum += addNum;
            if (GameDataManager_1.GameDataManagerInstance.tiliNum >= GameConstant_1.default.tiliBaseNum) {
                //恢复满了
                GameDataManager_1.GameDataManagerInstance.tiliTime = 0;
            }
            else {
                GameDataManager_1.GameDataManagerInstance.tiliTime = curTime;
                subTime2 = Math.floor(subTime1 % needTime);
            }
            //容错
            if (GameDataManager_1.GameDataManagerInstance.tiliNum >= GameConstant_1.default.tiliBaseNum) {
                GameDataManager_1.GameDataManagerInstance.tiliNum = GameConstant_1.default.tiliBaseNum;
            }
            this.setCurTiliInfo();
            GameDataManager_1.GameDataManagerInstance.saveGameData();
        }
        else {
            subTime2 = Math.floor(needTime - subTime1);
        }
        if (subTime2 > 0) {
            if (this.tiliTimeInt != subTime2) {
                this.tiliTimeInt = subTime2;
                this.tiliTimeLabel.string = "" + GlobalManager_1.GlobalManagerInstance.secToTime2(subTime2);
            }
        }
    };
    MenuUIComponent.prototype.update = function (dt) {
        this.checkTiliTime(dt);
    };
    __decorate([
        property(cc.Label)
    ], MenuUIComponent.prototype, "guanqiaLabel", void 0);
    __decorate([
        property(cc.Node)
    ], MenuUIComponent.prototype, "youziZhutuiNode1", void 0);
    __decorate([
        property(cc.Node)
    ], MenuUIComponent.prototype, "youziZhutuiNode2", void 0);
    __decorate([
        property(cc.Node)
    ], MenuUIComponent.prototype, "youziZhutuiNode3", void 0);
    __decorate([
        property(cc.Node)
    ], MenuUIComponent.prototype, "youziZhutuiNode4", void 0);
    __decorate([
        property(cc.Node)
    ], MenuUIComponent.prototype, "youziZhutuisJuzhenqiang", void 0);
    __decorate([
        property(cc.Node)
    ], MenuUIComponent.prototype, "youziFloatBtnNode", void 0);
    __decorate([
        property(cc.Node)
    ], MenuUIComponent.prototype, "youziFloatNode", void 0);
    __decorate([
        property(SoudSwitchComponent_1.default)
    ], MenuUIComponent.prototype, "soudSwitch", void 0);
    __decorate([
        property(cc.Node)
    ], MenuUIComponent.prototype, "youziMatrixNode", void 0);
    __decorate([
        property(cc.Label)
    ], MenuUIComponent.prototype, "tiliNumLabel", void 0);
    __decorate([
        property(cc.Label)
    ], MenuUIComponent.prototype, "tiliTimeLabel", void 0);
    MenuUIComponent = __decorate([
        ccclass
    ], MenuUIComponent);
    return MenuUIComponent;
}(cc.Component));
exports.default = MenuUIComponent;
