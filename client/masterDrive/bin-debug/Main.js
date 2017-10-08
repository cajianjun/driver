var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this._isDebug = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    /**
     * preload资源组加载进度
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     */
    Main.prototype.createGameScene = function () {
        this.init();
        gc.gameCenter.openGame();
    };
    Main.prototype.init = function () {
        Constants.stageH = this.stage.stageHeight;
        Constants.stageW = this.stage.stageWidth;
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this._bgLayer = new egret.DisplayObjectContainer();
        this._carLayer = new egret.DisplayObjectContainer();
        this._uiLayer = new egret.DisplayObjectContainer();
        this._touchLayer = new egret.DisplayObjectContainer();
        this.addChild(this._bgLayer);
        this.addChild(this._carLayer);
        this.addChild(this._uiLayer);
        this.addChild(this._touchLayer);
        //初始化gamecenter
        gc.gameCenter = new GameCenter();
        gc.gameCenter.initLayer(this._bgLayer, this._carLayer, this._uiLayer, this._touchLayer);
        //初始化ui控制器
        gc.uiController = new UIController(this._uiLayer);
        //初始化toast
        Toast.init(this, RES.getRes("toast_bg_png"));
        //绑定全局帧监听事件
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    Main.prototype.loop = function () {
        var now = new Date().getTime();
        var delta = now - gc.gameCenter.lastTime;
        if (delta > 100) {
            gc.gameCenter.lastTime = new Date().getTime();
            return;
        }
        gc.gameCenter.mainLoop();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map