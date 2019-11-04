"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var WxGameSdkManager_1 = require("./WxGameSdkManager");
var GlobalManager_1 = require("../GlobalManager");
var WxSdk_1 = __importDefault(require("./lib/WxSdk"));
/** 广告管理类 */
var ADManager = /** @class */ (function () {
    function ADManager() {
        this.bannerAdId = 'adunit-f159de0447592519'; //游戏界面banner
        this.videoAdId = 'adunit-f8a5bc239be93f5d'; //激励视频
        this.interstitialAdId = 'adunit-1fb488ff07961fdf'; //插屏广告
        this.rewardedVideoAd = null;
        this.getRewardedVideoAdFlag = false; //是否拉取了视频广告的标志
        this.bannerAd = null; //每次新记录的广告
        this.oldBannerAd = null; //旧的广告
        this.rewardedVideoAdCallback = null;
        this.screenWidth = 0;
        this.screenHeight = 0;
        this.adHeight = 0; //广告的高度
        this.showAdPosition = 1; //显示广告的位置
        this.bannerAdChangeTime = 0; //切换banner的时间戳
        this.isInitRewardedVideoAdFlag = false;
        this.bannerCenterX = 0; //banner居中时的x
        this.bannerRightX = 0; //banner居右的x
        this.showWxBannerFlag = false; //显示微信banner的标志
        //==== 插屏
        this.interstitialAd = null;
    }
    /**
     * 初始化视频广告
     */
    ADManager.prototype.initRewardedVideoAd = function () {
        if (!WxGameSdkManager_1.WxGameSdkManagerInstance.isWeChatGame()) {
            return;
        }
        if (WxSdk_1.default.compareVersion(WxSdk_1.default.getSDKVersion(), '2.0.4') < 0) {
            return;
        }
        this.screenWidth = wx.getSystemInfoSync().screenWidth;
        this.screenHeight = wx.getSystemInfoSync().screenHeight;
    };
    /**
     * 关闭视频的回调
     * @param res
     */
    ADManager.prototype.videoCloseCallback = function (res) {
        exports.ADManagerInstance.getRewardedVideoAdFlag = false;
        // 用户点击了【关闭广告】按钮
        // 小于 2.1.0 的基础库版本，res 是一个 undefined
        if ((res && res.isEnded) || (res === undefined)) {
            // 正常播放结束，可以下发游戏奖励
            //参数：是否发放奖励;是否弹分享
            if (exports.ADManagerInstance.rewardedVideoAdCallback) {
                exports.ADManagerInstance.rewardedVideoAdCallback(true, false);
                exports.ADManagerInstance.rewardedVideoAdCallback = null;
                // GlogManagererInstance.sendAdVideoLog(ADManagerInstance.showAdPosition, AdVideoLogSubType.t4);
            }
            // AdlogManagerInstance.reportVideo(this.showAdPosition, 2);
        }
        else {
            // 播放中途退出，不下发游戏奖励
            if (exports.ADManagerInstance.rewardedVideoAdCallback) {
                exports.ADManagerInstance.rewardedVideoAdCallback(false, false);
                exports.ADManagerInstance.rewardedVideoAdCallback = null;
                // GlogManagererInstance.sendAdVideoLog(ADManagerInstance.showAdPosition, AdVideoLogSubType.t3);
                WxSdk_1.default.showToast('未观看完整视频，无法获得奖励');
            }
        }
        // console.log('videoCloseCallback~' + ADManagerInstance.getRewardedVideoAdFlag);
        // console.log('videoCloseCallback~this:' + this);
    };
    ADManager.prototype.videoErrorCallback = function (errMsg, errCode) {
        exports.ADManagerInstance.getRewardedVideoAdFlag = false;
        console.log('激励视频广告====errCode：' + errCode + ",errMsg=" + JSON.stringify(errMsg));
        if (exports.ADManagerInstance.rewardedVideoAdCallback) {
            exports.ADManagerInstance.rewardedVideoAdCallback(false, true);
            exports.ADManagerInstance.rewardedVideoAdCallback = null;
            // WxSdk.showGameClubButton();
            // GlogManagererInstance.sendAdVideoLog(ADManagerInstance.showAdPosition, AdVideoLogSubType.t6);
        }
        else {
            WxSdk_1.default.showToast('获取广告失败');
        }
        // console.log('videoErrorCallback~' + ADManagerInstance.getRewardedVideoAdFlag);
    };
    // private videoLoadCallback() {
    //     console.log('videoLoadCallback~');
    //     GlogManagererInstance.sendAdVideoLog(this.showAdPosition, AdVideoLogSubType.t2);
    // }
    /**
     * 获取视频广告
     * @param type
     */
    ADManager.prototype.getRewardedVideoAdByType = function (type) {
        if (exports.ADManagerInstance.rewardedVideoAd) {
            // this.rewardedVideoAd.offLoad(this.videoLoadCallback);
            exports.ADManagerInstance.rewardedVideoAd.offError(exports.ADManagerInstance.videoErrorCallback);
            exports.ADManagerInstance.rewardedVideoAd.offClose(exports.ADManagerInstance.videoCloseCallback);
        }
        var videoAdId = this.videoAdId;
        var rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: videoAdId });
        // rewardedVideoAd.onLoad(self.videoLoadCallback);
        rewardedVideoAd.onClose(exports.ADManagerInstance.videoCloseCallback);
        rewardedVideoAd.onError(exports.ADManagerInstance.videoErrorCallback);
        return rewardedVideoAd;
    };
    /**
     * 显示视频广告
     */
    ADManager.prototype.showRewardedVideoAd = function (callback, position) {
        // if (GameDataManagerInstance.skipAdFlag) {
        //     callback(true);
        //     return;
        // }
        var _this = this;
        if (!WxGameSdkManager_1.WxGameSdkManagerInstance.isWeChatGame()) {
            callback(true);
            return;
        }
        if (WxSdk_1.default.compareVersion(WxSdk_1.default.getSDKVersion(), '2.0.4') < 0) {
            callback(true);
            return;
        }
        // console.log('showRewardedVideoAd~' + this.getRewardedVideoAdFlag)
        if (this.getRewardedVideoAdFlag) {
            return;
        }
        if (!position) {
            position = 1;
        }
        this.showAdPosition = position;
        // GlogManagererInstance.sendAdVideoLog(this.showAdPosition, AdVideoLogSubType.t0);
        // GlogManagererInstance.sendAdVideoLog(this.showAdPosition, AdVideoLogSubType.t2);
        this.rewardedVideoAdCallback = callback;
        // AdlogManagerInstance.reportVideo(position, 1);
        var rewardedVideoAd = this.getRewardedVideoAdByType(position);
        this.rewardedVideoAd = rewardedVideoAd;
        this.getRewardedVideoAdFlag = true;
        // rewardedVideoAd.show()
        //     .catch(err => {
        //         rewardedVideoAd.load()
        //             .then(() => rewardedVideoAd.show())
        //     })
        // console.log(`rewardedVideoAd:` + rewardedVideoAd);
        rewardedVideoAd.show()
            .catch(function () {
            rewardedVideoAd.load()
                .then(function () { return rewardedVideoAd.show(); })
                .catch(function (err) {
                console.log('激励视频 广告显示失败err:' + err);
                WxSdk_1.default.showToast("\u5E7F\u544A\u663E\u793A\u5931\u8D25");
                _this.rewardedVideoAdCallback = null;
                // GameDataManagerInstance.skipAdFlag = false;
            });
        });
        // WxSdk.hideGameClubButton();
        // this.hideBannerAd();
    };
    /**
     * 创建广告
     */
    ADManager.prototype.createBannerAd = function () {
        var _this = this;
        this.oldBannerAd = this.bannerAd;
        if (WxSdk_1.default.compareVersion(WxSdk_1.default.getSDKVersion(), '2.0.4 ') < 0) {
            return;
        }
        this.bannerAdChangeTime = new Date().getTime();
        var bannerAd = wx.createBannerAd({
            adUnitId: this.bannerAdId,
            style: {
                // left: (this.screenWidth - 300) / 2,
                left: this.screenWidth / 2,
                top: 0,
                width: this.screenWidth
                // width: 300
            }
        });
        bannerAd.onLoad(function () {
            // console.log('banner 广告加载成功')
            if (_this.oldBannerAd) {
                _this.oldBannerAd.hide();
                _this.oldBannerAd.destroy();
            }
            _this.bannerAd.show();
        });
        bannerAd.onError(function (err) {
            console.log('bannerAd-error:' + JSON.stringify(err));
        });
        bannerAd.onResize(function (res) {
            // let height = this.screenHeight - res.height;
            // if (GlobalManagerInstance.isIphoneX()) {
            //     height -= GlobalManagerInstance.iphoneXOffsetY / 2;
            // }
            // bannerAd.style.top = height;
            var phone = wx.getSystemInfoSync();
            var w = phone.screenWidth / 2;
            var h = phone.screenHeight;
            var adX = w - bannerAd.style.realWidth / 2 + 0.1;
            var adY = h - bannerAd.style.realHeight + 0.1;
            if (GlobalManager_1.GlobalManagerInstance.isIphoneX()) {
                adY -= GlobalManager_1.GlobalManagerInstance.iphoneXOffsetY / 2;
            }
            bannerAd.style.left = adX;
            bannerAd.style.top = adY;
            _this.adHeight = bannerAd.style.realHeight;
            // console.log('=========phone.screenWidth:' + phone.screenWidth);
            // console.log('=========phone.screenHeight:' + phone.screenHeight);
            // console.log('=========bannerAd.style.realWidth:' + bannerAd.style.realWidth);
            // console.log('=========bannerAd.style.realHeight:' + bannerAd.style.realHeight);
            // console.log('=========adHeight:' + this.adHeight);
            // GlobalManagerInstance.gameComponent.gameUISc.adaptiveUI(this.adHeight);
            var frameSize = cc.view.getFrameSize();
            var winSize = cc.director.getWinSize();
            // let designSize = cc.view.getDesignResolutionSize();
            // let subHeight = winSize.height - designSize.height;
            // console.log("====subHeight:" + subHeight);
            // let nodeWidth = width*winSize.width/frameSize.width;
            // GlobalManagerInstance.adNodeHeight = this.adHeight * winSize.height / frameSize.height - subHeight / 2;
            // GlobalManagerInstance.adNodeHeight = this.adHeight * winSize.height / frameSize.height;
            // GlobalManagerInstance.adaptiveNoThsBtn();
            //TODO
            // this.hideBannerAd();
        });
        this.bannerAd = bannerAd;
    };
    ADManager.prototype.createWXBanner2 = function (isShow) {
        var _this = this;
        if (!WxGameSdkManager_1.WxGameSdkManagerInstance.isWeChatGame()) {
            return;
        }
        if (WxSdk_1.default.compareVersion(WxSdk_1.default.getSDKVersion(), '2.0.4 ') < 0) {
            return;
        }
        // GlobalManagerInstance.gameComponent.youziMatrixNode.active = false;
        // GameDataManagerInstance.hideBannerByMenuFlag = false;
        // bannerIds
        var bannerId = this.bannerAdId;
        this.showWxBannerFlag = isShow;
        this.oldBannerAd = this.bannerAd;
        this.bannerAdChangeTime = new Date().getTime();
        var bannerAd = wx.createBannerAd({
            // adUnitId: this.bannerAdId,
            adUnitId: bannerId,
            style: {
                // left: (this.screenWidth - 300) / 2,
                left: this.screenWidth / 2,
                top: 0,
                width: this.screenWidth
                // width: 300
            }
        });
        this.bannerAd = bannerAd;
        if (this.oldBannerAd) {
            this.oldBannerAd.hide();
            this.oldBannerAd.destroy();
        }
        bannerAd.onLoad(function () {
            // console.log('banner 广告加载成功')
            // if (GameDataManagerInstance.hideBannerByMenuFlag) {
            //     // GameDataManagerInstance.hideBannerByMenuFlag = false;
            // } else {
            //     if (isShow) {
            //         bannerAd.show();
            //     }
            // }
            if (_this.showWxBannerFlag) {
                bannerAd.show();
            }
        });
        bannerAd.onError(function (err) {
            // console.log('bannerAd-error:' + JSON.stringify(err));
            // if (isShow) {
            //     GlobalManagerInstance.gameComponent.youziMatrixNode.active = true;
            // }
        });
        bannerAd.onResize(function (res) {
            // let height = this.screenHeight - res.height;
            // if (GlobalManagerInstance.isIphoneX()) {
            //     height -= GlobalManagerInstance.iphoneXOffsetY / 2;
            // }
            // bannerAd.style.top = height;
            var phone = wx.getSystemInfoSync();
            var w = phone.screenWidth / 2;
            var h = phone.screenHeight;
            // var w = bannerAd.style.realWidth / 2;
            // var h = bannerAd.style.realHeight;
            var adX = w - bannerAd.style.realWidth / 2 + 0.1;
            var baseAdY = h - bannerAd.style.realHeight + 0.1;
            var adY = baseAdY;
            // console.log('bannerAd.style.height:' + bannerAd.style.height);
            // console.log('bannerAd.style.realHeight:' + bannerAd.style.realHeight);
            // console.log('=========adY1:' + adY);
            if (GlobalManager_1.GlobalManagerInstance.isIphoneX()) {
                // adY -= GlobalManagerInstance.iphoneXOffsetY / 2;
                adY = baseAdY - 10;
            }
            bannerAd.style.left = adX;
            bannerAd.style.top = adY;
            _this.adHeight = bannerAd.style.realHeight;
            // console.log('=========adY2:' + adY);
            // console.log('=========phone.screenWidth:' + phone.screenWidth);
            // console.log('=========phone.screenHeight:' + phone.screenHeight);
            // console.log('=========bannerAd.style.realWidth:' + bannerAd.style.realWidth);
            // console.log('=========bannerAd.style.realHeight:' + bannerAd.style.realHeight);
            // console.log('=========adHeight:' + this.adHeight);
            // GlobalManagerInstance.gameComponent.gameUISc.adaptiveUI(this.adHeight);
            var frameSize = cc.view.getFrameSize();
            var winSize = cc.director.getWinSize();
            // let designSize = cc.view.getDesignResolutionSize();
            // let subHeight = winSize.height - designSize.height;
            // console.log("====subHeight:" + subHeight);
            // let nodeWidth = width*winSize.width/frameSize.width;
            // GlobalManagerInstance.adNodeHeight = this.adHeight * winSize.height / frameSize.height - subHeight / 2;
            // GlobalManagerInstance.adNodeHeight = this.adHeight * winSize.height / frameSize.height;
            // GlobalManagerInstance.adaptiveNoThsBtn();
            //
            // this.hideBannerAd();
        });
    };
    /**
     * 基于偏移值显示banner
     * @param offsetY
     */
    ADManager.prototype.createWXBanner3 = function (offsetY) {
        var _this = this;
        if (!WxGameSdkManager_1.WxGameSdkManagerInstance.isWeChatGame()) {
            return;
        }
        if (WxSdk_1.default.compareVersion(WxSdk_1.default.getSDKVersion(), '2.0.4 ') < 0) {
            return;
        }
        // GlobalManagerInstance.gameComponent.youziMatrixNode.active = false;
        // GameDataManagerInstance.hideBannerByMenuFlag = false;
        // bannerIds
        var bannerId = this.bannerAdId;
        this.showWxBannerFlag = true;
        this.oldBannerAd = this.bannerAd;
        this.bannerAdChangeTime = new Date().getTime();
        var width = 300;
        if (offsetY > 0) {
            //使用最大宽
            width = this.screenWidth;
        }
        var bannerAd = wx.createBannerAd({
            // adUnitId: this.bannerAdId,
            adUnitId: bannerId,
            style: {
                // left: (this.screenWidth - 300) / 2,
                left: this.screenWidth / 2,
                top: 0,
                width: width
                // width: 300
            }
        });
        this.bannerAd = bannerAd;
        if (this.oldBannerAd) {
            this.oldBannerAd.hide();
            this.oldBannerAd.destroy();
        }
        bannerAd.onLoad(function () {
            if (_this.showWxBannerFlag) {
                bannerAd.show();
            }
        });
        bannerAd.onError(function (err) {
            // console.log('bannerAd-error:' + JSON.stringify(err));
            // if (isShow) {
            //     GlobalManagerInstance.gameComponent.youziMatrixNode.active = true;
            // }
        });
        bannerAd.onResize(function (res) {
            // let height = this.screenHeight - res.height;
            // if (GlobalManagerInstance.isIphoneX()) {
            //     height -= GlobalManagerInstance.iphoneXOffsetY / 2;
            // }
            // bannerAd.style.top = height;
            var phone = wx.getSystemInfoSync();
            var w = phone.screenWidth / 2;
            var h = phone.screenHeight;
            // var w = bannerAd.style.realWidth / 2;
            // var h = bannerAd.style.realHeight;
            var adX = w - bannerAd.style.realWidth / 2 + 0.1;
            var baseAdY = h - bannerAd.style.realHeight + 0.1;
            var adY = baseAdY;
            // console.log('bannerAd.style.height:' + bannerAd.style.height);
            // console.log('bannerAd.style.realHeight:' + bannerAd.style.realHeight);
            // console.log('=========adY1:' + adY);
            var frameSize = cc.view.getFrameSize();
            var winSize = cc.director.getWinSize();
            // GlobalManagerInstance.adNodeHeight = this.adHeight * winSize.height / frameSize.height;
            var num = offsetY * frameSize.height / winSize.height;
            adY -= num;
            //当偏移值为0时，需要上移一段距离
            if (num == 0 && GlobalManager_1.GlobalManagerInstance.isIphoneX()) {
                // adY -= GlobalManagerInstance.iphoneXOffsetY / 2;
                adY = baseAdY - 10;
            }
            bannerAd.style.left = adX;
            bannerAd.style.top = adY;
            _this.adHeight = bannerAd.style.realHeight;
            // console.log('=========adY2:' + adY);
            // console.log('=========phone.screenWidth:' + phone.screenWidth);
            // console.log('=========phone.screenHeight:' + phone.screenHeight);
            // console.log('=========bannerAd.style.realWidth:' + bannerAd.style.realWidth);
            // console.log('=========bannerAd.style.realHeight:' + bannerAd.style.realHeight);
            // console.log('=========adHeight:' + this.adHeight);
            // GlobalManagerInstance.gameComponent.gameUISc.adaptiveUI(this.adHeight);
            // let designSize = cc.view.getDesignResolutionSize();
            // let subHeight = winSize.height - designSize.height;
            // console.log("====subHeight:" + subHeight);
            // let nodeWidth = width*winSize.width/frameSize.width;
            // GlobalManagerInstance.adNodeHeight = this.adHeight * winSize.height / frameSize.height - subHeight / 2;
            // GlobalManagerInstance.adNodeHeight = this.adHeight * winSize.height / frameSize.height;
            // GlobalManagerInstance.adaptiveNoThsBtn();
            //
            // this.hideBannerAd();
        });
    };
    /**
     * 验证banner的切换 - 界面切换时调用
     */
    ADManager.prototype.checkChangeBannerAd = function () {
        // if (window['YouziDataManager'].isDataLoaded) {
        //     let type = window['YouziDataManager'].currentBannerType;
        //     console.log('当前后台配置的banner类型为：' + type);
        //     if (window['YouziDataManager'].BANNERTYPE.BANNER_WX != type) {
        //         return;
        //     }
        // }
        // this.bannerAdChangeTime = new Date().getTime();
        if (new Date().getTime() - this.bannerAdChangeTime > 30000) {
            // if (new Date().getTime() - this.bannerAdChangeTime > 10000) {
            //在界面切换时，30秒更换一次banner
            try {
                // console.log(`==============this.showWxBannerFlag:${this.showWxBannerFlag}`);
                this.createWXBanner2(this.showWxBannerFlag);
            }
            catch (error) {
            }
        }
    };
    /**
     * 显示广告
     */
    ADManager.prototype.showBannerAd = function () {
        // if (window['YouziDataManager'].isDataLoaded) {
        //     let type = window['YouziDataManager'].currentBannerType;
        //     console.log('当前后台配置的banner类型为：' + type);
        //     if (window['YouziDataManager'].BANNERTYPE.BANNER_WX == type) {
        //         //显示微信banner
        //         window['YouziDataManager'].showWXBanner()
        //     } else if (window['YouziDataManager'].BANNERTYPE.BANNER_SWITH == type) {
        //         if (window['YouziDataManager'].resumeBannerControl) {
        //             window['YouziDataManager'].resumeBannerControl();
        //             // console.log('=======================resumeBannerControl');
        //         }
        //     }
        // }
        if (!WxGameSdkManager_1.WxGameSdkManagerInstance.isWeChatGame()) {
            // GlobalManagerInstance.gameComponent.youziMatrixNode.active = true;
            return;
        }
        if (WxSdk_1.default.compareVersion(WxSdk_1.default.getSDKVersion(), '2.0.4') < 0) {
            // GlobalManagerInstance.gameComponent.youziMatrixNode.active = true;
            return;
        }
        this.createWXBanner2(true);
        // if (!this.bannerAd) {
        //     // this.createBannerAd();
        //     this.createWXBanner2(true);
        // } else {
        //     this.showWxBannerFlag = true;
        //     this.bannerAdChangeTime = new Date().getTime();
        //     this.bannerAd.show();
        // }
    };
    /**
     * 隐藏广告
     */
    ADManager.prototype.hideBannerAd = function () {
        // GameDataManagerInstance.hideBannerByMenuFlag = true;
        this.showWxBannerFlag = false;
        if (this.bannerAd) {
            this.bannerAd.hide();
        }
        if (this.oldBannerAd) {
            this.oldBannerAd.hide();
        }
        // GlobalManagerInstance.gameComponent.youziMatrixNode.active = false;
        // if (window['YouziDataManager'].isDataLoaded) {
        //     let type = window['YouziDataManager'].currentBannerType;
        //     console.log('当前后台配置的banner类型为：' + type);
        //     if (window['YouziDataManager'].BANNERTYPE.BANNER_WX == type) {
        //         //显示微信banner
        //         window['YouziDataManager'].hideWXBanner()
        //     } else if (window['YouziDataManager'].BANNERTYPE.BANNER_SWITH == type) {
        //         if (window['YouziDataManager'].stopBannerControl) {
        //             window['YouziDataManager'].stopBannerControl();
        //             // console.log('=======================stopBannerControl');
        //         }
        //     }
        // }
    };
    /**
     * 创建插屏广告
     */
    ADManager.prototype.createInterstitialAd = function () {
        if (!WxGameSdkManager_1.WxGameSdkManagerInstance.isWeChatGame()) {
            return;
        }
        if (WxSdk_1.default.compareVersion(WxSdk_1.default.getSDKVersion(), '2.6.0 ') < 0) {
            return;
        }
        if (this.interstitialAd == null) {
            // 定义插屏广告
            var id = this.interstitialAdId;
            // 创建插屏广告实例，提前初始化
            if (wx.createInterstitialAd) {
                this.interstitialAd = wx.createInterstitialAd({
                    adUnitId: id
                });
                //监听插屏错误事件
                this.interstitialAd.onError(function (res) {
                    console.log("interstitialAd-errCode:" + res.errCode + ",errMsg:" + res.errMsg);
                });
                //监听插屏广告关闭事件
                this.interstitialAd.onClose(function () {
                    console.log("interstitialAd-onClose");
                });
            }
        }
    };
    /**
     * 创建并显示插屏广告
     */
    ADManager.prototype.createInterstitialAdAndShow = function (callback) {
        if (callback === void 0) { callback = null; }
        if (!WxGameSdkManager_1.WxGameSdkManagerInstance.isWeChatGame()) {
            return;
        }
        if (WxSdk_1.default.compareVersion(WxSdk_1.default.getSDKVersion(), '2.6.0 ') < 0) {
            return;
        }
        if (this.interstitialAd == null) {
            // 定义插屏广告
            var id = this.interstitialAdId;
            // 创建插屏广告实例，提前初始化
            if (wx.createInterstitialAd) {
                this.interstitialAd = wx.createInterstitialAd({
                    adUnitId: id
                });
                //监听插屏错误事件
                this.interstitialAd.onError(function (res) {
                    console.log("interstitialAd-errCode:" + res.errCode + ",errMsg:" + res.errMsg);
                });
                //监听插屏广告关闭事件
                this.interstitialAd.onClose(function () {
                    console.log("interstitialAd-onClose");
                    if (callback) {
                        callback();
                    }
                });
            }
        }
        // 在适合的场景显示插屏广告
        if (this.interstitialAd) {
            // this.hideBannerAd();
            this.interstitialAd.show().catch(function (err) {
                console.error(err);
                if (callback) {
                    callback();
                }
            });
        }
    };
    ADManager.instance = new ADManager();
    return ADManager;
}());
exports.default = ADManager;
exports.ADManagerInstance = ADManager.instance;
