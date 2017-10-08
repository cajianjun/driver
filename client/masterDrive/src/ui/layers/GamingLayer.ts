class GamingLayer extends EuiComponent{
    private txt_speed:eui.Label;
    private txt_score:eui.Label;
    private txt_ready:eui.Label;
    private readText:Array<string>;
    private cur_read_index:number;
    private _startAnim;

    protected uiCompHandler():void{
        var self = this;
        self.readText = ["THREE","TWO","ONE"];
        self.cur_read_index = 0;
        gc.gameCenter.cur_status = GameCenter.STATUS_NOT_READY;
        this.txt_ready.visible=true;
        self.cur_read_index = 0;
        self.txt_ready.text = this.readText[self.cur_read_index];
        self.cur_read_index ++;
        self._startAnim = egret.setInterval(() => {
            if(self.cur_read_index < this.readText.length){
                self.txt_ready.text = this.readText[self.cur_read_index];
                self.cur_read_index ++;
            }else{
                gc.gameCenter.cur_status = GameCenter.STATUS_RUNNING;
                self.txt_ready.visible=false;
                egret.clearInterval(this._startAnim);
            }
        },this,1000);
    }
    
    public  updateUI(data:any):void{
        var score = gc.gameCenter.score;
        var speed = gc.gameCenter.speed;
        this.txt_speed.text = speed + "h/s";
        this.txt_score.text = score + "m";
    }

}