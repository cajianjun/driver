var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var StartGameLayer = (function (_super) {
    __extends(StartGameLayer, _super);
    function StartGameLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartGameLayer.prototype.uiCompHandler = function () {
        var self = this;
    };
    StartGameLayer.prototype._tap_btn_start = function () {
        gc.gameCenter.startGame();
    };
    StartGameLayer.prototype._tap_btn_rank = function () {
        Toast.launch("抱歉还没做！");
    };
    return StartGameLayer;
}(EuiComponent));
__reflect(StartGameLayer.prototype, "StartGameLayer");
//# sourceMappingURL=StartGameLayer.js.map