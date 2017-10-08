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
var EuiComponent = (function (_super) {
    __extends(EuiComponent, _super);
    function EuiComponent() {
        var _this = _super.call(this) || this;
        var classname = getClassName(_this);
        _this.addEventListener(egret.Event.COMPLETE /*eui.UIEvent.COMPLETE*/, _this._uiCompHandler, _this);
        _this.skinName = "resource/skins/" + classname + "Skin.exml";
        return _this;
    }
    EuiComponent.prototype._uiCompHandler = function () {
        this.removeEventListener(egret.Event.COMPLETE, this._uiCompHandler, this);
        this.addTapListener();
        if (this.uiCompHandler) {
            this.uiCompHandler();
        }
    };
    EuiComponent.prototype.removeBtnListeners = function () {
        var i = 0;
        for (; i < this._btnArr.length; i++) {
            var btn = this.skin[this._btnArr[i]];
            if (this["_tap_" + this._btnArr[i]]) {
                btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this["_tap_" + this._btnArr[i]], this);
            }
        }
    };
    EuiComponent.prototype.addTapListener = function () {
        var keys = Object.keys(this.skin);
        var i = 0;
        var tmpKey;
        var btnArr = [];
        for (; i < keys.length; i++) {
            var tmpKey = keys[i];
            if (tmpKey.indexOf("btn_") != 0) {
                continue;
            }
            var classname = getClassName(this.skin[keys[i]]);
            if (classname.indexOf("Button") > -1) {
                btnArr.push(tmpKey);
            }
        }
        this._btnArr = btnArr;
        i = 0;
        for (; i < btnArr.length; i++) {
            var btn = this.skin[btnArr[i]];
            if (this["_tap_" + btnArr[i]]) {
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this["_tap_" + btnArr[i]], this);
            }
        }
    };
    EuiComponent.prototype.uiCompHandler = function () {
    };
    EuiComponent.prototype.updateUI = function (data) {
    };
    return EuiComponent;
}(eui.Component));
__reflect(EuiComponent.prototype, "EuiComponent");
//# sourceMappingURL=EuiComponent.js.map