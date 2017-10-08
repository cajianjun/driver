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
var GamingLayer = (function (_super) {
    __extends(GamingLayer, _super);
    function GamingLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamingLayer.prototype.uiCompHandler = function () {
        var _this = this;
        var self = this;
        self.readText = ["THREE", "TWO", "ONE"];
        self.cur_read_index = 0;
        gc.gameCenter.cur_status = GameCenter.STATUS_NOT_READY;
        this.txt_ready.visible = true;
        self.cur_read_index = 0;
        self.txt_ready.text = this.readText[self.cur_read_index];
        self.cur_read_index++;
        self._startAnim = egret.setInterval(function () {
            if (self.cur_read_index < _this.readText.length) {
                self.txt_ready.text = _this.readText[self.cur_read_index];
                self.cur_read_index++;
            }
            else {
                gc.gameCenter.cur_status = GameCenter.STATUS_RUNNING;
                self.txt_ready.visible = false;
                egret.clearInterval(_this._startAnim);
            }
        }, this, 1000);
    };
    GamingLayer.prototype.updateUI = function (data) {
        var score = gc.gameCenter.score;
        var speed = gc.gameCenter.speed;
        this.txt_speed.text = speed + "h/s";
        this.txt_score.text = score + "m";
    };
    return GamingLayer;
}(EuiComponent));
__reflect(GamingLayer.prototype, "GamingLayer");
//# sourceMappingURL=GamingLayer.js.map