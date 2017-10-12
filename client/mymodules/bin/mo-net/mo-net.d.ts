/**
 * Created by yangsong on 14/12/24.
 */
declare module pomeloClient {
    class Pomelo {
        private JS_WS_CLIENT_TYPE;
        private JS_WS_CLIENT_VERSION;
        private RES_OK;
        private RES_FAIL;
        private RES_OLD_CLIENT;
        private socket;
        private package;
        private protocol;
        private message;
        private initCallback;
        private handlers;
        private _callbacks;
        private callbacks;
        private routeMap;
        private handshakeBuffer;
        private handshakeCallback;
        private heartbeatId;
        private heartbeatTimeoutId;
        private heartbeatTimeout;
        private nextHeartbeatTimeout;
        private heartbeatInterval;
        private gapThreshold;
        private reqId;
        constructor();
        init(params: any, cb: any): void;
        private initEgretSocket(host, port, cb);
        on(event: any, fn: any): void;
        removeAllListeners(event?: any, fn?: any): void;
        private index(arr, obj);
        disconnect(): void;
        request(route: any, msg: any, cb: any): void;
        private notify;
        private sendMessage(reqId, route, msg);
        private send(packet);
        private processPackage(msg);
        private processMessage(msg);
        private heartbeat(data);
        private heartbeatTimeoutCb();
        private handshake(data);
        private handshakeInit(data);
        private onData(data);
        private deCompose(msg);
        private onKick(data);
        private emit(event, ...args);
    }
}
/**
 * Created by govo on 15/8/14.
 *
 * Pomelo Client for Egret, with protobuf support, with js ws client version 0.0.5
 * Github: https://github.com/govo/PomeloForEgret.git
 *
 * Thanks to:
 * D-Deo @ https://github.com/D-Deo/pomelo-flash-tcp.git
 * and yicaoyimu @ http://bbs.egret.com/forum.php?mod=viewthread&tid=2538&highlight=pomelo
 */
declare module pomeloClient {
    class PomeloBinary {
        static DEBUG: boolean;
        static EVENT_IO_ERROR: string;
        static EVENT_CLOSE: string;
        static EVENT_KICK: string;
        static EVENT_HEART_BEAT_TIMEOUT: string;
        private JS_WS_CLIENT_TYPE;
        private JS_WS_CLIENT_VERSION;
        private RES_OK;
        private RES_FAIL;
        private RES_OLD_CLIENT;
        private socket;
        private callbacks;
        private handlers;
        private routeMap;
        private heartbeatInterval;
        private heartbeatTimeout;
        private nextHeartbeatTimeout;
        private gapThreshold;
        private heartbeatId;
        private heartbeatTimeoutId;
        private handshakeCallback;
        private handshakeBuffer;
        private initCallback;
        private _callbacks;
        private reqId;
        private _package;
        private _message;
        constructor();
        init(params: any, cb: Function): void;
        private initWebSocket(host, port, cb);
        on(event: any, fn: any): void;
        request(route: any, msg: any, cb: any): void;
        private onMessage(event);
        private sendMessage(reqId, route, msg);
        private onConnect(e);
        private onClose(e);
        private onIOError(e);
        private onKick(event);
        private onData(data);
        private processMessage(msg);
        private heartbeat(data);
        private heartbeatTimeoutCb(data);
        off(event?: any, fn?: any): void;
        removeAllListeners(event?: any, fn?: any): void;
        private index(arr, obj);
        disconnect(): void;
        private _disconnect();
        private processPackage(msg);
        private handshake(resData);
        private handshakeInit(data);
        private send(byte);
        private emit(event, ...args);
    }
}
declare var pomelo: pomeloClient.PomeloBinary;
/**
 * Created by SmallAiTT on 2015/3/26.
 */
declare module logger.net {
    var log: any;
    var debug: any;
    var info: any;
    var warn: any;
    var error: any;
}
declare module mo {
    class _NetRequestInfo {
        requestId: any;
        route: string;
        args: any;
        cb: Function;
        ctx: any;
        isHttp: boolean;
        toPlayWaiting: boolean;
        isCrypt: boolean;
    }
    class Net extends egret.Emitter {
        static ON_ERROR: string;
        static ON_CLOSE: string;
        static ON_KICK: string;
        static ON_SUCCESS: string;
        static ON_ROUTE_ERROR: string;
        static ON_ROUTE_SUCCESS: string;
        logServer: boolean;
        respKey_msgCode: string;
        respKey_msgArgs: string;
        respKey_value: string;
        httpKey_route: string;
        httpKey_args: any;
        httpKey_sessionId: any;
        httpKey_handler: any;
        httpKey_crypt: string;
        key_host: string;
        key_port: string;
        gateDispatcher: string;
        httpHost: string;
        httpPort: string;
        httpConnectRoute: string;
        httpDisconnectRoute: string;
        loginNameKey: string;
        loginPwdKey: string;
        loginNameKeyOfLocal: string;
        loginPwdKeyOfLocal: string;
        loginRoute: string;
        reconnectView: any;
        _connectEventsInited: boolean;
        _kicked: boolean;
        _connecting: boolean;
        _connected: boolean;
        _requestIdCounter: number;
        _waitingRequestMap: any;
        _waitingQueue: any[];
        _waitingReq4PomeloQueue: any[];
        _connectType: number;
        _hasAsyncAccount: boolean;
        _reconnecting: boolean;
        _httpSessionId: any;
        _httpConnected: boolean;
        _serverConnected: boolean;
        _serverHost: any;
        _serverPort: any;
        _httpCryptKey: any;
        _serverCryptKey: any;
        _initProp(): void;
        connect(cb: Function, playWaiting?: boolean): void;
        disconnect(): void;
        asyncAccount(cb: any, toPlayWaiting?: boolean, toResetAsyncFlag?: boolean): void;
        _reconnect(requestInfo?: _NetRequestInfo): void;
        request(route: any, args: any, cb: any, ctx: any): void;
        requestWaiting(route: any, args: any, cb: any, ctx: any): void;
        request4Pomelo(route: any, args: any, cb: any, ctx: any): void;
        requestWaiting4Pomelo(route: any, args: any, cb: any, ctx: any): void;
        connect4Server(cb: any, ctx?: any): void;
        disconnect4Server(cb: any, ctx?: any): void;
        connect4Http(cb: any, ctx: any): void;
        disconnect4Http(cb: any, ctx?: any): void;
        request4Http(route: any, args: any, cb: any, ctx: any): void;
        requestWaiting4Http(route: any, args: any, cb: any, ctx: any): void;
        request4Server(route: any, args: any, cb: any, ctx: any): void;
        requestWaiting4Server(route: any, args: any, cb: any, ctx: any): void;
        _getRequestInfo(route: any, args: any, cb: any, target: any, option?: any): _NetRequestInfo;
        _request(requestInfo: _NetRequestInfo, force?: boolean): void;
        _doRequest(requestInfo: _NetRequestInfo): void;
        _getHttpParams(requestInfo: _NetRequestInfo): string;
        _requestHttp(requestInfo: _NetRequestInfo, isServer?: any): void;
        _calCrypt(requestInfo: _NetRequestInfo, isServer: any): void;
        _doRequestHttp(requestInfo: _NetRequestInfo, host: any, port: any): void;
        _requestPomelo(requestInfo: _NetRequestInfo): void;
        _handleRequestResult(requestInfo: _NetRequestInfo, result: any): void;
        _netErrShown: boolean;
        httpRetryMaxTimes: number;
        _curHttpRetryTimes: number;
        _showNetErrMsg(): void;
        _initConnectEvents(): void;
        _onClose(event: any): void;
        onRouteSuccess(route: any, cb: any, ctx: any): void;
        unRouteSuccess(route: any, cb: any, ctx: any): void;
        onRouteError(route: any, cb: any, ctx: any): void;
        unRouteError(route: any, cb: any, ctx: any): void;
        reset(): void;
    }
    function registerNet(opt: any): void;
    function request(route: any, args?: any, cb?: any, ctx?: any): void;
    function requestWaiting(route: any, args?: any, cb?: any, ctx?: any): void;
    function request4Pomelo(route: any, args?: any, cb?: any, ctx?: any): void;
    function requestWaiting4Pomelo(route: any, args?: any, cb?: any, ctx?: any): void;
    function connect4Server(cb: any, ctx?: any): void;
    function disconnect4Server(cb: any, ctx?: any): void;
    function request4Server(route: any, args?: any, cb?: any, ctx?: any): void;
    function requestWaiting4Server(route: any, args?: any, cb?: any, ctx?: any): void;
    function request4Http(route: any, args?: any, cb?: any, ctx?: any): void;
    function requestWaiting4Http(route: any, args?: any, cb?: any, ctx?: any): void;
    function connect(cb: Function, playWaiting?: boolean): void;
    function disconnect(): void;
    var httpMode:String;
}
