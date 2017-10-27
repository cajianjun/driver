class Car extends egret.Sprite {
    protected body:egret.Bitmap;
    protected _rect:egret.Rectangle = new egret.Rectangle(0,0,0,0);

    protected speedHUnit = 10;
    //水平速度
    protected speedH:number = 0;
    //垂直速度
    protected speedV:number = 0;

    private _alive:boolean = true;
    public constructor() {
        super();
        this.createView();
        this.init();
    }

    protected createView():void {
        this.body = UIHelper.getCarBMP("1",UIHelper.getRandomColor());
        this.addChild(this.body);
    }

    /**
     * 初始化车辆外观位置速度逻辑
     */
    public init():void{

    }
    /**
     * 每帧执行的车辆运动逻辑
     */
    public enterframe():void{
        if(this.y > this.stage.stageHeight){
            this._alive = false;
        }
        
    }

    /**
     * 获取车辆当前是否还存活
     */
    public get alive():boolean{
        return this._alive;
    }

    public destory():void{
        this.removeChild(this.body);
    }

    public get rect():egret.Rectangle{
        this._rect.x = this.x+5;
        this._rect.y = this.y+5;
        return this._rect;
    }

}
