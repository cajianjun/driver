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
// TypeScript file
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.lineMargin = 80;
        _this._speed = 100;
        _this.createView();
        return _this;
    }
    Background.prototype.initView = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.stageH = stageH;
        this.stageW = stageW;
        this.bm3.height = stageH;
        this.bm3.width = stageW;
        this.bm1.x = this.lineMargin - this.bm1.width / 2;
        this.bm2.x = stageW - this.lineMargin - this.bm1.width / 2;
        this.bm1.height = stageH;
        this.bm2.height = stageH;
        this._spaceLW = (stageW - 2 * this.lineMargin) / 3;
        this.lineLeft1.x = this._spaceLW + this.lineMargin - this.bm1.width / 2;
        this.lineLeft2.x = 2 * this._spaceLW + this.lineMargin - this.bm1.width / 2;
        this.lineLeft3.x = 2 * this._spaceLW + this.lineMargin - this.bm1.width / 2;
        this.lineRight1.x = 2 * this._spaceLW + this.lineMargin - this.bm1.width / 2;
        this.lineRight2.x = this._spaceLW + this.lineMargin - this.bm1.width / 2;
        this.lineRight3.x = this._spaceLW + this.lineMargin - this.bm1.width / 2;
        var lineH = (stageH / 2) * 2 / 3;
        this.lineH = lineH;
        var spaceH = lineH / 2;
        this.spaceH = spaceH;
        this.lineLeft1.height = lineH;
        this.lineLeft2.height = lineH;
        this.lineLeft3.height = lineH;
        this.lineRight1.height = lineH;
        this.lineRight2.height = lineH;
        this.lineRight3.height = lineH;
        this.lineLeft1.y = spaceH / 2;
        this.lineLeft2.y = spaceH / 2 + spaceH + lineH;
        this.lineLeft3.y = -(spaceH / 2 + lineH);
        this.lineRight1.y = spaceH / 2;
        this.lineRight2.y = spaceH / 2 + spaceH + lineH;
        this.lineRight3.y = -(spaceH / 2 + lineH);
    };
    Background.prototype.createView = function () {
        this.bm1 = UIHelper.createBitmapByName("white_png");
        this.bm2 = UIHelper.createBitmapByName("white_png");
        this.bm3 = UIHelper.createBitmapByName("black_png");
        this.addChild(this.bm3);
        this.addChild(this.bm1);
        this.addChild(this.bm2);
        this.lineLeft1 = UIHelper.createBitmapByName("white_png");
        this.lineLeft2 = UIHelper.createBitmapByName("white_png");
        this.lineLeft3 = UIHelper.createBitmapByName("white_png");
        this.lineRight1 = UIHelper.createBitmapByName("white_png");
        this.lineRight2 = UIHelper.createBitmapByName("white_png");
        this.lineRight3 = UIHelper.createBitmapByName("white_png");
        this.addChild(this.lineLeft1);
        this.addChild(this.lineLeft2);
        this.addChild(this.lineLeft3);
        this.addChild(this.lineRight1);
        this.addChild(this.lineRight2);
        this.addChild(this.lineRight3);
    };
    Background.prototype.enterframe = function () {
        this._speed = gc.gameCenter.speed;
        this.turnTop(this.lineLeft1);
        this.turnTop(this.lineLeft2);
        this.turnTop(this.lineLeft3);
        this.turnTop(this.lineRight1);
        this.turnTop(this.lineRight2);
        this.turnTop(this.lineRight3);
        this.lineLeft1.y += this._speed;
        this.lineLeft2.y += this._speed;
        this.lineLeft3.y += this._speed;
        this.lineRight1.y += this._speed;
        this.lineRight2.y += this._speed;
        this.lineRight3.y += this._speed;
    };
    Background.prototype.turnTop = function (bmp) {
        if (bmp.y > (this.stageH + this.spaceH)) {
            bmp.y = -this.lineH;
        }
    };
    Object.defineProperty(Background.prototype, "spaceLW", {
        get: function () {
            return this._spaceLW;
        },
        enumerable: true,
        configurable: true
    });
    return Background;
}(egret.Sprite));
__reflect(Background.prototype, "Background");
//# sourceMappingURL=Background.js.map