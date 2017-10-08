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
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this) || this;
        _this._rect = new egret.Rectangle(0, 0, 0, 0);
        _this.speedHUnit = 10;
        //水平速度
        _this.speedH = 0;
        //垂直速度
        _this.speedV = 0;
        _this._alive = true;
        _this.createView();
        return _this;
    }
    Car.prototype.createView = function () {
        this.body = UIHelper.getCarBMP("1", UIHelper.getRandomColor());
        this.addChild(this.body);
    };
    Car.prototype.initView = function () {
        var myspaceLW = Constants.spaceLW - 40;
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var scale = myspaceLW / this.body.width;
        this.body.width = scale * this.body.width;
        this.body.height = scale * this.body.height;
        var randomNum = Math.random() * 3;
        if (randomNum >= 0 && randomNum < 1) {
            this.x = stageW / 2 - this.body.width / 3 * 2;
        }
        else if (randomNum >= 1 && randomNum < 2) {
            this.x = stageW / 2 - this.body.width * 2;
        }
        else {
            this.x = stageW / 2 + this.body.width / 2;
        }
        this.y = -30 - this.body.height;
        this._rect.width = this.body.width - 10;
        this._rect.height = this.body.height - 10;
    };
    Car.prototype.initAI = function (speedV, speedH) {
        this.speedV = speedV;
        this.speedH = speedH;
    };
    Car.prototype.enterframe = function () {
        if (this.y > this.stage.stageHeight) {
            this._alive = false;
        }
        this.y += this.speedV;
        this.x += this.speedH * this.speedHUnit;
    };
    Object.defineProperty(Car.prototype, "alive", {
        get: function () {
            return this._alive;
        },
        enumerable: true,
        configurable: true
    });
    Car.prototype.destory = function () {
        this.removeChild(this.body);
    };
    Object.defineProperty(Car.prototype, "rect", {
        get: function () {
            this._rect.x = this.x + 5;
            this._rect.y = this.y + 5;
            return this._rect;
        },
        enumerable: true,
        configurable: true
    });
    return Car;
}(egret.Sprite));
__reflect(Car.prototype, "Car");
//# sourceMappingURL=Car.js.map