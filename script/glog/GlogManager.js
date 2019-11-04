"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var WxSdk_1 = __importDefault(require("../wx/lib/WxSdk"));
/** 日志管理类类 */
var GlogManager = /** @class */ (function () {
    function GlogManager() {
        this.isBiOpenLog = false;
    }
    /**
     * 初始化大数据的公共数据
     */
    GlogManager.prototype.initData = function () {
        if (WxSdk_1.default.isWeChatGame()) {
            this.isBiOpenLog = true;
        }
    };
    /**
     *  `推广登录
     */
    GlogManager.prototype.sendAdLogin = function () {
        if (!this.isBiOpenLog) {
            return;
        }
        wx.leuok.adLogin();
    };
    /**
     * `打开APP开始只发一次的日
     * @param action_number
     */
    GlogManager.prototype.sendAppOnceLog = function (action_number) {
        if (!this.isBiOpenLog) {
            return;
        }
        wx.leuok.appOnce({ actionNumber: action_number });
    };
    /**
     * `分享出日志
     * @param shareLogType
     */
    GlogManager.prototype.sendShareOutLog = function (shareLogType, imgIndex) {
        if (!this.isBiOpenLog) {
            return;
        }
        wx.leuok.sharedOut({ type: shareLogType });
        //分享出的同时，发送行为日志
        this.sendActionLog(ActionLogType.shareOutImg, imgIndex);
    };
    /**
     * `分享入日志
     * @param shareLogType
     * @param imgIndex
     */
    GlogManager.prototype.sendShareInLog = function (shareLogType, imgIndex) {
        if (!this.isBiOpenLog) {
            return;
        }
        wx.leuok.sharedIn({ type: shareLogType });
        //分享入的同时，发送行为日志
        this.sendActionLog(ActionLogType.shareInImg, imgIndex);
    };
    /**
     * 广告视频流水
     * @param type
     * @param sub_type
     */
    GlogManager.prototype.sendAdVideoLog = function (type, sub_type) {
        if (!this.isBiOpenLog) {
            return;
        }
        wx.leuok.adVideo({ type: type, subType: sub_type });
    };
    /**
    * 升级日志
    * @param reason
    * @param new_level
    * @param num
    */
    GlogManager.prototype.sendLevelLog = function (reason, oldLevel, new_level) {
        if (!this.isBiOpenLog) {
            return;
        }
        wx.leuok.level({ level: oldLevel, newLevel: new_level });
    };
    /**
     * `行为日志
     */
    GlogManager.prototype.sendActionLog = function (action_type, action_number) {
        if (!this.isBiOpenLog) {
            return;
        }
        wx.leuok.action({ actionType: action_type, actionNumber: action_number });
    };
    /**
     * 行为日志
     */
    GlogManager.prototype.sendActionLog1 = function (action_type, g1) {
        if (!this.isBiOpenLog) {
            return;
        }
        wx.leuok.action({ actionType: action_type, actionNumber: 0, g1: g1, g2: 0, g3: 0, g4: 0, g5: 0 });
    };
    /**
     * 行为日志
     */
    GlogManager.prototype.sendActionLog2 = function (action_type, g1, g2, g3, g4, g5) {
        if (!this.isBiOpenLog) {
            return;
        }
        wx.leuok.action({ actionType: action_type, actionNumber: 0, g1: g1, g2: g2, g3: g3, g4: g4, g5: g5 });
    };
    /**
     * 打开APP开始只发一次的日志-游戏次数
     * @param playNum
     */
    GlogManager.prototype.sendAppOnceOfPlayNumLog = function (playNum) {
        // if (!this.isBiOpenLog) {
        //     return;
        // }
        // if (playNum > 10) {
        //     return;
        // }
        // let baseNum = AppOnceActionType.playerNum1;
        // let num = baseNum + playNum - 1;
        // this.sendAppOnceLog(num);
    };
    /**
     * 发送货币日志
     * @param reason
     * @param isZuanshi  是否为钻石
     * @param old_money
     * @param new_money
     */
    GlogManager.prototype.sendMoneyLog = function (reason, isZuanshi, old_money, new_money) {
        if (!this.isBiOpenLog) {
            return;
        }
        var moneyType = 2; //金币
        if (isZuanshi) {
            moneyType = 1;
        }
        wx.leuok.money({ reason: reason, moneyType: moneyType, oldMoney: old_money, newMoney: new_money });
    };
    /**
     * 道具日志-角色按照道具接入
     * @param reason
     * @param item_id 角色id
     */
    GlogManager.prototype.sendItemLog = function (reason, item_id) {
        if (!this.isBiOpenLog) {
            return;
        }
        wx.leuok.item({ reason: reason, itemType: 1, itemId: item_id, oldNum: 0, newNum: 1 });
    };
    /**
     * 闯关日志
     * @param battleType 1为闯关，2为多人
     * @param logType 日志类型( 1战斗开始 2战斗成功结束 3战斗失败结束)
     * @param battleId battleType为1时，1~n对应关卡id；battleType为2时，表示名次
     * @param time 本次闯关时间 单位秒 战斗结束时有
     */
    GlogManager.prototype.sendBattleLog = function (battleType, logType, battleId, time) {
        // 闯关按实际关卡数打点
        // 多人竞技按参与次数打点（无论成功/失败均记一次）
        if (!this.isBiOpenLog) {
            return;
        }
        wx.leuok.battle({ logType: logType, battleType: battleType, battleId: battleId, time: time });
    };
    GlogManager.instance = new GlogManager();
    return GlogManager;
}());
exports.default = GlogManager;
exports.GlogManagererInstance = GlogManager.instance;
/**
 * 货币任务类型
 */
var MoneyLogType;
(function (MoneyLogType) {
    // playGameAdd = '游戏获得',
})(MoneyLogType = exports.MoneyLogType || (exports.MoneyLogType = {}));
/**
 * 打开APP开始只发一次的 action类型
 */
var AppOnceActionType;
(function (AppOnceActionType) {
    AppOnceActionType[AppOnceActionType["onLoadOk"] = 1] = "onLoadOk";
    AppOnceActionType[AppOnceActionType["loadGameDataOk"] = 2] = "loadGameDataOk";
    AppOnceActionType[AppOnceActionType["toMenu"] = 3] = "toMenu";
    AppOnceActionType[AppOnceActionType["startGame"] = 4] = "startGame";
    AppOnceActionType[AppOnceActionType["guaqia1_a"] = 11] = "guaqia1_a";
    AppOnceActionType[AppOnceActionType["guaqia1_b"] = 12] = "guaqia1_b";
    AppOnceActionType[AppOnceActionType["guaqia2_a"] = 13] = "guaqia2_a";
    AppOnceActionType[AppOnceActionType["guaqia2_b"] = 14] = "guaqia2_b";
    AppOnceActionType[AppOnceActionType["guaqia3_a"] = 15] = "guaqia3_a";
    AppOnceActionType[AppOnceActionType["guaqia3_b"] = 16] = "guaqia3_b";
    AppOnceActionType[AppOnceActionType["guaqia4_a"] = 17] = "guaqia4_a";
    AppOnceActionType[AppOnceActionType["guaqia4_b"] = 18] = "guaqia4_b";
    AppOnceActionType[AppOnceActionType["guaqia5_a"] = 19] = "guaqia5_a";
    AppOnceActionType[AppOnceActionType["guaqia5_b"] = 20] = "guaqia5_b";
    AppOnceActionType[AppOnceActionType["guaqia6_a"] = 21] = "guaqia6_a";
    AppOnceActionType[AppOnceActionType["guaqia6_b"] = 22] = "guaqia6_b";
    AppOnceActionType[AppOnceActionType["guaqia7_a"] = 23] = "guaqia7_a";
    AppOnceActionType[AppOnceActionType["guaqia7_b"] = 24] = "guaqia7_b";
    AppOnceActionType[AppOnceActionType["guaqia8_a"] = 25] = "guaqia8_a";
    AppOnceActionType[AppOnceActionType["guaqia8_b"] = 26] = "guaqia8_b";
    AppOnceActionType[AppOnceActionType["guaqia9_a"] = 27] = "guaqia9_a";
    AppOnceActionType[AppOnceActionType["guaqia9_b"] = 28] = "guaqia9_b";
    AppOnceActionType[AppOnceActionType["guaqia10_a"] = 29] = "guaqia10_a";
    AppOnceActionType[AppOnceActionType["guaqia10_b"] = 30] = "guaqia10_b";
    // playerNum1 = 11, //玩家进入游戏-玩完1局
    // playerNum2 = 12, //玩家进入游戏-玩完2局
    // playerNum3 = 13, //玩家进入游戏-玩完3局
    // playerNum4 = 14, //玩家进入游戏-玩完4局
    // playerNum5 = 15, //玩家进入游戏-玩完5局
    // playerNum6 = 16, //玩家进入游戏-玩完6局
    // playerNum7 = 17, //玩家进入游戏-玩完7局
    // playerNum8 = 18, //玩家进入游戏-玩完8局
    // playerNum9 = 19, //玩家进入游戏-玩完9局
    // playerNum10 = 20, //玩家进入游戏-玩完10局
})(AppOnceActionType = exports.AppOnceActionType || (exports.AppOnceActionType = {}));
/**
 * 行为日志的行为
 */
var ActionLogType;
(function (ActionLogType) {
    // // loadAndEnterGame = 101,//`101、游戏加载并进入主界面行为
    // // startGameClick = 102,//`102、点击开始游戏按钮行为
    // 开始游戏 = 1, //1.开始游戏次数
    // 结算 = 2, //2.结算
    ActionLogType[ActionLogType["shareOutImg"] = 9998] = "shareOutImg";
    ActionLogType[ActionLogType["shareInImg"] = 9999] = "shareInImg";
})(ActionLogType = exports.ActionLogType || (exports.ActionLogType = {}));
/**
 * 升级日志
 */
var LevelLogType;
(function (LevelLogType) {
    // endGame = '游戏结束奖励', //游戏结束奖励
    // taotai = '被淘汰奖励', //被淘汰奖励
})(LevelLogType = exports.LevelLogType || (exports.LevelLogType = {}));
/**
 * 道具类型-获得角色类型
 */
var ItemLogType;
(function (ItemLogType) {
    // goldUnlock = '金币解锁', //金币解锁
})(ItemLogType = exports.ItemLogType || (exports.ItemLogType = {}));
/**
 * 日志分享点
 */
var ShareLogType;
(function (ShareLogType) {
    ShareLogType[ShareLogType["zhuanfa"] = 1] = "zhuanfa";
    ShareLogType[ShareLogType["result"] = 2] = "result";
    ShareLogType[ShareLogType["menuShare"] = 3] = "menuShare";
    ShareLogType[ShareLogType["sevenDayPrize"] = 3] = "sevenDayPrize";
})(ShareLogType = exports.ShareLogType || (exports.ShareLogType = {}));
/**
 * 广告视频类型
 */
var AdVideoLogType;
(function (AdVideoLogType) {
    AdVideoLogType[AdVideoLogType["getTili"] = 1] = "getTili";
})(AdVideoLogType = exports.AdVideoLogType || (exports.AdVideoLogType = {}));
/**
 * 广告视频具体动作
 */
var AdVideoLogSubType;
(function (AdVideoLogSubType) {
    AdVideoLogSubType[AdVideoLogSubType["t0"] = 0] = "t0";
    // t1 = 1, //1.看到视频窗口后主动关闭
    AdVideoLogSubType[AdVideoLogSubType["t2"] = 2] = "t2";
    AdVideoLogSubType[AdVideoLogSubType["t3"] = 3] = "t3";
    AdVideoLogSubType[AdVideoLogSubType["t4"] = 4] = "t4";
    // t5 = 5, //`5.获得奖励
    AdVideoLogSubType[AdVideoLogSubType["t6"] = 6] = "t6";
})(AdVideoLogSubType = exports.AdVideoLogSubType || (exports.AdVideoLogSubType = {}));
