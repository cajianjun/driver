class MyCar extends Car {
    public constructor() {
        super();
    }


    protected  createView():void {
        this.body = UIHelper.getCarBMP("1",UIHelper.RED);
        this.addChild(this.body);
    }

    public init():void{
        var myspaceLW =Constants.spaceLW - 40;
        var scale = myspaceLW/this.body.width;
        this.body.width = scale * this.body.width;
        this.body.height = scale* this.body.height;
        this.x = Constants.stageW/2 - this.body.width/2;
        this.y = Constants.stageH - this.body.height-30;

        this._rect.width = this.body.width-10;
        this._rect.height = this.body.height-10;
    }

    public enterframe():void{
        super.enterframe();

        this.y  += this.speedV; 
        this.x  += this.speedH*this.speedHUnit;
        if(this.speedH > 0){
            this.rotation = 5;
        }else if(this.speedH < 0){
            this.rotation = -5;
        }else{
            this.rotation = 0;
        }
        if(this.x < 0){this.x = 0;}
        if(this.x > Constants.stageW-this.body.width){
            this.x = Constants.stageW-this.body.width;
        }
    }


    public updateDirectionH(direction:number):void{
        this.speedH = direction;
    }


}
