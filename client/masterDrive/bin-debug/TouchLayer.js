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
    function ToucheLayer() {
        var _this = _super.call(this) || this;
        // private leftTouchPad:egret.Bitmap;
        // private rightTouchPad:egret.Bitmap;
        // private leftTap:boolean = false;
        // private rightTap:boolean = false;
        _this._direction = 0;
        _this.touchPad = UIHelper.createBitmapByName("empty_png");
        _this.addChild(_this.touchPad);
        _this.touchPad.touchEnabled = true;
        _this.touchPad.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouch, _this);
        _this.touchPad.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouch, _this);
        _this.touchPad.addEventListener(egret.TouchEvent.TOUCH_END, _this.onEnd, _this);
        return _this;
        // this.rightTouchPad = UIHelper.createBitmapByName("empty_png");
        // this.leftTouchPad = UIHelper.createBitmapByName("empty_png");
        // this.addChild(this.leftTouchPad);
        // this.addChild(this.rightTouchPad);
        // //this.leftTouchPad.touchChildren = true;
        // this.leftTouchPad.touchEnabled = true;
        // this.leftTouchPad.addEventListener(egret.TouchEvent.TOUCH_TAP,this.goLeft, this);
        // this.rightTouchPad.touchEnabled = true;
        // this.rightTouchPad.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goRight, this);
    }
    ToucheLayer.prototype.onTouch = function (evt) {
        var touchX = evt.stageX;
        if (touchX < Constants.stageW / 2) {
            this._direction = -1;
        }
        else if (touchX > Constants.stageW / 2) {
            this._direction = 1;
        }
    };
    ToucheLayer.prototype.onEnd = function (evt) {
        this._direction = 0;
    };
    Object.defineProperty(ToucheLayer.prototype, "direction", {
        // private goLeft():void{
        //     if(this._direction > 0){
        //         this._direction = 0;
        //         return;
        //     }
        //     this._direction --;
        // }
        // private goRight():void{
        //     if(this._direction < 0){
        //         this._direction = 0;
        //         return;
        //     }
        //     this._direction ++;
        // }
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
        this.touchPad.height = this.height;
        this.touchPad.width = this.width;
        // this.leftTouchPad.height = this.height;
        // this.leftTouchPad.width = this.width/2;
        // this.rightTouchPad.height = this.height;
        // this.rightTouchPad.width = this.width/2;
        // this.rightTouchPad.x = this.width/2;
    };
    return ToucheLayer;
}(egret.Sprite));
__reflect(ToucheLayer.prototype, "ToucheLayer");
//# sourceMappingURL=TouchLayer.js.map