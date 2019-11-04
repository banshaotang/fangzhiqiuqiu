"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 本地存储
 */
var LocalStorageManager = /** @class */ (function () {
    function LocalStorageManager() {
        this.localStorage = cc.sys.localStorage;
    }
    LocalStorageManager_1 = LocalStorageManager;
    /**
     * 存储本地信息
     * @param key
     * @param value
     */
    LocalStorageManager.prototype.setLocalStorage = function (key, value) {
        // console.log('value-length:' + value.length);
        this.localStorage.setItem(key, value);
    };
    /**
     * 加载存储在本地的信息
     * @param key
     */
    LocalStorageManager.prototype.loadLocalStorage = function (key) {
        return this.localStorage.getItem(key);
    };
    /**
     * 存储游戏数据
     * @param data
     */
    LocalStorageManager.prototype.saveGameData = function (data) {
        this.setLocalStorage(LocalStorageKeyEnum.gameDataKey, data);
    };
    /**
     * 获取游戏数据
     */
    LocalStorageManager.prototype.getGameData = function (callback) {
        var res = this.loadLocalStorage(LocalStorageKeyEnum.gameDataKey);
        callback(res);
        return;
    };
    var LocalStorageManager_1;
    LocalStorageManager.instance = new LocalStorageManager_1();
    LocalStorageManager = LocalStorageManager_1 = __decorate([
        ccclass
    ], LocalStorageManager);
    return LocalStorageManager;
}());
exports.default = LocalStorageManager;
exports.LocalStorageManagerInstance = LocalStorageManager.instance;
var LocalStorageKeyEnum;
(function (LocalStorageKeyEnum) {
    LocalStorageKeyEnum["gameDataKey"] = "mbox0814";
    LocalStorageKeyEnum["uid"] = "uid";
    LocalStorageKeyEnum["uid_regtime"] = "uid_rt";
})(LocalStorageKeyEnum = exports.LocalStorageKeyEnum || (exports.LocalStorageKeyEnum = {}));
