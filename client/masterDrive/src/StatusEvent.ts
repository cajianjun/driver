class StatusEvent extends egret.Event
{
    public static GAME_STATUS_CHANGE = "game_status_change";
    public gameStatus:number;
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}