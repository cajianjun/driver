class EnermyFactory{
    private static lastEnermyTime;
    private static TIME_SPACE = 5000;
    //两个对方车辆之间的时间间隔
    private static timeSpace = 5000;

    public static createEnermy(parent:egret.DisplayObjectContainer):Array<any>{
        if((new Date().getTime() - EnermyFactory.lastEnermyTime) > EnermyFactory.timeSpace){
            var curSpeedIndex:number = gc.gameCenter.getSpeedIndex();
            var totalGroups:Array<any> = Config.ENERMY_GROUP[curSpeedIndex];
            var randomIndex = Math.floor(totalGroups.length * Math.random());
            var group:Array<any> = totalGroups[randomIndex];
            var enermys = [];
            for(var i = 0;i < group.length;i++){
                EnermyFactory.lastEnermyTime = new Date().getTime();
                EnermyFactory.timeSpace = EnermyFactory.TIME_SPACE - 2000 * Math.random();
                var car:Enermy = new Enermy();
                parent.addChild(car);
                group[i][4] = Config.MAX_ENERMY_SPEED[gc.gameCenter.getSpeedIndex()];
                car.initAI(group[i]);
                
                enermys.push(car);
            }
            
            return enermys;
        }
        return [];
    }

    public static init():void{
        EnermyFactory.lastEnermyTime = 0;
        EnermyFactory.timeSpace = EnermyFactory.TIME_SPACE;
    }
}
