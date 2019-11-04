"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 微信sdk */
var WxSdk = /** @class */ (function () {
    function WxSdk() {
    }
    /**
     * 是否为微信小游戏
     */
    WxSdk.isWeChatGame = function () {
        return CC_WECHATGAME;
    };
    // /**
    //  * 获取授权 - 全屏隐藏的按钮
    //  * @param cb 
    //  */
    // static createUserInfoButton(cb) {
    //     if (this.compareVersion(this.getSDKVersion(), "2.0.1") < 0) {
    //         return;
    //     }
    //     if (!WxSdk.userinfoBtn) {
    //         let systemInfo = wx.getSystemInfoSync();
    //         let width = systemInfo.screenWidth;
    //         let height = systemInfo.screenHeight;
    //         WxSdk.userinfoBtn = wx.createUserInfoButton({
    //             type: 'text',
    //             text: '',
    //             style: {
    //                 left: 0,
    //                 top: 0,
    //                 width: width,
    //                 height: height,
    //                 backgroundColor: '#00000000',//最后两位为透明度
    //                 color: '#ffffff',
    //                 fontSize: 20,
    //                 textAlign: "center",
    //                 lineHeight: height,
    //             }
    //         });
    //     }
    //     if (WxSdk.userinfoBtn) {
    //         WxSdk.userinfoBtn.show();
    //         WxSdk.userinfoBtn.onTap((result) => {
    //             if (result.encryptedData) {
    //                 cb(result.userInfo.avatarUrl, result.userInfo.nickName, true);
    //             } else {
    //                 //玩家拒绝授权
    //                 cb(null, null, false);
    //             }
    //             WxSdk.userinfoBtn.hide();
    //         });
    //     }
    // }
    // /**
    //  * 微信授权
    //  */
    // static createUserInfoButton_old(cb) {
    //     if (this.compareVersion(this.getSDKVersion(), "2.0.1") >= 0) {
    //         //通过按钮形式获取玩家的信息
    //         let systemInfo = wx.getSystemInfoSync();
    //         let _width = 0.4 * systemInfo.screenWidth;
    //         let _height = _width / 2.21;
    //         //https://developers.weixin.qq.com/minigame/dev/document/open-api/user-info/wx.createUserInfoButton.html
    //         let userinfoBtn = wx.createUserInfoButton({
    //             type: 'image',
    //             // image: 'https://cdnminigame.leuok.cn/yzx/wx/mgua/login_btn/login_btn_1024.png',
    //             image: 'https://cdnminigame.leuok.cn/yzx/wx/mio/login_btn/login_btn_1227.png',
    //             style: {
    //                 left: (systemInfo.screenWidth - _width) / 2,
    //                 top: 0.68 * systemInfo.screenHeight - _height / 2 + 20,
    //                 width: _width,
    //                 height: _height,
    //                 lineHeight: 40,
    //                 backgroundColor: '#ffffff',
    //                 color: '#ffffff',
    //                 textAlign: 'center',
    //                 fontSize: 16,
    //                 borderRadius: 4
    //             }
    //         });
    //         //微信基础库版本大于2.0.0以上版本支持该方法
    //         userinfoBtn.show();
    //         userinfoBtn.onTap((result) => {
    //             if (result.encryptedData) {
    //                 userinfoBtn.hide();
    //                 WxSdk.startGameInit();
    //                 cb(result.userInfo.avatarUrl, result.userInfo.nickName, true);
    //             } else {
    //                 //玩家拒绝授权
    //                 userinfoBtn.hide();
    //                 WxSdk.startGameInit();
    //                 cb(result.userInfo.avatarUrl, result.userInfo.nickName, true);
    //             }
    //         });
    //     } else {
    //         WxSdk.startGameInit();
    //         cb("", "", false);
    //     }
    // }
    // /**
    //  * 微信登录，获取 code 和 encryptData
    //  */
    // static getWxLoginResult(cb) {
    //     //TODO 0803 应该先使用 wx.checkSession 验证
    //     // https://developers.weixin.qq.com/minigame/dev/document/open-api/login/wx.checkSession.html
    //     wx.login({
    //         success(loginResult) {
    //             // cc.error(`loginResult.code:${loginResult.code}`);
    //             WxSdk.wxCode = loginResult.code;
    //             //通过按钮形式获取玩家的信息
    //             let systemInfo = wx.getSystemInfoSync();
    //             // let _width = 0.5 * systemInfo.screenWidth;
    //             // let _height = _width / 3.05;
    //             // let _width = 222;
    //             // let _height = 90;
    //             let frameSize = cc.view.getFrameSize();
    //             let winSize = cc.director.getWinSize();
    //             let designSize = cc.view.getDesignResolutionSize();
    //             let subHeight = winSize.height - designSize.height;
    //             let subWidth = winSize.width - designSize.width;
    //             // console.log("====subHeight:" + subHeight);
    //             //wx高度转游戏高度
    //             // let nodeHeight = adHeight * winSize.height / frameSize.height - subHeight / 2;
    //             // adHeight=(nodeHeight+subHeight / 2)*frameSize.height /winSize.height
    //             // // let num = winSize.height / frameSize.height - subHeight / 2;
    //             // let num = (287 + subHeight / 2) * frameSize.height / winSize.height;
    //             // // 287*130
    //             // // let _width = 287 / num;
    //             // // let _height = 130 / num;
    //             // let _width = (287 + subWidth / 2) * frameSize.width / winSize.width;
    //             // let _height = (130 + subHeight / 2) * frameSize.height / winSize.height;
    //             let _width = 0.4 * systemInfo.screenWidth;
    //             let _height = _width / 2.21;
    //             // console.log(`====================num:${num}`);
    //             // console.log(`====================_width:${_width}`);
    //             // console.log(`====================_height:${_height}`);
    //             //https://developers.weixin.qq.com/minigame/dev/document/open-api/user-info/wx.createUserInfoButton.html
    //             let userinfoBtn = wx.createUserInfoButton({
    //                 type: 'image',
    //                 // image: 'https://cdnminigame.leuok.cn/yzx/wx/mgua/login_btn/login_btn_1024.png',
    //                 image: 'https://cdnminigame.leuok.cn/yzx/wx/mio/login_btn/login_btn_1227.png',
    //                 style: {
    //                     left: (systemInfo.screenWidth - _width) / 2,
    //                     top: 0.68 * systemInfo.screenHeight - _height / 2 + 20,
    //                     width: _width,
    //                     height: _height,
    //                     lineHeight: 40,
    //                     backgroundColor: '#ffffff',
    //                     color: '#ffffff',
    //                     textAlign: 'center',
    //                     fontSize: 16,
    //                     borderRadius: 4
    //                 }
    //             });
    //             //微信基础库版本大于2.0.0以上版本支持该方法
    //             userinfoBtn.show();
    //             userinfoBtn.onTap((result) => {
    //                 if (result.encryptedData) {
    //                     let loginRes: LoginResult = {
    //                         code: loginResult.code,
    //                         encryptedData: result.encryptedData,
    //                         iv: result.iv,
    //                         userInfo: result.userInfo,
    //                     };
    //                     userinfoBtn.hide();
    //                     WxSdk.startGameInit();
    //                     cb(null, loginRes);
    //                 } else {
    //                     //玩家拒绝授权
    //                 }
    //             });
    //         },
    //         fail(loginError) {
    //             console.log(`loginError:${loginError}`);
    //             cb(new Error('微信登录失败，请检查网络状态'), null);
    //         }
    //     })
    // }
    WxSdk.showToast = function (msg) {
        if (!this.isWeChatGame()) {
            console.log(msg);
            return;
        }
        wx.showToast({
            title: msg,
            icon: 'none'
            // icon: 'success',
        });
    };
    /**
     * 显示确认+取消的提示框
     * @param msg
     * @param confirmFunc
     * @param cancelFunc
     */
    WxSdk.showModal = function (msg, confirmFunc, cancelFunc) {
        wx.showModal({
            title: '提示',
            content: msg,
            cancelText: '我知道了',
            success: function (res) {
                if (res.confirm) {
                    console.log('确定');
                    confirmFunc();
                }
                else if (res.cancel) {
                    console.log('我知道了');
                    cancelFunc();
                }
            },
            fail: function (res) {
                console.log("showModal=" + res);
            }
        });
    };
    /**
     * 显示确认+取消的提示框
     * @param msg
     * @param confirmFunc
     * @param cancelFunc
     */
    WxSdk.showModal2 = function (msg, confirmText, cancelText, confirmFunc, cancelFunc) {
        wx.showModal({
            title: '提示',
            content: msg,
            confirmText: confirmText,
            cancelText: cancelText,
            success: function (res) {
                if (res.confirm) {
                    console.log('确定');
                    confirmFunc();
                }
                else if (res.cancel) {
                    console.log('取消');
                    cancelFunc();
                }
            },
            fail: function (res) {
                console.log("showModal=" + res);
            }
        });
    };
    /**
     * 显示确定框
     * @param msg
     * @param confirmFunc
     * @param cancelFunc
     */
    WxSdk.showModalOk = function (msg, confirmFunc) {
        wx.showModal({
            title: '提示',
            content: msg,
            showCancel: false,
            cancelText: '确认',
            success: function (res) {
                if (confirmFunc) {
                    confirmFunc();
                }
            }
        });
    };
    // /**
    //  * 微信朋友圈
    //  */
    // static createGameClubButton() {
    //     if (this.compareVersion(this.getSDKVersion(), '2.0.3') < 0) {
    //         return;
    //     }
    //     let height = wx.getSystemInfoSync().screenHeight * 0.7;
    //     WxSdk.gameClubButton = wx.createGameClubButton({
    //         icon: 'green',
    //         style: {
    //             left: 5,
    //             // top: 10,
    //             top: height,
    //             width: 32,
    //             height: 32
    //         }
    //     })
    // }
    // /**
    //  * 显示朋友圈
    //  */
    // static showGameClubButton() {
    //     if (WxSdk.gameClubButton) {
    //         WxSdk.gameClubButton.show();
    //     }
    // }
    // /**
    //  * 隐藏朋友圈
    //  */
    // static hideGameClubButton() {
    //     if (WxSdk.gameClubButton) {
    //         WxSdk.gameClubButton.hide();
    //     }
    // }
    /**
     * 初始化一些sdk的必须信息
     */
    WxSdk.startGameInit = function () {
        // WxSdk.initLaunch();
        WxSdk.showShareMenu();
        // WxSdk.initRank();
    };
    /**
     * 获取分享参数中的 query
     */
    WxSdk.initLaunch = function () {
        var _self = this;
        // wx.onShow(
        //     //监听小游戏回到前台的事件
        //     function (res) {
        //         _self.setShareJson(res);
        //     }
        // );
        var _onlaunch = wx.getLaunchOptionsSync();
        // console.log('-------------------wx.onLaunch: Res:'+JSON.stringify(_onlaunch));
        _self.setShareJson(_onlaunch);
        // if (window['YouziDataManager']) {
        //     window['YouziDataManager'].wxLaunch("wx847571ab0bd65f3c", _onlaunch);
        // }
    };
    WxSdk.setShareJson = function (res) {
        if (res) {
            if (res.query.quid) {
                WxSdk.sharedFriendId = res.query.quid;
            }
            if (res.query.qtype) {
                var imgIndex = 0;
                if (res.query.qi) {
                    imgIndex = parseInt(res.query.qi);
                }
                // GlogManagererInstance.sendShareInLog(res.query.qtype, imgIndex);
            }
            // if (res.query.invited) {
            //     //存在邀请者的id说明是点击拉新连接进入的
            //     //判断是否可以被邀请
            //     CDBManagerInstance.getUserData(CDBKeyEnum.beInvitedFlag, 0, (result) => {
            //         if (result) {
            //             if (result.state == 0) {
            //                 //成功
            //                 console.log(`CDBManagerInstance.getUserData-result.info:${result.info}`);
            //                 if (!result.info || result.info == 0) {
            //                     //TODO 0704 测试使用
            //                     // if (true) {
            //                     //添加到对方的好友信息中
            //                     CDBManagerInstance.setOtherData(CDBKeyEnum.otherUserId, res.query.invited, WxGameSdkManagerInstance.cdbUid + "", null);
            //                 }
            //             } else {
            //                 console.log(`result.state=${result.state},result.msg=${result.msg}`);
            //             }
            //             //存储自己的数据
            //             CDBManagerInstance.setPrivateData(CDBKeyEnum.beInvitedFlag, "1", null);
            //         }
            //     });
            // } else {
            //     CDBManagerInstance.setPrivateData(CDBKeyEnum.beInvitedFlag, "1", null);
            // }
        }
    };
    /**
     * 微信转发-主动拉起转发，进入选择通讯录界面。
     */
    WxSdk.shareAppMessage = function (title, imageUrl, query) {
        wx.shareAppMessage({
            title: title,
            imageUrl: imageUrl,
            query: query,
        });
    };
    /**
     * 微信转发-监听用户点击右上角菜单的“转发”按钮时触发的事件
     */
    WxSdk.onShareAppMessage = function (title, imageUrl, query, imgIndex) {
        wx.onShareAppMessage(function () {
            // GlogManagererInstance.sendShareOutLog(ShareLogType.zhuanfa, imgIndex);
            return {
                title: title,
                imageUrl: imageUrl,
                query: query,
            };
        });
    };
    /**
     * 显示当前页面的转发按钮
     * 点击右上角按钮，会弹出菜单，菜单中的“转发”选项默认不展示。
     * 通过 wx.showShareMenu() 和 wx.hideShareMenu() 可动态显示、隐藏这个选项。
     */
    WxSdk.showShareMenu = function () {
        if (this.compareVersion(this.getSDKVersion(), '1.1.0') < 0) {
            return;
        }
        wx.showShareMenu({
            withShareTicket: true,
        });
    };
    Object.defineProperty(WxSdk, "systemInfo", {
        get: function () {
            if (this.m_systemInfo == null) {
                this.m_systemInfo = wx.getSystemInfoSync();
            }
            return this.m_systemInfo;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取微信版本号
     */
    WxSdk.getSDKVersion = function () {
        return this.systemInfo.SDKVersion;
    };
    /**
     * 是否为ios平台
     */
    WxSdk.isIOSPlatform = function () {
        return this.systemInfo.platform == "ios";
    };
    // /**
    //  * 发送post请求
    //  * @param url 
    //  * @param cb 
    //  */
    // static requestPost(url: string, data: string, cb: Function) {
    //     wx.request({
    //         url: url,
    //         data: data,
    //         method: "POST",
    //         fail: (error) => {
    //             console.log(`wx.request_erro:${error}`);
    //             cb();
    //         },
    //         success: (data) => {
    //             if (cb) {
    //                 cb();
    //             }
    //         }
    //     });
    // }
    // /**
    //  * 使手机发生较长时间的振动
    //  */
    // static vibrateLong() {
    //     if (this.compareVersion(this.getSDKVersion(), '1.2.0') < 0) {
    //         return;
    //     }
    //     wx.vibrateLong({
    //         success: () => { },
    //         fail: () => { },
    //         complete: () => { },
    //     });
    // }
    // /**
    //  * 使手机发生短时间的振动
    //  * 仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
    //  */
    // static vibrateShort() {
    //     if (this.compareVersion(this.getSDKVersion(), '1.2.0') < 0) {
    //         return;
    //     }
    //     wx.vibrateShort({
    //         success: () => { },
    //         fail: () => { },
    //         complete: () => { },
    //     });
    // }
    /**
     * 版本号比较
     * @param v1
     * @param v2
     */
    WxSdk.compareVersion = function (v1, v2) {
        v1 = v1.split('.');
        v2 = v2.split('.');
        var len = Math.max(v1.length, v2.length);
        while (v1.length < len) {
            v1.push('0');
        }
        while (v2.length < len) {
            v2.push('0');
        }
        for (var i = 0; i < len; i++) {
            var num1 = parseInt(v1[i]);
            var num2 = parseInt(v2[i]);
            if (num1 > num2) {
                return 1;
            }
            else if (num1 < num2) {
                return -1;
            }
        }
        return 0;
    };
    WxSdk.sharedFriendId = null; //分享给自己游戏的好友id
    WxSdk.userinfoBtn = null;
    /**获取微信系统信息 */
    WxSdk.m_systemInfo = null;
    return WxSdk;
}());
exports.default = WxSdk;
// /**
//  * 登录的返回结果
//  */
// export interface LoginResult {
//     code: string,
//     encryptedData: string,
//     iv: string,
//     userInfo: UserInfo,
// }
// /**
//  * 用户信息
//  */
// export interface UserInfo {
//     avatarUrl: string,
//     city: string,
//     country: string,
//     gender: string,
//     language: string,
//     nickName: string,
//     province: string,
// }
// /**
//  * 主域-子域 消息类型
//  */
// enum MessageTypeEnum {
//     friednRnk = 1, //获取好友排行榜
//     submitScore = 11, //提交分数
// }
// /**
//  * 主域-子域 排行榜行为类型
//  */
// export enum RankActionTypeEnum {
//     cur = 0, //当前页
//     up = 1, //上一页
//     next = 2, //下一页
// }
