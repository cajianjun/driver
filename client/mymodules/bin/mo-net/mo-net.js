/**
 * Created by yangsong on 14/12/24.
 */
var pomeloClient;
(function (pomeloClient) {
    var Pomelo = (function () {
        function Pomelo() {
            this.JS_WS_CLIENT_TYPE = 'js-websocket';
            this.JS_WS_CLIENT_VERSION = '0.0.1';
            this.RES_OK = 200;
            this.RES_FAIL = 500;
            this.RES_OLD_CLIENT = 501;
            this.handlers = {};
            this._callbacks = {};
            this.callbacks = {};
            this.routeMap = {};
            this.heartbeatId = null;
            this.heartbeatTimeoutId = null;
            this.heartbeatTimeout = 0;
            this.nextHeartbeatTimeout = 0;
            this.heartbeatInterval = 0;
            this.gapThreshold = 100; // heartbeat gap threashold
            this.notify = function (route, msg) {
                msg = msg || {};
                this.sendMessage(0, route, msg);
            };
            this.package = new Package();
            this.protocol = new Protocol();
            this.message = new Message();
            this.handlers[Package.TYPE_HANDSHAKE] = this.handshake;
            this.handlers[Package.TYPE_HEARTBEAT] = this.heartbeat;
            this.handlers[Package.TYPE_DATA] = this.onData;
            this.handlers[Package.TYPE_KICK] = this.onKick;
            this.handshakeBuffer = {
                'sys': {
                    type: this.JS_WS_CLIENT_TYPE,
                    version: this.JS_WS_CLIENT_VERSION
                },
                'user': {}
            };
            this.reqId = 0;
        }
        var d = __define,c=Pomelo,p=c.prototype;
        p.init = function (params, cb) {
            this.initCallback = cb;
            this.initEgretSocket(params.host, params.port, cb);
        };
        p.initEgretSocket = function (host, port, cb) {
            var self = this;
            self.socket = new egret.WebSocket(host, port);
            console.log('init');
            self.socket.addEventListener(egret.Event.CONNECT, function () {
                console.log('CONNECT');
                var obj = self.package.encode(Package.TYPE_HANDSHAKE, self.protocol.strencode(JSON.stringify(self.handshakeBuffer)));
                self.send(obj);
            }, this);
            self.socket.addEventListener(egret.Event.CLOSE, function (e) {
                self.emit('close', e);
                console.error('socket close: ');
            }, this);
            self.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) {
                self.emit('io-error', e);
                console.error('socket error: ', e);
            }, this);
            self.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, function () {
                console.log('SOCKET_DATA');
                self.processPackage(self.package.decode(self.socket.readUTF()));
                // new package arrived, update the heartbeat timeout
                if (self.heartbeatTimeout) {
                    self.nextHeartbeatTimeout = Date.now() + self.heartbeatTimeout;
                }
            }, this);
            self.socket.connect(host, port);
        };
        p.on = function (event, fn) {
            (this._callbacks[event] = this._callbacks[event] || []).push(fn);
        };
        p.removeAllListeners = function (event, fn) {
            // all
            if (0 == arguments.length) {
                this._callbacks = {};
                return;
            }
            // specific event
            var callbacks = this._callbacks[event];
            if (!callbacks) {
                return;
            }
            // remove all handlers
            if (1 == arguments.length) {
                delete this._callbacks[event];
                return;
            }
            // remove specific handler
            var i = this.index(callbacks, fn._off || fn);
            if (~i) {
                callbacks.splice(i, 1);
            }
            return;
        };
        p.index = function (arr, obj) {
            if ([].indexOf) {
                return arr.indexOf(obj);
            }
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i] === obj)
                    return i;
            }
            return -1;
        };
        p.disconnect = function () {
            if (this.socket) {
                this.socket.close();
                console.log('disconnect');
                this.socket = null;
            }
            if (this.heartbeatId) {
                egret.clearTimeout(this.heartbeatId);
                this.heartbeatId = null;
            }
            if (this.heartbeatTimeoutId) {
                egret.clearTimeout(this.heartbeatTimeoutId);
                this.heartbeatTimeoutId = null;
            }
        };
        p.request = function (route, msg, cb) {
            if (arguments.length === 2 && typeof msg === 'function') {
                cb = msg;
                msg = {};
            }
            else {
                msg = msg || {};
            }
            route = route || msg.route;
            if (!route) {
                return;
            }
            this.reqId++;
            this.sendMessage(this.reqId, route, msg);
            this.callbacks[this.reqId] = cb;
            this.routeMap[this.reqId] = route;
        };
        p.sendMessage = function (reqId, route, msg) {
            var type = reqId ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY;
            msg = this.protocol.strencode(JSON.stringify(msg));
            var compressRoute = 0;
            msg = this.message.encode(reqId, type, compressRoute, route, msg);
            var packet = this.package.encode(Package.TYPE_DATA, msg);
            this.send(packet);
        };
        p.send = function (packet) {
            this.socket.writeUTF(packet.buffer);
        };
        p.processPackage = function (msg) {
            this.handlers[msg.type].call(this, msg.body);
        };
        p.processMessage = function (msg) {
            if (!msg.id) {
                // server push message
                this.emit(msg.route, msg.body);
                return;
            }
            //if have a id then find the callback function with the request
            var cb = this.callbacks[msg.id];
            delete this.callbacks[msg.id];
            if (typeof cb !== 'function') {
                return;
            }
            cb(msg.body);
            return;
        };
        p.heartbeat = function (data) {
            if (!this.heartbeatInterval) {
                // no heartbeat
                return;
            }
            var obj = this.package.encode(Package.TYPE_HEARTBEAT);
            if (this.heartbeatTimeoutId) {
                egret.clearTimeout(this.heartbeatTimeoutId);
                this.heartbeatTimeoutId = null;
            }
            if (this.heartbeatId) {
                // already in a heartbeat interval
                return;
            }
            var self = this;
            self.heartbeatId = egret.setTimeout(function () {
                self.heartbeatId = null;
                self.send(obj);
                self.nextHeartbeatTimeout = Date.now() + self.heartbeatTimeout;
                self.heartbeatTimeoutId = egret.setTimeout(self.heartbeatTimeoutCb, self, self.heartbeatTimeout);
            }, self, self.heartbeatInterval);
        };
        p.heartbeatTimeoutCb = function () {
            var gap = this.nextHeartbeatTimeout - Date.now();
            if (gap > this.gapThreshold) {
                this.heartbeatTimeoutId = egret.setTimeout(this.heartbeatTimeoutCb, this, gap);
            }
            else {
                console.error('server heartbeat timeout');
                this.emit('heartbeat timeout');
                this.disconnect();
            }
        };
        p.handshake = function (data) {
            data = JSON.parse(this.protocol.strdecode(data));
            if (data.code === this.RES_OLD_CLIENT) {
                this.emit('error', 'client version not fullfill');
                return;
            }
            if (data.code !== this.RES_OK) {
                this.emit('error', 'handshake fail');
                return;
            }
            this.handshakeInit(data);
            var obj = this.package.encode(Package.TYPE_HANDSHAKE_ACK);
            this.send(obj);
            if (this.initCallback) {
                this.initCallback(this.socket);
                this.initCallback = null;
            }
        };
        p.handshakeInit = function (data) {
            if (data.sys && data.sys.heartbeat) {
                this.heartbeatInterval = data.sys.heartbeat * 1000; // heartbeat interval
                this.heartbeatTimeout = this.heartbeatInterval * 2; // max heartbeat timeout
            }
            else {
                this.heartbeatInterval = 0;
                this.heartbeatTimeout = 0;
            }
            if (typeof this.handshakeCallback === 'function') {
                this.handshakeCallback(data.user);
            }
        };
        p.onData = function (data) {
            //probuff decode
            var msg = this.message.decode(data);
            if (msg.id > 0) {
                msg.route = this.routeMap[msg.id];
                delete this.routeMap[msg.id];
                if (!msg.route) {
                    return;
                }
            }
            msg.body = this.deCompose(msg);
            this.processMessage(msg);
        };
        p.deCompose = function (msg) {
            return JSON.parse(this.protocol.strdecode(msg.body));
        };
        p.onKick = function (data) {
            this.emit('onKick');
        };
        p.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var params = [].slice.call(arguments, 1);
            var callbacks = this._callbacks[event];
            if (callbacks) {
                callbacks = callbacks.slice(0);
                for (var i = 0, len = callbacks.length; i < len; ++i) {
                    callbacks[i].apply(this, params);
                }
            }
            return this;
        };
        return Pomelo;
    })();
    pomeloClient.Pomelo = Pomelo;
    egret.registerClass(Pomelo,"pomeloClient.Pomelo");
    var Message = (function () {
        function Message() {
        }
        var d = __define,c=Message,p=c.prototype;
        p.encode = function (id, type, compressRoute, route, msg) {
            if (typeof msg == "object")
                msg = JSON.stringify(msg);
            return { id: id, type: type, compressRoute: compressRoute, route: route, body: msg };
        };
        p.decode = function (buffer) {
            return buffer;
        };
        Message.TYPE_REQUEST = 0;
        Message.TYPE_NOTIFY = 1;
        Message.TYPE_RESPONSE = 2;
        Message.TYPE_PUSH = 3;
        return Message;
    })();
    egret.registerClass(Message,"Message");
    var Package = (function () {
        function Package() {
        }
        var d = __define,c=Package,p=c.prototype;
        p.decode = function (buffer) {
            if (typeof buffer == "string") {
                buffer = JSON.parse(buffer);
            }
            return buffer;
        };
        p.encode = function (type, body) {
            if (body === void 0) { body = ""; }
            var obj = { 'type': type, 'body': body };
            return { buffer: JSON.stringify(obj) };
        };
        Package.TYPE_HANDSHAKE = 1;
        Package.TYPE_HANDSHAKE_ACK = 2;
        Package.TYPE_HEARTBEAT = 3;
        Package.TYPE_DATA = 4;
        Package.TYPE_KICK = 5;
        return Package;
    })();
    egret.registerClass(Package,"Package");
    var Protocol = (function () {
        function Protocol() {
        }
        var d = __define,c=Protocol,p=c.prototype;
        p.strencode = function (str) {
            return str;
        };
        p.strdecode = function (buffer) {
            if (typeof buffer == "object") {
                buffer = JSON.stringify(buffer);
            }
            return buffer;
        };
        return Protocol;
    })();
    egret.registerClass(Protocol,"Protocol");
})(pomeloClient || (pomeloClient = {}));

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
var pomeloClient;
(function (pomeloClient) {
    var PomeloBinary = (function () {
        function PomeloBinary() {
            this.JS_WS_CLIENT_TYPE = 'js-websocket';
            this.JS_WS_CLIENT_VERSION = '0.0.5';
            this.RES_OK = 200;
            this.RES_FAIL = 500;
            this.RES_OLD_CLIENT = 501;
            this.socket = null;
            this.callbacks = {};
            this.handlers = {};
            // Map from request id to route
            this.routeMap = {};
            this.heartbeatInterval = 0;
            this.heartbeatTimeout = 0;
            this.nextHeartbeatTimeout = 0;
            this.gapThreshold = 100;
            this.heartbeatId = null;
            this.heartbeatTimeoutId = null;
            this.handshakeCallback = null;
            this.initCallback = null;
            this._callbacks = {};
            this.reqId = 0;
            if (!console.group) {
                console.group = console.log;
                console.groupEnd = function () { console.log("----"); };
                console.info = console.log;
                console.warn = console.log;
                console.error = console.log;
            }
            this._message = new Message();
            this._package = new Package();
            this.socket = null;
            this.callbacks = {};
            this.handlers = {};
            // Map from request id to route
            this.routeMap = {};
            this.heartbeatInterval = 0;
            this.heartbeatTimeout = 0;
            this.nextHeartbeatTimeout = 0;
            this.gapThreshold = 100;
            this.heartbeatId = null;
            this.heartbeatTimeoutId = null;
            this.handshakeCallback = null;
            this.handshakeBuffer = {
                'sys': {
                    type: this.JS_WS_CLIENT_TYPE,
                    version: this.JS_WS_CLIENT_VERSION
                },
                'user': {}
            };
            this.initCallback = null;
            this.reqId = 0;
            this.handlers[Package.TYPE_HANDSHAKE] = this.handshake;
            this.handlers[Package.TYPE_HEARTBEAT] = this.heartbeat;
            this.handlers[Package.TYPE_DATA] = this.onData;
            this.handlers[Package.TYPE_KICK] = this.onKick;
        }
        var d = __define,c=PomeloBinary,p=c.prototype;
        p.init = function (params, cb) {
            console.log("init", params);
            this.initCallback = cb;
            var host = params.host;
            var port = params.port;
            //
            //var url = 'ws://' + host;
            //if(port) {
            //    url +=  ':' + port;
            //}
            this.handshakeBuffer.user = params.user;
            this.handshakeCallback = params.handshakeCallback;
            this.initWebSocket(host, port, cb);
        };
        p.initWebSocket = function (host, port, cb) {
            console.log("[web socket] connect to:", host, port);
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_BINARY;
            this.socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onMessage, this);
            this.socket.connect(host, port);
        };
        p.on = function (event, fn) {
            (this._callbacks[event] = this._callbacks[event] || []).push(fn);
        };
        p.request = function (route, msg, cb) {
            if (arguments.length === 2 && typeof msg === 'function') {
                cb = msg;
                msg = {};
            }
            else {
                msg = msg || {};
            }
            route = route || msg.route;
            if (!route) {
                return;
            }
            this.reqId++;
            if (this.reqId > 127) {
                this.reqId = 1;
            }
            var reqId = this.reqId;
            if (PomeloBinary.DEBUG) {
                console.group("REQUEST:");
                console.info("Route:", route);
                console.log("Id:", reqId);
                console.log("Param:", msg);
                console.groupEnd();
            }
            this.sendMessage(reqId, route, msg);
            this.callbacks[reqId] = cb;
            this.routeMap[reqId] = route;
        };
        p.onMessage = function (event) {
            var byte = new egret.ByteArray();
            this.socket.readBytes(byte);
            this.processPackage(this._package.decode(byte));
        };
        p.sendMessage = function (reqId, route, msg) {
            var byte;
            byte = this._message.encode(reqId, route, msg);
            byte = this._package.encode(Package.TYPE_DATA, byte);
            this.send(byte);
        };
        p.onConnect = function (e) {
            console.log("[Pomelo] connect success", e);
            this.socket.writeBytes(this._package.encode(Package.TYPE_HANDSHAKE, Protocol.strencode(JSON.stringify(this.handshakeBuffer))));
            this.socket.flush();
        };
        p.onClose = function (e) {
            console.error("[Pomelo] connect close:", e);
            this.emit(PomeloBinary.EVENT_CLOSE, e);
        };
        p.onIOError = function (e) {
            this.emit(PomeloBinary.EVENT_IO_ERROR, e);
            console.error('socket error: ', e);
        };
        p.onKick = function (event) {
            this.emit(PomeloBinary.EVENT_KICK, event);
        };
        p.onData = function (data) {
            //probuff decode
            var msg = this._message.decode(data);
            if (msg.id > 0) {
                msg.route = this.routeMap[msg.id];
                delete this.routeMap[msg.id];
                if (!msg.route) {
                    return;
                }
            }
            //msg.body = this.deCompose(msg);
            this.processMessage(msg);
        };
        p.processMessage = function (msg) {
            if (!msg.id) {
                // server push message
                if (PomeloBinary.DEBUG) {
                    console.group("EVENT:");
                    console.info("Route:", msg.route);
                    console.info("Msg:", msg.body);
                    console.groupEnd();
                }
                this.emit(msg.route, msg.body);
                return;
            }
            if (PomeloBinary.DEBUG) {
                console.group("RESPONSE:");
                console.info("Id:", msg.id);
                console.info("Msg:", msg.body);
                console.groupEnd();
            }
            //if have a id then find the callback function with the request
            var cb = this.callbacks[msg.id];
            delete this.callbacks[msg.id];
            if (typeof cb !== 'function') {
                return;
            }
            if (msg.body && msg.body.code == 500) {
                var obj = { "code": 500, "desc": "�������ڲ�����", "key": "INTERNAL_ERROR" };
                msg.body.error = obj;
            }
            cb(msg.body);
            return;
        };
        p.heartbeat = function (data) {
            if (!this.heartbeatInterval) {
                // no heartbeat
                return;
            }
            var obj = this._package.encode(Package.TYPE_HEARTBEAT);
            if (this.heartbeatTimeoutId) {
                egret.clearTimeout(this.heartbeatTimeoutId);
                this.heartbeatTimeoutId = null;
            }
            if (this.heartbeatId) {
                // already in a heartbeat interval
                return;
            }
            var self = this;
            self.heartbeatId = egret.setTimeout(function () {
                self.heartbeatId = null;
                self.send(obj);
                self.nextHeartbeatTimeout = Date.now() + self.heartbeatTimeout;
                self.heartbeatTimeoutId = egret.setTimeout(self.heartbeatTimeoutCb.bind(self, data), self, self.heartbeatTimeout);
            }, self, self.heartbeatInterval);
        };
        p.heartbeatTimeoutCb = function (data) {
            var gap = this.nextHeartbeatTimeout - Date.now();
            if (gap > this.gapThreshold) {
                this.heartbeatTimeoutId = egret.setTimeout(this.heartbeatTimeoutCb, this, gap);
            }
            else {
                console.error('server heartbeat timeout', data);
                this.emit(PomeloBinary.EVENT_HEART_BEAT_TIMEOUT, data);
                this._disconnect();
            }
        };
        p.off = function (event, fn) {
            this.removeAllListeners(event, fn);
        };
        p.removeAllListeners = function (event, fn) {
            // all
            if (0 == arguments.length) {
                this._callbacks = {};
                return;
            }
            // specific event
            var callbacks = this._callbacks[event];
            if (!callbacks) {
                return;
            }
            // remove all handlers
            if (event && !fn) {
                delete this._callbacks[event];
                return;
            }
            // remove specific handler
            var i = this.index(callbacks, fn._off || fn);
            if (~i) {
                callbacks.splice(i, 1);
            }
            return;
        };
        p.index = function (arr, obj) {
            if ([].indexOf) {
                return arr.indexOf(obj);
            }
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i] === obj)
                    return i;
            }
            return -1;
        };
        p.disconnect = function () {
            this._disconnect();
        };
        p._disconnect = function () {
            console.warn("[Pomelo] client disconnect ...");
            if (this.socket && this.socket.connected)
                this.socket.close();
            this.socket = null;
            if (this.heartbeatId) {
                egret.clearTimeout(this.heartbeatId);
                this.heartbeatId = null;
            }
            if (this.heartbeatTimeoutId) {
                egret.clearTimeout(this.heartbeatTimeoutId);
                this.heartbeatTimeoutId = null;
            }
        };
        p.processPackage = function (msg) {
            this.handlers[msg.type].apply(this, [msg.body]);
        };
        p.handshake = function (resData) {
            var data = JSON.parse(Protocol.strdecode(resData));
            if (data.code === this.RES_OLD_CLIENT) {
                this.emit(PomeloBinary.EVENT_IO_ERROR, 'client version not fullfill');
                return;
            }
            if (data.code !== this.RES_OK) {
                this.emit(PomeloBinary.EVENT_IO_ERROR, 'handshake fail');
                return;
            }
            this.handshakeInit(data);
            var obj = this._package.encode(Package.TYPE_HANDSHAKE_ACK);
            this.send(obj);
            if (this.initCallback) {
                this.initCallback(data);
                this.initCallback = null;
            }
        };
        p.handshakeInit = function (data) {
            if (data.sys) {
                Routedic.init(data.sys.dict);
                Protobuf.init(data.sys.protos);
            }
            if (data.sys && data.sys.heartbeat) {
                this.heartbeatInterval = data.sys.heartbeat * 1000; // heartbeat interval
                this.heartbeatTimeout = this.heartbeatInterval * 2; // max heartbeat timeout
            }
            else {
                this.heartbeatInterval = 0;
                this.heartbeatTimeout = 0;
            }
            if (typeof this.handshakeCallback === 'function') {
                this.handshakeCallback(data.user);
            }
        };
        p.send = function (byte) {
            if (this.socket && this.socket.connected) {
                this.socket.writeBytes(byte);
                this.socket.flush();
            }
        };
        //private deCompose(msg){
        //    return JSON.parse(Protocol.strdecode(msg.body));
        //}
        p.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var params = [].slice.call(arguments, 1);
            var callbacks = this._callbacks[event];
            if (callbacks) {
                callbacks = callbacks.slice(0);
                for (var i = 0, len = callbacks.length; i < len; ++i) {
                    callbacks[i].apply(this, params);
                }
            }
            return this;
        };
        PomeloBinary.DEBUG = false;
        PomeloBinary.EVENT_IO_ERROR = "io-error";
        PomeloBinary.EVENT_CLOSE = "close";
        PomeloBinary.EVENT_KICK = "onKick";
        PomeloBinary.EVENT_HEART_BEAT_TIMEOUT = 'heartbeat timeout';
        return PomeloBinary;
    })();
    pomeloClient.PomeloBinary = PomeloBinary;
    egret.registerClass(PomeloBinary,"pomeloClient.PomeloBinary");
    var Package = (function () {
        function Package() {
        }
        var d = __define,c=Package,p=c.prototype;
        p.encode = function (type, body) {
            var length = body ? body.length : 0;
            var buffer = new egret.ByteArray();
            buffer.writeByte(type & 0xff);
            buffer.writeByte((length >> 16) & 0xff);
            buffer.writeByte((length >> 8) & 0xff);
            buffer.writeByte(length & 0xff);
            if (body)
                buffer.writeBytes(body, 0, body.length);
            return buffer;
        };
        p.decode = function (buffer) {
            var type = buffer.readUnsignedByte();
            var len = (buffer.readUnsignedByte() << 16 | buffer.readUnsignedByte() << 8 | buffer.readUnsignedByte()) >>> 0;
            var body;
            if (buffer.bytesAvailable >= len) {
                body = new egret.ByteArray();
                if (len)
                    buffer.readBytes(body, 0, len);
            }
            else {
                console.log("[Package] no enough length for current type:", type);
            }
            return { type: type, body: body, length: len };
        };
        Package.TYPE_HANDSHAKE = 1;
        Package.TYPE_HANDSHAKE_ACK = 2;
        Package.TYPE_HEARTBEAT = 3;
        Package.TYPE_DATA = 4;
        Package.TYPE_KICK = 5;
        return Package;
    })();
    egret.registerClass(Package,"Package",["IPackage"]);
    var Message = (function () {
        function Message() {
        }
        var d = __define,c=Message,p=c.prototype;
        p.encode = function (id, route, msg) {
            var buffer = new egret.ByteArray();
            var type = id ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY;
            var byte = Protobuf.encode(route, msg) || Protocol.strencode(JSON.stringify(msg));
            var rot = Routedic.getID(route) || route;
            buffer.writeByte((type << 1) | ((typeof (rot) == "string") ? 0 : 1));
            if (id) {
                // 7.x
                do {
                    var tmp = id % 128;
                    var next = Math.floor(id / 128);
                    if (next != 0) {
                        tmp = tmp + 128;
                    }
                    buffer.writeByte(tmp);
                    id = next;
                } while (id != 0);
            }
            if (rot) {
                if (typeof rot == "string") {
                    buffer.writeByte(rot.length & 0xff);
                    buffer.writeUTFBytes(rot);
                }
                else {
                    buffer.writeByte((rot >> 8) & 0xff);
                    buffer.writeByte(rot & 0xff);
                }
            }
            if (byte) {
                buffer.writeBytes(byte);
            }
            return buffer;
        };
        p.decode = function (buffer) {
            // parse flag
            var flag = buffer.readUnsignedByte();
            var compressRoute = flag & Message.MSG_COMPRESS_ROUTE_MASK;
            var type = (flag >> 1) & Message.MSG_TYPE_MASK;
            var route;
            // parse id
            var id = 0;
            if (type === Message.TYPE_REQUEST || type === Message.TYPE_RESPONSE) {
                // 7.x
                var i = 0;
                do {
                    var m = buffer.readUnsignedByte();
                    id = id + ((m & 0x7f) * Math.pow(2, (7 * i)));
                    i++;
                } while (m >= 128);
            }
            // parse route
            if (type === Message.TYPE_REQUEST || type === Message.TYPE_NOTIFY || type === Message.TYPE_PUSH) {
                if (compressRoute) {
                    route = buffer.readUnsignedShort();
                }
                else {
                    var routeLen = buffer.readUnsignedByte();
                    route = routeLen ? buffer.readUTFBytes(routeLen) : "";
                }
            }
            //else if (type === Message.TYPE_RESPONSE)
            //{
            //    route = PomeloBinary.requests[id].route;
            //}
            //
            if (!id && !(typeof (route) == "string")) {
                route = Routedic.getName(route);
            }
            var body = Protobuf.decode(route, buffer) || JSON.parse(Protocol.strdecode(buffer));
            return { id: id, type: type, route: route, body: body };
        };
        Message.MSG_FLAG_BYTES = 1;
        Message.MSG_ROUTE_CODE_BYTES = 2;
        Message.MSG_ID_MAX_BYTES = 5;
        Message.MSG_ROUTE_LEN_BYTES = 1;
        Message.MSG_ROUTE_CODE_MAX = 0xffff;
        Message.MSG_COMPRESS_ROUTE_MASK = 0x1;
        Message.MSG_TYPE_MASK = 0x7;
        Message.TYPE_REQUEST = 0;
        Message.TYPE_NOTIFY = 1;
        Message.TYPE_RESPONSE = 2;
        Message.TYPE_PUSH = 3;
        return Message;
    })();
    egret.registerClass(Message,"Message",["IMessage"]);
    var Protocol = (function () {
        function Protocol() {
        }
        var d = __define,c=Protocol,p=c.prototype;
        Protocol.strencode = function (str) {
            var buffer = new egret.ByteArray();
            buffer.length = str.length;
            buffer.writeUTFBytes(str);
            return buffer;
        };
        Protocol.strdecode = function (byte) {
            return byte.readUTFBytes(byte.bytesAvailable);
        };
        return Protocol;
    })();
    egret.registerClass(Protocol,"Protocol");
    var Protobuf = (function () {
        function Protobuf() {
        }
        var d = __define,c=Protobuf,p=c.prototype;
        Protobuf.init = function (protos) {
            this._clients = protos && protos.client || {};
            this._servers = protos && protos.server || {};
        };
        Protobuf.encode = function (route, msg) {
            var protos = this._clients[route];
            if (!protos)
                return null;
            return this.encodeProtos(protos, msg);
        };
        Protobuf.decode = function (route, buffer) {
            var protos = this._servers[route];
            if (!protos)
                return null;
            return this.decodeProtos(protos, buffer);
        };
        Protobuf.encodeProtos = function (protos, msg) {
            var buffer = new egret.ByteArray();
            for (var name in msg) {
                if (protos[name]) {
                    var proto = protos[name];
                    switch (proto.option) {
                        case "optional":
                        case "required":
                            buffer.writeBytes(this.encodeTag(proto.type, proto.tag));
                            this.encodeProp(msg[name], proto.type, protos, buffer);
                            break;
                        case "repeated":
                            if (!!msg[name] && msg[name].length > 0) {
                                this.encodeArray(msg[name], proto, protos, buffer);
                            }
                            break;
                    }
                }
            }
            return buffer;
        };
        Protobuf.decodeProtos = function (protos, buffer) {
            var msg = {};
            while (buffer.bytesAvailable) {
                var head = this.getHead(buffer);
                var name = protos.__tags[head.tag];
                switch (protos[name].option) {
                    case "optional":
                    case "required":
                        msg[name] = this.decodeProp(protos[name].type, protos, buffer);
                        break;
                    case "repeated":
                        if (!msg[name]) {
                            msg[name] = [];
                        }
                        this.decodeArray(msg[name], protos[name].type, protos, buffer);
                        break;
                }
            }
            return msg;
        };
        Protobuf.encodeTag = function (type, tag) {
            var value = this.TYPES[type] != undefined ? this.TYPES[type] : 2;
            return this.encodeUInt32((tag << 3) | value);
        };
        Protobuf.getHead = function (buffer) {
            var tag = this.decodeUInt32(buffer);
            return { type: tag & 0x7, tag: tag >> 3 };
        };
        Protobuf.encodeProp = function (value, type, protos, buffer) {
            switch (type) {
                case 'uInt32':
                    buffer.writeBytes(this.encodeUInt32(value));
                    break;
                case 'int32':
                case 'sInt32':
                    buffer.writeBytes(this.encodeSInt32(value));
                    break;
                case 'float':
                    //Float32Array
                    var floats = new egret.ByteArray();
                    floats.endian = egret.Endian.LITTLE_ENDIAN;
                    floats.writeFloat(value);
                    buffer.writeBytes(floats);
                    break;
                case 'double':
                    var doubles = new egret.ByteArray();
                    doubles.endian = egret.Endian.LITTLE_ENDIAN;
                    doubles.writeDouble(value);
                    buffer.writeBytes(doubles);
                    break;
                case 'string':
                    buffer.writeBytes(this.encodeUInt32(value.length));
                    buffer.writeUTFBytes(value);
                    break;
                default:
                    var proto = protos.__messages[type] || this._clients["message " + type];
                    if (!!proto) {
                        var buf = this.encodeProtos(proto, value);
                        buffer.writeBytes(this.encodeUInt32(buf.length));
                        buffer.writeBytes(buf);
                    }
                    break;
            }
        };
        Protobuf.decodeProp = function (type, protos, buffer) {
            switch (type) {
                case 'uInt32':
                    return this.decodeUInt32(buffer);
                case 'int32':
                case 'sInt32':
                    return this.decodeSInt32(buffer);
                case 'float':
                    var floats = new egret.ByteArray();
                    buffer.readBytes(floats, 0, 4);
                    floats.endian = egret.Endian.LITTLE_ENDIAN;
                    var float = buffer.readFloat();
                    return floats.readFloat();
                case 'double':
                    var doubles = new egret.ByteArray();
                    buffer.readBytes(doubles, 0, 8);
                    doubles.endian = egret.Endian.LITTLE_ENDIAN;
                    return doubles.readDouble();
                case 'string':
                    var length = this.decodeUInt32(buffer);
                    return buffer.readUTFBytes(length);
                default:
                    var proto = protos && (protos.__messages[type] || this._servers["message " + type]);
                    if (proto) {
                        var len = this.decodeUInt32(buffer);
                        if (len) {
                            var buf = new egret.ByteArray();
                            buffer.readBytes(buf, 0, len);
                        }
                        return len ? Protobuf.decodeProtos(proto, buf) : false;
                    }
                    break;
            }
        };
        Protobuf.isSimpleType = function (type) {
            return (type === 'uInt32' ||
                type === 'sInt32' ||
                type === 'int32' ||
                type === 'uInt64' ||
                type === 'sInt64' ||
                type === 'float' ||
                type === 'double');
        };
        Protobuf.encodeArray = function (array, proto, protos, buffer) {
            var isSimpleType = this.isSimpleType;
            if (isSimpleType(proto.type)) {
                buffer.writeBytes(this.encodeTag(proto.type, proto.tag));
                buffer.writeBytes(this.encodeUInt32(array.length));
                var encodeProp = this.encodeProp;
                for (var i = 0; i < array.length; i++) {
                    encodeProp(array[i], proto.type, protos, buffer);
                }
            }
            else {
                var encodeTag = this.encodeTag;
                for (var j = 0; j < array.length; j++) {
                    buffer.writeBytes(encodeTag(proto.type, proto.tag));
                    this.encodeProp(array[j], proto.type, protos, buffer);
                }
            }
        };
        Protobuf.decodeArray = function (array, type, protos, buffer) {
            var isSimpleType = this.isSimpleType;
            var decodeProp = this.decodeProp;
            if (isSimpleType(type)) {
                var length = this.decodeUInt32(buffer);
                for (var i = 0; i < length; i++) {
                    array.push(decodeProp(type, protos, buffer));
                }
            }
            else {
                array.push(decodeProp(type, protos, buffer));
            }
        };
        Protobuf.encodeUInt32 = function (n) {
            var result = new egret.ByteArray();
            do {
                var tmp = n % 128;
                var next = Math.floor(n / 128);
                if (next !== 0) {
                    tmp = tmp + 128;
                }
                result.writeByte(tmp);
                n = next;
            } while (n !== 0);
            return result;
        };
        Protobuf.decodeUInt32 = function (buffer) {
            var n = 0;
            for (var i = 0; i < buffer.length; i++) {
                var m = buffer.readUnsignedByte();
                n = n + ((m & 0x7f) * Math.pow(2, (7 * i)));
                if (m < 128) {
                    return n;
                }
            }
            return n;
        };
        Protobuf.encodeSInt32 = function (n) {
            n = n < 0 ? (Math.abs(n) * 2 - 1) : n * 2;
            return this.encodeUInt32(n);
        };
        Protobuf.decodeSInt32 = function (buffer) {
            var n = this.decodeUInt32(buffer);
            var flag = ((n % 2) === 1) ? -1 : 1;
            n = ((n % 2 + n) / 2) * flag;
            return n;
        };
        Protobuf.TYPES = {
            uInt32: 0,
            sInt32: 0,
            int32: 0,
            double: 1,
            string: 2,
            message: 2,
            float: 5
        };
        Protobuf._clients = {};
        Protobuf._servers = {};
        return Protobuf;
    })();
    egret.registerClass(Protobuf,"Protobuf");
    var Routedic = (function () {
        function Routedic() {
        }
        var d = __define,c=Routedic,p=c.prototype;
        Routedic.init = function (dict) {
            this._names = dict || {};
            var _names = this._names;
            var _ids = this._ids;
            for (var name in _names) {
                _ids[_names[name]] = name;
            }
        };
        Routedic.getID = function (name) {
            return this._names[name];
        };
        Routedic.getName = function (id) {
            return this._ids[id];
        };
        Routedic._ids = {};
        Routedic._names = {};
        return Routedic;
    })();
    egret.registerClass(Routedic,"Routedic");
})(pomeloClient || (pomeloClient = {}));
var pomelo = new pomeloClient.PomeloBinary();

/**
 * Created by SmallAiTT on 2015/3/26.
 */
var logger;
(function (logger) {
    var net;
    (function (net) {
        logger.initLogger(logger.net, "net");
        logger.setLvl("net", 4);
    })(net = logger.net || (logger.net = {}));
})(logger || (logger = {}));
var mo;
(function (mo) {
    var _NetRequestInfo = (function () {
        function _NetRequestInfo() {
        }
        var d = __define,c=_NetRequestInfo,p=c.prototype;
        return _NetRequestInfo;
    })();
    mo._NetRequestInfo = _NetRequestInfo;
    egret.registerClass(_NetRequestInfo,"mo._NetRequestInfo");
    var Net = (function (_super) {
        __extends(Net, _super);
        function Net() {
            _super.apply(this, arguments);
            this.httpKey_crypt = "c";
            this._curHttpRetryTimes = 0;
        }
        var d = __define,c=Net,p=c.prototype;
        //@override
        p._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._requestIdCounter = 1;
            self._waitingRequestMap = {};
            self._connected = false; //还没进行连接
            self._waitingQueue = [];
            self._waitingReq4PomeloQueue = [];
            self._connectType = 0;
            self._serverConnected = false;
            self._httpConnected = false;
        };
        //进行服务器连接
        p.connect = function (cb, playWaiting) {
            if (playWaiting === void 0) { playWaiting = true; }
            var self = this;
            if (self._connecting)
                return;
            self._connecting = true;
            if (playWaiting)
                mo.playWaiting(); //先播放等待
            var host = mo.getLocalStorageItem(self.key_host, true);
            var port = mo.getLocalStorageItem(self.key_port, true);
            self._initConnectEvents();
            logger.net.info("connect host【%s】:port【%s】", host, port);
            //重新请求
            pomelo.init({
                host: host,
                port: port,
                log: self.logServer,
                //                reconnect:true,
                maxReconnectAttempts: 20
            }, function () {
                self._kicked = false; //没有被踢出
                self._connecting = false; //连接完成
                self._connected = true; //已经连接
                self._connectType = 1; //设置成正常连接
                if (playWaiting)
                    mo.stopWaiting();
                cb();
                //执行之前等待执行的
                var queue = self._waitingReq4PomeloQueue;
                while (queue.length > 0) {
                    var func = queue.pop();
                    if (func)
                        func();
                }
            });
        };
        //断开连接
        p.disconnect = function () {
            pomelo.disconnect();
        };
        //同步账户
        p.asyncAccount = function (cb, toPlayWaiting, toResetAsyncFlag) {
            if (toPlayWaiting === void 0) { toPlayWaiting = true; }
            if (toResetAsyncFlag === void 0) { toResetAsyncFlag = true; }
            //TODO 子类在此实现登录的请求
            this._reconnecting = false;
            if (toResetAsyncFlag)
                this._hasAsyncAccount = true;
            cb();
        };
        //重连
        p._reconnect = function (requestInfo) {
            var self = this, queue = self._waitingQueue;
            if (requestInfo)
                queue.push(requestInfo); //如果有就推送进来
            if (self._reconnecting)
                return; //正在连接则直接返回
            self._reconnecting = true;
            var onCnnCucess = function () {
                logger.net.info("重连成功！");
                while (queue.length > 0) {
                    self._doRequest(queue.pop());
                }
            };
            var connectType = self._connectType;
            logger.net.info("connectType------>", connectType);
            if (connectType == 1) {
                self._connectType = 2; //设置成正在偷偷重连
                self.asyncAccount(onCnnCucess, false, false);
            }
            else if (connectType == 2) {
                //显示重连视图
                var reccnStartTime = Date.newDate();
                _reccnView.show(function () {
                    var now = Date.newDate();
                    logger.net.info(now.getTime(), reccnStartTime.getTime());
                    if (now.getTime() - reccnStartTime.getTime() > 10000) {
                        self.reset();
                        _recnnFailed();
                    }
                    else {
                        self._connectType = 3; //设置成正在等待手动重连
                        self.asyncAccount(onCnnCucess, true, false); //重连
                    }
                });
            }
            else if (connectType == 3) {
                //显示重连视图
                self._connecting = true;
                _reccnView.show(function () {
                    self.reset();
                    _recnnFailed();
                });
            }
        };
        //请求连接，不带waiting的方式
        p.request = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = false;
            self._request(requestInfo);
        };
        //请求连接，带waiting的方式
        p.requestWaiting = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = true;
            mo.playWaiting(); //先播放等待
            self._request(requestInfo);
        };
        //pomelo模式请求连接，不带waiting的方式，这种可以在没同步时就进行请求，是属于强制模式
        p.request4Pomelo = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = false;
            self._request(requestInfo, true);
        };
        //pomelo模式请求连接，带waiting的方式，这种可以在没同步时就进行请求，是属于强制模式
        p.requestWaiting4Pomelo = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = true;
            mo.playWaiting(); //先播放等待
            self._request(requestInfo, true);
        };
        //链接http服务器
        p.connect4Server = function (cb, ctx) {
            var self = this;
            var host = mo.getLocalStorageItem(self.key_host, true);
            var port = mo.getLocalStorageItem(self.key_port, true);
            self._serverHost = host;
            self._serverPort = port;
            var requestInfo = self._getRequestInfo(self.httpConnectRoute, {}, function (data) {
                self._httpSessionId = data[0];
                self._serverConnected = true;
                self._serverCryptKey = data[1];
                cb.call(ctx, data);
            }, self);
            self._doRequestHttp(requestInfo, host, port);
        };
        //断开http连接
        p.disconnect4Server = function (cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo(self.httpDisconnectRoute, {}, function (data) {
                self._serverConnected = false;
                self._httpConnected = true;
                cb.call(ctx);
            }, self);
            self._doRequestHttp(requestInfo, self._serverHost, self._serverPort);
        };
        p.connect4Http = function (cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo(self.httpConnectRoute, {}, function (data) {
                self._httpConnected = true;
                self._httpCryptKey = data[1];
                cb.call(ctx, data);
            }, self);
            self._doRequestHttp(requestInfo, self.httpHost, self.httpPort);
        };
        //断开http连接
        p.disconnect4Http = function (cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo(self.httpDisconnectRoute, {}, function (data) {
                self._httpConnected = false;
                cb.call(ctx);
            }, self);
            self._doRequestHttp(requestInfo, self.httpHost, self.httpPort);
        };
        //由于http可以直接请求，所以可以不需要连接就可以发送了，这个接口是为了处理不需要实时连接服务器用的
        p.request4Http = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = false;
            delete self._waitingRequestMap[requestInfo.requestId];
            self._requestHttp(requestInfo);
        };
        //由于http可以直接请求，所以可以不需要连接就可以发送了，这个接口是为了处理不需要实时连接服务器用的
        p.requestWaiting4Http = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = true;
            delete self._waitingRequestMap[requestInfo.requestId];
            mo.playWaiting(); //先播放等待
            self._requestHttp(requestInfo);
        };
        //由于http可以直接请求，所以可以不需要连接就可以发送了，这个接口是为了处理不需要实时连接服务器用的
        p.request4Server = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = false;
            delete self._waitingRequestMap[requestInfo.requestId];
            self._requestHttp(requestInfo, true);
        };
        //由于http可以直接请求，所以可以不需要连接就可以发送了，这个接口是为了处理不需要实时连接服务器用的
        p.requestWaiting4Server = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = true;
            delete self._waitingRequestMap[requestInfo.requestId];
            mo.playWaiting(); //先播放等待
            self._requestHttp(requestInfo, true);
        };
        //获取请求信息
        p._getRequestInfo = function (route, args, cb, target, option) {
            var self = this;
            var l = arguments.length;
            if (l < 2 || l > 6)
                throw "Arguments error for request!";
            var locArgs, locCb, locOption;
            for (var i = 1; i < l; i++) {
                var arg = arguments[i];
                if ((typeof arg == "object" || arg == null) && !locCb)
                    locArgs = arg;
                else if (typeof arg == "function" && !locCb)
                    locCb = arg;
                else if ((typeof arg == "object" || arg == null) && locCb && !locOption)
                    locOption = { target: arg };
                else if (locOption) {
                    arg.target = locOption.target;
                    locOption = arg;
                }
                else
                    throw "Arguments error for request!";
            }
            locArgs = locArgs || {};
            locArgs["t"] = (Date.newDate().getTime());
			locArgs["dhid"] = quma.DHID || "";
			locArgs["channel"] = quma.CHANNEL || "";
            locOption = locOption || {};
            locOption.cb = locCb;
            var requestId = self._requestIdCounter++;
            var requestInfo = new _NetRequestInfo();
            requestInfo.requestId = requestId;
            requestInfo.route = route || "";
            requestInfo.args = JSON.stringify(locArgs || {});
            requestInfo.cb = locOption.cb;
            requestInfo.ctx = locOption.target;
            requestInfo.isHttp = route.split(".")[0] == self.httpKey_handler;
            requestInfo.toPlayWaiting = false;
            self._waitingRequestMap[requestId] = requestInfo;
            return requestInfo;
        };
        //请求的中间层，用于处理重连
        p._request = function (requestInfo, force) {
            if (force === void 0) { force = false; }
            var self = this;
            if (self._kicked)
                return; //已经被踢出去了
            if (!self._waitingRequestMap[requestInfo.requestId])
                return; //已经没了
            if (force || !self._hasAsyncAccount || self._connected) {
                self._doRequest(requestInfo);
            }
            else {
                self._reconnect(requestInfo);
            }
        };
        //请求的统一接口
        p._doRequest = function (requestInfo) {
            var self = this;
            if (self._kicked)
                return; //已经被踢出去了
            if (!self._waitingRequestMap[requestInfo.requestId])
                return; //已经没了
            if (requestInfo.isHttp) {
                self._requestHttp(requestInfo);
            }
            else {
                self._requestPomelo(requestInfo);
            }
        };
        //获取http的参数
        p._getHttpParams = function (requestInfo) {
            var self = this;
            var route = requestInfo.route, args = requestInfo.args;
            var params = "/?";
            params += self.httpKey_route + "=" + route; //TODO
            params += "&" + self.httpKey_args + "=" + args; //TODO
            params += "&" + self.httpKey_sessionId + "=" + self._httpSessionId || ""; //TODO
            params += "&" + self.httpKey_crypt + "=" + (requestInfo.isCrypt ? 1 : 0); //TODO
            return params;
        };
        //http模式的请求
        p._requestHttp = function (requestInfo, isServer) {
            var self = this;
            var host = "", port = "";
            self._calCrypt(requestInfo, isServer);
            if (isServer) {
                if (!self._serverConnected) {
                    self.connect4Server(function () {
                        self._requestHttp(requestInfo, isServer);
                    }, self);
                }
                else {
                    host = self._serverHost;
                    port = self._serverPort;
                    self._doRequestHttp(requestInfo, host, port);
                }
            }
            else {
                if (!self._httpConnected) {
                    self.connect4Http(function () {
                        self._requestHttp(requestInfo, isServer);
                    }, self);
                }
                else {
                    host = self.httpHost;
                    port = self.httpPort;
                    var route = requestInfo.route, args = requestInfo.args;
                    self._doRequestHttp(requestInfo, host, port);
                }
            }
        };
        p._calCrypt = function (requestInfo, isServer) {
            var self = this;
            if (isServer && self._serverCryptKey) {
                requestInfo.route = crypt.enCharCode(self._serverCryptKey, requestInfo.route);
                requestInfo.args = crypt.enCharCode(self._serverCryptKey, requestInfo.args);
                requestInfo.isCrypt = true;
            }
            if (!isServer && self._httpCryptKey) {
                requestInfo.route = crypt.enCharCode(self._httpCryptKey, requestInfo.route);
                requestInfo.args = crypt.enCharCode(self._httpCryptKey, requestInfo.args);
                requestInfo.isCrypt = true;
            }
        };
        
        //http模式的请求
        p._doRequestHttp = function (requestInfo, host, port) {
            var self = this;
            var route = requestInfo.route, args = requestInfo.args;
            //httpKey_crypt
            var httpUrl = mo.httpMode + host + ":" + port + self._getHttpParams(requestInfo);
            logger.net.info("http模式请求开始：%s", httpUrl);
            //先这么实现下，以后会继续优化
            var urlLoader = new egret.URLLoader();
            var urlRequest = new egret.URLRequest(httpUrl);
            urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            urlLoader.load(urlRequest);
            var onComplete = function (event) {
                //logger.net.info(route, "--->", event.type, urlLoader.data);
                urlLoader.removeEventListener(egret.Event.COMPLETE, onComplete, self);
                urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
                self._handleRequestResult(requestInfo, JSON.parse(urlLoader.data));
            };
            var onError = function (event) {
                urlLoader.removeEventListener(egret.Event.COMPLETE, onComplete, self);
                urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
                logger.net.error(route, "--->", event.type, urlLoader.data);
                self._onClose(event);
            };
            urlLoader.addEventListener(egret.Event.COMPLETE, onComplete, self);
            urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
        };
        //pomelo模式的请求
        p._requestPomelo = function (requestInfo) {
            var self = this;
            var route = requestInfo.route, args = requestInfo.args, argsContent = JSON.stringify(args);
            var func = function () {
                logger.net.info("pomelo模式请求开始：%s ? %s", route, argsContent);
                pomelo.request(route, args || {}, function (result) {
                    self._handleRequestResult(requestInfo, result);
                });
            };
            if (self._connected) {
                func();
            }
            else if (self._connecting) {
                logger.net.info("pomelo模式请求【%s ? %s】等待connect！", route, argsContent);
                self._waitingReq4PomeloQueue.push(func);
                self.connect(function () { });
            }
            else {
                logger.net.info("pomelo模式请求【%s ? %s】先进行connect！", route, argsContent);
                self.connect(func);
            }
        };
        //处理请求结果
        p._handleRequestResult = function (requestInfo, result) {
            var self = this, clazz = self.__class, map = self._waitingRequestMap;
            var requestId = requestInfo.requestId;
            delete map[requestId]; //从等待中移除
            if (requestInfo.toPlayWaiting)
                mo.stopWaiting();
            var route = requestInfo.route, cb = requestInfo.cb, ctx = requestInfo.ctx;
            var ON_ROUTE_ERROR = clazz.ON_ROUTE_ERROR;
            if (result["code"]) {
                var msg = result["msg"];
                if (msg) {
                    logger.net.error("服务端返回错误信息：%s", msg);
                    mo.showMsg(msg);
                }
                self.emit(ON_ROUTE_ERROR + "_" + route, null, msg, msg);
                self.emit(ON_ROUTE_ERROR, route, null, msg, msg);
            }
            else {
                var msgCode = result[self.respKey_msgCode];
                if (msgCode == null) {
                    var value = result[self.respKey_value];
                    if (cb)
                        cb.call(ctx, value);
                    self.emit(clazz.ON_ROUTE_SUCCESS + "_" + route, value);
                }
                else {
                    //显示错误消息
                    var msgArgs = result[self.respKey_msgArgs];
                    var tempArr = msgArgs || [];
                    tempArr.splice(0, 0, msgCode);
					if(tempArr && tempArr[0] == 24){
						mo.showMsg(24, function () {
							mo_channel.getCurChannel().logout(function () { });
						});
					}else{
						mo.showMsg.apply(mo, tempArr);
					}
                    
                    self.emit(ON_ROUTE_ERROR + "_" + route, null, msgCode, msgArgs);
                    self.emit(ON_ROUTE_ERROR, route, null, msgCode, msgArgs);
                }
            }
        };
        p._showNetErrMsg = function () {
            var self = this;
            if (self._netErrShown)
                return;
            var httpRetryMaxTimes = self.httpRetryMaxTimes || 0;
            var curHttpRetryTimes = self._curHttpRetryTimes++;
            if (curHttpRetryTimes >= httpRetryMaxTimes) {
                _netErrorView.show(function () {
                    self._netErrShown = false;
                    self._waitingReq4PomeloQueue.length = 0;
                    mo.stopWaitingForce();
                });
                self._netErrShown = true;
                self._curHttpRetryTimes = 0;
            }
        };
        p._initConnectEvents = function () {
            var self = this, clazz = self.__class;
            if (self._connectEventsInited)
                return; //如果已经初始化过了，就直接返回
            //----------------------------监听消息--------------------------
            self._connectEventsInited = true;
            pomelo.on("io-error", function (event) {
                mo.stopWaiting();
                logger.net.error("net#链接出错!");
                self._connected = false;
                self._connecting = false;
                self._reconnecting = false;
                //pomelo.disconnect();
                self.emit(clazz.ON_ERROR);
                if (!self._hasAsyncAccount) {
                    self._showNetErrMsg();
                }
            });
            //POMELO_ON_KEY_SYSMSG
            pomelo.on("a", function (data) {
                logger.net.info(data);
            });
            pomelo.on("close", function (event) {
                mo.stopWaiting();
                logger.net.error("net#链接断开!");
                self._onClose(event);
            });
            pomelo.on("onKick", function (event) {
                logger.net.debug("被踢出!");
                mo.stopWaiting();
                self._kicked = true;
                self._connected = false;
                self.emit(clazz.ON_CLOSE);
                _kickView.show(function () {
                    self.reset();
                });
            });
        };
        p._onClose = function (event) {
            mo.stopWaiting();
            var self = this, clazz = self.__class;
            self._connected = false;
            self._connecting = false;
            self.emit(clazz.ON_CLOSE);
            if (self._hasAsyncAccount) {
                var connectType = self._connectType;
                if (connectType == 2 || connectType == 3) {
                    // 需要跳转到显示reconnect窗口
                    self._reconnect();
                }
            }
            else {
                self._showNetErrMsg();
            }
        };
        p.onRouteSuccess = function (route, cb, ctx) {
            this.on(this.__class.ON_ROUTE_SUCCESS + "_" + route, cb, ctx);
        };
        p.unRouteSuccess = function (route, cb, ctx) {
            this.un(this.__class.ON_ROUTE_SUCCESS + "_" + route, cb, ctx);
        };
        p.onRouteError = function (route, cb, ctx) {
            this.on(this.__class.ON_ROUTE_ERROR + "_" + route, cb, ctx);
        };
        p.unRouteError = function (route, cb, ctx) {
            this.un(this.__class.ON_ROUTE_ERROR + "_" + route, cb, ctx);
        };
        //++++++++++++++++事件注册相关 结束++++++++++++++++++
        p.reset = function () {
            var self = this;
            self._kicked = false; //设置成未被踢出
            self._connected = false; //设置成未连接
            self._connecting = false; //设置正在连接为false
            self._hasAsyncAccount = false; //重新设置成未同步过账号
            self._connectType = 0; //设置成未连接
            //清空缓存的请求
            self._waitingQueue.length = 0;
            var map = self._waitingRequestMap;
            for (var key in map) {
                delete map[key];
            }
            self._requestIdCounter = 0;
            //关闭等待框
            mo.stopWaitingForce();
        };
        Net.ON_ERROR = "error";
        Net.ON_CLOSE = "close";
        Net.ON_KICK = "kick";
        Net.ON_SUCCESS = "success";
        Net.ON_ROUTE_ERROR = "resultError";
        Net.ON_ROUTE_SUCCESS = "resultSuccess";
        return Net;
    })(egret.Emitter);
    mo.Net = Net;
    egret.registerClass(Net,"mo.Net");
    var _net = new Net();
    var _reccnView = { show: function (onOk) { } };
    var _kickView = { show: function (onOk) { } };
    var _recnnFailed = function () { };
    var _netErrorView = { show: function () { } };
    function registerNet(opt) {
        _net = opt.net || _net;
        _reccnView = opt.reccnView || _reccnView;
        _kickView = opt.kickView || _kickView;
        _recnnFailed = opt.recnnFailed || _recnnFailed;
        _netErrorView = opt.netErrorView || _netErrorView;
    }
    mo.registerNet = registerNet;
    function request(route, args, cb, ctx) {
        _net.request.apply(_net, arguments);
    }
    mo.request = request;
    function requestWaiting(route, args, cb, ctx) {
        _net.requestWaiting.apply(_net, arguments);
    }
    mo.requestWaiting = requestWaiting;
    function request4Pomelo(route, args, cb, ctx) {
        _net.request4Pomelo.apply(_net, arguments);
    }
    mo.request4Pomelo = request4Pomelo;
    function requestWaiting4Pomelo(route, args, cb, ctx) {
        _net.requestWaiting4Pomelo.apply(_net, arguments);
    }
    mo.requestWaiting4Pomelo = requestWaiting4Pomelo;
    function connect4Server(cb, ctx) {
        _net.connect4Server.apply(_net, arguments);
    }
    mo.connect4Server = connect4Server;
    function disconnect4Server(cb, ctx) {
        _net.disconnect4Server.apply(_net, arguments);
    }
    mo.disconnect4Server = disconnect4Server;
    function request4Server(route, args, cb, ctx) {
        _net.request4Server.apply(_net, arguments);
    }
    mo.request4Server = request4Server;
    function requestWaiting4Server(route, args, cb, ctx) {
        _net.requestWaiting4Server.apply(_net, arguments);
    }
    mo.requestWaiting4Server = requestWaiting4Server;
    function request4Http(route, args, cb, ctx) {
        _net.request4Http.apply(_net, arguments);
    }
    mo.request4Http = request4Http;
    function requestWaiting4Http(route, args, cb, ctx) {
        _net.requestWaiting4Http.apply(_net, arguments);
    }
    mo.requestWaiting4Http = requestWaiting4Http;
    function connect(cb, playWaiting) {
        if (playWaiting === void 0) { playWaiting = true; }
        _net.connect.apply(_net, arguments);
    }
    mo.connect = connect;
    function disconnect() {
        _net.disconnect();
    }
    mo.disconnect = disconnect;
    mo.httpMode = "http://";
})(mo || (mo = {}));

