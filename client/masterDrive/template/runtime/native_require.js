
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/eui/eui.js",
	"libs/modules/socket/socket.js",
	"libs/modules/mylib/mylib.js",
	"bin-debug/Car.js",
	"bin-debug/ui/layers/EuiComponent.js",
	"bin-debug/common/Constants.js",
	"bin-debug/EnermyFactory.js",
	"bin-debug/GameCenter.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/MyCar.js",
	"bin-debug/StatusEvent.js",
	"bin-debug/TouchLayer.js",
	"bin-debug/UIHelper.js",
	"bin-debug/ui/layers/UIController.js",
	"bin-debug/common/UIConsts.js",
	"bin-debug/net/HttpHelper.js",
	"bin-debug/net/Route.js",
	"bin-debug/ui/component/Toast.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/ui/layers/GameOverLayer.js",
	"bin-debug/ui/layers/GamingLayer.js",
	"bin-debug/ui/layers/RankLayer.js",
	"bin-debug/ui/layers/SendScoreLayer.js",
	"bin-debug/ui/layers/StartGameLayer.js",
	"bin-debug/Background.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};