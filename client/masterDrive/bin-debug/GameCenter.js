var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var gc;
(function (gc) {
})(gc || (gc = {}));
/**
 *
 * 游戏的逻辑控制中心
*/
var GameCenter = (function () {
    function GameCenter() {
        this._cur_status = 0;
        /**对方车辆*/
        this.enermys = [];
        this.MAX_ENERMY_SPEED = [8, 12, 16, 20, 24, 28, 32, 36, 40, 44];
        this.MAX_SPEED = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        this.MAX_SPEED_TIME = [5000, 15000, 25000, 40000, 55000, 70000, 90000, 130000, 160000, 200000];
        this.initData();
    }
    GameCenter.prototype.initData = function () {
        this._speed = 0;
        this._time = 0;
        this._distance = 0;
        this._lastTime = new Date().getTime();
    };
    GameCenter.prototype.initLayer = function (bgLayer, carLayer, uiLayer, touchLayer) {
        this._bgLayer = bgLayer;
        this._uiLayer = uiLayer;
        this._carLayer = carLayer;
        this._touchLayer = touchLayer;
        //添加公路背景
        this.addBG();
        //添加主角车辆
        this._mycar = new MyCar();
        this._carLayer.addChild(this._mycar);
        Constants.spaceLW = this._bg.spaceLW;
        this._mycar.initView();
        //添加触摸层
        this.toucheLayer = new ToucheLayer();
        this._touchLayer.addChild(this.toucheLayer);
        this.toucheLayer.initView();
    };
    GameCenter.prototype.mainLoop = function () {
        switch (gc.gameCenter.cur_status) {
            case GameCenter.STATUS_RUNNING:
                this.toucheLayer.visible = true;
                this.loop();
                this._bg.enterframe();
                this._mycar.updateDirectionH(this.toucheLayer.direction);
                this._mycar.enterframe();
                this.enermys.map(function (item) { return item.enterframe(); });
                this.checkDead();
                var newCar = EnermyFactory.createEnermy(this._carLayer);
                if (newCar) {
                    this.enermys.push(newCar);
                }
                gc.uiController.cur_layer.updateUI(null);
                break;
            case GameCenter.STATUS_DIE:
                this.toucheLayer.visible = false;
                break;
            case GameCenter.STATUS_NOT_READY:
                this.toucheLayer.visible = false;
                break;
            default:
                this.toucheLayer.visible = false;
        }
    };
    GameCenter.prototype.loop = function () {
        var curTime = new Date().getTime();
        var deltaTime = curTime - this._lastTime;
        this._distance += (deltaTime * this.speed / 1000);
        this._time += deltaTime;
        this._lastTime = curTime;
    };
    GameCenter.prototype.restartGame = function () {
        //init gamecenter
        this.initData();
        //init EnermyFactory
        EnermyFactory.init();
        //init MyCar 
        this._mycar.initView();
        this.toucheLayer.initData();
        //remove all enermys
        for (var i = 0; i < this.enermys.length; i++) {
            var car = this.enermys[i];
            car.destory();
            this._carLayer.removeChild(car);
        }
        this.enermys = [];
        gc.uiController.showLayer(UIConsts.LAYER_GAMING);
    };
    GameCenter.prototype.openGame = function () {
        gc.uiController.showLayer(UIConsts.LAYER_START_GAME);
    };
    GameCenter.prototype.startGame = function () {
        this.restartGame();
    };
    Object.defineProperty(GameCenter.prototype, "lastTime", {
        get: function () {
            return this._lastTime;
        },
        set: function (_lastTime) {
            this._lastTime = _lastTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameCenter.prototype, "speed", {
        get: function () {
            return this.MAX_SPEED[this.getSpeedIndex()];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameCenter.prototype, "score", {
        get: function () {
            return Math.round(this._distance);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameCenter.prototype, "enermySpeed", {
        get: function () {
            return this.MAX_ENERMY_SPEED[this.getSpeedIndex()];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameCenter.prototype, "cur_status", {
        get: function () {
            return this._cur_status;
        },
        set: function (cur_status) {
            this._cur_status = cur_status;
        },
        enumerable: true,
        configurable: true
    });
    GameCenter.prototype.getSpeedIndex = function () {
        var i = 0;
        for (var len = this.MAX_SPEED_TIME.length; i < len; i++) {
            if (this._time < this.MAX_SPEED_TIME[i]) {
                return i;
            }
        }
        return i;
    };
    GameCenter.prototype.addBG = function () {
        this._bg = new Background();
        this._bgLayer.addChild(this._bg);
        this._bg.initView();
    };
    GameCenter.prototype.checkDead = function () {
        for (var i = 0; i < this.enermys.length; i++) {
            if (this.collision(this._mycar.rect, this.enermys[i].rect)) {
                gc.gameCenter.cur_status = GameCenter.STATUS_DIE;
                gc.uiController.showLayer(UIConsts.LAYER_GAME_OVER);
                break;
            }
        }
        //检查对方车辆是不是越界已经死亡
        var deadArr = [];
        this.enermys.map(function (item) { if (!item.alive) {
            deadArr.push(item);
        } });
        for (var i = 0; i < deadArr.length; i++) {
            var car = deadArr[i];
            this.enermys.splice(this.enermys.indexOf(car), 1);
            car.destory();
            this._carLayer.removeChild(car);
        }
    };
    GameCenter.prototype.collision = function (rect1, rect2) {
        return rect1.intersects(rect2);
    };
    GameCenter.STATUS_RUNNING = 1;
    GameCenter.STATUS_DIE = 2;
    GameCenter.STATUS_NOT_READY = 3;
    return GameCenter;
}());
__reflect(GameCenter.prototype, "GameCenter");
//# sourceMappingURL=GameCenter.js.map