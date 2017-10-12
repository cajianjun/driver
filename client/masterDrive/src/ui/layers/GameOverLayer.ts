class GameOverLayer extends EuiComponent{
   private txt_final_score:eui.Label;
    private btn_restart:eui.Button;
    private btn_upscore:eui.Button;
    uiCompHandler():void{
        this.txt_final_score.text = "太棒了！你的成绩是" + gc.gameCenter.score + "m,超过了全国99%的老司机";
    }

    _tap_btn_restart():void{
        gc.gameCenter.restartGame();
    }
     _tap_btn_upscore():void{
        gc.uiController.showLayer(UIConsts.LAYER_SEND_SCORE);
    }
}