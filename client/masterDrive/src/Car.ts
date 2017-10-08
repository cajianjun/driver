class Car extends egret.Sprite {
    protected body:egret.Bitmap;
    protected _rect:egret.Rectangle = new egret.Rectangle(0,0,0,0);

    private speedHUnit = 10;
    //水平速度
    protected speedH:number = 0;
    //垂直速度
    protected speedV:number = 0;

    private _alive:boolean = true;
    public constructor() {
        super();
        this.createView();
    }

    protected createView():void {
        this.body = UIHelper.getCarBMP("1",UIHelper.getRandomColor());
        this.addChild(this.body);
    }

    public initView():void{
        var myspaceLW =Constants.spaceLW - 40;
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var scale = myspaceLW/this.body.width;
        this.body.width = scale * this.body.width;
        this.body.height = scale* this.body.height;
        
        var randomNum:number = Math.random()*3;
        if(randomNum >= 0 && randomNum <1){
            this.x = stageW/2 - this.body.width/3*2;
        }else if(randomNum >= 1 && randomNum <2){
            this.x = stageW/2 - this.body.width*2;
        }else{
            this.x = stageW/2 + this.body.width/2;
        }
        this.y = -30-this.body.height ;

        this._rect.width = this.body.width-10;
        this._rect.height = this.body.height-10;
    }

    public initAI(speedV:number,speedH:number){
        this.speedV = speedV;
        this.speedH = speedH;
    }

    public enterframe():void{
        if(this.y > this.stage.stageHeight){
            console.log("i am dead");
            this._alive = false;
        }
        this.y  += this.speedV; 
        this.x  += this.speedH*this.speedHUnit;
        
    }

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
