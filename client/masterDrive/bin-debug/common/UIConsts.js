var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIConsts = (function () {
    function UIConsts() {
    }
    UIConsts.LAYER_START_GAME = "StartGameLayer";
    UIConsts.LAYER_GAME_OVER = "GameOverLayer";
    UIConsts.LAYER_GAMING = "GamingLayer";
    return UIConsts;
}());
__reflect(UIConsts.prototype, "UIConsts");
//# sourceMappingURL=UIConsts.js.map