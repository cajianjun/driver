module gc{
    export var uiController:UIController;
}
class UIController {
    public cur_layer:EuiComponent;
    public layer_parent:egret.DisplayObjectContainer;
    public constructor(parent:egret.DisplayObjectContainer){
        this.layer_parent = parent;
    }
    public showLayer(layerName:string) {
        this.removeAll();
        var clazz = egret.getDefinitionByName(layerName);
        var layer = new clazz();
        this.cur_layer = layer;
        this.layer_parent.addChild(layer);
    }


    private removeAll():void{
        if(this.cur_layer && this.cur_layer.parent){
            //remove displayObj
            this.cur_layer.parent.removeChild(this.cur_layer);
            //remove listener
            this.cur_layer.removeBtnListeners();
        }
    }


    
}