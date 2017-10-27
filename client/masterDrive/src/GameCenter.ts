module gc{
    export var gameCenter:GameCenter;
}
/**
 * 
 * 游戏的逻辑控制中心
*/
class GameCenter {

    public static  STATUS_RUNNING = 1;
    public static  STATUS_DIE = 2;
    public static  STATUS_NOT_READY = 3;
    private _cur_status:number = 0;

    private _bgLayer:egret.DisplayObjectContainer;
    private _carLayer:egret.DisplayObjectContainer;
    private _uiLayer:egret.DisplayObjectContainer;
    private _touchLayer:egret.DisplayObjectContainer;

    /**背景*/
    private _bg:Background;
    /**我方车辆*/
    private _mycar:MyCar;
    /**对方车辆*/
    private enermys:Array<Car> = [];
    /**触摸层*/
    private toucheLayer:ToucheLayer;

    /**当前速度 m/s*/
    private _speed:number;
    /**当前持续时间*/
    private _time:number;
    /**当前行车距离*/
    private _distance:number;
    /**上次记录时间*/
    private _lastTime:number;
    public constructor() {
        this.initData();
    }
    public initData():void{
        this._speed = 0;
        this._time = 0;
        this._distance = 0;
        this._lastTime = new Date().getTime();
    }

    public initLayer(bgLayer:egret.DisplayObjectContainer,
    carLayer:egret.DisplayObjectContainer,
    uiLayer:egret.DisplayObjectContainer,
    touchLayer:egret.DisplayObjectContainer,
    ):void{
        this._bgLayer = bgLayer;
        this._uiLayer = uiLayer;
        this._carLayer = carLayer;
        this._touchLayer = touchLayer;

    //添加公路背景
        this.addBG();
        //添加主角车辆
        this._mycar = new MyCar();
        this._carLayer.addChild(this._mycar);
        Constants.spaceLW = this._bg.spaceLW;
        this._mycar.init();


        //添加触摸层
        this.toucheLayer = new ToucheLayer();
        this._touchLayer.addChild(this.toucheLayer);
        this.toucheLayer.initView();
        
    }

    public mainLoop():void{
        switch(gc.gameCenter.cur_status)
        {
        case GameCenter.STATUS_RUNNING:
            this.toucheLayer.visible=true;
            this.loop();
            this._bg.enterframe();
            this._mycar.updateDirectionH(this.toucheLayer.direction);
            this._mycar.enterframe();
            this.enermys.map(item => item.enterframe());
            this.checkDead();
            var newCarArray:Array = EnermyFactory.createEnermy(this._carLayer);
            if(newCarArray.length > 0){
                for(var i =0;i < newCarArray.length;i++){
                    this.enermys.push(newCarArray[i]);
                }               
            }
            gc.uiController.cur_layer.updateUI(null);
            break;
        case GameCenter.STATUS_DIE:
            this.toucheLayer.visible=false;
            break;
        case GameCenter.STATUS_NOT_READY:
            this.toucheLayer.visible=false;
            break;
        default:
            this.toucheLayer.visible=false;
        }
    }

    public loop():void{
        var curTime = new Date().getTime();
        var deltaTime:number = curTime - this._lastTime;
        this._distance += (deltaTime * this.speed /1000);
        this._time += deltaTime;
        this._lastTime = curTime;
    }

     public restartGame():void{
        //init gamecenter
        this.initData();
        //init EnermyFactory
        EnermyFactory.init();
        //init MyCar 
        this._mycar.init();

        this.toucheLayer.initData();
        //remove all enermys
        
        for(var i =0;i < this.enermys.length;i++){
            var car:Car = this.enermys[i];
            car.destory();
            this._carLayer.removeChild(car);
        }
        this.enermys = [];

        gc.uiController.showLayer(UIConsts.LAYER_GAMING);
    }
    public openGame():void{
        gc.uiController.showLayer(UIConsts.LAYER_START_GAME);
    }

    public startGame():void{
     this.restartGame();   
    }
    

    public get lastTime():number{
        return this._lastTime;
    }

    public set lastTime(_lastTime:number){
        this._lastTime = _lastTime;
    }

    public get speed():number{
        return Config.MAX_SPEED[this.getSpeedIndex()];
    }

    public get score():number{
        return Math.round(this._distance);
    }

    public get enermySpeed():number
    {
        return Config.MAX_ENERMY_SPEED[this.getSpeedIndex()];
    }

    public get cur_status():number{
        return this._cur_status;
    }
    public set cur_status(cur_status:number){
        this._cur_status = cur_status;
    }
    

    public getSpeedIndex():number{
        var i = 0;
        for(var len=Config.MAX_SPEED_TIME.length;i < len;i++){
            if(this._time < Config.MAX_SPEED_TIME[i]){
                return i;
            }
        }
        return i;
        
    }

    private addBG():void{
        this._bg = new Background();
        this._bgLayer.addChild(this._bg);
        this._bg.initView();
    }

    private checkDead():void{
        
        for(var i =0;i < this.enermys.length;i++){
            if(this.collision(this._mycar.rect,this.enermys[i].rect)){
                gc.gameCenter.cur_status = GameCenter.STATUS_DIE;
                gc.uiController.showLayer(UIConsts.LAYER_GAME_OVER);
                break;
            }
        }
        //检查对方车辆是不是越界已经死亡
        var deadArr = [];
        this.enermys.map(item => {if(!item.alive){deadArr.push(item)}});
        for(var i = 0 ; i < deadArr.length;i++){
            var car:Car = deadArr[i];
            this.enermys.splice(this.enermys.indexOf(car),1);
            car.destory();
            this._carLayer.removeChild(car);
        }
    }

    private collision(rect1:egret.Rectangle,rect2:egret.Rectangle):boolean{
        return rect1.intersects(rect2);
    }

}
