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
var GameDataManager_1 = require("./GameDataManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 音效
 */
var AudioComponent = /** @class */ (function (_super) {
    __extends(AudioComponent, _super);
    function AudioComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgAudio = null;
        _this.clickAudio = null;
        _this.boxCloseAudio = null;
        _this.dropsAudio = null;
        _this.pieczatkaAudio = null;
        _this.wrongAudio = null;
        _this.bgAudioId = -1;
        return _this;
    }
    /**播放音效 */
    AudioComponent.prototype.playAudio = function (audio, loop, volume) {
        if (loop === void 0) { loop = false; }
        if (volume === void 0) { volume = 1; }
        if (!audio) {
            return -1;
        }
        if (GameDataManager_1.GameDataManagerInstance.audioSwitch == 1) {
            // if (false) {
            return cc.audioEngine.play(audio, loop, volume);
        }
        return -1;
    };
    /**播放背景音 */
    AudioComponent.prototype.playMusic = function (music, loop, volume) {
        if (loop === void 0) { loop = false; }
        if (volume === void 0) { volume = 1; }
        if (!music) {
            return -1;
        }
        // if (GameDataManagerInstance.musicSwitch == 1) {
        if (GameDataManager_1.GameDataManagerInstance.audioSwitch == 1) {
            // if (false) {
            return cc.audioEngine.play(music, loop, volume);
        }
        return -1;
    };
    /**
     * 关闭所有音效
     */
    AudioComponent.prototype.stopAllAudio = function () {
        this.stopBgAudio();
    };
    /**
     * 点击音效
     */
    AudioComponent.prototype.playClickAudio = function () {
        this.playAudio(this.clickAudio);
    };
    /**
     * 播放背景音效
     */
    AudioComponent.prototype.playBgAudio = function () {
        this.stopBgAudio();
        this.bgAudioId = this.playMusic(this.bgAudio, true);
    };
    /**
     * 停止背景音效播放
     */
    AudioComponent.prototype.stopBgAudio = function () {
        if (this.bgAudioId != -1) {
            cc.audioEngine.stop(this.bgAudioId);
            this.bgAudioId = -1;
        }
    };
    AudioComponent.prototype.playBoxCloseAudio = function () {
        this.playAudio(this.boxCloseAudio);
    };
    AudioComponent.prototype.playDropsAudio = function () {
        this.playAudio(this.dropsAudio);
    };
    AudioComponent.prototype.playPieczatkaAudio = function () {
        this.playAudio(this.pieczatkaAudio);
    };
    AudioComponent.prototype.playWrongAudio = function () {
        this.playAudio(this.wrongAudio);
    };
    __decorate([
        property({ type: cc.AudioClip, })
    ], AudioComponent.prototype, "bgAudio", void 0);
    __decorate([
        property({ type: cc.AudioClip, })
    ], AudioComponent.prototype, "clickAudio", void 0);
    __decorate([
        property({ type: cc.AudioClip, })
    ], AudioComponent.prototype, "boxCloseAudio", void 0);
    __decorate([
        property({ type: cc.AudioClip, })
    ], AudioComponent.prototype, "dropsAudio", void 0);
    __decorate([
        property({ type: cc.AudioClip, })
    ], AudioComponent.prototype, "pieczatkaAudio", void 0);
    __decorate([
        property({ type: cc.AudioClip, })
    ], AudioComponent.prototype, "wrongAudio", void 0);
    AudioComponent = __decorate([
        ccclass
    ], AudioComponent);
    return AudioComponent;
}(cc.Component));
exports.default = AudioComponent;
