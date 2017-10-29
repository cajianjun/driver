class StartGameLayer extends EuiComponent{
    private btn_start:eui.Button;
    private btn_rank:eui.Button;

    protected uiCompHandler():void{
        var self = this;
    }
    _tap_btn_start():void{
        gc.gameCenter.startGame();
    }

    _tap_btn_rank():void{
        gc.uiController.showLayer(UIConsts.LAYER_RANK);
    }
}