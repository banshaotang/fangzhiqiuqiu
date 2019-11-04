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
var AudioComponent_1 = __importDefault(require("./AudioComponent"));
var GameDataManager_1 = require("./GameDataManager");
var MenuUIComponent_1 = __importDefault(require("./ui/MenuUIComponent"));
var GameUIComponent_1 = __importDefault(require("./ui/GameUIComponent"));
var GlobalManager_1 = require("./GlobalManager");
var ResourcesManager_1 = require("./ResourcesManager");
var WxSdk_1 = __importDefault(require("./wx/lib/WxSdk"));
var WxGameSdkManager_1 = require("./wx/WxGameSdkManager");
var Youzi_1 = require("../resources/youzi/Youzi");
var GlogManager_1 = require("./glog/GlogManager");
var ADManager_1 = require("./wx/ADManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 游戏root逻辑类
 */
var GameRootComponent = /** @class */ (function (_super) {
    __extends(GameRootComponent, _super);
    function GameRootComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameRootNode = null; //游戏逻辑类的根节点
        _this.menuRootNode = null; //主界面逻辑类的根节点
        _this.tipsNode = null; //新关卡即将到来
        _this.loadViewLoadingNode = null; //加载view的loading页
        _this.loadIngNode = null; //加载view的loading页的loading
        _this.audioComponent = null; //音效管理类
        _this.menuUI = null; //menu ui
        _this.gameUI = null; //game ui
        //====
        _this.checkBannerTime = 0;
        _this.checkBannerMaxTime = 5;
        return _this;
    }
    GameRootComponent.prototype.onLoad = function () {
        // 初始化大数据平台的日志
        GlogManager_1.GlogManagererInstance.initData();
        GlogManager_1.GlogManagererInstance.sendAppOnceLog(GlogManager_1.AppOnceActionType.onLoadOk);
        // Youzi.init('wx3894c4f73b71ab9e', '1.00.01', 1002);
        this.gameStateEnum = GameStateEnum.pause;
        Youzi_1.Youzi.init('wx312ed3feb9edebb4', '1.00.01', 1002);
        // Youzi.init('wx331caf4dd4655b18', '1.00.01', 1002);
        //加载评审后信息
        // WxGameSdkManagerInstance.loadReviewVersionCodeInfo();
        this.audioComponent = this.node.getComponent(AudioComponent_1.default);
        //开启碰撞
        cc.director.getCollisionManager().enabled = true;
        //开启 debug 绘制，默认是关闭的
        // cc.director.getCollisionManager().enabledDebugDraw = true;
    };
    GameRootComponent.prototype.start = function () {
        GlobalManager_1.GlobalManagerInstance.init(this);
        this.tipsNode.active = false;
        this.init();
    };
    GameRootComponent.prototype.init = function () {
        var _this = this;
        /**加载游戏数据 */
        GameDataManager_1.GameDataManagerInstance.loadData(function () {
            GlogManager_1.GlogManagererInstance.sendAppOnceLog(GlogManager_1.AppOnceActionType.loadGameDataOk);
            _this.loadGameDataCallback();
        });
    };
    /**
     * 加载玩家数据回调
     */
    GameRootComponent.prototype.loadGameDataCallback = function () {
        // 初始分享信息
        if (WxSdk_1.default.isWeChatGame()) {
            if (!WxGameSdkManager_1.WxGameSdkManagerInstance.isInitWxGameSdkManagerFlag) {
                /*
                //0704 移到 initCDBInfo 中
                // WxSdk.startGameInit();
                // WxGameSdkManagerInstance.setShareAppMessage();
                this.initCDBInfo();
                */
                //不使用sdb的逻辑
                WxSdk_1.default.startGameInit();
                WxGameSdkManager_1.WxGameSdkManagerInstance.setShareAppMessage();
                // ADManagerInstance.createWXBanner2(true);
                WxGameSdkManager_1.WxGameSdkManagerInstance.isInitWxGameSdkManagerFlag = true;
            }
        }
        //TODO 0506 暂时屏蔽
        // this.initSdkCallback();
        // ADManagerInstance.initRewardedVideoAd();
        // ADManagerInstance.createWXBanner2();
        //==============
        this.initData();
    };
    /**
     * 显示menu的UI
     */
    GameRootComponent.prototype.showMenuUI = function () {
        if (this.menuUI != null) {
            // this.audioComponent.playMenuBgAudio();
            return;
        }
        this.menuUIShow();
    };
    /**
     * 显示的UI
     */
    GameRootComponent.prototype.showGameUI = function () {
        if (this.gameUI != null) {
            this.gameRootNode.active = true;
            this.menuRootNode.active = false;
            this.gameUI.show();
            return;
        }
        this.gameUIShow(function () {
        });
    };
    /**
     * 游戏界面到menu界面
     */
    GameRootComponent.prototype.gameToMenu = function () {
        ADManager_1.ADManagerInstance.hideBannerAd();
        //计算离线的收益
        this.menuUI.setGameToMenuData();
        this.gameRootNode.active = false;
        this.menuRootNode.active = true;
    };
    /**
     * 初始化基础数据
     */
    GameRootComponent.prototype.initData = function () {
        this.showMenuUI();
        GlogManager_1.GlogManagererInstance.sendAdLogin();
    };
    /**
     * 设置游戏暂停
     */
    GameRootComponent.prototype.setGamePause = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.gameStateEnum = GameStateEnum.pause;
    };
    GameRootComponent.prototype.isGamePause = function () {
        return GlobalManager_1.GlobalManagerInstance.gameComponent.gameStateEnum == GameStateEnum.pause;
    };
    /**
     * 设置游戏开始
     */
    GameRootComponent.prototype.setGameStart = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.gameStateEnum = GameStateEnum.start;
    };
    /**
     * 设置游戏复活
     */
    GameRootComponent.prototype.setGameFuhuoUI = function () {
        GlobalManager_1.GlobalManagerInstance.gameComponent.gameStateEnum = GameStateEnum.pause;
        // this.gameUI.showFuhuoUI();
    };
    /**
     * 游戏是否开始中
     */
    GameRootComponent.prototype.isStarting = function () {
        return this.gameStateEnum == GameStateEnum.start;
    };
    // /**
    //  * 验证动态存储
    //  */
    // private checkSaveGameDataAsyn(dt: number) {
    //     if (!GameDataManagerInstance.saveGameDataAsynFlag) {
    //         return;
    //     }
    //     if (GameDataManagerInstance.saveGameDataAsynTime < GameDataManagerInstance.saveGameDataAsynMaxTime) {
    //         GameDataManagerInstance.saveGameDataAsynTime += dt;
    //         return;
    //     }
    //     GameDataManagerInstance.saveGameData();
    // }
    GameRootComponent.prototype.showTips = function () {
        var _this = this;
        this.tipsNode.active = true;
        this.tipsNode.runAction(cc.sequence(cc.delayTime(2.5), cc.callFunc(function () {
            _this.tipsNode.active = false;
        })));
    };
    GameRootComponent.prototype.checkBannelUpdate = function (dt) {
        // this.checkBannerTime += dt;
        // if (this.checkBannerTime < this.checkBannerMaxTime) {
        //     return;
        // }
        // this.checkBannerTime = 0;
        // ADManagerInstance.checkChangeBannerAd();
    };
    GameRootComponent.prototype.update = function (dt) {
        this.checkBannelUpdate(dt);
    };
    //============
    /**
     * 显示loading
     * @param isShow
     */
    GameRootComponent.prototype.showLoading = function (isShow) {
        if (!cc.isValid(this.node)) {
            return;
        }
        if (isShow) {
            GlobalManager_1.GlobalManagerInstance.dynamicLoadViewFlag = true;
            this.loadViewLoadingNode.active = true;
            this.loadIngNode.runAction(cc.rotateBy(5, 360).repeatForever());
        }
        else {
            GlobalManager_1.GlobalManagerInstance.dynamicLoadViewFlag = false;
            this.loadIngNode.stopAllActions();
            this.loadViewLoadingNode.active = false;
        }
    };
    //============
    //============
    /**
     * 显示menu ui
     */
    GameRootComponent.prototype.menuUIShow = function () {
        var _this = this;
        ResourcesManager_1.ResourcesManagerInstance.dynamicLoadView(ResourcesManager_1.PrefabNameEnum.menuUI, this.menuRootNode, MenuUIComponent_1.default, function (sc) {
            // sc.show(type, atType);
            _this.menuUI = sc;
            // this.audioComponent.playMenuBgAudio();
        });
    };
    /**
     * 显示game ui
     */
    GameRootComponent.prototype.gameUIShow = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        ResourcesManager_1.ResourcesManagerInstance.dynamicLoadView(ResourcesManager_1.PrefabNameEnum.gameUI, this.gameRootNode, GameUIComponent_1.default, function (sc) {
            // sc.show(type, atType);
            _this.gameUI = sc;
            _this.menuRootNode.active = false;
            _this.gameUI.show();
            if (callback) {
                callback();
            }
        });
    };
    __decorate([
        property(cc.Node)
    ], GameRootComponent.prototype, "gameRootNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameRootComponent.prototype, "menuRootNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameRootComponent.prototype, "tipsNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameRootComponent.prototype, "loadViewLoadingNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameRootComponent.prototype, "loadIngNode", void 0);
    GameRootComponent = __decorate([
        ccclass
    ], GameRootComponent);
    return GameRootComponent;
}(cc.Component));
exports.default = GameRootComponent;
/**
 * 游戏状态
 */
var GameStateEnum;
(function (GameStateEnum) {
    //0为未开始 1为开始游戏 2为结束 3为暂停 4为在menu页面 5为在游戏界面
    GameStateEnum[GameStateEnum["noStart"] = 0] = "noStart";
    GameStateEnum[GameStateEnum["start"] = 1] = "start";
    GameStateEnum[GameStateEnum["end"] = 2] = "end";
    GameStateEnum[GameStateEnum["pause"] = 3] = "pause";
    GameStateEnum[GameStateEnum["menu"] = 4] = "menu";
    // game = 5,
})(GameStateEnum = exports.GameStateEnum || (exports.GameStateEnum = {}));
