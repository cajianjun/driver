class Enermy extends Car {
    private _move_mode:number = 1;
    public constructor() {
        super();
    }

    public initAI(obj:any){
        //第几赛道
        var road_index:number = obj[0];
        //纵向位置加成
        var y_position_offset:number = obj[1];
        //横向速度
        this.speedH = obj[2];
        //运动模式
        this._move_mode = obj[3];
        //纵向运动速度
        this.speedV = obj[4];
    /*
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
        this.speedV = speedV;
        this.speedH = speedH;
    */
    }

    public enterframe():void{
        super.enterframe();
        this.y  += this.speedV; 
        if(this._move_mode == Config.MOVE_MODE_NONE){

        }else if(this._move_mode == Config.MOVE_MODE_ONE_DIRECTION){
            if(this.y > Config.DANCING_LINE){
            this.x  += this.speedH*this.speedHUnit;
            }

            if(this.x  < 0){
                this.x = 0;
            }
            if(this.x > (Constants.stageW - this._rect.width)){
                this.x = (Constants.stageW - this._rect.width)
            }
        }else if(this._move_mode == Config.MOVE_MODE_COME_GO){
            if(this.y > Config.DANCING_LINE){
                this.x  += this.speedH*this.speedHUnit;
            }

            if(this.x  < 0){
                this.speedH = -this.speedH;
                this.x = 0;
            }
            if(this.x > (Constants.stageW - this._rect.width)){
                this.speedH = -this.speedH;
                this.x = (Constants.stageW - this._rect.width)
            }
        }
        
    }
}
