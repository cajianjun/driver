var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Constants = (function () {
    function Constants() {
    }
    /**
     * 两个马路线之间的距离
    */
    Constants.spaceLW = 0;
    Constants.stageH = 0;
    Constants.stageW = 0;
    return Constants;
}());
__reflect(Constants.prototype, "Constants");
//# sourceMappingURL=Constants.js.map