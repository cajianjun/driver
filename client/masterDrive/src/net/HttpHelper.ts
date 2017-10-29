module net{
    export var http:HttpHelper;
    export class HttpHelper {

        private host:string = "http://game.nobbican.com:9001/gamecenter";

        public constructor() {
            
        }

        public postReq(route:string,data:any,callback:Function,caller:any){
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(this.host + "/" + route,egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(data));
            var onSuccess = function (event:egret.Event) {
                var request = <egret.HttpRequest>event.currentTarget;
                request.removeEventListener(egret.Event.COMPLETE, onSuccess, self);
                request.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);  
                callback.call(caller,request.response);
            };
            var onError = function(event){
                var request = <egret.HttpRequest>event.currentTarget;
                request.removeEventListener(egret.Event.COMPLETE, onSuccess, self);
                request.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
                console.log(event);
            }
            request.addEventListener(egret.Event.COMPLETE,onSuccess,this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR,onError,this);
        }
    }
}
