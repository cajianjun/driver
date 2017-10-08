
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     */

    private loadingView:LoadingUI;
    private _bgLayer:egret.DisplayObjectContainer;
    private _carLayer:egret.DisplayObjectContainer;
    private _uiLayer:egret.DisplayObjectContainer;
    private _touchLayer:egret.DisplayObjectContainer;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
    }


    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    }

    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private _isDebug:boolean = false;

   

    /**
     * 创建游戏场景
     */
    private createGameScene():void {
        
        this.init();
        gc.gameCenter.openGame();
    }

    private init():void{
        Constants.stageH = this.stage.stageHeight;
        Constants.stageW = this.stage.stageWidth;
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        
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
        gc.gameCenter.initLayer(this._bgLayer,this._carLayer,this._uiLayer,this._touchLayer);
        //初始化ui控制器
        gc.uiController = new UIController(this._uiLayer);
        //初始化toast
        Toast.init( this, RES.getRes( "toast_bg_png" ) ); 

        //绑定全局帧监听事件
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    }

    private loop():void{
        var now = new Date().getTime();
        var delta = now - gc.gameCenter.lastTime;
        if(delta > 100){
            gc.gameCenter.lastTime = new Date().getTime();
            return;
        }
        gc.gameCenter.mainLoop();
        
    }

    

    
    


}
