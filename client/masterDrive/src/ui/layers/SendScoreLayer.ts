class SendScoreLayer extends EuiComponent{
   private edt_remark:eui.EditableText;
   private edt_username:eui.EditableText;
   private btn_send:eui.Button;

    uiCompHandler():void{
    }

    _tap_btn_send():void{
		var self = this;
    	net.http.postReq(
			net.Route.R_POST_SCORE,
	    	{
	    	score:gc.gameCenter.score,
	    	username:self.edt_username.text,
	    	remark:self.edt_remark.text
	    	},
			()=>{
				Toast.launch("装逼成功！");
				//gotoStartGamePage
				gc.gameCenter.openGame();
			},
			self
    	)
    }
}