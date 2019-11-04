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
Object.defineProperty(exports, "__esModule", { value: true });
var GameDataManager_1 = require("../GameDataManager");
var GlobalManager_1 = require("../GlobalManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 拖拽
 */
var TouchDraggerComponent = /** @class */ (function (_super) {
    __extends(TouchDraggerComponent, _super);
    function TouchDraggerComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchDraggerComponent.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (eventTouch) {
            if (!GlobalManager_1.GlobalManagerInstance.gameComponent.isStarting()) {
                return;
            }
            if (GameDataManager_1.GameDataManagerInstance.finishGameFlag) {
                return;
            }
            GameDataManager_1.GameDataManagerInstance.touchStartTarget = eventTouch.target;
            GameDataManager_1.GameDataManagerInstance.touchStartItemZIndex++;
            eventTouch.target.zIndex = GameDataManager_1.GameDataManagerInstance.touchStartItemZIndex;
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (!GlobalManager_1.GlobalManagerInstance.gameComponent.isStarting()) {
                return;
            }
            if (GameDataManager_1.GameDataManagerInstance.finishGameFlag) {
                return;
            }
            var delta = event.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
            // if (this.getComponent(TouchDragger).propagate)
            //     event.stopPropagation();
            if (GlobalManager_1.GlobalManagerInstance.gameComponent.gameUI.curGuanqia) {
                GlobalManager_1.GlobalManagerInstance.gameComponent.gameUI.curGuanqia.checkIntersection();
            }
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, function (eventTouch) {
            GameDataManager_1.GameDataManagerInstance.touchStartTarget = null;
            GameDataManager_1.GameDataManagerInstance.playDropAudioFlag = true;
            if (GameDataManager_1.GameDataManagerInstance.finishGameFlag) {
                return;
            }
            if (GlobalManager_1.GlobalManagerInstance.gameComponent.gameUI.curGuanqia) {
                GlobalManager_1.GlobalManagerInstance.gameComponent.gameUI.curGuanqia.checkIntersection(eventTouch.target);
            }
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (eventTouch) {
            GameDataManager_1.GameDataManagerInstance.touchStartTarget = null;
            GameDataManager_1.GameDataManagerInstance.playDropAudioFlag = true;
            if (GameDataManager_1.GameDataManagerInstance.finishGameFlag) {
                return;
            }
            if (GlobalManager_1.GlobalManagerInstance.gameComponent.gameUI.curGuanqia) {
                GlobalManager_1.GlobalManagerInstance.gameComponent.gameUI.curGuanqia.checkIntersection(eventTouch.target);
            }
        }, this.node);
    };
    TouchDraggerComponent = __decorate([
        ccclass
    ], TouchDraggerComponent);
    return TouchDraggerComponent;
}(cc.Component));
exports.default = TouchDraggerComponent;
