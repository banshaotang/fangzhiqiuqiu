"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var WxSdk_1 = __importDefault(require("./lib/WxSdk"));
var GlogManager_1 = require("../glog/GlogManager");
/** 微信sdk */
var WxGameSdkManager = /** @class */ (function () {
    function WxGameSdkManager() {
        this.shareUrl = 'https://cdnminigame.leuok.cn/yzx/wx/mbox/';
        this.shareInfo = '只要您厉害，什么都能装进背包！';
        //==== 评审相关≈
        //2019.08.14-1-1   mbox_vc*
        this.reviewVersionCode = 1; //评审版本号：每次评审版本，该号码+1；评审通过后，向cdn提交对应版本号的json文件: version_code1.json
        this.share1Pre = 'share01_0812'; //会由开关控制动态变化
        this.shareInfoPre = 'mbox_si_0812'; //不会动态变化，因为每次都会加载 (mcar_share_info_)
        // private readonly reviewVersionCodeUrl = `${this.shareUrl}version_code${this.reviewVersionCode}`;
        this.reviewVersionCodeInfo = null; //配置的信息开关
        //ats（adToShare）:广告播放完后转诱导分享/评审期间广告开关/分享内容：0关闭；1为开启 
        //sid1(shareImgDir1)：分享图片1的路径
        //hf(huaFei):话费开关 0关闭；1为开启
        this.isInit = false; //是否已经初始化完成
        this.uid = ""; //玩家唯一id （非登陆的初始化）
        this.onShareEndCbk = null; //分享回调
        this.shareStartTime = 0; //分享开始的时间戳
        this.shareFlag = 0; //分享状态 1表示进行50%概率判断，2表示不判断
        this.shareInfos1 = null; //分享的提示信息
        this.isInitWxGameSdkManagerFlag = false; //是否初始化完manager的标志
        this.cdbUid = 0; //cdb的玩家id
        /**
         * 分享信息列表-评审版本
         */
        this.share0Infos = [
            null,
            [
                this.shareInfo,
                this.shareUrl + "share0/share1.png",
                '1'
            ],
        ];
        // /**
        //  * 发送post请求
        //  * @param url 
        //  * @param data 
        //  * @param cb 
        //  */
        // requestPost(url: string, data: string, cb?: Function) {
        //     try {
        //         WxSdk.requestPost(url, data, cb);
        //     } catch (error) {
        //     }
        // }
        // /**
        //  * 客服入口
        //  */
        // openCustomerServiceConversation() {
        //     if (!this.isWeChatGame()) {
        //         return;
        //     }
        //     if (WxSdk.compareVersion(WxSdk.getSDKVersion(), '2.0.3') < 0) {
        //         return;
        //     }
        //     wx.openCustomerServiceConversation({});
        // }
        // /**
        //  * 微信登录
        //  * @param cb 
        //  */
        // wxLogin(cb) {
        //     if (!this.isWeChatGame()) {
        //         return;
        //     }
        //     wx.login({
        //         success(loginResult) {
        //             console.log(`loginResult:${JSON.stringify(loginResult)}`);
        //             cb(loginResult.code)
        //         },
        //         fail(loginError) {
        //             console.log(`loginError:${loginError}`);
        //         }
        //     });
        // }
    }
    /**
     * 加载评审后信息
     */
    WxGameSdkManager.prototype.loadReviewVersionCodeInfo = function () {
        var _this = this;
        var reviewVersionCodeUrl = this.shareUrl + "mcar_vc" + this.reviewVersionCode + "?rnd=" + Math.floor(Math.random() * 100000);
        cc.loader.load(reviewVersionCodeUrl, function (err, jsonStr) {
            if (err) {
                // console.log('加载版本信息失败~');
            }
            else {
                _this.reviewVersionCodeInfo = JSON.parse(jsonStr);
                // console.log("=========this.reviewVersionCodeInfo:" + jsonStr);
                if (_this.reviewVersionCodeInfo) {
                    if (_this.reviewVersionCodeInfo.hasOwnProperty('sid1')) {
                        _this.share1Pre = _this.reviewVersionCodeInfo.sid1;
                        // console.log(`==========this.share1Pre:${this.share1Pre}`);
                    }
                }
            }
        });
        this.loadShareInfoByCdn();
    };
    /**
     * 加载cdn上的分享信息
     */
    WxGameSdkManager.prototype.loadShareInfoByCdn = function () {
        var _this = this;
        var reviewVersionCodeUrl = "" + this.shareUrl + this.shareInfoPre + "?rnd=" + Math.floor(Math.random() * 100000);
        cc.loader.load(reviewVersionCodeUrl, function (err, jsonStr) {
            if (err) {
                // console.log('加载版本信息失败~');
            }
            else {
                var json = JSON.parse(jsonStr);
                _this.shareInfos1 = json;
            }
        });
    };
    // /**
    //  * 获取分享内容类型
    //  */
    // private getShareInfoType() {
    //     if (this.reviewVersionCodeInfo && this.reviewVersionCodeInfo.hasOwnProperty('shareInfoType')) {
    //         return this.reviewVersionCodeInfo.shareInfoType;
    //     }
    //     return 0;
    // }
    // /**
    //  * 获取分享类型
    //  */
    // getShareType() {
    //     if (this.reviewVersionCodeInfo && this.reviewVersionCodeInfo.hasOwnProperty('shareType')) {
    //         return this.reviewVersionCodeInfo.shareType;
    //     }
    //     return 0;
    // }
    /**
     * 是否广告转分享
     */
    WxGameSdkManager.prototype.isAdToShare = function () {
        // if (!WxGameSdkManagerInstance.isWeChatGame()) {
        //     return false;
        // }
        if (this.reviewVersionCodeInfo && this.reviewVersionCodeInfo.hasOwnProperty('ats')) {
            return this.reviewVersionCodeInfo.ats == 1;
        }
        return false;
    };
    // /**
    // * 分享信息列表-非评审版本
    // */
    // private readonly share1Infos = [
    //     null,
    //     [
    //         '据说合成到20的人，智商都接近150，爱因斯坦也就合成到23！',
    //         `${this.shareUrl}share0/share1.png`,
    //         '1'
    //     ],
    // ];
    WxGameSdkManager.prototype.getShare1Img = function (num) {
        return "" + this.shareUrl + this.share1Pre + "/share" + num + ".png";
    };
    /**
     * 获取分享信息
     */
    WxGameSdkManager.prototype.getShareInfo = function () {
        if (this.isAdToShare()) {
            //非评审版本
            var shareNum = 10;
            var index = 1 + Math.floor(Math.random() * shareNum);
            index = Math.min(index, shareNum);
            var info = this.shareInfo;
            if (this.shareInfos1 != null && index <= this.shareInfos1.length) {
                info = this.shareInfos1[index - 1];
            }
            return [info, this.getShare1Img(index), index + ''];
            // let index = 1;
            // if (this.shareLogType) {
            //     if (this.shareLogType == ShareLogType.sevenDayPrize) {
            //         //七登
            //         index = 1;
            //     } else if (this.shareLogType == ShareLogType.menuRank) {
            //         //主界面排行榜
            //         index = 2;
            //     } else if (this.shareLogType == ShareLogType.getBuff) {
            //         //开局buff
            //         index = 7;
            //     } else if (this.shareLogType == ShareLogType.resultDouble) {
            //         //结算双倍
            //         index = 4;
            //     } else if (this.shareLogType == ShareLogType.fuhuo1) {
            //         //复活
            //         index = 5;
            //     } else if (this.shareLogType == ShareLogType.gameGetHuojian) {
            //         //游戏中使用火箭
            //         index = 6;
            //     } else if (this.shareLogType == ShareLogType.flushTask) {
            //         //每日任务刷新
            //         index = 7;
            //     }
            // }
            // let info = this.shareInfo;
            // if (this.shareInfos1 != null && index <= this.shareInfos1.length) {
            //     info = this.shareInfos1[index - 1];
            // }
            // return [info, this.getShare1Img(index), index + ''];
        }
        else {
            //评审版本
            return this.share0Infos[1];
        }
    };
    /**
     * 是否为微信小游戏
     */
    WxGameSdkManager.prototype.isWeChatGame = function () {
        return WxSdk_1.default.isWeChatGame();
    };
    WxGameSdkManager.prototype.initData = function (callback) {
        if (!this.isWeChatGame()) {
            return;
        }
        // this.sdkLogin(callback);
        this.createUserInfoButton(callback);
        //分享测试-右上角分享
        // this.setShareAppMessage();
    };
    /**
     * 分享测试-右上角分享 - 因为要用到 柚子的uid，所以在初始化柚子之后调用
     */
    WxGameSdkManager.prototype.setShareAppMessage = function () {
        var shareInfo = this.getShareInfo();
        this.onShareAppMessage(shareInfo[0], shareInfo[1], this.getQuery(GlogManager_1.ShareLogType.zhuanfa, shareInfo[2]), parseInt(shareInfo[2]));
        this.registerOnShowEvent();
    };
    /**
     * 获得分享参数
     * @param shareType
     */
    WxGameSdkManager.prototype.getQuery = function (shareType, imgIndex) {
        var q = exports.WxGameSdkManagerInstance.uid;
        return "quid=" + q + "&qtype=" + shareType + "&qi=" + imgIndex + "&leuokShareIn=" + imgIndex;
    };
    WxGameSdkManager.prototype.createUserInfoButton = function (callback) {
        // WxSdk.createUserInfoButton((avatarUrl: string, nickName: string, isOk: boolean) => {
        //     this.isInit = true;
        //     callback(avatarUrl, nickName, isOk);
        // });
    };
    /**
     * 分享
     * @param callback 回调函数
     * @param position 分享位置
     */
    WxGameSdkManager.prototype.shareAppMessage = function (callback, shareLogType) {
        if (!this.isWeChatGame()) {
            if (callback) {
                callback(true);
            }
            return;
        }
        this.shareLogType = shareLogType;
        var shareInfo = this.getShareInfo();
        //10-11 因为限制了分享，所以，现在点击分享后即可获得
        // callback(true);
        if (callback != null && typeof callback === "function") {
            this.onShareEndCbk = callback;
            this.shareStartTime = new Date().getTime();
            if (this.shareFlag == 0) {
                this.shareFlag = 1;
            }
        }
        else {
            this.onShareEndCbk = null;
        }
        this.shareAppMessage2(shareInfo[0], shareInfo[1], this.getQuery(shareLogType, shareInfo[2]));
        // GlogManagererInstance.sendShareOutLog(shareLogType, parseInt(shareInfo[2]));
    };
    /**
     * 微信转发-主动拉起转发，进入选择通讯录界面。
     */
    WxGameSdkManager.prototype.shareAppMessage2 = function (title, imageUrl, query) {
        var self = this;
        wx.shareAppMessage({
            title: title,
            imageUrl: imageUrl,
            query: query,
        });
    };
    /**
     * 注册小游戏回到前台的事件
     */
    WxGameSdkManager.prototype.registerOnShowEvent = function () {
        var _this = this;
        if (!this.isWeChatGame()) {
            return;
        }
        // wx.onShow(function (res) {
        //     console.log('小游戏回到前台:' + res);
        // });
        // if (WxSdk.compareVersion(WxSdk.getSDKVersion(), "2.5.1") >= 0) {
        //新版本sdk 无法获取到cancel
        //在模拟器中，弹出分享狂，onShow不会被回调；可以使用模拟器的“切后台”模拟
        wx.onShow(function (res) {
            // console.log('小游戏回到前台：' + res.scene);
            // if (res) {
            //     let scene = res.scene;
            //     if (scene == 1103 || scene == 1104) {
            //         //添加到‘我的小程序’进入
            //         GlobalManagerInstance.addToMyListPrize();
            //     }
            // }
            if (_this.onShareEndCbk && typeof _this.onShareEndCbk === "function") {
                if (_this.shareStartTime > 0) {
                    var nowTime = new Date().getTime();
                    var usedTime = nowTime - _this.shareStartTime;
                    // if (usedTime >= 2000) {
                    //0611 修改为3秒
                    if (usedTime >= 3000) {
                        if (_this.shareFlag == 1) {
                            if (Math.random() <= 0.5) {
                                _this.shareFlag = 2;
                                // this.onShareEndCbk(false);
                                // WxSdk.showToast('换个群或者好友试试吧');
                                //Android 6.7.2 以下版本，点击取消或蒙层时，回调 fail, errMsg 为 "fail cancel"
                                WxSdk_1.default.showModal('注意！需分享到不同的微信群', function () {
                                    _this.shareAppMessage(_this.onShareEndCbk, _this.shareLogType);
                                }, function () {
                                    _this.onShareEndCbk(false);
                                });
                                return;
                            }
                        }
                        _this.shareFlag = 0;
                        _this.onShareEndCbk(true);
                        _this.onShareEndCbk = null;
                    }
                    else {
                        // this.onShareEndCbk(false);
                        // WxSdk.showToast('未正确分享到群或好友');
                        WxSdk_1.default.showModal('注意！需分享到不同的微信群', function () {
                            _this.shareAppMessage(_this.onShareEndCbk, _this.shareLogType);
                        }, function () {
                            _this.onShareEndCbk(false);
                        });
                    }
                    _this.shareStartTime = 0;
                }
                else {
                    _this.shareFlag = 0;
                    _this.onShareEndCbk(true);
                    _this.onShareEndCbk = null;
                }
            }
            // if (YouziDataManager) {
            //     YouziDataManager.wxOnShow(res);
            // }
        });
    };
    // /**
    //  * 使手机发生较长时间的振动
    //  */
    // vibrateLong() {
    //     if (!this.isWeChatGame()) {
    //         return;
    //     }
    //     if (GameDataManagerInstance.shakeSwitch == 0) {
    //         return;
    //     }
    //     WxSdk.vibrateLong();
    // }
    // /**
    //  * 使手机发生短时间的振动
    //  */
    // vibrateShort() {
    //     if (!this.isWeChatGame()) {
    //         return;
    //     }
    //     if (GameDataManagerInstance.shakeSwitch == 0) {
    //         return;
    //     }
    //     WxSdk.vibrateShort();
    // }
    // /**
    //  * 创建朋友圈
    //  */
    // createGameClubButton() {
    //     if (!this.isWeChatGame()) {
    //         return;
    //     }
    //     WxSdk.createGameClubButton();
    // }
    /**
     * 微信右上角分享
     * @param title
     * @param imageUrl
     * @param query
     */
    WxGameSdkManager.prototype.onShareAppMessage = function (title, imageUrl, query, imgIng) {
        if (!this.isWeChatGame()) {
            return;
        }
        WxSdk_1.default.onShareAppMessage(title, imageUrl, query, imgIng);
    };
    WxGameSdkManager.instance = new WxGameSdkManager();
    return WxGameSdkManager;
}());
exports.default = WxGameSdkManager;
exports.WxGameSdkManagerInstance = WxGameSdkManager.instance;
