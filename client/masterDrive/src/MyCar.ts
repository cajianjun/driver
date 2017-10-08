class MyCar extends Car {
    public constructor() {
        super();
    }


    protected  createView():void {
        this.body = UIHelper.getCarBMP("1",UIHelper.RED);
        this.addChild(this.body);
    }

    public initView():void{
        var myspaceLW =Constants.spaceLW - 40;
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var scale = myspaceLW/this.body.width;
        this.body.width = scale * this.body.width;
        this.body.height = scale* this.body.height;
        this.x = stageW/2 - this.body.width/2;
        this.y = stageH - this.body.height-30;

        this._rect.width = this.body.width-10;
        this._rect.height = this.body.height-10;
    }



    public updateDirectionH(direction:number):void{
        this.speedH = direction;
    }


}
