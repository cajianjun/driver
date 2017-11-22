// TypeScript file
class Background extends egret.Sprite {

    private lineMargin:number  = 80;
    private lineLeft1:egret.Bitmap;
    private lineLeft2:egret.Bitmap;
    private lineLeft3:egret.Bitmap;
    private lineRight1:egret.Bitmap;
    private lineRight2:egret.Bitmap;
    private lineRight3:egret.Bitmap;
    private bm1:egret.Bitmap;
    private bm2:egret.Bitmap;
    private bm3:egret.Bitmap;

    private stageH:number;
    private stageW:number;
    private lineH:number;
    private spaceH:number;
    private _speed:number = 100;
    private _spaceLW :number;
    private _targetSpeed:number = 0;
    private _curJiasudu = 0;
    public constructor() {
        super();
        this.createView();
        
    }
    public initView(){
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        this.stageH = stageH;
        this.stageW = stageW;
        this.bm3.height = stageH;
        this.bm3.width = stageW;
        this.bm1.x = this.lineMargin-this.bm1.width/2;
        this.bm2.x = stageW-this.lineMargin-this.bm1.width/2;
        this.bm1.height = stageH;
        this.bm2.height = stageH;
        this._spaceLW = (stageW - 2*this.lineMargin)/3;
        this.lineLeft1.x =  this._spaceLW + this.lineMargin - this.bm1.width/2;
        this.lineLeft2.x = 2*this._spaceLW + this.lineMargin - this.bm1.width/2;
        this.lineLeft3.x = 2*this._spaceLW + this.lineMargin - this.bm1.width/2;
        this.lineRight1.x = 2*this._spaceLW + this.lineMargin - this.bm1.width/2;
        this.lineRight2.x = this._spaceLW + this.lineMargin - this.bm1.width/2;
        this.lineRight3.x = this._spaceLW + this.lineMargin - this.bm1.width/2;
        
        var lineH = (stageH/2)*2/3;
        this.lineH = lineH;
        var spaceH = lineH/2;
        this.spaceH = spaceH;
        this.lineLeft1.height = lineH;
        this.lineLeft2.height = lineH;
        this.lineLeft3.height = lineH;
        this.lineRight1.height = lineH;
        this.lineRight2.height = lineH;
        this.lineRight3.height = lineH;

        this.lineLeft1.y = spaceH/2;
        this.lineLeft2.y = spaceH/2 + spaceH + lineH;
        this.lineLeft3.y = -(spaceH/2 + lineH);
        this.lineRight1.y = spaceH/2;
        this.lineRight2.y = spaceH/2 + spaceH + lineH;
        this.lineRight3.y = -(spaceH/2 + lineH);
    }
    private createView():void {
        
        this.bm1 = UIHelper.createBitmapByName("white_png");
        this.bm2 = UIHelper.createBitmapByName("white_png");
        this.bm3 = UIHelper.createBitmapByName("black_png");
       
        this.addChild(this.bm3);
        this.addChild(this.bm1);
        this.addChild(this.bm2);

        this.lineLeft1 = UIHelper.createBitmapByName("white_png");
        this.lineLeft2 = UIHelper.createBitmapByName("white_png");
        this.lineLeft3 = UIHelper.createBitmapByName("white_png");
        this.lineRight1 = UIHelper.createBitmapByName("white_png");
        this.lineRight2 = UIHelper.createBitmapByName("white_png");
        this.lineRight3 = UIHelper.createBitmapByName("white_png");
        this.addChild(this.lineLeft1);
        this.addChild(this.lineLeft2);
        this.addChild(this.lineLeft3);
        this.addChild(this.lineRight1);
        this.addChild(this.lineRight2);
        this.addChild(this.lineRight3);
    }

    public enterframe():void{
        this._targetSpeed = gc.gameCenter.speed;

        //加速缓冲，三秒内完成加速,三秒约等于100帧
        if(this._curJiasudu == 0 && this._targetSpeed != this._speed){
            this._curJiasudu = (this._targetSpeed - this._speed)/100;
        }
        if(this._speed < this._targetSpeed){
            this._speed += this._curJiasudu;
        }else{
            this._speed = this._targetSpeed;
            this._curJiasudu = 0;
        }
        
        this.turnTop(this.lineLeft1);
        this.turnTop(this.lineLeft2);
        this.turnTop(this.lineLeft3);
        this.turnTop(this.lineRight1);
        this.turnTop(this.lineRight2);
        this.turnTop(this.lineRight3);
        this.lineLeft1.y += this._speed;
        this.lineLeft2.y += this._speed;
        this.lineLeft3.y += this._speed;

        this.lineRight1.y += this._speed;
        this.lineRight2.y += this._speed;
        this.lineRight3.y += this._speed;

    }

    

    private turnTop(bmp:egret.Bitmap):void{
        if(bmp.y > (this.stageH + this.spaceH)){
            bmp.y = -this.lineH;
        }
    }

    public get spaceLW ():number{
        return this._spaceLW;
    }
}