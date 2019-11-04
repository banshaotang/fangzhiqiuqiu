"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Youzi_1 = require("../../resources/youzi/Youzi");
/** 矩阵管理类 */
var JuzhenManager = /** @class */ (function () {
    function JuzhenManager() {
    }
    /**
     * 柚子-矩阵banner
     * @param node
     */
    JuzhenManager.prototype.chuangJianJuZhenBanner = function (node) {
        // return;
        // if (!WxGameSdkManagerInstance.isAdToShare()) {
        //     return;
        // }
        var subH = (cc.winSize.height - 1280) / 4;
        if (subH < 0) {
            subH = 0;
        }
        node.y = -cc.winSize.height / 2 + 95 + subH;
        /**柚子-矩阵banner */
        //isOffSwitch 是否独立出来,不参与微信banner切换
        Youzi_1.Youzi.createYouziUI_Matrix(node, { isOffSwitch: false });
    };
    /**
     * 柚子-创建主推
     * @param node
     * @param width
     * @param height
     */
    JuzhenManager.prototype.chuangjianZhuTui = function (node, width, height) {
        // return;
        // if (!WxGameSdkManagerInstance.isAdToShare()) {
        //     return;
        // }
        /**柚子- 主推类型 推广位 */
        Youzi_1.Youzi.createYouziUI_Main(node, { position: { x: 0, y: 0 }, actionClose: false, size: { width: width, height: height } });
    };
    /**
     * 一次创建 多个主推类型 推广位
     */
    JuzhenManager.prototype.chuangjianZhuTuis = function (parentNodes, moreGameNode) {
        // if (!WxGameSdkManagerInstance.isAdToShare()) {
        //     return;
        // }
        // 第一个参数为[first,second,third]，第二个参数也为数组，第三个参数为矩阵墙所在节点，请注意层级关系
        // 矩阵墙节点要在界面的最上层
        // 该对象会返回一个实例，用于当场景切换，或者隐藏节点时，取消计时器用途
        // let num = parentNodes.length;
        // let array = [];
        // for (let i = 0; i < num; i++) {
        //     array.push({ bgColor: cc.Color.BLACK });
        // }
        var mainInstane = Youzi_1.Youzi.createYouziUI_MultipleMain(parentNodes, [], moreGameNode);
        return mainInstane;
    };
    /**
     * 创建矩阵小banner
     * @param node
     * @param isVerticle
     */
    JuzhenManager.prototype.chuangjianXiaoBanner = function (node, isVerticle) {
        // return;
        if (isVerticle === void 0) { isVerticle = false; }
        // if (!WxGameSdkManagerInstance.isAdToShare()) {
        //     return;
        // }
        //矩阵小banner
        Youzi_1.Youzi.createYouziUI_Guess(node, { isVerticle: isVerticle });
    };
    /**
     * 创建更多游戏
     * @param btnParentNode
     * @param uiParentNode
     */
    JuzhenManager.prototype.chuangjianGengduoyouxi = function (btnParentNode, uiParentNode, moreGameBtnClickCallback, moreGameCloseCallback) {
        // return;
        if (moreGameBtnClickCallback === void 0) { moreGameBtnClickCallback = null; }
        if (moreGameCloseCallback === void 0) { moreGameCloseCallback = null; }
        // if (!WxGameSdkManagerInstance.isAdToShare()) {
        //     return;
        // }
        // //先创建矩阵墙入口按钮
        Youzi_1.Youzi.createYouzi_MoreGameBtn(btnParentNode, {
            callback: function (node) {
                //再创建矩阵墙UI
                //btnNode 入口按钮 如果不需要中心化的抽屉按钮 可使用cc.Button的node传入即可。
                //父节点 与 按钮的父节点 无需一致 
                if (moreGameCloseCallback) {
                    Youzi_1.Youzi.createYouziUI_MoreGame(uiParentNode, { btnNode: node, closeEvent: moreGameCloseCallback });
                }
                else {
                    Youzi_1.Youzi.createYouziUI_MoreGame(uiParentNode, { btnNode: node });
                }
            },
            clickEvent: function () {
                if (moreGameBtnClickCallback) {
                    moreGameBtnClickCallback();
                }
            }
        });
    };
    /**
     * 创建矩阵墙
     * @param uiParentNode
     */
    JuzhenManager.prototype.chuangjianJuzhenqiang = function (uiParentNode, callback, isShowNow) {
        // return;
        if (callback === void 0) { callback = null; }
        if (isShowNow === void 0) { isShowNow = true; }
        // if (!WxGameSdkManagerInstance.isAdToShare()) {
        //     return;
        // }
        //创建立刻展示UI 的普通使用方法
        uiParentNode.removeAllChildren();
        if (callback) {
            Youzi_1.Youzi.createYouziUI_MoreGame(uiParentNode, { isShowNow: isShowNow, closeEvent: callback });
        }
        else {
            Youzi_1.Youzi.createYouziUI_MoreGame(uiParentNode, { isShowNow: isShowNow });
        }
    };
    /**
     * 创建抽屉
     * @param btnParentNode
     * @param uiParentNode
     */
    JuzhenManager.prototype.chuangjianFloat = function (btnParentNode, uiParentNode, showPanel) {
        if (showPanel === void 0) { showPanel = false; }
        //普通使用方法 由于抽屉 需要一个入口按钮进行动画展示 所以如下
        //创建一个空node作为父节点,如果你的抽屉是放在左边，则父节点坐标应为(-screenWidth/2,0)。抽屉会按照父节点进行拉出拉入动画。
        //抽屉父节点 与 抽屉按钮的父节点 可以使用一个节点或不同节点。
        btnParentNode.x = -cc.winSize.width / 2;
        uiParentNode.x = -cc.winSize.width / 2;
        var floatSuccess = function (node) {
            //再创建抽屉UI
            //isRight 是否是右侧进出动画 
            //btnNode 入口按钮 如果不需要中心化的抽屉按钮 可使用cc.Button的node传入即可。
            //closeEvent 可选项 如果传入则抽屉收回时调用该回调函数
            //1023 showFlag 此字段为程序测添加
            //YouziUI_Float 的DIY 方法中的最下方添加了如下逻辑：
            //1023研发测添加-目的是直接显示抽屉
            // if(params.showFlag){
            //     this.scheduleOnce(()=>{
            //         this.openWithAnim();
            //     },0.2);
            // }
            Youzi_1.Youzi.createYouziUI_Float(uiParentNode, { isRight: false, btnNode: node, showFlag: showPanel }, null);
        };
        //先创建抽屉按钮
        Youzi_1.Youzi.createYouzi_FloatBtn(btnParentNode, { isRight: false, callback: floatSuccess });
    };
    /**
     * 创建矩阵banner
     * @param uiParentNode
     */
    JuzhenManager.prototype.chuangjianYouziUIMatrix = function (uiParentNode) {
        // if (!WxGameSdkManagerInstance.isAdToShare()) {
        //     return;
        // }
        //isOffSwitch 是否独立出来,不参与微信banner切换
        Youzi_1.Youzi.createYouziUI_Matrix(uiParentNode, { isOffSwitch: true });
    };
    /**
     * 创建小矩阵墙类型
     * @param uiParentNode
     */
    JuzhenManager.prototype.chuangjianYouziSmallMatrixWall = function (uiParentNode) {
        //小矩阵墙由于放置的是一个父节点上，所以多场景的游戏 需多次创建,isVerticle：true表示竖屏，false表示横屏
        Youzi_1.Youzi.createYouziUI_SmallMatrixWall(uiParentNode, { isVerticle: true });
    };
    JuzhenManager.instance = new JuzhenManager();
    return JuzhenManager;
}());
exports.default = JuzhenManager;
exports.JuzhenManagerInstance = JuzhenManager.instance;
