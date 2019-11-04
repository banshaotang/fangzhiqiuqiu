"use strict";
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
var LocalStorageManager_1 = require("./LocalStorageManager");
var GameConstant_1 = __importDefault(require("./GameConstant"));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 游戏数据管理类
 */
var GameDataManager = /** @class */ (function () {
    function GameDataManager() {
        this.touchStartTarget = null; //点击的节点
        this.touchStartItemZIndex = 0; //item的zIndex
        this.playDropAudioFlag = false; //播放放置的音效
        this.playNumOfLogin = 0; //进行游戏的次数
        this.finishGameFlag = false;
        //====
        this.gold1 = 0; //普通金币 =a
        this.gold2 = 0; //高级金币 =b
        this.curGuaqiaId = 1; //=c 当前关卡id
        this.maxGuaqiaId = 1; //=d 最大的关卡id
        this.tiliNum = 0; //=e 剩余体力
        this.tiliTime = 0; //=f 上次恢复体力的时间戳-秒，0表示不考虑恢复
        this.addToMy = 0; //是否领取了添加到'我的小程序'礼包 1为领取 0为未领取 =x
        this.audioSwitch = 1; //音效开关：1表示开,0表示关 =y
        this.musicSwitch = 1; //背景音开关：1表示开,0表示关 =y2
        this.shakeSwitch = 1; //震动开关：1表示1，0表示关 =z
        // wxAuthorize = 0; //是否已经进行了微信授权 1是0否 =z1
        // avatarUrl = ""; //头像 =z2
        // nickName = ""; //昵称 =z3
        // version = '1'; //版本 =z4
        this.checkNextDay = 0; //验证跨天 =z5
        this.playNum = 0; //已玩的游戏局数 =z6
        this.playNumDay = 0; //当天已玩的游戏局数 =z7
        this.showJuzhenqiang = 0; //当天是否弹出了矩阵墙 =z8
        // /**
        //  * 获取注册时间 yyyy-MM-dd hh:mm:ss
        //  */
        // getRegisterTime() {
        //     let isNew = false;
        //     if (!this.registerTime || this.registerTime == 0) {
        //         this.registerTime = new Date().getTime();
        //         isNew = true;
        //         // this.saveAdChanne();
        //     }
        //     return [GlobalManagerInstance.dateTimeFormat(this.registerTime), isNew];
        // }
    }
    GameDataManager_1 = GameDataManager;
    // sevenDayGetTime: number = 0; //七日领取 最后一次的领取时间 =zd1
    // sevenDayGetNum: number = 0; //七日领取 已领取的天数 =zd2
    // sevenDayGetFlag: number = 0; //七日领取 当天是否已经领取 =zd3
    /**
     * 加载游戏数据
     */
    GameDataManager.prototype.loadData = function (callback) {
        this.loadGameData(callback);
    };
    /**
     * 重置基础数据
     */
    GameDataManager.prototype.reinitGameData = function () {
        this.touchStartTarget = null;
        this.touchStartItemZIndex = 0;
        this.playDropAudioFlag = false;
        this.finishGameFlag = false;
    };
    // /**
    //  * 七登奖励判断是否可以领取
    //  */
    // sevenDayPrizeCanGet() {
    //     if (this.sevenDayGetNum == 7) {
    //         return false;
    //     }
    //     let now = new Date();
    //     let sevenDayGetTime = this.sevenDayGetTime;
    //     if (sevenDayGetTime > 0 && GlobalManagerInstance.getSubDay(sevenDayGetTime, now) == 0 && this.sevenDayGetFlag == 1) {
    //         return false;
    //     }
    //     return true;
    // }
    // /**
    //  * 异步存储数据
    //  */
    // saveGameDataAsyn() {
    //     if (!this.saveGameDataAsynFlag) {
    //         this.saveGameDataAsynFlag = true;
    //         this.saveGameDataAsynTime = 0;
    //     }
    // }
    /**
     * 存储游戏数据
     */
    GameDataManager.prototype.saveGameData = function () {
        // GameDataManagerInstance.saveGameDataAsynTime = 0;
        // GameDataManagerInstance.saveGameDataAsynFlag = false;
        // this.gold1 = Math.floor(this.gold1);
        // this.gold2 = Math.floor(this.gold2);
        var saveModel = {
            a: this.gold1,
            b: this.gold2,
            c: this.curGuaqiaId,
            d: this.maxGuaqiaId,
            e: this.tiliNum,
            f: this.tiliTime,
            x: this.addToMy,
            y: this.audioSwitch,
            y2: this.musicSwitch,
            z: this.shakeSwitch,
            // z1: this.wxAuthorize,
            // z2: this.avatarUrl,
            // z3: this.nickName,
            // z4: this.version,
            z5: this.checkNextDay,
            z6: this.playNum,
            z7: this.playNumDay,
            z8: this.showJuzhenqiang,
        };
        LocalStorageManager_1.LocalStorageManagerInstance.saveGameData(JSON.stringify(saveModel));
    };
    /**
     * 加载游戏数据
     */
    GameDataManager.prototype.loadGameData = function (callback) {
        var _this = this;
        LocalStorageManager_1.LocalStorageManagerInstance.getGameData(function (res) {
            if (!_this.isEmpty(res)) {
                var objs = JSON.parse(res);
                _this.gold1 = objs.a;
                _this.gold2 = objs.b;
                _this.curGuaqiaId = objs.c;
                _this.maxGuaqiaId = objs.d;
                if (objs.hasOwnProperty('e')) {
                    _this.tiliNum = objs.e;
                    _this.tiliTime = objs.f;
                }
                else {
                    _this.tiliNum = GameConstant_1.default.tiliBaseNum;
                    _this.tiliTime = 0;
                }
                _this.addToMy = objs.x;
                _this.audioSwitch = objs.y;
                _this.musicSwitch = objs.y2;
                _this.shakeSwitch = objs.z;
                // this.wxAuthorize = objs.z1;
                // this.avatarUrl = objs.z2;
                // this.nickName = objs.z3;
                // this.version = objs.z4;
                _this.checkNextDay = objs.z5;
                _this.playNum = objs.z6;
                _this.playNumDay = objs.z7;
                _this.showJuzhenqiang = objs.z8;
                // this.sevenDayGetTime = objs.zd1;
                // this.sevenDayGetNum = objs.zd2;
                // this.sevenDayGetFlag = objs.zd3;
            }
            else {
                _this.tiliNum = GameConstant_1.default.tiliBaseNum;
            }
            _this.gold1 = Math.floor(_this.gold1);
            _this.gold2 = Math.floor(_this.gold2);
            callback();
        });
    };
    // /**
    //  * 设置名称
    //  */
    // setNickName(nickName: string) {
    //     nickName = nickName.length <= 5 ? nickName : nickName.substr(0, 5);
    //     this.nickName = nickName;
    // }
    /**
     * 验证字符串是否为kong
     * @param str
     */
    GameDataManager.prototype.isEmpty = function (str) {
        return str == undefined || str == null || str == "";
    };
    var GameDataManager_1;
    GameDataManager.instance = new GameDataManager_1();
    GameDataManager = GameDataManager_1 = __decorate([
        ccclass
    ], GameDataManager);
    return GameDataManager;
}());
exports.default = GameDataManager;
exports.GameDataManagerInstance = GameDataManager.instance;
