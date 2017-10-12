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
var GameOverLayer = (function (_super) {
    __extends(GameOverLayer, _super);
    function GameOverLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameOverLayer.prototype.uiCompHandler = function () {
        this.txt_final_score.text = "太棒了！你的成绩是" + gc.gameCenter.score + "m,超过了全国99%的老司机";
    };
    GameOverLayer.prototype._tap_btn_restart = function () {
        gc.gameCenter.restartGame();
    };
    GameOverLayer.prototype._tap_btn_upscore = function () {
        gc.uiController.showLayer(UIConsts.LAYER_SEND_SCORE);
    };
    return GameOverLayer;
}(EuiComponent));
__reflect(GameOverLayer.prototype, "GameOverLayer");
//# sourceMappingURL=GameOverLayer.js.map