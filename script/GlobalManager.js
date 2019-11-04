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
var WxGameSdkManager_1 = require("./wx/WxGameSdkManager");
var ResourcesManager_1 = require("./ResourcesManager");
var BannerPanelComponent_1 = __importDefault(require("./logic/BannerPanelComponent"));
var GetTiliComponent_1 = __importDefault(require("./logic/GetTiliComponent"));
var GlogManager_1 = require("./glog/GlogManager");
var GuanqiaUIComponent_1 = __importDefault(require("./ui/GuanqiaUIComponent"));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 游戏内UI
 */
var GlobalManager = /** @class */ (function () {
    function GlobalManager() {
        // adNodeHeight = -1; //底部banner的高度
        this.dynamicLoadViewFlag = false; //是否处于动态加载view的状态
        this.isMenuView = true; //是否处于menu界面
        this.iphoneXOffsetY = 70; //iphone向上的偏移高度（为了避开下边的操作区域）
        this.guanqiaLoadLog = [
            GlogManager_1.AppOnceActionType.guaqia1_a,
            GlogManager_1.AppOnceActionType.guaqia2_a,
            GlogManager_1.AppOnceActionType.guaqia3_a,
            GlogManager_1.AppOnceActionType.guaqia4_a,
            GlogManager_1.AppOnceActionType.guaqia5_a,
            GlogManager_1.AppOnceActionType.guaqia6_a,
            GlogManager_1.AppOnceActionType.guaqia7_a,
            GlogManager_1.AppOnceActionType.guaqia8_a,
            GlogManager_1.AppOnceActionType.guaqia9_a,
            GlogManager_1.AppOnceActionType.guaqia10_a,
        ];
        this.guanqiaFinishLog = [
            GlogManager_1.AppOnceActionType.guaqia1_b,
            GlogManager_1.AppOnceActionType.guaqia2_b,
            GlogManager_1.AppOnceActionType.guaqia3_b,
            GlogManager_1.AppOnceActionType.guaqia4_b,
            GlogManager_1.AppOnceActionType.guaqia5_b,
            GlogManager_1.AppOnceActionType.guaqia6_b,
            GlogManager_1.AppOnceActionType.guaqia7_b,
            GlogManager_1.AppOnceActionType.guaqia8_b,
            GlogManager_1.AppOnceActionType.guaqia9_b,
            GlogManager_1.AppOnceActionType.guaqia10_b,
        ];
    }
    GlobalManager_1 = GlobalManager;
    GlobalManager.prototype.init = function (gameComponent) {
        this.gameComponent = gameComponent;
    };
    /**
     * 是否为iphonex
     */
    GlobalManager.prototype.isAppleCha = function () {
        if (!WxGameSdkManager_1.WxGameSdkManagerInstance.isWeChatGame()) {
            return false;
        }
        var systemInfo = wx.getSystemInfoSync();
        if (!systemInfo) {
            return false;
        }
        //iPhone X (GSM+CDMA)<iPhone10,3>
        var str = systemInfo.model;
        if (!str) {
            return false;
        }
        if (str.indexOf('iPhone X') > -1) {
            return true;
        }
    };
    /**
     * 是否为iphonex
     */
    GlobalManager.prototype.isIphoneX = function () {
        if (!WxGameSdkManager_1.WxGameSdkManagerInstance.isWeChatGame()) {
            return false;
        }
        var systemInfo = wx.getSystemInfoSync();
        if (!systemInfo) {
            return false;
        }
        //iPhone X (GSM+CDMA)<iPhone10,3>
        var str = systemInfo.model;
        if (!str) {
            return false;
        }
        if (str.indexOf('iPhone X') > -1) {
            return true;
        }
    };
    // /**
    //  * 获取 当前日期的天数 距离 目标日期
    //  * @param d1info  2019-01-20 00:00:00 | 时间戳
    //  * @param now 当前日期
    //  */
    // getSubDay(d1info, now: Date) {
    //     let d1 = this.getDate(new Date(d1info));
    //     let d2 = this.getDate(now);
    //     let iday = Math.floor((d2.getTime() - d1.getTime()) / 1000 / 60 / 60 / 24);
    //     return iday;
    // }
    // /**
    //  * 返回去掉了 时分秒的日期
    //  * @param date 
    //  */
    // private getDate(date: Date) {
    //     let y = date.getFullYear();
    //     let m = date.getMonth() + 1;
    //     let d = date.getDate();
    //     return new Date(y + '/' + m + '/' + d);
    // }
    // //将秒数转换为时分秒格式
    // formatSeconds(theTime: number) {
    //     var middle = 0;// 分
    //     if (theTime >= 60) {
    //         middle = Math.floor(theTime / 60);
    //         theTime = theTime % 60;
    //     }
    //     let str: string = `${middle}:`;
    //     if (middle < 10) {
    //         str = '0' + str;
    //     }
    //     if (theTime >= 10) {
    //         str += `${theTime}`;
    //     } else {
    //         str += `0${theTime}`;
    //     }
    //     return str;
    // }
    // /**
    //  * 领取添加到'我的小程序'奖励
    //  */
    // addToMyListPrize() {
    //     // console.log('GameDataManagerInstance.addToMy:' + GameDataManagerInstance.addToMy);
    //     if (GameDataManagerInstance.addToMy == 1) {
    //         return;
    //     }
    //     GameDataManagerInstance.addToMy = 1;
    //     //发放奖励
    //     // if (GlobalManagerInstance.gameComponent.menuUISc.node.active == false) {
    //     //     //在游戏中，直接发放奖励
    //     //     this.getAddToMyListPrize();
    //     // } else {
    //     //     // GlobalManagerInstance.gameComponent.menuUISc.xiaochengxuUIComponent.show(1);
    //     //     GlobalManagerInstance.gameComponent.menuUISc.xiaochengxuShow(1);
    //     // }
    // }
    // /**
    //  * 获取奖励
    //  */
    // getAddToMyListPrize() {
    //     // GlobalManagerInstance.gameComponent.menuUISc.xiaochengxuShengziNode.active = false;
    //     // let gameUISc = GlobalManagerInstance.gameComponent.gameUISc;
    //     // let addNum = GameConstant.xiaochegnxuPrizeNum;
    //     // gameUISc.setItemNum(0, true, addNum, false);
    //     // gameUISc.setItemNum(1, true, addNum, false);
    //     // gameUISc.setItemNum(2, true, addNum, true);
    //     // WxSdk.showToast(`获得 +1道具x${addNum},刷新道具x${addNum},锤子道具${addNum}`);
    // }
    // /**
    //  * 显示开始按钮后的提示
    //  */
    // tipsUIShow(parentNode: cc.Node, type: number, atType: number) {
    //     ResourcesManagerInstance.dynamicLoadView(PrefabNameEnum.tipsUI, parentNode, TipsUIComponent, (sc: TipsUIComponent) => {
    //         sc.show(type, atType);
    //     });
    // }
    //=============
    // private bigTime = 0.15; //初始到最大的时间
    // private bigScale = 1.1; //最大缩放值
    // private smallTime = 0.15; //最大到最小的时间
    // private smallScale = 1; //最小缩放值
    // private delayTime = 0.4; //到最小状态后的延迟时间
    // /**
    //  * 按钮方法缩小的动画
    //  * @param isAction 
    //  */
    // btnScale(isAction: boolean, node: cc.Node) {
    //     node.stopAllActions();
    //     node.scale = 1;
    //     if (isAction) {
    //         node.runAction(
    //             cc.sequence(
    //                 cc.scaleTo(this.bigTime, this.bigScale), //小变大
    //                 cc.scaleTo(this.smallTime, this.smallScale), //大变小
    //                 cc.delayTime(this.delayTime), //延迟时间
    //             ).repeatForever()
    //         );
    //     }
    // }
    //====
    // /**
    //  * 新游戏宝箱UI
    //  */
    // boxnewUIShow(parentNode: cc.Node, type: number, callback: Function = null) {
    //     ResourcesManagerInstance.dynamicLoadView(PrefabNameEnum.boxnewUI, parentNode, BoxNewUIComponent, (sc: BoxNewUIComponent) => {
    //         sc.show(type, callback);
    //     });
    // }
    /**
     * 显示banner的panel
     * @param parentNode
     */
    GlobalManager.prototype.bannerPanelUIShow = function (parentNode) {
        ResourcesManager_1.ResourcesManagerInstance.dynamicLoadView(ResourcesManager_1.PrefabNameEnum.bannerPanel, parentNode, BannerPanelComponent_1.default, function (sc) {
            sc.show();
        });
    };
    /**
     * 时间秒数格式化
     * @param s 时间戳（单位：秒）
     * 格式化后的分秒
     */
    GlobalManager.prototype.secToTime2 = function (s) {
        var t = "";
        if (s > -1) {
            var min = Math.floor(s / 60) % 60;
            var sec = s % 60;
            if (min < 10) {
                t += "0";
            }
            t += min + ":";
            if (sec < 10) {
                t += "0";
            }
            // t += sec.toFixed(2);
            t += sec;
        }
        return t;
    };
    /**
     * 获得体力UI
     */
    GlobalManager.prototype.getTiliUIShow = function (parentNode, fromMenuFlag) {
        ResourcesManager_1.ResourcesManagerInstance.dynamicLoadView(ResourcesManager_1.PrefabNameEnum.getTiliUI, parentNode, GetTiliComponent_1.default, function (sc) {
            sc.show(fromMenuFlag);
        });
    };
    /**
     * 显示关卡UI
     */
    GlobalManager.prototype.guanqiaUIShow = function (parentNode, isFromMenuFlag) {
        ResourcesManager_1.ResourcesManagerInstance.dynamicLoadView(ResourcesManager_1.PrefabNameEnum.guanqiaUI, parentNode, GuanqiaUIComponent_1.default, function (sc) {
            sc.show(isFromMenuFlag);
        });
    };
    /**
     * 发送关卡日志
     * @param guanqiaId
     * @param isLoadFlag true表示加载完成 false表示过关
     */
    GlobalManager.prototype.sendAppOnceLogOfGuanqia = function (guanqiaId, isLoadFlag) {
        if (guanqiaId > 10) {
            return;
        }
        var logType = null;
        if (isLoadFlag) {
            logType = this.guanqiaLoadLog[guanqiaId - 1];
        }
        else {
            logType = this.guanqiaFinishLog[guanqiaId - 1];
        }
        GlogManager_1.GlogManagererInstance.sendAppOnceLog(logType);
    };
    var GlobalManager_1;
    GlobalManager.instance = new GlobalManager_1();
    GlobalManager = GlobalManager_1 = __decorate([
        ccclass
    ], GlobalManager);
    return GlobalManager;
}());
exports.default = GlobalManager;
exports.GlobalManagerInstance = GlobalManager.instance;
