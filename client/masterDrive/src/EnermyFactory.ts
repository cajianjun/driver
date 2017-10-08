class EnermyFactory{
    private static lastEnermyTime;
    //两个对方车辆之间的时间间隔
    private static timeSpace = 5000;

   
    public static createEnermy(parent:egret.DisplayObjectContainer):Car{
        if((new Date().getTime() - EnermyFactory.lastEnermyTime) > EnermyFactory.timeSpace){
            EnermyFactory.lastEnermyTime = new Date().getTime();
            var car:Car = new Car();
            parent.addChild(car);
            car.initView();
            car.initAI(gc.gameCenter.enermySpeed,0);
            return car;
        }
        return null;
    }

    public static init():void{
        EnermyFactory.lastEnermyTime = 0;
    }
}
