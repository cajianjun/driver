class EuiComponent extends eui.Component {
    private _btnArr:Array<string>;
    public constructor() {
        super();
        var classname:string = getClassName(this);
        this.addEventListener( egret.Event.COMPLETE/*eui.UIEvent.COMPLETE*/, this._uiCompHandler, this );
        this.skinName = "resource/skins/"+ classname +"Skin.exml";
        
    }


    _uiCompHandler(): void{
        this.removeEventListener( egret.Event.COMPLETE, this._uiCompHandler, this );
        this.addTapListener();
        if(this.uiCompHandler){
            this.uiCompHandler();
        }
        
    }

    public removeBtnListeners():void{
        var i=0;
        for(;i < this._btnArr.length;i++){
            var btn = this.skin[this._btnArr[i]];
            if(this["_tap_" + this._btnArr[i]]){
                btn.removeEventListener(egret.TouchEvent.TOUCH_TAP ,this["_tap_" + this._btnArr[i]],this);
            }
            
        }
    }

    private addTapListener():void{
        var keys = Object.keys(this.skin);
        var i = 0;
        var tmpKey:string;
        var btnArr = [];
        for(;i < keys.length;i++){
            var tmpKey = keys[i];
            if(tmpKey.indexOf("btn_") != 0){
                continue;
            }
            var classname = getClassName(this.skin[keys[i]]);
            if(classname.indexOf("Button") > -1){
                btnArr.push(tmpKey);
            }
        }
        this._btnArr = btnArr;
        i=0;
        for(;i < btnArr.length;i++){
            var btn = this.skin[btnArr[i]];
            if(this["_tap_" + btnArr[i]]){
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP ,this["_tap_" + btnArr[i]],this);
            }
            
        }
    }
    
    protected uiCompHandler():void{

    }

    public updateUI(data:any):void{
        
    }
}
