var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIHelper = (function () {
    function UIHelper() {
    }
    Object.defineProperty(UIHelper, "RED", {
        get: function () {
            return UIHelper.colors[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIHelper, "BLUE", {
        get: function () {
            return UIHelper.colors[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIHelper, "ORANGE", {
        get: function () {
            return UIHelper.colors[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIHelper, "PURPLE", {
        get: function () {
            return UIHelper.colors[3];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIHelper, "GREEN", {
        get: function () {
            return UIHelper.colors[4];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIHelper, "YELLOW", {
        get: function () {
            return UIHelper.colors[5];
        },
        enumerable: true,
        configurable: true
    });
    UIHelper.getRandomColor = function () {
        var index = Math.floor(Math.random() * 6);
        return UIHelper.colors[index];
    };
    UIHelper.getCarBMP = function (type, color) {
        var name = "car" + type + "_" + color + "_png";
        return UIHelper.createBitmapByName(name);
    };
    UIHelper.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    UIHelper.colors = ["red", "blue", "orange", "purple", "green", "yellow"];
    return UIHelper;
}());
__reflect(UIHelper.prototype, "UIHelper");
//# sourceMappingURL=UIHelper.js.map