class SendScoreLayer extends EuiComponent{
   private edt_remark:eui.TextField;
   private edt_name:eui.TextField;
   private btn_send:eui.Button;

    uiCompHandler():void{
    }

    _tap_btn_send():void{
    	net.http.postReq("addScore",
	    	{
	    	score:100,
	    	username:edt_name.text,
	    	remark:edt_remark.text
	    	},
	    	Toast.launch("success");
	    	//back to startGame page
    	)
    }
}