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
var ToucheLayer = (function (_super) {
    __extends(ToucheLayer, _super);
    // private _dleft = 0;
    // private _dright = 0;
    function ToucheLayer() {
        var _this = _super.call(this) || this;
        _this.leftTap = false;
        _this.rightTap = false;
        _this._direction = 0;
        _this.rightTouchPad = UIHelper.createBitmapByName("empty_png");
        _this.leftTouchPad = UIHelper.createBitmapByName("empty_png");
        _this.addChild(_this.leftTouchPad);
        _this.addChild(_this.rightTouchPad);
        //this.leftTouchPad.touchChildren = true;
        _this.leftTouchPad.touchEnabled = true;
        _this.leftTouchPad.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.goLeft, _this);
        _this.rightTouchPad.touchEnabled = true;
        _this.rightTouchPad.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.goRight, _this);
        return _this;
    }
    ToucheLayer.prototype.goLeft = function () {
        if (this._direction > 0) {
            this._direction = 0;
            return;
        }
        this._direction--;
    };
    ToucheLayer.prototype.goRight = function () {
        if (this._direction < 0) {
            this._direction = 0;
            return;
        }
        this._direction++;
    };
    Object.defineProperty(ToucheLayer.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        enumerable: true,
        configurable: true
    });
    ToucheLayer.prototype.initData = function () {
        this._direction = 0;
    };
    ToucheLayer.prototype.initView = function () {
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth;
        this.leftTouchPad.height = this.height;
        this.leftTouchPad.width = this.width / 2;
        this.rightTouchPad.height = this.height;
        this.rightTouchPad.width = this.width / 2;
        this.rightTouchPad.x = this.width / 2;
    };
    return ToucheLayer;
}(egret.Sprite));
__reflect(ToucheLayer.prototype, "ToucheLayer");
//# sourceMappingURL=TouchLayer.js.map