
class ToucheLayer extends egret.Sprite {
    private leftTouchPad:egret.Bitmap;
    private rightTouchPad:egret.Bitmap;
    
    private leftTap:boolean = false;
    private rightTap:boolean = false;

    private _direction:number = 0;
    // private _dleft = 0;
    // private _dright = 0;
    public constructor() {
        super();
        
        this.rightTouchPad = UIHelper.createBitmapByName("empty_png");
        this.leftTouchPad = UIHelper.createBitmapByName("empty_png");
        this.addChild(this.leftTouchPad);
        this.addChild(this.rightTouchPad);
        //this.leftTouchPad.touchChildren = true;
        this.leftTouchPad.touchEnabled = true;
        this.leftTouchPad.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goLeft, this);
        
        this.rightTouchPad.touchEnabled = true;
        this.rightTouchPad.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goRight, this);

       
    }

    private goLeft():void{
        if(this._direction > 0){
            this._direction = 0;
            return;
        }
        this._direction --;
    }
    private goRight():void{
        if(this._direction < 0){
            this._direction = 0;
            return;
        }
        this._direction ++;
    }

    public get direction():number{
        return this._direction;
    }

    public initData():void{
        this._direction = 0;
    }

    public initView():void{
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth;
        this.leftTouchPad.height = this.height;
        this.leftTouchPad.width = this.width/2;
        this.rightTouchPad.height = this.height;
        this.rightTouchPad.width = this.width/2;
        this.rightTouchPad.x = this.width/2;
    }
}
