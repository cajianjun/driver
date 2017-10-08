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
var MyCar = (function (_super) {
    __extends(MyCar, _super);
    function MyCar() {
        return _super.call(this) || this;
    }
    MyCar.prototype.createView = function () {
        this.body = UIHelper.getCarBMP("1", UIHelper.RED);
        this.addChild(this.body);
    };
    MyCar.prototype.initView = function () {
        var myspaceLW = Constants.spaceLW - 40;
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var scale = myspaceLW / this.body.width;
        this.body.width = scale * this.body.width;
        this.body.height = scale * this.body.height;
        this.x = stageW / 2 - this.body.width / 2;
        this.y = stageH - this.body.height - 30;
        this._rect.width = this.body.width - 10;
        this._rect.height = this.body.height - 10;
    };
    MyCar.prototype.updateDirectionH = function (direction) {
        this.speedH = direction;
    };
    return MyCar;
}(Car));
__reflect(MyCar.prototype, "MyCar");
//# sourceMappingURL=MyCar.js.map