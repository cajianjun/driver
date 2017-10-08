
class ToucheLayer extends egret.Sprite {
    // private leftTouchPad:egret.Bitmap;
    // private rightTouchPad:egret.Bitmap;
    
    // private leftTap:boolean = false;
    // private rightTap:boolean = false;

    private _direction:number = 0;

    private touchPad:egret.Bitmap;

    public constructor() {
        super();
        this.touchPad =  UIHelper.createBitmapByName("empty_png");
        this.addChild(this.touchPad);
        this.touchPad.touchEnabled=true;
        this.touchPad.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch, this);
        this.touchPad.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouch, this);
        this.touchPad.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd, this);
        // this.rightTouchPad = UIHelper.createBitmapByName("empty_png");
        // this.leftTouchPad = UIHelper.createBitmapByName("empty_png");
        // this.addChild(this.leftTouchPad);
        // this.addChild(this.rightTouchPad);
        // //this.leftTouchPad.touchChildren = true;
        // this.leftTouchPad.touchEnabled = true;
        // this.leftTouchPad.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goLeft, this);
        
        // this.rightTouchPad.touchEnabled = true;
        // this.rightTouchPad.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goRight, this);

       
    }

    onTouch(evt:egret.TouchEvent ):void{
        var touchX:number = evt.stageX;
        if(touchX < Constants.stageW/2){
            this._direction = -1;
        }else if(touchX > Constants.stageW/2){
            this._direction = 1;
        }
    }
    onEnd(evt:egret.TouchEvent ):void{
        this._direction = 0;
    }

    // private goLeft():void{
    //     if(this._direction > 0){
    //         this._direction = 0;
    //         return;
    //     }
    //     this._direction --;
    // }
    // private goRight():void{
    //     if(this._direction < 0){
    //         this._direction = 0;
    //         return;
    //     }
    //     this._direction ++;
    // }

    public get direction():number{
        return this._direction;
    }

    public initData():void{
        this._direction = 0;
    }

    public initView():void{
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth;
        this.touchPad.height = this.height;
        this.touchPad.width = this.width;
        // this.leftTouchPad.height = this.height;
        // this.leftTouchPad.width = this.width/2;
        // this.rightTouchPad.height = this.height;
        // this.rightTouchPad.width = this.width/2;
        // this.rightTouchPad.x = this.width/2;
    }
}
