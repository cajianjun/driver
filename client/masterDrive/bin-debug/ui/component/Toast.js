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
var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast(msg, w, h) {
        var _this = _super.call(this) || this;
        // console.log( "Toast:", msg );
        var bg = new egret.Bitmap(Toast._txtrToastBg);
        _this.addChild(bg);
        var tx = new egret.TextField;
        tx.multiline = true;
        tx.size = 40;
        tx.bold = true;
        tx.textColor = 0xFFFFFF;
        tx.stroke = 2;
        tx.strokeColor = 0;
        tx.text = msg;
        tx.fontFamily = "微软雅黑";
        tx.textAlign = egret.HorizontalAlign.CENTER;
        tx.width = w * .84;
        tx.x = (Toast._txtrToastBg.textureWidth - tx.width) / 2;
        tx.y = 6;
        _this.addChild(tx);
        bg.height = 12 + tx.height;
        _this.anchorOffsetX = _this.width * .5;
        _this.anchorOffsetY = _this.height * .5;
        _this.x = w * .5;
        _this.y = h * .618;
        _this.alpha = 0;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        egret.Tween.get(_this)
            .to({ alpha: 1 }, 800, egret.Ease.quintOut)
            .wait(1600)
            .to({ alpha: 0 }, 1200, egret.Ease.quintIn).call(function () {
            if (_this.parent) {
                _this.parent.removeChild(_this);
            }
        });
        return _this;
    }
    Toast.init = function (cont, txtrToastBg) {
        this._cont = cont;
        this._txtrToastBg = txtrToastBg;
    };
    Toast.launch = function (msg) {
        if (this._cont) {
            var toast = new Toast(msg, this._cont.stage.stageWidth, this._cont.stage.stageHeight);
            this._cont.addChild(toast);
        }
    };
    return Toast;
}(egret.DisplayObjectContainer));
__reflect(Toast.prototype, "Toast");
//# sourceMappingURL=Toast.js.map