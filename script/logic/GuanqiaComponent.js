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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TouchDraggerComponent_1 = __importDefault(require("./TouchDraggerComponent"));
var GameDataManager_1 = require("../GameDataManager");
var GlobalManager_1 = require("../GlobalManager");
var PalecUIComponent_1 = __importDefault(require("../ui/PalecUIComponent"));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 关卡的预制
 */
var GuanqiaComponent = /** @class */ (function (_super) {
    __extends(GuanqiaComponent, _super);
    function GuanqiaComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boxesNode = null;
        _this.itemsNode = null;
        _this.lidsNode = null; //盖子
        _this.itemInBoxesNode = null; //box中的道具
        _this.tipsNode = null; //提示信息（开来你已经打包了一些东西）
        _this.forgetTipsNode = null; //提示信息（我差点忘记了……）
        _this.forgetBg = null;
        _this.forgetItem = null;
        _this.itemOfForgetNode = null; //被忘记的单元
        _this.palecUI = null;
        // private boxPolygons: Array<Array<cc.Vec2>> = []; //box的多边形
        // private itemPolygons: Array<Array<cc.Vec2>> = []; //item的多边形
        _this.boxPolygons = []; //box的多边形
        // private itemPolygons: Array<cc.Collider> = []; //item的多边形
        // private itemReds: Array<cc.Node> = []; //红色的item
        // private itemGreeds: Array<cc.Node> = []; //绿色的item
        _this.itemInfos = [];
        _this.lidNodes = [];
        _this.itemOfForgetNodes = [];
        _this.initFlag = false;
        _this.allInFlag = false;
        _this.hasForgetFlag = false; //是否存在被忘记的 item
        _this.finishY = 0; //完成时箱子的y坐标
        _this.finishX = 0; //完成时箱子的x坐标
        _this.boxesNodeBaseY = 0; //箱子的基础y
        _this.tipsNodeBaseY = 0; //提示信息的基础y
        return _this;
    }
    GuanqiaComponent.prototype.show = function () {
        var _this = this;
        this.allInFlag = false;
        this.finishY = -this.boxesNode.children[0].y;
        this.finishX = -this.boxesNode.children[0].x;
        this.boxesNodeBaseY = this.boxesNode.y;
        if (this.tipsNode) {
            this.tipsNodeBaseY = this.tipsNode.y;
            this.tipsNode.y = 1200;
        }
        if (this.forgetTipsNode) {
            this.forgetTipsNode.active = false;
        }
        if (this.itemOfForgetNode) {
            for (var _i = 0, _a = this.itemOfForgetNode.children; _i < _a.length; _i++) {
                var node = _a[_i];
                node.active = false;
                this.itemOfForgetNodes.push(node);
            }
            if (this.itemOfForgetNodes.length > 0) {
                this.hasForgetFlag = true;
            }
        }
        for (var _b = 0, _c = this.boxesNode.children; _b < _c.length; _b++) {
            var node = _c[_b];
            // let polygons: cc.Collider = node.getComponent(cc.Collider);
            var polygons = node.getComponents(cc.Collider);
            // this.boxPolygons.push(polygons.points);
            for (var _d = 0, polygons_1 = polygons; _d < polygons_1.length; _d++) {
                var polygon = polygons_1[_d];
                this.boxPolygons.push(polygon);
            }
        }
        for (var _e = 0, _f = this.itemsNode.children; _e < _f.length; _e++) {
            var node = _f[_e];
            node.addComponent(TouchDraggerComponent_1.default);
            // let polygons: cc.Collider = node.getComponent(cc.Collider);
            // // this.itemPolygons.push(polygons.points);
            // this.itemPolygons.push(polygons);
            var nodes = node.children; //约定：0为红色，1为绿色
            nodes[0].active = false;
            nodes[1].active = false;
            // this.itemReds.push(nodes[0]);
            // this.itemGreeds.push(nodes[1]);
            var itemInfo = new GuanqiaItemModel();
            this.itemInfos.push(itemInfo);
            itemInfo.itemPolygon = node.getComponent(cc.Collider);
            itemInfo.itemRed = nodes[0];
            itemInfo.itemGreed = nodes[1];
            this.setItemColor(itemInfo, -1);
            node.opacity = 0;
        }
        for (var _g = 0, _h = this.lidsNode.children; _g < _h.length; _g++) {
            var node = _h[_g];
            node.active = false;
            this.lidNodes.push(node);
        }
        if (this.itemInBoxesNode) {
            for (var _j = 0, _k = this.itemInBoxesNode.children; _j < _k.length; _j++) {
                var node = _k[_j];
                node.opacity = 0;
                var polygons = node.getComponents(cc.Collider);
                // this.boxPolygons.push(polygons.points);
                for (var _l = 0, polygons_2 = polygons; _l < polygons_2.length; _l++) {
                    var polygon = polygons_2[_l];
                    this.boxPolygons.push(polygon);
                }
            }
        }
        //箱子的移动
        this.boxesNode.y = 1280;
        this.boxesNode.runAction(cc.sequence(cc.moveTo(0.5, cc.v2(this.boxesNode.x, this.boxesNodeBaseY)), cc.callFunc(function () {
            if (_this.itemInBoxesNode) {
                for (var _i = 0, _a = _this.itemInBoxesNode.children; _i < _a.length; _i++) {
                    var node = _a[_i];
                    node.runAction(cc.fadeTo(0.2, 255));
                }
            }
            if (_this.tipsNode) {
                _this.tipsNode.runAction(cc.sequence(cc.moveTo(0.2, cc.v2(0, _this.tipsNodeBaseY)), cc.delayTime(1.6), cc.callFunc(function () {
                    _this.tipsNode.active = false;
                })));
            }
        })));
        this.scheduleOnce(function () {
            for (var i = 0; i < _this.itemsNode.children.length; i++) {
                var node = _this.itemsNode.children[i];
                var time = 0.2 + i * 0.08;
                node.runAction(cc.sequence(cc.delayTime(time), cc.fadeTo(0.2, 255)));
            }
        }, 0.7);
        this.scheduleOnce(function () {
            _this.initFlag = true;
        }, 1);
    };
    /**
     * 设置道具的颜色
     * @param index
     * @param colorType -1为原色 0为红色 1为绿色
     */
    GuanqiaComponent.prototype.setItemColor = function (itemInfo, colorType) {
        if (itemInfo.colorType == colorType) {
            return;
        }
        itemInfo.colorType = colorType;
        if (colorType == -1) {
            // this.itemPolygons[index].node.active = true;
            itemInfo.itemRed.active = false;
            itemInfo.itemGreed.active = false;
        }
        else if (colorType == 0) {
            // this.itemPolygons[index].node.active = false;
            itemInfo.itemRed.active = true;
            itemInfo.itemGreed.active = false;
        }
        else {
            // this.itemPolygons[index].node.active = false;
            itemInfo.itemRed.active = false;
            itemInfo.itemGreed.active = true;
        }
    };
    // update(dt: number) {
    GuanqiaComponent.prototype.checkIntersection = function (moveTargetNode) {
        // if (cc.Intersection.pointInPolygon(touchLoc, this.collider.world.points)) {
        //     this.title.string = 'Hit';
        // }
        var _this = this;
        if (moveTargetNode === void 0) { moveTargetNode = null; }
        if (!GlobalManager_1.GlobalManagerInstance.gameComponent.isStarting()) {
            return;
        }
        if (this.allInFlag) {
            return;
        }
        if (!this.initFlag) {
            return;
        }
        if (this.palecUI) {
            this.palecUI.node.active = false;
        }
        for (var i = 0; i < this.itemInfos.length; i++) {
            var itemInfo = this.itemInfos[i];
            itemInfo.allInFlag = false;
            this.setItemColor(itemInfo, -1);
        }
        var allInNum = 0;
        var itemIntersectionFlag = false; //item相交
        for (var _i = 0, _a = this.boxPolygons; _i < _a.length; _i++) {
            var boxPolygon = _a[_i];
            var boxPoints = boxPolygon.world.points;
            for (var i = 0; i < this.itemInfos.length; i++) {
                var itemInfo = this.itemInfos[i];
                var itemPolygon = itemInfo.itemPolygon;
                var itemPoints = itemPolygon.world.points;
                //先判断是否所有的点在多边形内部
                var pointsAllInNum = 0;
                for (var _b = 0, itemPoints_1 = itemPoints; _b < itemPoints_1.length; _b++) {
                    var point = itemPoints_1[_b];
                    if (cc.Intersection.pointInPolygon(point, boxPoints)) {
                        pointsAllInNum++;
                    }
                }
                if (pointsAllInNum == itemPoints.length) {
                    if (GameDataManager_1.GameDataManagerInstance.touchStartTarget == itemPolygon.node) {
                        this.setItemColor(itemInfo, 1);
                    }
                    // else {
                    //     this.setItemColor(itemInfo, -1);
                    // }
                    if (!itemInfo.allInFlag) {
                        allInNum++;
                        itemInfo.allInFlag = true;
                    }
                }
                else {
                    //判断相交
                    if (cc.Intersection.polygonPolygon(boxPoints, itemPolygon.world.points)) {
                        //测试多边形与多边形是否相交
                        this.setItemColor(itemInfo, 0);
                        allInNum--;
                    }
                    // else {
                    //     this.setItemColor(itemInfo, -1);
                    // }
                }
            }
        }
        for (var i = 0; i < this.itemInfos.length - 1; i++) {
            for (var j = i + 1; j < this.itemInfos.length; j++) {
                if (cc.Intersection.polygonPolygon(this.itemInfos[j].itemPolygon.world.points, this.itemInfos[i].itemPolygon.world.points)) {
                    //测试多边形与多边形是否相交
                    if (this.itemInfos[i].allInFlag) {
                        this.setItemColor(this.itemInfos[i], 0);
                    }
                    if (this.itemInfos[j].allInFlag) {
                        this.setItemColor(this.itemInfos[j], 0);
                    }
                    itemIntersectionFlag = true;
                }
            }
        }
        if (moveTargetNode) {
            for (var i = 0; i < this.itemInfos.length; i++) {
                var itemInfo = this.itemInfos[i];
                if (itemInfo.itemPolygon.node == moveTargetNode) {
                    var colorType = itemInfo.colorType;
                    if (colorType == 0) {
                        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playWrongAudio();
                    }
                    else if (colorType == -1) {
                        GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playDropsAudio();
                    }
                }
            }
        }
        if (allInNum == this.itemInfos.length && !itemIntersectionFlag) {
            if (GameDataManager_1.GameDataManagerInstance.touchStartTarget == null) {
                if (this.hasForgetFlag) {
                    this.hasForgetFlag = false;
                    this.forgetItem.active = false;
                    this.forgetItem.scale = 0;
                    this.forgetTipsNode.opacity = 0;
                    this.forgetTipsNode.active = true;
                    this.forgetTipsNode.runAction(cc.sequence(cc.fadeTo(0.2, 255), cc.callFunc(function () {
                        _this.forgetItem.active = true;
                        _this.forgetItem.runAction(cc.sequence(cc.scaleTo(0.4, 1), cc.delayTime(0.8), cc.scaleTo(0.2, 0)));
                    }), cc.delayTime(1.5), cc.callFunc(function () {
                        for (var _i = 0, _a = _this.itemOfForgetNodes; _i < _a.length; _i++) {
                            var node = _a[_i];
                            node.addComponent(TouchDraggerComponent_1.default);
                            // let polygons: cc.Collider = node.getComponent(cc.Collider);
                            // // this.itemPolygons.push(polygons.points);
                            // this.itemPolygons.push(polygons);
                            var nodes = node.children; //约定：0为红色，1为绿色
                            nodes[0].active = false;
                            nodes[1].active = false;
                            // this.itemReds.push(nodes[0]);
                            // this.itemGreeds.push(nodes[1]);
                            var itemInfo = new GuanqiaItemModel();
                            _this.itemInfos.push(itemInfo);
                            itemInfo.itemPolygon = node.getComponent(cc.Collider);
                            itemInfo.itemRed = nodes[0];
                            itemInfo.itemGreed = nodes[1];
                            _this.setItemColor(itemInfo, -1);
                            var baseScale = node.scale;
                            node.scale = 0;
                            node.active = true;
                            node.runAction(cc.sequence(cc.scaleTo(0.2, baseScale), cc.blink(0.5, 4)));
                        }
                        _this.forgetTipsNode.active = false;
                    })));
                    this.forgetBg.runAction(cc.rotateBy(3, 360).repeatForever());
                    return;
                }
                this.allInFlag = true;
                GameDataManager_1.GameDataManagerInstance.finishGameFlag = true;
                this.node.runAction(cc.sequence(cc.scaleTo(0.1, 1.05), cc.scaleTo(0.1, 1), 
                //TODO 0923 因为加入了banner，所以暂时屏蔽移动
                // cc.moveTo(0.3, cc.v2(this.finishX, this.finishY)),
                cc.rotateTo(0.12, -9), cc.rotateTo(0.12, 0), cc.rotateTo(0.12, 9), cc.rotateTo(0.12, 0), cc.rotateTo(0.1, -6), cc.rotateTo(0.1, 0), cc.rotateTo(0.1, 6), cc.rotateTo(0.1, 0), cc.callFunc(function () {
                    GlobalManager_1.GlobalManagerInstance.gameComponent.gameUI.endGuanqia();
                    // GameDataManagerInstance.finishGameFlag = false;
                })));
            }
        }
    };
    /**
     * 盖盖子
     */
    GuanqiaComponent.prototype.coverTheLid = function (callback) {
        var _this = this;
        for (var _i = 0, _a = this.lidNodes; _i < _a.length; _i++) {
            var node = _a[_i];
            var baseScale = node.scale;
            node.scale = 3.5;
            node.active = true;
            node.runAction(cc.sequence(cc.scaleTo(0.3, baseScale), cc.callFunc(function () {
                GlobalManager_1.GlobalManagerInstance.gameComponent.audioComponent.playBoxCloseAudio();
            }), cc.delayTime(0.3)));
        }
        this.scheduleOnce(function () {
            _this.node.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(720, _this.node.y)), cc.delayTime(0.3), cc.callFunc(function () {
                callback();
            })));
        }, 0.7);
    };
    __decorate([
        property(cc.Node)
    ], GuanqiaComponent.prototype, "boxesNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaComponent.prototype, "itemsNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaComponent.prototype, "lidsNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaComponent.prototype, "itemInBoxesNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaComponent.prototype, "tipsNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaComponent.prototype, "forgetTipsNode", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaComponent.prototype, "forgetBg", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaComponent.prototype, "forgetItem", void 0);
    __decorate([
        property(cc.Node)
    ], GuanqiaComponent.prototype, "itemOfForgetNode", void 0);
    __decorate([
        property(PalecUIComponent_1.default)
    ], GuanqiaComponent.prototype, "palecUI", void 0);
    GuanqiaComponent = __decorate([
        ccclass
    ], GuanqiaComponent);
    return GuanqiaComponent;
}(cc.Component));
exports.default = GuanqiaComponent;
var GuanqiaItemModel = /** @class */ (function () {
    function GuanqiaItemModel() {
        this.itemPolygon = null; //item的多边形
        this.itemRed = null; //红色的item
        this.itemGreed = null; //绿色的item
        this.allInFlag = false; //是否位于箱子内部
        this.colorType = -2; // -1为原色 0为红色 1为绿色
    }
    return GuanqiaItemModel;
}());
