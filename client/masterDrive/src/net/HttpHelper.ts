module net{
    export var http:HttpHelper;
    class HttpHelper {

        private host:string = "http://localhost:9001/gamecenter";

        public constructor() {
            
        }

        public postReq(route:string,data:any,callback:Function){
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(this.host,egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/json");
            var onSuccess = function (event:egret.Event) {
                request.removeEventListener(egret.Event.COMPLETE, onSuccess, self);
                request.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);  
                var request = <egret.HttpRequest>event.currentTarget;
                console.log("get data : ",request.response);
            };
            var onError = function(event:egret.Event){
                request.removeEventListener(egret.Event.COMPLETE, onSuccess, self);
                request.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
                console.log(event);
            }
            request.send(JSON.stringify(data));
            request.addEventListener(egret.Event.COMPLETE,onSuccess,this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR,onError,this);
        }
    }
}
