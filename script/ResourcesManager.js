"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalManager_1 = require("./GlobalManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 游戏内UI
 */
var ResourcesManager = /** @class */ (function () {
    function ResourcesManager() {
        // isLoadOtherPrefabs = false; //是否加载完prefab
        /**存储的用来创建对象池的预制预制*/
        this.prefabMap = {};
        /**对象池集合*/
        this.pools = {};
    }
    ResourcesManager_1 = ResourcesManager;
    /**
     * 初始化对象池
     * @param key 预制的name拼串
     * @param prefab 预制
     * @param num 创建的数量
     */
    ResourcesManager.prototype.initPools = function (key, prefab, num) {
        this.addPrefabMap(key, prefab);
        if (this.pools[key]) {
            //已经赋值了
            return;
        }
        var pool = new cc.NodePool();
        this.pools[key] = pool;
        for (var i = 0; i < num; i++) {
            pool.put(this.createNode(prefab));
        }
    };
    /**
     * 获取
     */
    ResourcesManager.prototype.getNodeFromPool = function (key) {
        var pool = this.pools[key];
        if (pool.size() == 0) {
            pool.put(this.createNode(this.getPrefab(key)));
        }
        return pool.get();
    };
    /**
     * 放回
     */
    ResourcesManager.prototype.putNodeToPool = function (obj, key) {
        this.pools[key].put(obj);
    };
    /**
     * 创建
     */
    ResourcesManager.prototype.createNode = function (prefab) {
        var obj = cc.instantiate(prefab);
        return obj;
    };
    /**
     * 添加预制到集合中
     * @param key
     * @param value
     */
    ResourcesManager.prototype.addPrefabMap = function (key, value) {
        this.prefabMap[key] = value;
    };
    /**
     * 获取预制
     * @param key
     */
    ResourcesManager.prototype.getPrefab = function (key) {
        return this.prefabMap[key];
    };
    /**
     * 获取图片
     * @param key
     */
    ResourcesManager.prototype.getIcons = function (key, iconDirEnum, sprite, callback) {
        if (callback === void 0) { callback = null; }
        var iconPath = 'icons/' + iconDirEnum + "/" + key;
        cc.loader.loadRes(iconPath, cc.SpriteFrame, function (err, spriteFrame) {
            if (err != null) {
                cc.log(err.message);
                if (callback) {
                    callback();
                }
            }
            else {
                if (sprite != null && sprite.node != null && cc.isValid(sprite.node)) {
                    sprite.spriteFrame = spriteFrame;
                }
                if (callback) {
                    callback();
                }
            }
        });
        // if (this.spriteFrameMap.hasOwnProperty(key)) {
        //     return this.spriteFrameMap[key];
        // }
        // let t2d = this.spriteTexture2DMap[key];
        // let spf = new cc.SpriteFrame(t2d);
        // this.spriteFrameMap[key] = spf;
        // return spf;
    };
    /**
     * 获得角色的roleSkeleton预制
     * @param roleId
     * @param callback
     */
    ResourcesManager.prototype.getRoleSkeletonPrefab = function (roleId, callback) {
        var path = "prefab/role/role_sp" + roleId;
        cc.loader.loadRes(path, cc.Prefab, function (err, prefab) {
            if (err != null) {
                cc.log(err.message);
            }
            else {
                if (callback) {
                    callback(prefab);
                }
            }
        });
    };
    //==================
    // getComponent<T extends Component>(type: {prototype: T}): T;
    /**
     * 动态加载view逻辑
     */
    ResourcesManager.prototype.dynamicLoadView = function (name, parentNode, component, callback) {
        GlobalManager_1.GlobalManagerInstance.gameComponent.showLoading(true);
        cc.loader.loadRes(name, function (err, prefab) {
            // var newNode = cc.instantiate(prefab);
            // cc.director.getScene().addChild(newNode);
            if (err != null) {
                cc.log(err.message);
                // self.scene_main.showLoading(false);
                GlobalManager_1.GlobalManagerInstance.gameComponent.showLoading(false);
            }
            else {
                GlobalManager_1.GlobalManagerInstance.gameComponent.showLoading(false);
                var node = cc.instantiate(prefab);
                parentNode.addChild(node);
                callback(node.getComponent(component));
            }
        });
    };
    var ResourcesManager_1;
    ResourcesManager.instance = new ResourcesManager_1();
    ResourcesManager = ResourcesManager_1 = __decorate([
        ccclass
    ], ResourcesManager);
    return ResourcesManager;
}());
exports.default = ResourcesManager;
exports.ResourcesManagerInstance = ResourcesManager.instance;
var PrefabNameEnum;
(function (PrefabNameEnum) {
    //menu-ui
    PrefabNameEnum["menuUI"] = "prefab/menu_ui/sc_menuUI";
    PrefabNameEnum["guanqiaUI"] = "prefab/menu_ui/sc_guanqiaUI";
    //game-ui
    PrefabNameEnum["gameUI"] = "prefab/game_ui/sc_gameUI";
    PrefabNameEnum["resultUI"] = "prefab/game_ui/sc_resultUI";
    //关卡pre
    PrefabNameEnum["guaqianPre"] = "prefab/guanqia/sc_guanqia";
    PrefabNameEnum["bannerPanel"] = "prefab/logic/sc_bannerPanel";
    PrefabNameEnum["getTiliUI"] = "prefab/logic/sc_getTiliUI";
})(PrefabNameEnum = exports.PrefabNameEnum || (exports.PrefabNameEnum = {}));
/**
 * icon对应的路径
 */
var IconDirEnum;
(function (IconDirEnum) {
    // build = 'build',
})(IconDirEnum = exports.IconDirEnum || (exports.IconDirEnum = {}));
/**
 * 对象池的名字前缀
 */
var PoolNamePreEnum;
(function (PoolNamePreEnum) {
    // game_build = 'game_build', //游戏中的建筑
    // game_pathway = 'game_pathway', //游戏中的火车道
    // game_train = 'game_train', //游戏中的火车
    // game_line = 'game_line', //游戏中的地图上的线
})(PoolNamePreEnum = exports.PoolNamePreEnum || (exports.PoolNamePreEnum = {}));
