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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 游戏入口
 */
var LauncherComponent = /** @class */ (function (_super) {
    __extends(LauncherComponent, _super);
    function LauncherComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadTips = null;
        _this.isloading = false;
        return _this;
    }
    LauncherComponent.prototype.onLoad = function () {
        // PlatformMgr.init();
        // PlayerData.init();
        // PlatformMgr.doLogin(()=>{
        //     PlayerData.instance.initData();
        // });
        // ShareMgr.init();
        // ConfigData.init();
        // AdvertMgr.init();
    };
    LauncherComponent.prototype.start = function () {
    };
    LauncherComponent.prototype.init = function () {
    };
    LauncherComponent.prototype.update = function () {
        // if (ConfigData.instance.loadingConfigCount === ConfigData.instance.loadedConfigCount) {
        //     if (PlayerData.instance.loadComplete) {
        //         if (!this.isloading) {
        //             this.isloading = true;
        //             cc.director.loadScene("Battle");
        //         }
        //     }
        // }
        if (!this.isloading) {
            this.isloading = true;
            cc.director.loadScene("game");
        }
    };
    __decorate([
        property(cc.Label)
    ], LauncherComponent.prototype, "loadTips", void 0);
    LauncherComponent = __decorate([
        ccclass
    ], LauncherComponent);
    return LauncherComponent;
}(cc.Component));
exports.default = LauncherComponent;
