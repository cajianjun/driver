var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EnermyFactory = (function () {
    function EnermyFactory() {
    }
    EnermyFactory.createEnermy = function (parent) {
        if ((new Date().getTime() - EnermyFactory.lastEnermyTime) > EnermyFactory.timeSpace) {
            EnermyFactory.lastEnermyTime = new Date().getTime();
            var car = new Car();
            parent.addChild(car);
            car.initView();
            car.initAI(gc.gameCenter.enermySpeed, 0);
            return car;
        }
        return null;
    };
    EnermyFactory.init = function () {
        EnermyFactory.lastEnermyTime = 0;
    };
    //两个对方车辆之间的时间间隔
    EnermyFactory.timeSpace = 5000;
    return EnermyFactory;
}());
__reflect(EnermyFactory.prototype, "EnermyFactory");
//# sourceMappingURL=EnermyFactory.js.map