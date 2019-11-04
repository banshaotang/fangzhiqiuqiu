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
var ResourcesManager_1 = require("../ResourcesManager");
var GuanqiaComponent_1 = __importDefault(require("../logic/GuanqiaComponent"));
var GameRootComponent_1 = require("../GameRootComponent");
var ADManager_1 = require("../wx/ADManager");
var JuzhenManager_1 = require("../wx/JuzhenManager");
var ResultUIComponent_1 = __importDefault(require("./ResultUIComponent"));
var GameConstant_1 = __importDefault(require("../GameConstant"));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 游戏内UI
 */
var GameUIComponent = /** @class */ (function (_super) {
    __extends(GameUIComponent, _super);
    function GameUIComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guanqiaNode = null;
        _this.guanqiaNumLabel = null;
        _this.continueBtnNode = null;
        _this.tiliNode = null;
        _this.tiliNumLabel = null;
        _this.tiliTimeLabel = null;
        _this.passLabelNode = null;
        _this.youziZhutuisJuzhenqiang = null; //柚子-矩阵墙
        _this.youziFloatBtnNode = null; //柚子-抽屉按钮
        _this.youziFloatNode = null; //柚子-抽屉按钮
        _this.youziMatrixNode = null; //柚子的-banner
        _this.continueBtnBaseY = 0; //继续按钮的初始y坐标
        _this.curGuanqia = null; //当前的关卡
        _this.passAllGuanqiaFlag = false; //通关标志
        _this.maxGuanqiaId = 40; //最大关卡等级
        _this.showWxBannerFlag = true;
        _this.restartGuaqiaId = 1; //重玩时的关卡id
        // private onTouchStart(touch: cc.Event.EventTouch) {
        //     // GlobalManagerInstance.gameComponent.audioComponent.playCN_shacheAudio();
        // }
        // private onTouchEnd() {
        //     // GlobalManagerInstance.gameComponent.audioComponent.stopCN_shacheAudio();
        // }
        // private onTouchMove(touch: cc.Event.EventTouch) {}
        _this.tiliTimeInt = -1;
        //====
        //====
        // /**
        //  * 显示复活UI
        //  */
        // private fuhuoUIShow() {
        //     ResourcesManagerInstance.dynamicLoadView(PrefabNameEnum.fuhuoUI, this.uiRootNOde, FuhuoUIComponent, (sc: FuhuoUIComponent) => {
        //         sc.show();
        //     });
        // }
        _this.resultNode = null;
        return _this;
    }
    GameUIComponent.prototype.onLoad = function () {
        this.initEvent();
        this.initData();
    };
    GameUIComponent.prototype.show = function () {
        if (this.showWxBannerFlag) {
            ADManager_1.ADManagerInstance.createWXBanner3(0);
        }
        this.playGuanqia(GameDataManager_1.GameDataManagerInstance.curGuaqiaId);
    };
    /**
     * 开始游戏
     */
    GameUIComponent.prototype.startGame = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.setGameStart();
        // GlobalManagerInstance.gameComponent.audioComponent.playCN_start321Audio();
    };
    GameUIComponent.prototype.initData = function () {
        var _this = this;
        this.continueBtnBaseY = this.continueBtnNode.y;
        // this.playGuanqia(GameDataManagerInstance.curGuaqiaId);
        /**柚子-抽屉按钮 */
        JuzhenManager_1.JuzhenManagerInstance.chuangjianFloat(this.youziFloatBtnNode, this.youziFloatNode, true);
        this.showWxBannerFlag = false;
        this.scheduleOnce(function () {
            _this.showWxBannerFlag = true;
            GlobalManager_1.GlobalManagerInstance.bannerPanelUIShow(_this.node);
        }, 2);
        this.createYouziMatrix();
        // ADManagerInstance.createWXBanner3(0);
    };
    /**
     * 创建柚子矩阵
     */
    GameUIComponent.prototype.createYouziMatrix = function () {
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
    /**
     * 开始关卡
     * @param guanqiaId
     */
    GameUIComponent.prototype.playGuanqia = function (guanqiaId) {
        var _this = this;
        this.curGuanqia = null;
        // guanqiaId = 40;
        this.passLabelNode.active = false;
        this.continueBtnNode.active = false;
        this.tiliNode.active = false;
        GameDataManager_1.GameDataManagerInstance.reinitGameData();
        this.guanqiaNumLabel.string = "\u5173\u5361" + guanqiaId;
        this.guanqiaNode.removeAllChildren();
        //TODO 0821 测试使用
        guanqiaId = guanqiaId % this.maxGuanqiaId;
        if (guanqiaId == 0) {
            guanqiaId = this.maxGuanqiaId;
        }
        this.restartGuaqiaId = guanqiaId;
        ResourcesManager_1.ResourcesManagerInstance.dynamicLoadView(ResourcesManager_1.PrefabNameEnum.guaqianPre + guanqiaId, this.guanqiaNode, GuanqiaComponent_1.default, function (sc) {
            sc.show();
            _this.curGuanqia = sc;
            GlobalManager_1.GlobalManagerInstance.sendAppOnceLogOfGuanqia(guanqiaId, true);
            _this.startGame();
        });
    };
    /**
     * 关卡结束
     */
    GameUIComponent.prototype.endGuanqia = function () {
        var _this = this;
        GlobalManager_1.GlobalManagerInstance.gameComponent.gameStateEnum = GameRootComponent_1.GameStateEnum.end;
        this.passLabelNode.scale = 0;
        this.passLabelNode.active = true;
        this.passLabelNode.runAction(cc.scaleTo(0.2, 0.6));
        this.continueBtnNode.y = -800;
        this.continueBtnNode.active = true;
        this.continueBtnNode.runAction(cc.sequence(cc.delayTime(0.2), cc.moveTo(0.2, cc.v2(this.continueBtnNode.x, this.continueBtnBaseY)), cc.callFunc(function () {
            if (GameDataManager_1.GameDataManagerInstance.tiliNum == 0) {
                _this.setCurTiliInfo();
                _this.tiliNode.active = true;
            }
        })));
        GlobalManager_1.GlobalManagerInstance.sendAppOnceLogOfGuanqia(GameDataManager_1.GameDataManagerInstance.curGuaqiaId, false);
        //TODO 0829 最大等级
        if (GameDataManager_1.GameDataManagerInstance.curGuaqiaId < this.maxGuanqiaId) {
            GameDataManager_1.GameDataManagerInstance.curGuaqiaId += 1;
            GameDataManager_1.GameDataManagerInstance.maxGuaqiaId = Math.max(GameDataManager_1.GameDataManagerInstance.curGuaqiaId, GameDataManager_1.GameDataManagerInstance.maxGuaqiaId);
        }
        else {
            this.passAllGuanqiaFlag = true;
        }
        GameDataManager_1.GameDataManagerInstance.saveGameData();
        GameDataManager_1.GameDataManagerInstance.playNumOfLogin++;
        if (GameDataManager_1.GameDataManagerInstance.playNumOfLogin % 2 == 0) {
            ADManager_1.ADManagerInstance.createInterstitialAdAndShow(function () {
                _this.resultUIShow();
            });
        }
        else {
            this.resultUIShow();
        }
    };
    /**
    * 设置体力信息
    */
    GameUIComponent.prototype.setCurTiliInfo = function () {
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
    /**
     * 初始化事件
     */
    GameUIComponent.prototype.initEvent = function () {
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    };
    /**
     * 验证体力恢复
     */
    GameUIComponent.prototype.checkTiliTime = function (dt) {
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
    GameUIComponent.prototype.update = function (dt) {
        this.checkTiliTime(dt);
        if (!GlobalManager_1.GlobalManagerInstance.gameComponent.isStarting()) {
            return;
        }
    };
    /**
     * 设置暂停的信息
     */
    GameUIComponent.prototype.setPauseInfo = function (isPause) {
    };
    //====
    /**
     * 继续游戏(下一关)
     */
    GameUIComponent.prototype.onContinue = function () {
        var _this = this;
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        if (GameDataManager_1.GameDataManagerInstance.tiliNum <= 0) {
            GlobalManager_1.GlobalManagerInstance.getTiliUIShow(this.node, false);
            return;
        }
        GameDataManager_1.GameDataManagerInstance.tiliNum--;
        GameDataManager_1.GameDataManagerInstance.saveGameData();
        this.continueBtnNode.active = false;
        this.tiliNode.active = false;
        if (this.curGuanqia) {
            this.curGuanqia.coverTheLid(function () {
                if (_this.passAllGuanqiaFlag) {
                    GlobalManager_1.GlobalManagerInstance.gameComponent.showTips();
                    GlobalManager_1.GlobalManagerInstance.gameComponent.gameToMenu();
                }
                else {
                    _this.playGuanqia(GameDataManager_1.GameDataManagerInstance.curGuaqiaId);
                    // this.resultUIShow();
                }
            });
        }
        else {
            this.playGuanqia(GameDataManager_1.GameDataManagerInstance.curGuaqiaId);
            // this.resultUIShow();
        }
    };
    /**
     * 设置
     */
    GameUIComponent.prototype.onSetting = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
    };
    /**
     * 刷新
     */
    GameUIComponent.prototype.onFlush = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
    };
    /**
     * 提示
     */
    GameUIComponent.prototype.onTips = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
    };
    /**
     * 暂停
     */
    GameUIComponent.prototype.onPause = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
    };
    /**
     * 主页
     */
    GameUIComponent.prototype.onHome = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        // cc.director.loadScene('game');
        GameDataManager_1.GameDataManagerInstance.curGuaqiaId = GameDataManager_1.GameDataManagerInstance.maxGuaqiaId;
        GameDataManager_1.GameDataManagerInstance.saveGameData();
        GlobalManager_1.GlobalManagerInstance.gameComponent.gameToMenu();
    };
    /**
     * 重玩
     */
    GameUIComponent.prototype.onRestart = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        this.toRestart();
    };
    /**
     * 通过关卡开始游戏
     */
    GameUIComponent.prototype.guanqiaToStart = function () {
        if (this.resultNode) {
            this.resultNode.destroy();
        }
        this.playGuanqia(GameDataManager_1.GameDataManagerInstance.curGuaqiaId);
    };
    GameUIComponent.prototype.toRestart = function () {
        // GlobalManagerInstance.gameComponent.audioComponent.stopBgAudio();
        // cc.director.loadScene('game');
        GameDataManager_1.GameDataManagerInstance.curGuaqiaId = this.restartGuaqiaId;
        this.playGuanqia(this.restartGuaqiaId);
    };
    /**
     * 退出弹出矩阵
     */
    GameUIComponent.prototype.onExitToJuzhen = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playClickAudio();
        JuzhenManager_1.JuzhenManagerInstance.chuangjianJuzhenqiang(this.youziZhutuisJuzhenqiang);
    };
    /**
     * 显示结算
     */
    GameUIComponent.prototype.resultUIShow = function () {
        var _this = this;
        ResourcesManager_1.ResourcesManagerInstance.dynamicLoadView(ResourcesManager_1.PrefabNameEnum.resultUI, this.node, ResultUIComponent_1.default, function (sc) {
            _this.resultNode = sc.node;
            sc.show();
        });
    };
    __decorate([
        property(cc.Node)
    ], GameUIComponent.prototype, "guanqiaNode", void 0);
    __decorate([
        property(cc.Label)
    ], GameUIComponent.prototype, "guanqiaNumLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameUIComponent.prototype, "continueBtnNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameUIComponent.prototype, "tiliNode", void 0);
    __decorate([
        property(cc.Label)
    ], GameUIComponent.prototype, "tiliNumLabel", void 0);
    __decorate([
        property(cc.Label)
    ], GameUIComponent.prototype, "tiliTimeLabel", void 0);
    __decorate([
        property(cc.Node)
    ], GameUIComponent.prototype, "passLabelNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameUIComponent.prototype, "youziZhutuisJuzhenqiang", void 0);
    __decorate([
        property(cc.Node)
    ], GameUIComponent.prototype, "youziFloatBtnNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameUIComponent.prototype, "youziFloatNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameUIComponent.prototype, "youziMatrixNode", void 0);
    GameUIComponent = __decorate([
        ccclass
    ], GameUIComponent);
    return GameUIComponent;
}(cc.Component));
exports.default = GameUIComponent;
