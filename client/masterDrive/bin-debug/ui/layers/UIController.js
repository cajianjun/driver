var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gc;
(function (gc) {
})(gc || (gc = {}));
var UIController = (function () {
    function UIController(parent) {
        this.layer_parent = parent;
    }
    UIController.prototype.showLayer = function (layerName) {
        this.removeAll();
        var clazz = egret.getDefinitionByName(layerName);
        var layer = new clazz();
        this.cur_layer = layer;
        this.layer_parent.addChild(layer);
    };
    UIController.prototype.removeAll = function () {
        if (this.cur_layer && this.cur_layer.parent) {
            //remove displayObj
            this.cur_layer.parent.removeChild(this.cur_layer);
            //remove listener
            this.cur_layer.removeBtnListeners();
        }
    };
    return UIController;
}());
__reflect(UIController.prototype, "UIController");
//# sourceMappingURL=UIController.js.map